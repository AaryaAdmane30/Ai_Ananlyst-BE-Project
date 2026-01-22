"use client";

import { create } from "zustand";
import {
  TeamMember,
  fetchTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "@/lib/api";

interface TeamMemberState {
  members: TeamMember[];
  loading: boolean;
  error: string | null;

  fetchAll: () => Promise<void>;
  addMember: (data: Partial<TeamMember>) => Promise<void>;
  editMember: (id: string, data: Partial<TeamMember>) => Promise<void>;
  removeMember: (id: string) => Promise<void>;
}

export const useTeamMemberStore = create<TeamMemberState>((set, get) => ({
  members: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchTeamMembers();
      set({ members: data });
    } catch (err: any) {
      set({ error: err?.message || "Failed to fetch team members" });
    } finally {
      set({ loading: false });
    }
  },

  addMember: async (data) => {
    try {
      const newMember = await createTeamMember(data);
      set({ members: [newMember, ...get().members] });
    } catch (err: any) {
      set({ error: err?.message || "Failed to add team member" });
    }
  },

  editMember: async (id, data) => {
    try {
      const updated = await updateTeamMember(id, data);
      set({
        members: get().members.map((m) => (m.id === id ? updated : m)),
      });
    } catch (err: any) {
      set({ error: err?.message || "Failed to update team member" });
    }
  },

  removeMember: async (id) => {
    try {
      await deleteTeamMember(id);
      set({ members: get().members.filter((m) => m.id !== id) });
    } catch (err: any) {
      set({ error: err?.message || "Failed to delete team member" });
    }
  },
}));
