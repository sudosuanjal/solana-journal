const DashboardPreview: React.FC = () => {
  const entries = [
    {
      date: "Dec 23, 2024",
      title: "First Solana dApp deployed!",
      message:
        "Today was incredible! I finally deployed my first decentralized application on Solana. The feeling of seeing my code running on the blockchain is indescribable...",
      mood: {
        emoji: "😊",
        label: "Awesome",
        bg: "#F8F8FF",
        text: "#3E3B39",
        border: "#CAC9CD",
      },
    },
    {
      date: "Dec 22, 2024",
      title: "Learning Rust for Solana",
      message:
        "Spent the day diving deep into Rust programming. It's challenging but I can see why it's perfect for blockchain development...",
      mood: {
        emoji: "😄",
        label: "Happy",
        bg: "#CAC9CD",
        text: "#3E3B39",
        border: "#9B9A9C",
      },
    },
    {
      date: "Dec 21, 2024",
      title: "Debugging smart contracts",
      message:
        "Hit some roadblocks with my smart contract logic today. Debugging on blockchain is different but I'm learning...",
      mood: {
        emoji: "😐",
        label: "Okay",
        bg: "#9B9A9C",
        text: "#F8F8FF",
        border: "#6D6A6A",
      },
    },
  ];

  return (
    <div className="lg:col-span-2 bg-white border-2 border-gray-900 rounded-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Your Journal History
      </h3>
      <div className="space-y-4">
        {entries.map((entry, i) => (
          <div
            key={i}
            className="rounded-md border-2 p-4 transition-all duration-200 hover:scale-[1.02]"
            style={{
              backgroundColor: entry.mood.bg,
              borderColor: entry.mood.border,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center gap-2 rounded-md px-3 py-1.5 border text-xs"
                  style={{
                    backgroundColor: entry.mood.text,
                    borderColor: entry.mood.border,
                  }}
                >
                  <span
                    className="font-medium"
                    style={{ color: entry.mood.bg }}
                  >
                    {entry.date}
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 rounded-md px-3 py-1.5 border text-xs"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    borderColor: entry.mood.border,
                  }}
                >
                  <span>{entry.mood.emoji}</span>
                  <span
                    className="font-medium"
                    style={{ color: entry.mood.text }}
                  >
                    {entry.mood.label}
                  </span>
                </div>
              </div>
            </div>
            <h4
              className="font-bold text-lg mb-2"
              style={{ color: entry.mood.text }}
            >
              {entry.title}
            </h4>
            <p
              className="text-sm opacity-75"
              style={{ color: entry.mood.text }}
            >
              {entry.message.substring(0, 120)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPreview;
