"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const moodOptions = [
  {
    id: "awesome",
    label: "Awesome",
    emoji: "😊",
    bgColor: "bg-orange-100",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
  },
  {
    id: "happy",
    label: "Happy",
    emoji: "😄",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-200",
  },
  {
    id: "okay",
    label: "Okay",
    emoji: "😐",
    bgColor: "bg-green-100",
    textColor: "text-green-700",
    borderColor: "border-green-200",
  },
  {
    id: "bad",
    label: "Bad",
    emoji: "😢",
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
  },
  {
    id: "terrible",
    label: "Terrible",
    emoji: "😭",
    bgColor: "bg-purple-100",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
  },
];

export default function JournalEntryForm() {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="max-w-sm mx-auto bg-gray-50 p-6 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-2xl font-bold text-gray-800 leading-tight"
          style={{ fontFamily: "Kalam, cursive" }}
        >
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
            className={`${
              index === 0 ? "col-span-1 row-span-2" : "col-span-1"
            } ${mood.bgColor} ${
              mood.borderColor
            } rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:scale-105 border-2 ${
              selectedMood === mood.id
                ? "ring-2 ring-gray-900 ring-offset-2"
                : ""
            }`}
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
                style={{ fontFamily: "Kalam, cursive" }}
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
            className="w-full bg-white rounded-xl p-4 text-gray-800 outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-500 border-2 border-gray-200 focus:border-gray-900 transition-colors"
            placeholder="Enter title..."
            style={{ fontFamily: "Kalam, cursive" }}
          />
        </div>
        <div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-white rounded-xl p-4 text-gray-800 outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-500 resize-none border-2 border-gray-200 focus:border-gray-900 transition-colors"
            placeholder="Enter your message..."
            rows={4}
            style={{ fontFamily: "Kalam, cursive" }}
          />
        </div>
      </div>

      {/* Action Button */}
      <Button
        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 rounded-2xl text-base border-2 border-gray-900 transition-colors"
        size="lg"
        style={{ fontFamily: "Kalam, cursive" }}
      >
        Submit Journal
      </Button>
    </div>
  );
}
