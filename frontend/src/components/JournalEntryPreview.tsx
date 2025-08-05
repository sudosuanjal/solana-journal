const JournalEntryPreview: React.FC = () => {
  const moods = [
    {
      emoji: "😄",
      label: "Happy",
      bg: "#CAC9CD",
      text: "#3E3B39",
      border: "#9B9A9C",
    },
    {
      emoji: "😐",
      label: "Okay",
      bg: "#9B9A9C",
      text: "#F8F8FF",
      border: "#6D6A6A",
    },
    {
      emoji: "😢",
      label: "Bad",
      bg: "#6D6A6A",
      text: "#F8F8FF",
      border: "#3E3B39",
    },
    {
      emoji: "😭",
      label: "Terrible",
      bg: "#3E3B39",
      text: "#F8F8FF",
      border: "#6D6A6A",
    },
  ];

  return (
    <div className="lg:col-span-1 bg-white border-2 border-gray-900 rounded-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Write Your Entry</h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div
          className="rounded-md p-4 border-2 flex items-center justify-center row-span-2 cursor-pointer hover:scale-105 transition-all duration-200"
          style={{ backgroundColor: "#F8F8FF", borderColor: "#CAC9CD" }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl mb-4">😊</div>
            <span
              className="text-base font-medium"
              style={{ color: "#3E3B39" }}
            >
              Awesome
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {moods.map((mood, i) => (
            <div
              key={i}
              className="rounded-md p-3 border-2 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200"
              style={{ backgroundColor: mood.bg, borderColor: mood.border }}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-2xl mb-1">{mood.emoji}</div>
                <span
                  className="text-xs font-medium"
                  style={{ color: mood.text }}
                >
                  {mood.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Enter title..."
          className="w-full bg-white rounded-md p-4 text-gray-800 outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-500 border-2 border-gray-200 focus:border-gray-900 transition-colors"
          disabled
        />
        <textarea
          placeholder="Today was amazing! Finally deployed my first dApp on Solana..."
          className="w-full bg-white rounded-md p-4 text-gray-800 outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-500 resize-none border-2 border-gray-200 focus:border-gray-900 transition-colors h-24"
          disabled
        />
      </div>

      <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 rounded-md text-base border-2 border-gray-900 transition-colors">
        Submit Journal
      </button>
    </div>
  );
};

export default JournalEntryPreview;
