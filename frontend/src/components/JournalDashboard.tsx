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
      const program = await getProgram(connection, wallet.adapter as any);
      const data = await getAllJournalEntries(program, publicKey);
      setJournalEntries(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching journal entries:", error);
    } finally {
      setLoading(false);
    }
  };

  function getMoodKey(moodObj: any): string {
    return moodObj ? Object.keys(moodObj)[0] : "happy";
  }

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
        const moodKey = getMoodKey(entry.mood);

        const mood = moodOptions.find(
          (m) => m.id.toLowerCase() === moodKey.toLowerCase()
        );

        const cardStyles = {
          backgroundColor: mood?.bgColor || "#FFFFFF",
          borderColor: mood?.borderColor || "#E5E7EB",
          color: mood?.textColor || "#1F2937",
        };

        const moodBadgeStyles = {
          backgroundColor: "#FFFFFF",
          borderColor: mood?.borderColor || "#D1D5DB",
          color: "#1F2937",
        };

        const dateBadgeStyles = {
          backgroundColor: "#FFFFFF",
          borderColor: "#D1D5DB",
          color: "#4B5563",
        };

        return (
          <div
            key={entry.publicKey.toString()}
            className="rounded-md p-6 space-y-4 shadow-sm border-2 transition-colors"
            style={cardStyles}
          >
            <div className="flex items-center gap-3">
              {/* Date Badge themed by mood */}
              <div
                className="flex items-center gap-2 rounded-md px-4 py-2 border"
                style={{
                  backgroundColor: mood?.textColor || "#3E3B39",
                  borderColor: mood?.borderColor || "#D1D5DB",
                }}
              >
                <Calendar
                  className="w-4 h-4"
                  style={{ color: mood?.bgColor || "#F8F8FF" }}
                />
                <span
                  className="text-sm font-medium"
                  style={{
                    fontFamily: "Kalam, cursive",
                    color: mood?.bgColor || "#F8F8FF",
                  }}
                >
                  {entry.createdAt
                    ? new Date(entry.createdAt * 1000).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )
                    : new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                </span>
              </div>

              {/* Mood Badge themed by mood */}
              <div
                className="flex items-center gap-2 rounded-md px-4 py-2 border"
                style={{
                  backgroundColor: mood?.bgColor,
                  borderColor: mood?.borderColor,
                }}
              >
                <span className="text-sm" style={{ color: mood?.textColor }}>
                  {entry.moodEmoji || mood?.emoji || "😊"}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{
                    fontFamily: "Kalam, cursive",
                    color: mood?.textColor,
                  }}
                >
                  {mood?.label || "Happy"}
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
