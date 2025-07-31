import { Wallet } from "lucide-react";

export default function NavBar() {
  return (
    <div className="w-full p-4 fixed top-0 left-0 z-10 bg-white">
      <nav className="w-full bg-white border-2 border-gray-900 rounded-md px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: "Kalam, cursive" }}
          >
            ChainDiary
          </h1>
          <p
            className="text-gray-600 text-base hidden md:block"
            style={{ fontFamily: "Kalam, cursive" }}
          >
            From awesome to terrible, your moods now have a ledger
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 border-2 border-gray-900 rounded-md bg-white hover:bg-gray-50 transition-colors">
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
