"use client";

import { create } from "zustand";
import { Epic, fetchEpics, createEpic, updateEpic, deleteEpic } from "@/lib/api";

interface EpicState {
  epics: Epic[];
  loading: boolean;
  error: string | null;

  fetchAll: () => Promise<void>;
  addEpic: (epic: Partial<Epic>) => Promise<Epic>;
  editEpic: (id: string, epic: Partial<Epic>) => Promise<Epic>;
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
      const msg = err?.response?.data?.message || err.message || "Failed to fetch epics";
      set({ error: msg });
      throw new Error(msg);
    } finally {
      set({ loading: false });
    }
  },

  addEpic: async (epicData) => {
    try {
      const newEpic = await createEpic(epicData);
      set({ epics: [newEpic, ...get().epics] });
      return newEpic;
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "Failed to add epic";
      set({ error: msg });
      throw new Error(msg);
    }
  },

  editEpic: async (id, epicData) => {
    try {
      const updated = await updateEpic(id, epicData);
      set({
        epics: get().epics.map((e) => (e.id === id ? updated : e)),
      });
      return updated;
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "Failed to update epic";
      set({ error: msg });
      throw new Error(msg);
    }
  },

  removeEpic: async (id) => {
    try {
      await deleteEpic(id);
      set({ epics: get().epics.filter((e) => e.id !== id) });
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "Failed to delete epic";
      set({ error: msg });
      throw new Error(msg);
    }
  },
}));
