// dashboard/page.ts
"use client";

import JournalDashboard from "@/components/JournalDashboard";
import NavBar from "@/components/Navbar";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { useJournalStore } from "@/store/journalStore";
import {
  createJournalEntry,
  getProgram,
  getJournalEntryPDA,
  updateJournalEntry,
  Mood,
} from "@/utils/program";
import { toast } from "sonner";
import { useDashboardStore } from "@/store/dashboardStore";
import { sha256 } from "js-sha256";

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

export default function DashboardPage() {
  const { connection } = useConnection();
  const { publicKey, signAllTransactions, signTransaction, connected, wallet } =
    useWallet();
  const { addEntry, fetchEntries, journalEntries, updateEntry } =
    useJournalStore();
  const { editEntry, clearEditEntry } = useDashboardStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchEntries(connection, publicKey, wallet);
  }, [publicKey, wallet, connection, fetchEntries]);

  const FormContent = () => {
    const [selectedMood, setSelectedMood] = useState<Mood | "">(
      (editEntry?.mood as Mood) || ""
    );
    const [title, setTitle] = useState(editEntry?.title || "");
    const [message, setMessage] = useState(editEntry?.message || "");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("");

    const handleSubmit = useCallback(async () => {
      if (
        !publicKey ||
        !connected ||
        !signTransaction ||
        !signAllTransactions
      ) {
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
      if (titleBytes.length > 100) {
        const msg = "Title must not exceed 100 bytes";
        setStatus(msg);
        toast("Invalid Title", {
          description: msg,
          action: { label: "Clear", onClick: () => setStatus("") },
        });
        return;
      }

      const messageBytes = new TextEncoder().encode(message);
      if (messageBytes.length > 840) {
        const msg = "Message must not exceed 840 bytes";
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

      const loadingToastId = toast.loading(
        editEntry ? "Updating journal entry..." : "Creating journal entry..."
      );
      setIsLoading(true);
      setStatus(
        editEntry ? "updating journal entry" : "creating journal entry"
      );

      try {
        const walletAdapter = {
          publicKey,
          signAllTransactions,
          signTransaction,
        };

        const program = getProgram(connection, walletAdapter as any);
        console.log("program", program.account);

        let signature;
        if (editEntry) {
          // Update existing entry
          const entry = journalEntries.find(
            (e) => e.publicKey.toString() === editEntry.publicKey
          )!;
          const titleBytes = new TextEncoder().encode(entry.title); // Use encrypted title
          const titleHash = Buffer.from(sha256(titleBytes), "hex");
          console.log("Update titleHash:", titleHash.toString("hex")); // Debug log

          // Re-encrypt the updated message
          const encryptResponse = await fetch("/api/encrypt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: editEntry.title, message }), // Use original encrypted title, new message
          });
          const encryptData = await encryptResponse.json();
          if (!encryptResponse.ok) {
            throw new Error(encryptData.error || "Encryption failed");
          }
          const { encryptedMessage } = encryptData;

          signature = await updateJournalEntry(
            program,
            titleHash,
            encryptedMessage, // Use encrypted message
            selectedMood,
            publicKey
          );
          updateEntry({
            ...entry,
            message: encryptedMessage, // Update with encrypted message
            mood: selectedMood,
            updatedAt: Math.floor(Date.now() / 1000),
          });
          clearEditEntry();
        } else {
          // Create new entry
          const response = await fetch("/api/encrypt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, message }),
          });

          const responseData = await response.json();
          if (!response.ok) {
            throw new Error(responseData.error || "Encryption failed");
          }

          const { encryptedTitle, encryptedMessage } = responseData;
          const titleBytes = new TextEncoder().encode(encryptedTitle);
          const titleHash = Buffer.from(sha256(titleBytes), "hex");
          console.log("Create titleHash:", titleHash.toString("hex")); // Debug log
          signature = await createJournalEntry(
            program,
            encryptedTitle,
            encryptedMessage,
            selectedMood,
            publicKey
          );

          const [journalEntryPDA] = getJournalEntryPDA(
            encryptedTitle,
            publicKey
          );
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
        }

        setStatus(
          `Journal entry ${
            editEntry ? "updated" : "created"
          } successfully! Transaction: ${signature}`
        );

        toast.dismiss(loadingToastId);
        toast(`Entry ${editEntry ? "Updated" : "Created"}!`, {
          description: `Journal saved on Solana Devnet.`,
          action: {
            label: "View Tx",
            onClick: () =>
              window.open(
                `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
                "_blank"
              ),
          },
        });
        setOpen(false); // Close the sheet after submission
      } catch (error: any) {
        setStatus(`Error: ${error.message || "Failed to submit journal"}`);
        toast.dismiss(loadingToastId);
        toast("Error", {
          description: error.message || "Failed to submit journal",
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
      editEntry,
      updateEntry,
      clearEditEntry,
      journalEntries,
    ]);

    const handleClear = () => {
      setTitle("");
      setMessage("");
      setSelectedMood("");
      if (editEntry) {
        clearEditEntry(); // Reset edit mode if active
        setOpen(false); // Close the sheet if in mobile view
      }
    };

    return (
      <div className="space-y-6 flex flex-col h-full pb-4">
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
                style={{ color: moodOptions[0].textColor }}
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
                    style={{ color: mood.textColor }}
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
            disabled={!!editEntry} // Disable title in edit mode
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
        <div className="flex gap-4">
          <Button
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 rounded-md text-base border-2 border-gray-900 transition-colors flex-1"
            size="lg"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading
              ? editEntry
                ? "Updating..."
                : "Submitting..."
              : editEntry
              ? "Update Journal"
              : "Submit Journal"}
          </Button>
          <Button
            variant="outline"
            className="w-full border-2 border-gray-900 text-gray-900 hover:bg-gray-100 font-medium py-4 rounded-md text-base flex-1"
            onClick={handleClear}
            disabled={isLoading}
          >
            Clear
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-[#FFF9E5] flex flex-col relative">
      <NavBar />
      <main
        className="flex-grow p-4 pt-16 overflow-hidden relative"
        style={{ marginTop: "64px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
          <div className="col-span-1 md:col-span-2 rounded-md border-2 border-gray-900 p-6 overflow-y-auto h-full bg-white">
            <JournalDashboard />
          </div>
          <div className="hidden md:block rounded-md border-2 border-gray-900 p-6 overflow-y-auto h-full bg-white">
            <FormContent />
          </div>
        </div>
      </main>
      <div
        className={`md:hidden fixed bottom-6 right-6 z-[2000] ${
          open ? "hidden" : ""
        }`}
      >
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="default"
              size="icon"
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-md border-2 border-gray-900 w-12 h-12 shadow-lg"
            >
              <Plus className="h-6 w-6" />
              <span className="sr-only">Create new journal entry</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="h-[80vh] overflow-y-auto bg-white p-4"
          >
            <SheetHeader>
              <SheetTitle>
                {editEntry ? "Edit Journal Entry" : "Create Journal Entry"}
              </SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <FormContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
