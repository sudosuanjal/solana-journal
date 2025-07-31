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
    <div className="space-y-6 flex flex-col h-full">
      <div className="grid grid-cols-2 gap-4">
        {/* Awesome mood on the left */}
        <div
          key={moodOptions[0].id}
          className={`${moodOptions[0].bgColor} ${
            moodOptions[0].borderColor
          } rounded-md p-4 cursor-pointer transition-all duration-200 hover:scale-105 border-2 flex items-center justify-center row-span-2 ${
            selectedMood === moodOptions[0].id
              ? "ring-2 ring-gray-900 ring-offset-2"
              : ""
          }`}
          onClick={() => setSelectedMood(moodOptions[0].id)}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl mb-4">{moodOptions[0].emoji}</div>
            <span
              className={`text-base font-medium ${moodOptions[0].textColor}`}
              style={{ fontFamily: "Kalam, cursive" }}
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
              className={`${mood.bgColor} ${
                mood.borderColor
              } rounded-md p-4 cursor-pointer transition-all duration-200 hover:scale-105 border-2 flex items-center justify-center ${
                selectedMood === mood.id
                  ? "ring-2 ring-gray-900 ring-offset-2"
                  : ""
              }`}
              onClick={() => setSelectedMood(mood.id)}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <span
                  className={`text-sm font-medium ${mood.textColor}`}
                  style={{ fontFamily: "Kalam, cursive" }}
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
          style={{ fontFamily: "Kalam, cursive" }}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-white rounded-md p-4 text-gray-800 outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-500 resize-none border-2 border-gray-200 focus:border-gray-900 transition-colors flex-grow"
          placeholder="Enter your message..."
          style={{ fontFamily: "Kalam, cursive" }}
        />
      </div>
      <Button
        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 rounded-md text-base border-2 border-gray-900 transition-colors"
        size="lg"
        style={{ fontFamily: "Kalam, cursive" }}
      >
        Submit Journal
      </Button>
    </div>
  );
}
