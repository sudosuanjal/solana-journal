"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createJournalEntry, getProgram } from "@/utils/program";
const moodOptions = [
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

  const [selectedMood, setSelectedMood] = useState<string>("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleCreate = useCallback(async () => {
    if (!publicKey || !connected || !signTransaction || !signAllTransactions) {
      setStatus("wallet not connected or missing rewuired methods");
      return;
    }
    if (!title.trim() || !message.trim()) {
      setStatus("fill in both tittle and messasge");
      return;
    }
    if (!selectedMood) {
      setStatus("Please select a mood");
      return;
    }
    const mood = moodOptions.find((mood) => mood.id === selectedMood)?.label;
    if (!mood) {
      setStatus("Selected mood is invalid");
      return;
    }

    setIsLoading(true);
    setStatus("creating journal entry");
    try {
      const walletAdapter = {
        publicKey,
        signAllTransactions,
        signTransaction,
      };

      const program = getProgram(connection, walletAdapter as any);

      const signature = await createJournalEntry(
        program,
        title,
        message,
        mood,
        publicKey
      );
      setStatus(`jorunal entry created succefully! Transaction: ${signature}`);
      setTitle("");
      setMessage("");
    } catch (error: any) {
      setStatus(`Error: ${error.message || "failed to create joournal"}`);
    } finally {
      setIsLoading(false);
      setStatus("");
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
  ]);

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="grid grid-cols-2 gap-4">
        {/* Awesome mood on the left */}
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

        {/* Other moods on the right in a 2x2 grid */}
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
          style={{}}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-white rounded-md p-4 text-gray-800 outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-500 resize-none border-2 border-gray-200 focus:border-gray-900 transition-colors flex-grow"
          placeholder="Enter your message..."
          style={{}}
        />
      </div>

      <Button
        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 rounded-md text-base border-2 border-gray-900 transition-colors"
        size="lg"
        style={{}}
        onClick={handleCreate}
      >
        Submit Journal
      </Button>
      {status && (
        <p
          className={`text-sm ${
            status.includes("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
}
