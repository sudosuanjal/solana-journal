"use client";

import JournalDashboard from "@/components/JournalDashboard";
import JournalEntryForm from "@/components/JournalEntryForm";
import NavBar from "@/components/Navbar";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { useJournalStore } from "@/store/journalStore";

export default function DashboardPage() {
  const { connection } = useConnection();
  const { wallet, publicKey } = useWallet();
  const fetchEntries = useJournalStore((state) => state.fetchEntries);

  useEffect(() => {
    if (publicKey && wallet) {
      fetchEntries(connection, publicKey, wallet);
    }
  }, [publicKey, wallet, connection, fetchEntries]);

  return (
    <div className="h-screen bg-[#FFF9E5] flex flex-col">
      <NavBar />
      <main
        className="flex-grow p-4 pt-16 overflow-hidden"
        style={{ marginTop: "64px" }}
      >
        <div className="grid grid-cols-3 gap-4 h-full">
          <div className="col-span-2 rounded-md border-2 border-gray-900 p-6 overflow-y-auto h-full bg-white">
            <JournalDashboard />
          </div>
          <div className="col-span-1 rounded-md border-2 border-gray-900 p-6 overflow-y-auto h-full bg-white">
            <JournalEntryForm />
          </div>
        </div>
      </main>
    </div>
  );
}
