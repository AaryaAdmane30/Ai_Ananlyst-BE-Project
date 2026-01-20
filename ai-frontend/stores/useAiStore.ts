import { create } from "zustand";
import { Ai, fetchAis, createAi, updateAi, deleteAi } from "@/lib/api";

interface AiState {
  ais: Ai[];
  loading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
  addAi: (ai: Partial<Ai>) => Promise<void>;
  editAi: (id: string, ai: Partial<Ai>) => Promise<void>;
  removeAi: (id: string) => Promise<void>;
}

export const useAiStore = create<AiState>((set, get) => ({
  ais: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchAis();
      set({ ais: data });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch AI suggestions" });
    } finally {
      set({ loading: false });
    }
  },

  addAi: async (ai) => {
    try {
      const newAi = await createAi(ai);
      set({ ais: [...get().ais, newAi] });
    } catch (err: any) {
      set({ error: err.message || "Failed to add AI suggestion" });
    }
  },

  editAi: async (id, ai) => {
    try {
      const updated = await updateAi(id, ai);
      set({ ais: get().ais.map((a) => (a.id === id ? updated : a)) });
    } catch (err: any) {
      set({ error: err.message || "Failed to update AI suggestion" });
    }
  },

  removeAi: async (id) => {
    try {
      await deleteAi(id);
      set({ ais: get().ais.filter((a) => a.id !== id) });
    } catch (err: any) {
      set({ error: err.message || "Failed to delete AI suggestion" });
    }
  },
}));
