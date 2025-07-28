"use client";

import React, { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { getProgram, getAllJournalEntries } from "../../utils/program";

const WalletMultiButtonDynamic = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

export default function Page() {
  const { connection } = useConnection();
  const { publicKey, wallet } = useWallet();
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEntries = async () => {
    if (!publicKey || !wallet?.adapter) return;
    setLoading(true);

    try {
      const program = getProgram(connection, wallet.adapter as any);
      const data = await getAllJournalEntries(program, publicKey);
      console.log("Fetched Entries:", data);
      setEntries(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (publicKey && wallet) {
      fetchEntries();
    }
  }, [publicKey, wallet]);

  return (
    <div className="min-h-screen p-8">
      <div className="mb-6">
        <WalletMultiButtonDynamic />
      </div>

      <h1 className="text-2xl font-bold mb-4">
        📒 Test: Get All Journal Entries
      </h1>

      {loading && <p>Loading entries...</p>}
      {!loading && entries.length === 0 && <p>No journal entries found.</p>}

      <ul className="mt-4 space-y-4">
        {entries.map((entry, i) => (
          <li key={entry.publicKey.toString()} className=" p-4 shadow rounded">
            <h2 className="font-semibold text-lg">{entry.title}</h2>
            <p className="text-sm text-gray-700">{entry.message}</p>
            <code className="text-xs text-gray-400 block mt-2">
              {entry.publicKey.toString()}
            </code>
          </li>
        ))}
      </ul>
    </div>
  );
}
