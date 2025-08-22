"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  createJournalEntry,
  getProgram,
  getJournalEntryPDA,
  Mood,
} from "@/utils/program";
import { toast } from "sonner";
import { useJournalStore } from "@/store/journalStore";

const moodOptions: {
  id: Mood;
  label: string;
  emoji: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}[] = [
  {
    id: "awesome",
    label: "Awesome",
    emoji: "😊",
    bgColor: "#F8F8FF",
    textColor: "#3E3B39",
    borderColor: "#CAC9CD",
  },
  {
    id: "happy",
    label: "Happy",
    emoji: "😄",
    bgColor: "#CAC9CD",
    textColor: "#3E3B39",
    borderColor: "#9B9A9C",
  },
  {
    id: "okay",
    label: "Okay",
    emoji: "😐",
    bgColor: "#9B9A9C",
    textColor: "#F8F8FF",
    borderColor: "#6D6A6A",
  },
  {
    id: "bad",
    label: "Bad",
    emoji: "😢",
    bgColor: "#6D6A6A",
    textColor: "#F8F8FF",
    borderColor: "#3E3B39",
  },
  {
    id: "terrible",
    label: "Terrible",
    emoji: "😭",
    bgColor: "#3E3B39",
    textColor: "#F8F8FF",
    borderColor: "#6D6A6A",
  },
];

export default function JournalEntryForm() {
  const { connection } = useConnection();
  const { publicKey, signAllTransactions, signTransaction, connected, wallet } =
    useWallet();
  const { addEntry, fetchEntries } = useJournalStore();
  const [selectedMood, setSelectedMood] = useState<Mood | "">("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleCreate = useCallback(async () => {
    if (!publicKey || !connected || !signTransaction || !signAllTransactions) {
      const msg = "Wallet not connected or missing required methods";
      setStatus(msg);
      toast("Wallet Error", {
        description: msg,
        action: { label: "Clear", onClick: () => setStatus("") },
      });
      return;
    }

    if (!title.trim() || !message.trim()) {
      const msg = "Please fill in both title and message";
      setStatus(msg);
      toast("Missing Fields", {
        description: msg,
        action: { label: "Clear", onClick: () => setStatus("") },
      });
      return;
    }

    const titleBytes = new TextEncoder().encode(title);
    if (titleBytes.length > 55) {
      // Reduced to account for encryption
      const msg = "Title must not exceed 55 bytes";
      setStatus(msg);
      toast("Invalid Title", {
        description: msg,
        action: { label: "Clear", onClick: () => setStatus("") },
      });
      return;
    }

    const messageBytes = new TextEncoder().encode(message);
    if (messageBytes.length > 610) {
      // Reduced to account for encryption
      const msg = "Message must not exceed 610 bytes";
      setStatus(msg);
      toast("Invalid Message", {
        description: msg,
        action: { label: "Clear", onClick: () => setStatus("") },
      });
      return;
    }

    if (!selectedMood) {
      const msg = "Please select a mood";
      setStatus(msg);
      toast("Mood Not Selected", {
        description: msg,
        action: { label: "Clear", onClick: () => setStatus("") },
      });
      return;
    }

    const loadingToastId = toast.loading("Creating journal entry...");
    setIsLoading(true);
    setStatus("creating journal entry");

    try {
      // Call encryption API
      const response = await fetch("/api/encrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, message }),
      });

      // Read the response body once
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Encryption failed");
      }

      const { encryptedTitle, encryptedMessage } = responseData;

      const walletAdapter = {
        publicKey,
        signAllTransactions,
        signTransaction,
      };

      const program = getProgram(connection, walletAdapter as any);
      console.log("program", program.account);

      const signature = await createJournalEntry(
        program,
        encryptedTitle,
        encryptedMessage,
        selectedMood,
        publicKey
      );

      const [journalEntryPDA] = getJournalEntryPDA(encryptedTitle, publicKey);
      const newEntry = {
        owner: publicKey,
        title: encryptedTitle,
        message: encryptedMessage,
        mood: selectedMood,
        createdAt: Math.floor(Date.now() / 1000),
        publicKey: journalEntryPDA,
        moodEmoji: moodOptions.find((m) => m.id === selectedMood)?.emoji,
      };

      addEntry(newEntry);
      setTitle("");
      setMessage("");
      setSelectedMood("");
      setStatus(
        `Journal entry created successfully! Transaction: ${signature}`
      );

      toast.dismiss(loadingToastId);
      toast("Entry Created!", {
        description: "Journal saved on Solana Devnet.",
        action: {
          label: "View Tx",
          onClick: () =>
            window.open(
              `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
              "_blank"
            ),
        },
      });
    } catch (error: any) {
      setStatus(`Error: ${error.message || "Failed to create journal"}`);
      toast.dismiss(loadingToastId);
      toast("Error", {
        description: error.message || "Failed to create journal",
        action: { label: "Clear", onClick: () => setStatus("") },
      });
      console.error("Transaction error:", error);
      if (error.logs) {
        console.log("Transaction logs:", error.logs);
      }
    } finally {
      setIsLoading(false);
    }
  }, [
    connection,
    publicKey,
    signAllTransactions,
    signTransaction,
    title,
    message,
    selectedMood,
    connected,
    addEntry,
    fetchEntries,
    wallet,
  ]);

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="grid grid-cols-2 gap-4">
        <div
          key={moodOptions[0].id}
          className={`rounded-md p-4 cursor-pointer transition-all duration-200 hover:scale-105 border-2 flex items-center justify-center row-span-2 ${
            selectedMood === moodOptions[0].id
              ? "ring-2 ring-gray-900 ring-offset-2"
              : ""
          }`}
          onClick={() => setSelectedMood(moodOptions[0].id)}
          style={{
            backgroundColor: moodOptions[0].bgColor,
            borderColor: moodOptions[0].borderColor,
          }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl mb-4">{moodOptions[0].emoji}</div>
            <span
              className="text-base font-medium"
              style={{
                color: moodOptions[0].textColor,
              }}
            >
              {moodOptions[0].label}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {moodOptions.slice(1).map((mood) => (
            <div
              key={mood.id}
              className={`rounded-md p-4 cursor-pointer transition-all duration-200 hover:scale-105 border-2 flex items-center justify-center ${
                selectedMood === mood.id
                  ? "ring-2 ring-gray-900 ring-offset-2"
                  : ""
              }`}
              onClick={() => setSelectedMood(mood.id)}
              style={{
                backgroundColor: mood.bgColor,
                borderColor: mood.borderColor,
              }}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <span
                  className="text-sm font-medium"
                  style={{
                    color: mood.textColor,
                  }}
                >
                  {mood.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4 flex-grow flex flex-col">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-white rounded-md p-4 text-gray-800 outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-500 border-2 border-gray-200 focus:border-gray-900 transition-colors"
          placeholder="Enter title..."
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-white rounded-md p-4 text-gray-800 outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-500 resize-none border-2 border-gray-200 focus:border-gray-900 transition-colors flex-grow"
          placeholder="Enter your message..."
        />
      </div>
      <Button
        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 rounded-md text-base border-2 border-gray-900 transition-colors"
        size="lg"
        onClick={handleCreate}
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit Journal"}
      </Button>
    </div>
  );
}
