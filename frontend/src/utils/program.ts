import { Connection, PublicKey } from "@solana/web3.js";
import idl from "../idl/anchor_program.json";
import { AnchorProgram as Journal } from "../types/anchor_program";
import { Program, AnchorProvider, Wallet } from "@coral-xyz/anchor";

const programId = new PublicKey(idl.address);
export interface JournalEntry {
  owner: PublicKey;
  title: string;
  message: string;
}

export const getProgram = (connection: Connection, wallet: Wallet) => {
  const provider = new AnchorProvider(connection, wallet, {});
  return new Program(idl as Journal, provider);
};

export async function getAllJournalEntries(
  program: Program<any>,
  owner: PublicKey
): Promise<(JournalEntry & { publicKey: PublicKey })[]> {
  try {
    const accounts = await program.account.journalEntryState.all([
      {
        memcmp: {
          offset: 8,
          bytes: owner.toBase58(),
        },
      },
    ]);

    return accounts.map((account: any) => ({
      ...(account.account as JournalEntry),
      publicKey: account.publicKey,
    }));
  } catch (error) {
    console.log("Error fetching journal entries: ", error);
    return [];
  }
}
