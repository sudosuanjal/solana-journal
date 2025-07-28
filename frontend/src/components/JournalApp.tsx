"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React from "react";

const JournalApp = () => {
  const { connected, publicKey } = useWallet();

  return (
    <div className="p-4">
      <WalletMultiButton />
      <div className="mt-4">JournalApp</div>
      {connected && (
        <p className="text-green-500 mt-2">
          Connected: {publicKey?.toBase58()}
        </p>
      )}
    </div>
  );
};

export default JournalApp;
