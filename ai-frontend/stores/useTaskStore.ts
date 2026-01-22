"use client";

import { create } from "zustand";
import { Task, fetchTasks, createTask, updateTask, deleteTask } from "@/lib/api";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;

  fetchAll: () => Promise<void>;
  addTask: (task: Partial<Task>) => Promise<Task>;
  editTask: (id: string, task: Partial<Task>) => Promise<Task>;
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
      const msg = err?.response?.data?.message || err.message || "Failed to fetch tasks";
      set({ error: msg });
      throw new Error(msg);
    } finally {
      set({ loading: false });
    }
  },

  addTask: async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      set({ tasks: [newTask, ...get().tasks] });
      return newTask;
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "Failed to add task";
      set({ error: msg });
      throw new Error(msg);
    }
  },

  editTask: async (id, taskData) => {
    try {
      const updated = await updateTask(id, taskData);
      set({ tasks: get().tasks.map((t) => (t.id === id ? updated : t)) });
      return updated;
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "Failed to update task";
      set({ error: msg });
      throw new Error(msg);
    }
  },

  removeTask: async (id) => {
    try {
      await deleteTask(id);
      set({ tasks: get().tasks.filter((t) => t.id !== id) });
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "Failed to delete task";
      set({ error: msg });
      throw new Error(msg);
    }
  },
}));
