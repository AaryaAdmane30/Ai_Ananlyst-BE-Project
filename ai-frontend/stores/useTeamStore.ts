import { create } from "zustand";
import { TeamMember, fetchTeamMembers } from "@/lib/api";

interface TeamState {
  members: TeamMember[];
  loading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
  addMember: (member: Partial<TeamMember>) => Promise<void>;
  editMember: (id: string, member: Partial<TeamMember>) => Promise<void>;
  removeMember: (id: string) => Promise<void>;
}

export const useTeamStore = create<TeamState>((set, get) => ({
  members: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchTeamMembers();
      set({ members: data });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch team members" });
    } finally {
      set({ loading: false });
    }
  },

  addMember: async (member) => {
    try {
      const newMember = await fetchTeamMembers(); // Replace with create API when ready
      set({ members: [...get().members, newMember as any] });
    } catch (err: any) {
      set({ error: err.message || "Failed to add team member" });
    }
  },

  editMember: async (id, member) => {
    try {
      const updated = await fetchTeamMembers(); // Replace with update API when ready
      set({ members: get().members.map((m) => (m.id === id ? updated as any : m)) });
    } catch (err: any) {
      set({ error: err.message || "Failed to edit team member" });
    }
  },

  removeMember: async (id) => {
    try {
      await fetchTeamMembers(); // Replace with delete API when ready
      set({ members: get().members.filter((m) => m.id !== id) });
    } catch (err: any) {
      set({ error: err.message || "Failed to remove team member" });
    }
  },
}));
