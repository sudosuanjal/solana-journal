"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createJournalEntry, getProgram } from "../../utils/program";
import { Keypair } from "@solana/web3.js";

const CreateJournalPage = () => {
  const { connection } = useConnection();
  const { publicKey, signTransaction, signAllTransactions, connected, wallet } =
    useWallet();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>("waiting...");

  useEffect(() => {
    const fetchProgram = async () => {
      if (connected && publicKey && signTransaction && signAllTransactions) {
        try {
          const walletAdapter = {
            publicKey,
            signTransaction,
            signAllTransactions,
          };

          const program = getProgram(connection, wallet?.adapter as any);
          setResult(`Program loaded! ID: ${program.programId.toBase58()}`);
        } catch (error) {
          console.error("Failed to load program:", error);
          setResult("Failed to load program.");
        }
      } else {
        setResult("Please connect your wallet.");
      }
    };

    fetchProgram();
  }, [connected, publicKey, signTransaction, signAllTransactions, connection]);

  const handleCreate = useCallback(async () => {
    if (!publicKey || !connected || !signTransaction || !signAllTransactions) {
      setStatus("Wallet not connected or missing required methods");
      return;
    }

    if (!title.trim() || !message.trim()) {
      setStatus("Please fill in both title and message");
      return;
    }

    setIsLoading(true);
    setStatus("Creating journal entry...");

    try {
      const walletAdapter = {
        publicKey,
        signTransaction,
        signAllTransactions,
      };

      const program = getProgram(connection, walletAdapter as any);

      const signature = await createJournalEntry(
        program,
        title,
        message,
        publicKey
      );
      console.log("wallet: ", wallet?.adapter);

      setStatus(
        `Journal entry created successfully! Transaction: ${signature}`
      );
      setTitle("");
      setMessage("");
    } catch (err: any) {
      console.error("Error creating journal entry:", err);
      setStatus(`Error: ${err?.message || "Failed to create journal entry"}`);
    } finally {
      setIsLoading(false);
    }
  }, [
    connection,
    publicKey,
    signTransaction,
    signAllTransactions,
    title,
    message,
    connected,
  ]);

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <div className="mt-4 text-lg font-semibold">JournalApp</div>

      {connected && (
        <p className="text-green-500 mt-2">
          Connected: {publicKey?.toBase58()}
        </p>
      )}

      <h2 className="text-xl font-bold">Create Journal Entry</h2>

      <input
        type="text"
        className="border p-2 w-full rounded text-black"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
      />

      <textarea
        className="border p-2 w-full rounded text-black h-32"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isLoading}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleCreate}
        disabled={!connected || isLoading || !title.trim() || !message.trim()}
      >
        {isLoading ? "Creating..." : "Submit Entry"}
      </button>

      {status && (
        <p
          className={`text-sm ${
            status.includes("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {status}
        </p>
      )}

      {result && (
        <p className="text-xs text-gray-500 mt-2">
          <strong>Program Status:</strong> {result}
        </p>
      )}
    </div>
  );
};

export default CreateJournalPage;
