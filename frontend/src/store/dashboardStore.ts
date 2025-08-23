// store/dashboardStore.ts
import { create } from "zustand";

interface EditEntry {
  publicKey: string;
  title: string;
  message: string;
  mood: string;
}

interface DashboardState {
  editEntry: EditEntry | null;
  setEditEntry: (entry: EditEntry) => void;
  clearEditEntry: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  editEntry: null,
  setEditEntry: (entry) => set({ editEntry: entry }),
  clearEditEntry: () => set({ editEntry: null }),
}));
