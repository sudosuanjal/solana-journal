"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Wallet, Star, Menu } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export default function NavBar() {
  const { publicKey, connecting, disconnecting, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [open, setOpen] = useState(false);

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
    <header className="fixed top-0 left-0 z-50 w-full bg-transparent p-4">
      <div className="w-full">
        <nav className="w-full flex items-center justify-between rounded-md border-2 border-gray-900 bg-white px-5 sm:px-7 md:px-8 py-3.5 md:py-4 shadow-sm">
          {/* Brand */}
          <div className="flex min-w-0 items-center gap-2.5">
            <Link
              href="/"
              className="flex items-center gap-2.5 shrink-0"
              aria-label="Go to homepage"
            >
              <Image
                src="/journllogo.png"
                alt="Journl logo"
                width={40} // slightly bigger
                height={40}
                priority
              />
              <span className="text-[1.35rem] md:text-[1.6rem] font-bold text-gray-900">
                Journl
              </span>
            </Link>
            <p className="ml-2 hidden md:block truncate text-[0.95rem] md:text-base text-gray-600">
              {"from awesome to terrible, your moods now have a ledger"}
            </p>
          </div>

          {/* Desktop/Tablet actions */}
          <div className="hidden md:flex items-center gap-3.5">
            <Button
              asChild
              variant="outline"
              className="border-2 border-gray-900 bg-white hover:bg-gray-50 px-4 py-2 text-[0.95rem]"
            >
              <a
                href="https://github.com/sudosuanjal/solana-journal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Star Journl on GitHub"
              >
                <Star
                  className="mr-2 h-4.5 w-4.5 text-yellow-500"
                  fill="#eab308"
                />
                <span className="text-gray-900 font-medium">
                  Star on GitHub
                </span>
              </a>
            </Button>

            <Button
              onClick={handleWalletClick}
              disabled={connecting || disconnecting}
              aria-label={publicKey ? "Disconnect wallet" : "Connect wallet"}
              aria-disabled={connecting || disconnecting}
              variant="outline"
              className="border-2 border-gray-900 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-[0.95rem]"
            >
              <Wallet className="mr-2 h-4.5 w-4.5 text-green-600" />
              <span className="text-gray-900 font-medium">
                {connecting
                  ? "Connecting..."
                  : disconnecting
                  ? "Disconnecting..."
                  : displayAddress}
              </span>
            </Button>
          </div>
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-2 border-gray-900 bg-white"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Image
                      src="/journllogo.png"
                      alt="Journl logo"
                      width={24}
                      height={24}
                    />
                    <span>Journl</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 grid gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className="justify-start border-2 border-gray-900 bg-white"
                  >
                    <a
                      href="https://github.com/sudosuanjal/solana-journal"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                    >
                      <Star
                        className="mr-2 h-4 w-4 text-yellow-500"
                        fill="#eab308"
                      />
                      <span>Star on GitHub</span>
                    </a>
                  </Button>

                  <Button
                    onClick={() => {
                      setOpen(false);
                      void handleWalletClick();
                    }}
                    disabled={connecting || disconnecting}
                    variant="outline"
                    className="justify-start border-2 border-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Wallet className="mr-2 h-4 w-4 text-green-600" />
                    <span>
                      {connecting
                        ? "Connecting..."
                        : disconnecting
                        ? "Disconnecting..."
                        : displayAddress}
                    </span>
                  </Button>

                  <p className="mt-2 text-sm text-gray-600">
                    {"from awesome to terrible, your moods now have a ledger"}
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
