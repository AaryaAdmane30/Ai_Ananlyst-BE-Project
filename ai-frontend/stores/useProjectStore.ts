"use client";

import { create } from "zustand";
import { Project, fetchProjects, createProject, updateProject, deleteProject } from "@/lib/api";

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
  addProject: (project: Partial<Project>) => Promise<void>;
  editProject: (id: string, project: Partial<Project>) => Promise<void>;
  removeProject: (id: string) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchProjects();
      set({ projects: data });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch projects" });
    } finally {
      set({ loading: false });
    }
  },

  addProject: async (projectData) => {
    // Note: Isme loading set nahi kar rahe taaki UI modal handle kare
    try {
      const newProject = await createProject(projectData);
      set((state) => ({ 
        projects: [newProject, ...state.projects] // New project top par dikhega
      }));
    } catch (err: any) {
      throw new Error(err.message || "Failed to create project");
    }
  },

  editProject: async (id, projectData) => {
    try {
      const updated = await updateProject(id, projectData);
      set((state) => ({
        projects: state.projects.map((p) => (p.id === id ? updated : p)),
      }));
    } catch (err: any) {
      throw new Error(err.message || "Failed to update project");
    }
  },

  removeProject: async (id) => {
    try {
      await deleteProject(id);
      set((state) => ({ 
        projects: state.projects.filter((p) => p.id !== id) 
      }));
    } catch (err: any) {
      throw new Error(err.message || "Failed to delete project");
    }
  },
}));