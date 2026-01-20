import { create } from "zustand";
import { Task, fetchTasks, createTask, updateTask, deleteTask } from "@/lib/api";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
  addTask: (task: Partial<Task>) => Promise<void>;
  editTask: (id: string, task: Partial<Task>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchTasks();
      set({ tasks: data });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch tasks" });
    } finally {
      set({ loading: false });
    }
  },

  addTask: async (task) => {
    try {
      const newTask = await createTask(task);
      set({ tasks: [...get().tasks, newTask] });
    } catch (err: any) {
      set({ error: err.message || "Failed to add task" });
    }
  },

  editTask: async (id, task) => {
    try {
      const updated = await updateTask(id, task);
      set({ tasks: get().tasks.map((t) => (t.id === id ? updated : t)) });
    } catch (err: any) {
      set({ error: err.message || "Failed to update task" });
    }
  },

  removeTask: async (id) => {
    try {
      await deleteTask(id);
      set({ tasks: get().tasks.filter((t) => t.id !== id) });
    } catch (err: any) {
      set({ error: err.message || "Failed to delete task" });
    }
  },
}));
