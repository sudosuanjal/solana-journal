"use client";
import { getProgram } from "@/utils/program";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useEffect, useState } from "react";

const JournalApp = () => {
  const { connected, publicKey, wallet } = useWallet();
  const connecttion = useConnection();
  const [result, setResult] = useState<string | null>("waiting...");

  useEffect(() => {
    const fetchProgram = async () => {
      if (connected && publicKey && wallet) {
        const { connection } = connecttion;
        const program = getProgram(connection, wallet.adapter as any);
        try {
          setResult(`Program loaded! ID: ${program.programId.toBase58()}`);
        } catch (error) {
          setResult("Failed to load program.");
        }
      } else {
        setResult("Please connect your wallet.");
      }
    };

    fetchProgram();
  }, [wallet, publicKey, connecttion]);

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
    </div>
  );
};

export default JournalApp;
