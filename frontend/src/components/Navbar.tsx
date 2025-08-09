"use client";
import { Wallet, Star } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

export default function NavBar() {
  const { publicKey, connecting, disconnecting, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const handleWalletClick = async () => {
    try {
      if (publicKey) {
        await disconnect();
        toast.success("Wallet disconnected successfully");
      } else {
        setVisible(true);
      }
    } catch (error) {
      toast.error("Failed to disconnect wallet");
      console.error("Wallet disconnection error:", error);
    }
  };

  const displayAddress = publicKey
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : "Connect Wallet";

  return (
    <div className="w-full p-4 fixed top-0 left-0 z-10">
      <nav className="w-full bg-white border-2 border-gray-900 rounded-md px-8 py-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/journllogo.png"
              alt="Journl logo"
              width={35}
              height={35}
            />
            <h1 className="text-2xl font-bold text-gray-900">Journl</h1>
          </Link>
          <p className="text-gray-600 text-base hidden md:block">
            from awesome to terrible, your moods now have a ledger
          </p>
        </div>

        {/* Right section with GitHub and Wallet */}
        <div className="flex items-center gap-4">
          {/* GitHub Star Button */}
          <a
            href="https://github.com/sudosuanjal/solana-journal"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2 border-2 border-gray-900 rounded-md bg-white hover:bg-gray-50 transition-colors"
            aria-label="Star Journl on GitHub"
          >
            <Star fill="yellow" className="w-4 h-4 text-yellow-500" />
            <span className="text-gray-900 font-medium">Star on GitHub</span>
          </a>

          {/* Wallet Button */}
          <button
            onClick={handleWalletClick}
            disabled={connecting || disconnecting}
            aria-label={publicKey ? "Disconnect wallet" : "Connect wallet"}
            aria-disabled={connecting || disconnecting}
            className="flex items-center gap-2 px-6 py-2 border-2 border-gray-900 rounded-md bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wallet className="w-4 h-4 text-green-600" fill="green" />
            <span className="text-gray-900 font-medium">
              {connecting
                ? "Connecting..."
                : disconnecting
                ? "Disconnecting..."
                : displayAddress}
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}
