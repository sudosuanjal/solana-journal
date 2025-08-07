import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import idl from "../idl/anchor_program.json";
import { AnchorProgram as Journal } from "../types/anchor_program";
import { Program, AnchorProvider, Wallet } from "@coral-xyz/anchor";

const PROGRAM_ID = new PublicKey(idl.address);
export interface JournalEntry {
  owner: PublicKey;
  title: string;
  message: string;
  mood: string;
  createdAt: number;
  updatedAt?: number;
}

export const getProgram = (connection: Connection, wallet: Wallet) => {
  const provider = new AnchorProvider(connection, wallet, {});
  return new Program(idl as Journal, provider);
};

export function getJournalEntryPDA(title: string, owner: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(title), owner.toBuffer()],
    PROGRAM_ID
  );
}

export async function createJournalEntry(
  program: Program<any>,
  title: string,
  message: string,
  mood: string,
  owner: PublicKey
) {
  console.log("mood", mood);

  const [journalEntryPDA] = getJournalEntryPDA(title, owner);

  return await program.methods
    .createJournalEntry(title, message, { [mood.toLowerCase()]: {} })
    .accounts({
      journalEntry: journalEntryPDA,
      owner,
      systemProgram: SystemProgram.programId,
    })
    .rpc();
}

export async function getAllJournalEntries(
  program: Program<any>,
  owner: PublicKey
): Promise<(JournalEntry & { publicKey: PublicKey })[]> {
  try {
    console.log(program.account);

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
