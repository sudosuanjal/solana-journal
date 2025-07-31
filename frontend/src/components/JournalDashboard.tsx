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
  ];

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
      {journalEntries.map((entry) => (
        <div
          key={entry.id}
          className={`${entry.cardColor} rounded-2xl p-6 space-y-4 shadow-sm border-2 border-gray-200 hover:border-gray-300 transition-colors`}
        >
          {/* Date and Mood Section */}
          <div className="flex items-center gap-3">
            {/* Date */}
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-300">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span
                className="text-sm text-gray-600 font-medium"
                style={{ fontFamily: "Kalam, cursive" }}
              >
                {entry.date}
              </span>
            </div>

            {/* Mood Tag */}
            <div
              className={`flex items-center gap-2 rounded-full px-4 py-2 ${entry.mood.color} border border-current border-opacity-20`}
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

          {/* Title */}
          <h2
            className="text-xl font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "Kalam, cursive" }}
          >
            {entry.title}
          </h2>

          {/* Description */}
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
