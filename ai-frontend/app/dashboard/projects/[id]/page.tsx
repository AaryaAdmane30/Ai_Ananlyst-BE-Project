"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

import {
  ArrowLeft,
  Pencil,
  Trash2,
  Loader2,
  Layers,
  CheckCircle2,
  Sparkles,
  AlertOctagon,
  Wallet,
  BadgeIndianRupee,
} from "lucide-react";

import { api } from "@/lib/api";

type Project = {
  id: string;
  name: string;
  description?: string;
  managerId?: string;
  status?: string;
  laborCost?: number;
  reworkCost?: number;
  infrastructureCost?: number;
  totalSavings?: number;
  createdAt?: string;
  updatedAt?: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const pop = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 10 },
};

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.id as string;

  const { status: authStatus } = useSession();

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);

  const [activeTab, setActiveTab] = useState<
    "epics" | "tasks" | "ai" | "risks" | "costs"
  >("epics");

  const totalCost = useMemo(() => {
    const labor = project?.laborCost ?? 0;
    const rework = project?.reworkCost ?? 0;
    const infra = project?.infrastructureCost ?? 0;
    return labor + rework + infra;
  }, [project]);

  useEffect(() => {
    if (!projectId) return;
    if (authStatus === "loading") return;

    if (authStatus === "unauthenticated") {
      toast.error("Session expired. Please login again.");
      router.push("/auth/login");
      return;
    }

    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/projects/${projectId}`);
        setProject(res.data);
      } catch (err: any) {
        toast.error("Project load failed");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, authStatus, router]);

  const handleDelete = async () => {
    if (!project) return;

    const ok = confirm(`Delete project "${project.name}" ?`);
    if (!ok) return;

    try {
      await api.delete(`/projects/${project.id}`);
      toast.success("Project deleted ✅");
      router.push("/dashboard/projects");
    } catch (err: any) {
      toast.error("Failed to delete project");
    }
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-sky-300 mb-3" />
        <p className="text-slate-400 font-semibold">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <p className="text-slate-300 font-semibold">Project not found.</p>
        <button
          onClick={() => router.push("/dashboard/projects")}
          className="mt-4 px-5 py-2 rounded-2xl bg-white/[0.05] border border-white/10 text-white font-semibold hover:bg-white/[0.08] transition active:scale-[0.98]"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="relative p-8 max-w-7xl mx-auto space-y-8 overflow-hidden">
      {/* Grid texture + glow */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] [background-size:26px_26px]" />
      </div>
      <div className="pointer-events-none absolute -top-24 -left-28 w-[520px] h-[520px] rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-28 -right-32 w-[600px] h-[600px] rounded-full bg-violet-500/10 blur-[130px]" />

      {/* Top Bar */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.45 }}
        className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6"
      >
        <div className="min-w-0">
          <button
            onClick={() => router.push("/dashboard/projects")}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-3 tracking-tight drop-shadow-[0_8px_40px_rgba(0,0,0,0.55)]">
            {project.name}
          </h1>

          <p className="text-slate-400 mt-2 max-w-3xl leading-relaxed">
            {project.description || "No description added yet."}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400">
            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
              Project ID:{" "}
              <span className="text-sky-300">{project.id.slice(0, 10)}...</span>
            </span>

            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
              Status:{" "}
              <span className="text-violet-300">
                {(project.status || "TODO").toUpperCase()}
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toast("Edit modal next 😄")}
            className="px-4 py-2.5 rounded-2xl bg-white/[0.05] border border-white/10 text-white font-semibold hover:bg-white/[0.08] transition flex items-center gap-2 active:scale-[0.98]"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 font-semibold hover:bg-rose-500/15 transition flex items-center gap-2 active:scale-[0.98]"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.45, delay: 0.06 }}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
      >
        <StatCard
          title="Labor Cost"
          value={`₹ ${project.laborCost ?? 0}`}
          icon={<BadgeIndianRupee size={16} />}
        />
        <StatCard
          title="Rework Cost"
          value={`₹ ${project.reworkCost ?? 0}`}
          icon={<BadgeIndianRupee size={16} />}
        />
        <StatCard
          title="Infrastructure"
          value={`₹ ${project.infrastructureCost ?? 0}`}
          icon={<Wallet size={16} />}
        />
        <StatCard
          title="Total Cost"
          value={`₹ ${totalCost}`}
          icon={<BadgeIndianRupee size={16} />}
        />
        <StatCard
          title="Savings"
          value={`₹ ${project.totalSavings ?? 0}`}
          accent="sky"
          icon={<Sparkles size={16} />}
        />
      </motion.div>

      {/* Tabs */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.45, delay: 0.1 }}
        className="relative z-10 flex flex-wrap gap-2"
      >
        <TabButton
          active={activeTab === "epics"}
          onClick={() => setActiveTab("epics")}
          icon={<Layers size={16} />}
          label="Epics"
        />
        <TabButton
          active={activeTab === "tasks"}
          onClick={() => setActiveTab("tasks")}
          icon={<CheckCircle2 size={16} />}
          label="Tasks"
        />
        <TabButton
          active={activeTab === "ai"}
          onClick={() => setActiveTab("ai")}
          icon={<Sparkles size={16} />}
          label="AI Insights"
        />
        <TabButton
          active={activeTab === "risks"}
          onClick={() => setActiveTab("risks")}
          icon={<AlertOctagon size={16} />}
          label="Risks"
        />
        <TabButton
          active={activeTab === "costs"}
          onClick={() => setActiveTab("costs")}
          icon={<Wallet size={16} />}
          label="Costs"
        />
      </motion.div>

      {/* Tab Content */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.45, delay: 0.14 }}
        className="relative z-10 bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-[0_18px_80px_-40px_rgba(0,0,0,0.9)]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={pop}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            {activeTab === "epics" && <EpicsTab projectId={project.id} />}
            {activeTab === "tasks" && <TasksTab projectId={project.id} />}
            {activeTab === "ai" && <AiTab projectId={project.id} />}
            {activeTab === "risks" && <RisksTab projectId={project.id} />}
            {activeTab === "costs" && <CostsTab projectId={project.id} />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ---------------- UI Components ---------------- */

function StatCard({
  title,
  value,
  accent,
  icon,
}: {
  title: string;
  value: string;
  accent?: "sky";
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={`rounded-3xl p-6 border backdrop-blur-xl shadow-[0_18px_60px_-30px_rgba(0,0,0,0.85)] ${
        accent === "sky"
          ? "bg-sky-500/10 border-sky-500/20"
          : "bg-white/[0.03] border-white/10"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-widest font-extrabold text-slate-500">
          {title}
        </p>

        <span
          className={`w-9 h-9 rounded-2xl border flex items-center justify-center ${
            accent === "sky"
              ? "bg-sky-500/10 border-sky-500/20 text-sky-200"
              : "bg-white/[0.04] border-white/10 text-slate-300"
          }`}
        >
          {icon}
        </span>
      </div>

      <p className="text-2xl font-extrabold text-white mt-2">{value}</p>
    </motion.div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-2xl border font-semibold text-sm flex items-center gap-2 transition-all active:scale-[0.98] ${
        active
          ? "bg-gradient-to-r from-sky-500/15 to-violet-500/15 border-sky-500/25 text-white shadow-[0_0_20px_rgba(56,189,248,0.10)]"
          : "bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06] hover:text-white"
      }`}
    >
      <span className={active ? "text-sky-300" : "text-slate-400"}>{icon}</span>
      {label}
    </button>
  );
}

/* ---------------- Tabs ---------------- */

function EpicsTab({ projectId }: { projectId: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const res = await api.get("/epics");
        setData(res.data.filter((e: any) => e.projectId === projectId));
      } catch {
        toast.error("Failed to load epics");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [projectId]);

  if (loading) return <MiniLoader text="Loading epics..." />;
  if (data.length === 0) return <EmptyState text="No epics created yet." />;

  return (
    <div className="space-y-3">
      {data.map((e) => (
        <div
          key={e.id}
          className="p-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition"
        >
          <p className="text-white font-bold">{e.title}</p>
          <p className="text-slate-400 text-sm mt-1">
            {e.description || "No description"}
          </p>
        </div>
      ))}
    </div>
  );
}

function TasksTab({ projectId }: { projectId: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const res = await api.get("/tasks");
        setData(res.data.filter((t: any) => t.projectId === projectId));
      } catch {
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [projectId]);

  if (loading) return <MiniLoader text="Loading tasks..." />;
  if (data.length === 0) return <EmptyState text="No tasks created yet." />;

  return (
    <div className="space-y-3">
      {data.map((t) => (
        <div
          key={t.id}
          className="p-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition flex items-center justify-between"
        >
          <div className="min-w-0">
            <p className="text-white font-bold truncate">{t.title}</p>
            <p className="text-slate-400 text-sm mt-1 line-clamp-2">
              {t.description || "No description"}
            </p>
          </div>

          <span className="text-[10px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-200 font-extrabold uppercase tracking-widest">
            {t.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function AiTab({ projectId }: { projectId: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const res = await api.get("/ai");
        setData(res.data.filter((a: any) => a.projectId === projectId));
      } catch {
        toast.error("Failed to load AI insights");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [projectId]);

  if (loading) return <MiniLoader text="Loading AI insights..." />;
  if (data.length === 0) return <EmptyState text="No AI insights found." />;

  return (
    <div className="space-y-3">
      {data.map((a) => (
        <div
          key={a.id}
          className="p-4 rounded-2xl border border-sky-500/20 bg-sky-500/10 hover:bg-sky-500/15 transition"
        >
          <p className="text-white font-bold">{a.type || "AI Suggestion"}</p>
          <p className="text-slate-200 text-sm mt-1">
            {a.description || "No description"}
          </p>
          <p className="text-slate-300 text-xs mt-3 font-semibold">
            Savings: ₹ {a.totalSavings ?? 0}
          </p>
        </div>
      ))}
    </div>
  );
}

function RisksTab({ projectId }: { projectId: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const res = await api.get("/risks");
        setData(res.data.filter((r: any) => r.projectId === projectId));
      } catch {
        toast.error("Failed to load risks");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [projectId]);

  if (loading) return <MiniLoader text="Loading risks..." />;
  if (data.length === 0) return <EmptyState text="No risks found." />;

  return (
    <div className="space-y-3">
      {data.map((r) => (
        <div
          key={r.id}
          className="p-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/15 transition"
        >
          <p className="text-white font-bold">{r.type}</p>
          <p className="text-slate-200 text-sm mt-1">
            {r.description || "No description"}
          </p>
          <p className="text-[11px] mt-3 font-extrabold text-rose-200 uppercase tracking-widest">
            Severity: {r.severity || "MEDIUM"}
          </p>
        </div>
      ))}
    </div>
  );
}

function CostsTab({ projectId }: { projectId: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const res = await api.get("/costs");
        setData(res.data.filter((c: any) => c.projectId === projectId));
      } catch {
        toast.error("Failed to load costs");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [projectId]);

  if (loading) return <MiniLoader text="Loading costs..." />;
  if (data.length === 0) return <EmptyState text="No cost entries found." />;

  return (
    <div className="space-y-3">
      {data.map((c) => (
        <div
          key={c.id}
          className="p-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition"
        >
          <p className="text-white font-bold">
            Total: ₹ {c.totalCost ?? 0}{" "}
            <span className="text-slate-400 text-xs font-semibold">
              (Savings ₹{c.savings ?? 0})
            </span>
          </p>
          <p className="text-slate-400 text-sm mt-1">
            {c.description || "No description"}
          </p>
        </div>
      ))}
    </div>
  );
}

function MiniLoader({ text }: { text: string }) {
  return (
    <div className="py-10 flex flex-col items-center justify-center">
      <Loader2 className="w-7 h-7 animate-spin text-sky-300" />
      <p className="text-slate-400 mt-2 text-sm font-semibold">{text}</p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="py-10 text-center">
      <p className="text-slate-400 font-semibold">{text}</p>
    </div>
  );
}
