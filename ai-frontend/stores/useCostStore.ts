import { create } from "zustand";
import { Cost, fetchCosts } from "@/lib/api";

interface CostState {
  costs: Cost[];
  loading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
}

export const useCostStore = create<CostState>((set) => ({
  costs: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCosts();
      set({ costs: data });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch costs" });
    } finally {
      set({ loading: false });
    }
  },
}));
