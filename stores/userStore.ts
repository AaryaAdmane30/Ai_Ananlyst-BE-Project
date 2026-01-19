import { create } from "zustand";
import { fetchUsers } from "../lib/api";
import { User } from "../lib/api";

interface UserStore {
  users: User[];
  setUsers: (users: User[]) => void;
  fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  fetchUsers: async () => {
    const data = await fetchUsers();
    set({ users: data });
  },
}));
