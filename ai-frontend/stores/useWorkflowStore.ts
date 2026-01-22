import { create } from "zustand";
import { fetchWorkflowRuns, deleteWorkflowRun } from "@/lib/api";

export type WorkflowStatus = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";

export type WorkflowRun = {
  id: string;
  epicId: string;
  status: WorkflowStatus;
  logs?: any;
  startedAt?: string;
  finishedAt?: string | null;
  epic?: {
    id: string;
    title?: string;
    description?: string;
    projectId?: string;
  };
};

type WorkflowStore = {
  workflows: WorkflowRun[];
  loading: boolean;
  error: string | null;

  fetchAll: () => Promise<void>;
  removeWorkflow: (id: string) => Promise<void>;
};

export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  workflows: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    try {
      set({ loading: true, error: null });
      const data = await fetchWorkflowRuns();
      set({ workflows: data || [], loading: false });
    } catch (err: any) {
      set({
        workflows: [],
        loading: false,
        error: err?.response?.data?.message || "Failed to load workflows",
      });
    }
  },

  removeWorkflow: async (id: string) => {
    await deleteWorkflowRun(id);
    set({ workflows: get().workflows.filter((w) => w.id !== id) });
  },
}));
