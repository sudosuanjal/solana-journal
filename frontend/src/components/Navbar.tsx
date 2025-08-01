"use client";
import { Wallet } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export default function NavBar() {
  const { publicKey, connecting, disconnecting, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const handleWalletClick = () => {
    if (publicKey) {
      // If wallet is connected, disconnect
      disconnect();
    } else {
      // If wallet is not connected, open the wallet modal
      setVisible(true);
    }
  };

  // Format wallet address for display (e.g., "ABCD...WXYZ")
  const displayAddress = publicKey
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : "Connect Wallet";

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
        <button
          onClick={handleWalletClick}
          disabled={connecting || disconnecting}
          className="flex items-center gap-2 px-6 py-2 border-2 border-gray-900 rounded-md bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Wallet className="w-4 h-4 text-gray-900" />
          <span
            className="text-gray-900 font-medium"
            style={{ fontFamily: "Kalam, cursive" }}
          >
            {connecting
              ? "Connecting..."
              : disconnecting
              ? "Disconnecting..."
              : displayAddress}
          </span>
        </button>
      </nav>
    </div>
  );
}
