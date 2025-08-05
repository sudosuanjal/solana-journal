"use client";
import { getAllJournalEntries, getProgram } from "@/utils/program";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Calendar, CircleX, Pencil, SquareArrowOutUpRight } from "lucide-react";
import { useEffect, useState } from "react";
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

  function truncateMessage(message: string, maxLength: number = 50): string {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + "...";
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
    <TooltipProvider>
      <div className="space-y-4">
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
                        {/* Date Badge */}
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

                        {/* Mood Badge */}
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

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle delete action
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
                            <p>Delete Entry</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle update action
                                console.log(
                                  "Update entry:",
                                  entry.publicKey.toString()
                                );
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
                                // Handle view transaction action
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
                            <p>View Transaction on Chain</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="text-left w-full">
                      <h2 className="text-lg font-bold leading-tight mb-2">
                        {entry.title}
                      </h2>
                      <p className="text-sm leading-relaxed opacity-75">
                        {truncateMessage(entry.message)}
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
                    <p className="text-sm leading-relaxed">{entry.message}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </TooltipProvider>
  );
}
