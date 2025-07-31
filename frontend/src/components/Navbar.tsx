import { Wallet } from "lucide-react";

export default function NavBar() {
  return (
    <div className="w-full p-4">
      <nav className="w-full bg-white border-2 border-gray-900 rounded-2xl px-8 py-4 flex items-center justify-between">
        {/* Logo and Tagline Section */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <h1
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: "Kalam, cursive" }}
          >
            ChainDiary
          </h1>

          {/* Tagline */}
          <p
            className="text-gray-600 text-base hidden md:block"
            style={{ fontFamily: "Kalam, cursive" }}
          >
            From awesome to terrible, your moods now have a ledger
          </p>
        </div>

        {/* Wallet Button */}
        <button className="flex items-center gap-2 px-6 py-2 border-2 border-gray-900 rounded-xl bg-white hover:bg-gray-50 transition-colors">
          <Wallet className="w-4 h-4 text-gray-900" />
          <span
            className="text-gray-900 font-medium"
            style={{ fontFamily: "Kalam, cursive" }}
          >
            wallet
          </span>
        </button>
      </nav>
    </div>
  );
}
