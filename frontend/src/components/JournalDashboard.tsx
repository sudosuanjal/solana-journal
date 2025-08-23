// JournalDashboard.tsx
"use client";
import { Calendar, CircleX, Pencil, SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useJournalStore } from "@/store/journalStore";
import { useEffect, useState } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { Mood } from "@/utils/program";

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
  const { journalEntries, loading } = useJournalStore();
  const { setEditEntry, clearEditEntry } = useDashboardStore();
  const [decryptedEntries, setDecryptedEntries] = useState<
    { publicKey: string; title: string; message: string }[]
  >([]);

  useEffect(() => {
    const decryptEntries = async () => {
      const decrypted = await Promise.all(
        journalEntries.map(async (entry) => {
          try {
            console.log(
              "Attempting decryption for entry:",
              entry.publicKey.toString()
            );
            console.log("Encrypted Title:", entry.title);
            console.log("Encrypted Message:", entry.message);
            const response = await fetch("/api/decrypt", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                encryptedTitle: entry.title,
                encryptedMessage: entry.message,
              }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              console.error(
                "Decryption failed:",
                errorData.error || "Unknown error"
              );
              throw new Error(errorData.error || "Decryption failed");
            }

            const { decryptedTitle, decryptedMessage } = await response.json();
            console.log("Decrypted successfully:", {
              encryptedTitle: entry.title,
              decryptedTitle,
              encryptedMessage: entry.message,
              decryptedMessage,
            });
            return {
              publicKey: entry.publicKey.toString(),
              title: decryptedTitle,
              message: decryptedMessage,
            };
          } catch (error) {
            console.error(
              "Decryption error for entry:",
              entry.publicKey.toString(),
              error
            );
            return {
              publicKey: entry.publicKey.toString(),
              title: "[Decryption Failed]",
              message: "[Decryption Failed]",
            };
          }
        })
      );
      setDecryptedEntries(decrypted);
    };

    if (journalEntries.length > 0) {
      decryptEntries();
    }
  }, [journalEntries]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-600">Loading journal entries...</div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {journalEntries.length === 0 ? (
          <div className="text-center text-gray-600">
            No journal entries found. Create one to get started!
          </div>
        ) : (
          <Accordion type="multiple" className="w-full space-y-4">
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

              const decryptedEntry = decryptedEntries.find(
                (de) => de.publicKey === entry.publicKey.toString()
              );

              const displayTitle =
                decryptedEntry?.title || "[Decryption Pending]";
              const displayMessage =
                decryptedEntry?.message || "[Decryption Pending]";

              return (
                <AccordionItem
                  key={entry.publicKey.toString()}
                  value={entry.publicKey.toString()}
                  className="rounded-md border-2 shadow-sm transition-colors overflow-hidden"
                  style={cardStyles}
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex flex-col items-start w-full space-y-3">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex items-center gap-2 rounded-md px-3 py-1.5 border text-xs"
                            style={{
                              backgroundColor: mood?.textColor || "#3E3B39",
                              borderColor: mood?.borderColor || "#D1D5DB",
                            }}
                          >
                            <Calendar
                              className="w-3 h-3"
                              style={{ color: mood?.bgColor || "#F8F8FF" }}
                            />
                            <span
                              className="font-medium"
                              style={{
                                color: mood?.bgColor || "#F8F8FF",
                              }}
                            >
                              {entry.createdAt
                                ? new Date(
                                    entry.createdAt * 1000
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                                : new Date().toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                            </span>
                          </div>
                          <div
                            className="flex items-center gap-2 rounded-md px-3 py-1.5 border text-xs"
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.25)",
                              borderColor: mood?.borderColor,
                              backdropFilter: "blur(4px)",
                            }}
                          >
                            <span style={{ color: mood?.textColor }}>
                              {entry.moodEmoji || mood?.emoji || "😊"}
                            </span>
                            <span
                              className="font-medium"
                              style={{
                                color: mood?.textColor,
                              }}
                            >
                              {mood?.label || "Happy"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log(
                                    "Delete entry:",
                                    entry.publicKey.toString()
                                  );
                                }}
                                className="p-2 rounded-md hover:bg-black hover:bg-opacity-10 transition-colors group"
                              >
                                <CircleX
                                  className="w-4 h-4"
                                  color="red"
                                  fill="red"
                                  fillOpacity={0.2}
                                />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete Entry (coming soon!)</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const currentEntry = journalEntries.find(
                                    (item) =>
                                      item.publicKey.toString() ===
                                      entry.publicKey.toString()
                                  )!;
                                  const decryptedEntry = decryptedEntries.find(
                                    (de) =>
                                      de.publicKey ===
                                      entry.publicKey.toString()
                                  )!;
                                  setEditEntry({
                                    publicKey: entry.publicKey.toString(),
                                    title: decryptedEntry.title, // Use decrypted title for display
                                    message: decryptedEntry.message,
                                    mood: getMoodKey(entry.mood) as Mood,
                                  });
                                }}
                                className="p-2 rounded-md hover:bg-black hover:bg-opacity-10 transition-colors group"
                              >
                                <Pencil
                                  className="w-4 h-4"
                                  color="yellow"
                                  fill="yellow"
                                  fillOpacity={0.2}
                                />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit Entry</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log(
                                    "View transaction:",
                                    entry.publicKey.toString()
                                  );
                                }}
                                className="p-2 rounded-md hover:bg-black hover:bg-opacity-10 transition-colors group"
                              >
                                <SquareArrowOutUpRight
                                  className="w-4 h-4"
                                  color="lightblue"
                                  fill="lightblue"
                                  fillOpacity={0.2}
                                />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View Transaction on Chain (coming soon!)</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="text-left w-full">
                        <h2 className="text-lg font-bold leading-tight mb-2">
                          {displayTitle}
                        </h2>
                        <p className="text-sm leading-relaxed opacity-75">
                          {truncateMessage(displayMessage)}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div
                      className="pt-2 border-t border-opacity-20"
                      style={{ borderColor: mood?.borderColor }}
                    >
                      <h3 className="text-sm font-semibold mb-2 opacity-75">
                        Full Message:
                      </h3>
                      <p className="text-sm leading-relaxed">
                        {displayMessage}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </div>
    </TooltipProvider>
  );

  function getMoodKey(moodObj: any): string {
    if (typeof moodObj === "string") {
      return moodObj;
    }
    return moodObj ? Object.keys(moodObj)[0] : "happy";
  }

  function truncateMessage(message: string, maxLength: number = 50): string {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + "...";
  }
}
