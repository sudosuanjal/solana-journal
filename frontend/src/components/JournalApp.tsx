"use client";
import {
  getProgram,
  getAllJournalEntries,
  JournalEntry,
} from "@/utils/program";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
import React, { useEffect, useState } from "react";

const JournalApp = () => {
  const { connected, publicKey, wallet } = useWallet();
  const { connection } = useConnection();
  const [result, setResult] = useState<string | null>("waiting...");
  const [journalEntries, setJournalEntries] = useState<
    (JournalEntry & { publicKey: PublicKey })[]
  >([]);

  useEffect(() => {
    const fetchProgramAndEntries = async () => {
      if (connected && publicKey && wallet) {
        try {
          const program = getProgram(connection, wallet.adapter as any);
          setResult(`Program loaded! ID: ${program.programId.toBase58()}`);

          // Fetch all journal entries for the connected owner
          const entries = await getAllJournalEntries(program, publicKey);
          setJournalEntries(entries);
        } catch (error) {
          setResult("Failed to load program or entries.");
          console.error("Error:", error);
        }
      } else {
        setResult("Please connect your wallet.");
        setJournalEntries([]);
      }
    };

    fetchProgramAndEntries();
  }, [wallet, publicKey, connection, connected]);

  return (
    <div className="p-4">
      <WalletMultiButton />
      <div className="mt-4">JournalApp</div>
      {connected && (
        <p className="text-green-500 mt-2">
          Connected: {publicKey?.toBase58()}
        </p>
      )}
      <p className="text-gray-700">{result}</p>

      {/* Display journal entries */}
      <div className="mt-4">
        <h2 className="text-lg font-bold">Journal Entries</h2>
        {journalEntries.length > 0 ? (
          <ul className="list-disc pl-5">
            {journalEntries.map((entry) => (
              <li key={entry.publicKey.toBase58()} className="mt-2">
                <strong>Title:</strong> {entry.title} <br />
                <strong>Message:</strong> {entry.message} <br />
                <strong>PDA:</strong> {entry.publicKey.toBase58()}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No journal entries found.</p>
        )}
      </div>
    </div>
  );
};

export default JournalApp;
