import { create } from "zustand";
import { Connection, PublicKey } from "@solana/web3.js";
import { getAllJournalEntries, getProgram } from "@/utils/program";

interface JournalEntry {
  owner: PublicKey;
  title: string;
  message: string;
  mood: any; // Replace with proper type if possible
  createdAt: number;
  updatedAt?: number;
  publicKey: PublicKey;
  moodEmoji?: string;
}

interface JournalState {
  journalEntries: JournalEntry[];
  loading: boolean;
  fetchEntries: (
    connection: Connection,
    publicKey: PublicKey | null,
    wallet: any
  ) => Promise<void>;
  addEntry: (entry: JournalEntry) => void;
}

export const useJournalStore = create<JournalState>((set) => ({
  journalEntries: [],
  loading: false,
  fetchEntries: async (
    connection: Connection,
    publicKey: PublicKey | null,
    wallet: any
  ) => {
    if (!publicKey || !wallet?.adapter) {
      set({ journalEntries: [], loading: false });
      return;
    }
    set({ loading: true });

    try {
      const program = await getProgram(connection, wallet.adapter as any);
      const data = await getAllJournalEntries(program, publicKey);
      const sortedData = data.sort((a, b) => {
        const timeA = a.createdAt ?? 0;
        const timeB = b.createdAt ?? 0;
        return timeB - timeA;
      });
      set({ journalEntries: sortedData });
    } catch (error) {
      console.error("Error fetching journal entries:", error);
      set({ journalEntries: [], loading: false });
    } finally {
      set({ loading: false });
    }
  },
  addEntry: (entry: JournalEntry) => {
    set((state) => ({
      journalEntries: [entry, ...state.journalEntries].sort((a, b) => {
        const timeA = a.createdAt ?? 0;
        const timeB = b.createdAt ?? 0;
        return timeB - timeA;
      }),
    }));
  },
}));
