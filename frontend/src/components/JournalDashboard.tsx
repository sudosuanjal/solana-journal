"use client";

import { Calendar } from "lucide-react";

export default function JournalDashboard() {
  const journalEntries = [
    {
      id: 1,
      date: "02 May 2022",
      mood: {
        label: "Awesome",
        emoji: "😊",
        color: "bg-orange-100 text-orange-700",
      },
      title: "What are you grateful for?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id lobortis dui facilisi.",
      cardColor: "bg-orange-50",
    },
    {
      id: 2,
      date: "29 April 2022",
      mood: {
        label: "Happy",
        emoji: "😊",
        color: "bg-yellow-100 text-yellow-700",
      },
      title: "What one thing that drove your action?",
      description:
        "Commodo pellentesque vivamus faucibus natoque enim elementum. Elementum diam amet consequat, metus congue sed ex. Vitae et",
      cardColor: "bg-yellow-50",
    },
    {
      id: 3,
      date: "29 April 2022",
      mood: {
        label: "Happy",
        emoji: "😊",
        color: "bg-yellow-100 text-yellow-700",
      },
      title: "What one thing that drove your action?",
      description:
        "Commodo pellentesque vivamus faucibus natoque enim elementum. Elementum diam amet consequat, metus congue sed ex. Vitae et",
      cardColor: "bg-yellow-50",
    },
    {
      id: 4,
      date: "29 April 2022",
      mood: {
        label: "Happy",
        emoji: "😊",
        color: "bg-yellow-100 text-yellow-700",
      },
      title: "What one thing that drove your action?",
      description:
        "Commodo pellentesque vivamus faucibus natoque enim elementum. Elementum diam amet consequat, metus congue sed ex. Vitae et",
      cardColor: "bg-yellow-50",
    },
    {
      id: 5,
      date: "29 April 2022",
      mood: {
        label: "Happy",
        emoji: "😊",
        color: "bg-yellow-100 text-yellow-700",
      },
      title: "What one thing that drove your action?",
      description:
        "Commodo pellentesque vivamus faucibus natoque enim elementum. Elementum diam amet consequat, metus congue sed ex. Vitae et",
      cardColor: "bg-yellow-50",
    },
  ];

  return (
    <div className="max-w-md mx-auto p-6 space-y-4 bg-white min-h-screen">
      {journalEntries.map((entry) => (
        <div
          key={entry.id}
          className={`${entry.cardColor} rounded-2xl p-6 space-y-4 shadow-sm border border-gray-100`}
        >
          {/* Date and Mood Section */}
          <div className="flex items-center gap-3">
            {/* Date */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 font-medium">
                {entry.date}
              </span>
            </div>

            {/* Mood Tag */}
            <div
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 ${entry.mood.color}`}
            >
              <span className="text-sm">{entry.mood.emoji}</span>
              <span className="text-sm font-medium">{entry.mood.label}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 leading-tight">
            {entry.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {entry.description}
          </p>
        </div>
      ))}
    </div>
  );
}
