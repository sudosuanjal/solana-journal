import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import idl from "../idl/anchor_program.json";
import { Idl, Program, AnchorProvider, Wallet } from "@coral-xyz/anchor";

// Define the program ID from the IDL
const PROGRAM_ID = new PublicKey(idl.address);

// Define the Mood type based on the Anchor program's enum
export type Mood = "awesome" | "happy" | "okay" | "bad" | "terrible";

// Define the JournalEntry interface to match the Anchor program's account structure
export interface JournalEntry {
  owner: PublicKey;
  title: string;
  message: string;
  mood: Mood;
  createdAt: number;
  updatedAt?: number;
}

// Type the IDL explicitly
type JournalIDL = typeof idl & Idl;

export const getProgram = (connection: Connection, wallet: Wallet) => {
  try {
    const provider = new AnchorProvider(connection, wallet, {});
    return new Program<JournalIDL>(idl as JournalIDL, provider);
  } catch (error) {
    console.error("Error initializing program:", error);
    throw new Error("Failed to initialize Anchor program");
  }
};

export function getJournalEntryPDA(title: string, owner: PublicKey) {
  try {
    return PublicKey.findProgramAddressSync(
      [Buffer.from(title), owner.toBuffer()],
      PROGRAM_ID
    );
  } catch (error) {
    console.error("Error generating PDA:", error);
    throw new Error("Failed to generate journal entry PDA");
  }
}

export async function createJournalEntry(
  program: Program<JournalIDL>,
  title: string,
  message: string,
  mood: Mood,
  owner: PublicKey
) {
  try {
    console.log("Creating journal entry with mood:", mood);
    const [journalEntryPDA] = getJournalEntryPDA(title, owner);

    const txSignature = await program.methods
      .createJournalEntry(title, message, { [mood]: {} })
      .accounts({
        journalEntry: journalEntryPDA,
        owner,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log("Transaction signature:", txSignature);
    return txSignature;
  } catch (error) {
    console.error("Error creating journal entry:", error);
    throw error;
  }
}

export async function getAllJournalEntries(
  program: Program<JournalIDL>,
  owner: PublicKey
): Promise<(JournalEntry & { publicKey: PublicKey })[]> {
  try {
    console.log("Fetching journal entries for owner:", owner.toBase58());
    const accounts = await program.account["journalEntryState"].all([
      {
        memcmp: {
          offset: 8, // Adjust if your account structure has a different offset for owner
          bytes: owner.toBase58(),
        },
      },
    ]);

    console.log("Fetched accounts:", accounts);
    return accounts.map((account) => ({
      ...account.account,
      publicKey: account.publicKey,
    }));
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    return [];
  }
}
