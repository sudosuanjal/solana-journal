// program.ts
import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import idl from "../idl/anchor_program.json";
import { Idl, Program, AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { sha256 } from "js-sha256";

const PROGRAM_ID = new PublicKey(idl.address);

export type Mood = "awesome" | "happy" | "okay" | "bad" | "terrible";

export interface JournalEntry {
  owner: PublicKey;
  title: string; // Encrypted
  message: string; // Encrypted
  mood: Mood;
  createdAt: number;
  updatedAt?: number;
}

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

export function getJournalEntryPDA(
  title: string,
  owner: PublicKey
): [PublicKey, number] {
  try {
    const titleBytes = new TextEncoder().encode(title);
    if (titleBytes.length > 100) {
      throw new Error("Title exceeds 100 bytes");
    }
    console.log("printing titleBytes from program.ts", titleBytes);

    const titleHash = Buffer.from(sha256(titleBytes), "hex");
    console.log("title:", title);
    console.log("titleBytes length:", titleBytes.length);
    console.log("titleHash:", titleHash.toString("hex"));
    const [pda, bump] = PublicKey.findProgramAddressSync(
      [titleHash, owner.toBuffer()],
      PROGRAM_ID
    );
    console.log("PDA:", pda.toBase58());
    console.log("bump:", bump);
    return [pda, bump];
  } catch (error) {
    console.error("Error generating PDA:", error);
    throw new Error(`Failed to generate journal entry PDA: ${error.message}`);
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
    const titleBytes = new TextEncoder().encode(title);
    if (titleBytes.length > 100) {
      throw new Error("Title exceeds 100 bytes");
    }
    const messageBytes = new TextEncoder().encode(message);
    if (messageBytes.length > 840) {
      throw new Error("Message exceeds 840 bytes");
    }
    const titleHash = Buffer.from(sha256(titleBytes), "hex");
    const [journalEntryPDA] = getJournalEntryPDA(title, owner);

    const txSignature = await program.methods
      .createJournalEntry(title, titleHash, message, { [mood]: {} })
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

export async function updateJournalEntry(
  program: Program<JournalIDL>,
  titleHash: Buffer,
  message: string,
  mood: Mood,
  owner: PublicKey
) {
  try {
    console.log("Updating journal entry with mood:", mood);
    console.log("Update titleHash:", titleHash.toString("hex"));
    const messageBytes = new TextEncoder().encode(message);
    if (messageBytes.length > 840) {
      throw new Error("Message exceeds 840 bytes");
    }
    const [journalEntryPDA] = PublicKey.findProgramAddressSync(
      [titleHash, owner.toBuffer()],
      PROGRAM_ID
    );
    console.log("JournalEntryPDA:", journalEntryPDA.toBase58());

    const txSignature = await program.methods
      .updateJournalEntry(titleHash, message, { [mood]: {} })
      .accounts({
        journalEntry: journalEntryPDA,
        owner,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log("Transaction signature:", txSignature);
    return txSignature;
  } catch (error) {
    console.error("Error updating journal entry:", error);
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
          offset: 8,
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
