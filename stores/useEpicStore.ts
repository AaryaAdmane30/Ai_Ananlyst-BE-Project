"use client";

import { create } from "zustand";
import { Epic, fetchEpics, createEpic, updateEpic, deleteEpic } from "@/lib/api";

interface EpicState {
  epics: Epic[];
  loading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
  addEpic: (epic: Partial<Epic>) => Promise<void>;
  editEpic: (id: string, epic: Partial<Epic>) => Promise<void>;
  removeEpic: (id: string) => Promise<void>;
}

export const useEpicStore = create<EpicState>((set, get) => ({
  epics: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchEpics();
      set({ epics: data });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch epics" });
    } finally {
      set({ loading: false });
    }
  },

  addEpic: async (epic) => {
    try {
      const newEpic = await createEpic(epic);
      set({ epics: [...get().epics, newEpic] });
    } catch (err: any) {
      set({ error: err.message || "Failed to add epic" });
    }
  },

  editEpic: async (id, epic) => {
    try {
      const updated = await updateEpic(id, epic);
      set({ epics: get().epics.map((e) => (e.id === id ? updated : e)) });
    } catch (err: any) {
      set({ error: err.message || "Failed to update epic" });
    }
  },

  removeEpic: async (id) => {
    try {
      await deleteEpic(id);
      set({ epics: get().epics.filter((e) => e.id !== id) });
    } catch (err: any) {
      set({ error: err.message || "Failed to delete epic" });
    }
  },
}));
