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
      description: "Lorem ipsum dolor sit amet...",
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
      description: "Commodo pellentesque vivamus...",
      cardColor: "bg-yellow-50",
    },
    {
      id: 3,
      date: "28 April 2022",
      mood: {
        label: "Okay",
        emoji: "😐",
        color: "bg-green-100 text-green-700",
      },
      title: "A new day!",
      description: "Another day to reflect.",
      cardColor: "bg-green-50",
    },
    {
      id: 4,
      date: "28 April 2022",
      mood: {
        label: "Okay",
        emoji: "😐",
        color: "bg-green-100 text-green-700",
      },
      title: "A new day!",
      description: "Another day to reflect.",
      cardColor: "bg-green-50",
    },
    {
      id: 5,
      date: "28 April 2022",
      mood: {
        label: "Okay",
        emoji: "😐",
        color: "bg-green-100 text-green-700",
      },
      title: "A new day!",
      description: "Another day to reflect.",
      cardColor: "bg-green-50",
    },
    {
      id: 6,
      date: "28 April 2022",
      mood: {
        label: "Okay",
        emoji: "😐",
        color: "bg-green-100 text-green-700",
      },
      title: "A new day!",
      description: "Another day to reflect.",
      cardColor: "bg-green-50",
    },
    {
      id: 7,
      date: "28 April 2022",
      mood: {
        label: "Okay",
        emoji: "😐",
        color: "bg-green-100 text-green-700",
      },
      title: "A new day!",
      description: "Another day to reflect.",
      cardColor: "bg-green-50",
    },
  ];

  return (
    <div className="space-y-6">
      {journalEntries.map((entry) => (
        <div
          key={entry.id}
          className={`${entry.cardColor} rounded-md p-6 space-y-4 shadow-sm border-2 border-gray-200 hover:border-gray-300 transition-colors`}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white rounded-md px-4 py-2 border border-gray-300">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span
                className="text-sm text-gray-600 font-medium"
                style={{ fontFamily: "Kalam, cursive" }}
              >
                {entry.date}
              </span>
            </div>
            <div
              className={`flex items-center gap-2 rounded-md px-4 py-2 ${entry.mood.color} border border-current border-opacity-20`}
            >
              <span className="text-sm">{entry.mood.emoji}</span>
              <span
                className="text-sm font-medium"
                style={{ fontFamily: "Kalam, cursive" }}
              >
                {entry.mood.label}
              </span>
            </div>
          </div>
          <h2
            className="text-xl font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "Kalam, cursive" }}
          >
            {entry.title}
          </h2>
          <p
            className="text-gray-600 text-sm leading-relaxed"
            style={{ fontFamily: "Kalam, cursive" }}
          >
            {entry.description}
          </p>
        </div>
      ))}
    </div>
  );
}
