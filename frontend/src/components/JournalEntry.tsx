"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const moodOptions = [
  {
    id: "awesome",
    label: "Awesome",
    emoji: "😊",
    bgColor: "bg-red-200",
    textColor: "text-red-400",
  },
  {
    id: "happy",
    label: "Happy",
    emoji: "😄",
    bgColor: "bg-yellow-200",
    textColor: "text-yellow-500",
  },
  {
    id: "okay",
    label: "Okay",
    emoji: "😐",
    bgColor: "bg-green-200",
    textColor: "text-green-500",
  },
  {
    id: "bad",
    label: "Bad",
    emoji: "😢",
    bgColor: "bg-emerald-200",
    textColor: "text-emerald-400",
  },
  {
    id: "terrible",
    label: "Terrible",
    emoji: "😭",
    bgColor: "bg-blue-200",
    textColor: "text-blue-400",
  },
];

export default function JournalEntry() {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="max-w-sm mx-auto bg-white p-6 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 leading-tight">
          How are you
          <br />
          feeling today?
        </h1>
      </div>

      {/* Mood Selection Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {moodOptions.map((mood, index) => (
          <div
            key={mood.id}
            className={`
              ${index === 0 ? "col-span-1 row-span-2" : "col-span-1"}
              ${
                mood.bgColor
              } rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:scale-105
              ${selectedMood === mood.id ? "ring-2 ring-gray-400" : ""}
            `}
            onClick={() => setSelectedMood(mood.id)}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div
                className={`text-3xl mb-2 ${
                  index === 0 ? "text-4xl mb-4" : ""
                }`}
              >
                {mood.emoji}
              </div>
              <span
                className={`text-sm font-medium ${mood.textColor} ${
                  index === 0 ? "text-base" : ""
                }`}
              >
                {mood.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Fields */}
      <div className="mb-8 space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-50 rounded-xl p-4 text-gray-800 outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-500"
            placeholder="Enter title..."
          />
        </div>
        <div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-gray-50 rounded-xl p-4 text-gray-800 outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-500 resize-none"
            placeholder="Enter your message..."
            rows={4}
          />
        </div>
      </div>

      {/* Action Button */}
      <Button
        className="w-full bg-green-400 hover:bg-green-500 text-white font-medium py-4 rounded-2xl text-base"
        size="lg"
      >
        Submit Journal
      </Button>
    </div>
  );
}
