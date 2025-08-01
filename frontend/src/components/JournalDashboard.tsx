"use client";
import { getAllJournalEntries, getProgram } from "@/utils/program";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";

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

export default function JournalDashboard() {
  const { connection } = useConnection();
  const { wallet, publicKey } = useWallet();
  const [journalEntries, setJournalEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    if (!publicKey || !wallet?.adapter) return;
    setLoading(true);

    try {
      const program = await getProgram(connection, wallet?.adapter as any);
      const data = await getAllJournalEntries(program, publicKey);
      setJournalEntries(data);
    } catch (error) {
      console.error("Error fetching journal entries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (publicKey && wallet) {
      fetchEntries();
    }
  }, [publicKey, wallet]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-600">Loading journal entries...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {journalEntries.map((entry) => {
        const mood = moodOptions.find(
          (m) => m.label.toLowerCase() === entry.modalLabel?.toLowerCase()
        );

        const cardStyles = {
          backgroundColor: mood?.bgColor || "#FFFFFF",
          borderColor: mood?.borderColor || "#E5E7EB", // fallback to gray-200
          color: mood?.textColor || "#1F2937", // fallback to gray-900
        };

        return (
          <div
            key={entry.publicKey.toString()}
            className="rounded-md p-6 space-y-4 shadow-sm border-2 transition-colors"
            style={cardStyles}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white rounded-md px-4 py-2 border border-gray-300">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span
                  className="text-sm text-gray-600 font-medium"
                  style={{ fontFamily: "Kalam, cursive" }}
                >
                  {entry.date || new Date().toLocaleDateString()}
                </span>
              </div>
              <div
                className="flex items-center gap-2 rounded-md px-4 py-2 border border-opacity-20"
                style={{
                  borderColor: mood?.borderColor || "#D1D5DB",
                  backgroundColor: "#fff",
                }}
              >
                <span className="text-sm">{entry.moodEmoji || "😊"}</span>
                <span
                  className="text-sm font-medium"
                  style={{
                    fontFamily: "Kalam, cursive",
                    color: "#1F2937",
                  }}
                >
                  {entry.modalLabel || "Happy"}
                </span>
              </div>
            </div>
            <h2
              className="text-xl font-bold leading-tight"
              style={{ fontFamily: "Kalam, cursive" }}
            >
              {entry.title}
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: "Kalam, cursive" }}
            >
              {entry.message}
            </p>
          </div>
        );
      })}
    </div>
  );
}
