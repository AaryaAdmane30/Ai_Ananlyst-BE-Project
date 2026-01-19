// lib/api.ts
import axios from "axios";
import { getSession } from "next-auth/react"; // Zaroori import

// 1. Axios instance setup
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// 2. INTERCEPTOR ADD KARO (Ye har request se pehle token chipka dega)
api.interceptors.request.use(async (config) => {
  const session: any = await getSession();
  const token = session?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


// (User, Project, fetchProjects, etc. ko chhedne ki zaroorat nahi)

// ----- TYPES -----
export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "DEVELOPER";
  companyName?: string;
  contactInfo?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  managerId?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  laborCost?: number;
  reworkCost?: number;
  infrastructureCost?: number;
  totalSavings?: number;
}

export interface Epic {
  id: string;
  title: string;
  description?: string;
  projectId: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  projectId?: string;
  epicId?: string;
}

export interface Ai {
  id: string;
  type?: string;
  description?: string;
  laborCost?: number;
  reworkCost?: number;
  infrastructureCost?: number;
  totalSavings?: number;
  projectId: string;
}

export interface Risk {
  id: string;
  type: string;
  severity?: "LOW" | "MEDIUM" | "HIGH";
  description?: string;
  mitigation?: string;
  resolved?: boolean;
  taskId?: string;
  epicId?: string;
  projectId?: string;
  aiId?: string;
}

export interface Cost {
  id: string;
  laborCost?: number;
  reworkCost?: number;
  infrastructureCost?: number;
  otherCost?: number;
  totalCost?: number;
  savings?: number;
  description?: string;
  taskId?: string;
  epicId?: string;
  projectId?: string;
  aiId?: string;
}

export interface TeamMember {
  id: string;
  name?: string;
  email?: string;
  role?: "ADMIN" | "MANAGER" | "DEVELOPER";
  managerId?: string;
  availabilityHours?: number;
  currentWorkload?: number;
  hourlyRate?: number;
  preferences?: any;
  userId?: string;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  read?: boolean;
}

// ----- USERS -----
export const fetchUsers = async (): Promise<User[]> => {
  const res = await api.get("/users");
  return res.data;
};

export const fetchUserById = async (id: string): Promise<User> => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

// ----- PROJECTS -----
export const fetchProjects = async (): Promise<Project[]> => {
  const res = await api.get("/projects");
  return res.data;
};

export const createProject = async (project: Partial<Project>) => {
  const res = await api.post("/projects", project);
  return res.data;
};

export const updateProject = async (id: string, project: Partial<Project>) => {
  const res = await api.put(`/projects/${id}`, project);
  return res.data;
};

export const deleteProject = async (id: string) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};

// ----- EPICS -----
export const fetchEpics = async (): Promise<Epic[]> => {
  const res = await api.get("/epics");
  return res.data;
};

export const createEpic = async (epic: Partial<Epic>) => {
  const res = await api.post("/epics", epic);
  return res.data;
};

export const updateEpic = async (id: string, epic: Partial<Epic>) => {
  const res = await api.put(`/epics/${id}`, epic);
  return res.data;
};

export const deleteEpic = async (id: string) => {
  const res = await api.delete(`/epics/${id}`);
  return res.data;
};

// ----- TASKS -----
export const fetchTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

export const createTask = async (task: Partial<Task>) => {
  const res = await api.post("/tasks", task);
  return res.data;
};

export const updateTask = async (id: string, task: Partial<Task>) => {
  const res = await api.put(`/tasks/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: string) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};

// ----- AI -----
export const fetchAi = async (): Promise<Ai[]> => {
  const res = await api.get("/ai");
  return res.data;
};

export const createAi = async (ai: Partial<Ai>) => {
  const res = await api.post("/ai", ai);
  return res.data;
};

export const updateAi = async (id: string, ai: Partial<Ai>) => {
  const res = await api.put(`/ai/${id}`, ai);
  return res.data;
};

export const deleteAi = async (id: string) => {
  const res = await api.delete(`/ai/${id}`);
  return res.data;
};

// ----- RISKS -----
export const fetchRisks = async (): Promise<Risk[]> => {
  const res = await api.get("/risks");
  return res.data;
};

export const createRisk = async (risk: Partial<Risk>) => {
  const res = await api.post("/risks", risk);
  return res.data;
};

export const updateRisk = async (id: string, risk: Partial<Risk>) => {
  const res = await api.put(`/risks/${id}`, risk);
  return res.data;
};

export const deleteRisk = async (id: string) => {
  const res = await api.delete(`/risks/${id}`);
  return res.data;
};

// ----- COSTS -----
export const fetchCosts = async (): Promise<Cost[]> => {
  const res = await api.get("/costs");
  return res.data;
};

export const createCost = async (cost: Partial<Cost>) => {
  const res = await api.post("/costs", cost);
  return res.data;
};

export const updateCost = async (id: string, cost: Partial<Cost>) => {
  const res = await api.put(`/costs/${id}`, cost);
  return res.data;
};

export const deleteCost = async (id: string) => {
  const res = await api.delete(`/costs/${id}`);
  return res.data;
};

// ----- TEAM MEMBERS -----
export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  const res = await api.get("/team");
  return res.data;
};

export const createTeamMember = async (member: Partial<TeamMember>) => {
  const res = await api.post("/team", member);
  return res.data;
};

export const updateTeamMember = async (id: string, member: Partial<TeamMember>) => {
  const res = await api.put(`/team/${id}`, member);
  return res.data;
};

export const deleteTeamMember = async (id: string) => {
  const res = await api.delete(`/team/${id}`);
  return res.data;
};

// ----- NOTIFICATIONS -----
export const fetchNotifications = async (): Promise<Notification[]> => {
  const res = await api.get("/notifications");
  return res.data;
};

export const markNotificationRead = async (id: string) => {
  const res = await api.put(`/notifications/${id}`, { read: true });
  return res.data;
};
