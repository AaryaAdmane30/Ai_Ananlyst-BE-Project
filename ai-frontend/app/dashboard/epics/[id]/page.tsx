"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Layers,
  CheckCircle2,
  Loader2,
  Plus,
  ClipboardList,
} from "lucide-react";

import { api } from "@/lib/api";

type Epic = {
  id: string;
  title: string;
  description?: string;
  projectId: string;
};

type Task = {
  id: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  epicId?: string;
  projectId?: string;
};

export default function EpicDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const epicId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [epic, setEpic] = useState<Epic | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch epic + tasks
  useEffect(() => {
    if (!epicId) return;

    const run = async () => {
      try {
        setLoading(true);

        // 1) fetch epic
        const epicRes = await api.get(`/epics/${epicId}`);
        setEpic(epicRes.data);

        // 2) fetch tasks and filter by epicId
        const tasksRes = await api.get(`/tasks`);
        const filtered = (tasksRes.data as Task[]).filter(
          (t) => t.epicId === epicId
        );
        setTasks(filtered);
      } catch (err: any) {
        toast.error("Failed to load epic details");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [epicId]);

  const counts = useMemo(() => {
    const total = tasks.length;
    const todo = tasks.filter((t) => t.status === "TODO").length;
    const progress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
    const done = tasks.filter((t) => t.status === "COMPLETED").length;

    return { total, todo, progress, done };
  }, [tasks]);

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-sky-400 mb-3" />
        <p className="text-slate-400 font-semibold">Loading epic...</p>
      </div>
    );
  }

  if (!epic) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <p className="text-slate-300 font-semibold">Epic not found.</p>
        <button
          onClick={() => router.push("/dashboard/epics")}
          className="mt-4 px-5 py-2 rounded-2xl bg-white/[0.05] border border-white/10 text-white font-bold hover:bg-white/[0.08] transition"
        >
          Back to Epics
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Top Bar */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <button
            onClick={() => router.push("/dashboard/epics")}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <h1 className="text-3xl md:text-4xl font-black text-white mt-3 tracking-tight">
            {epic.title}
          </h1>

          <p className="text-slate-400 mt-2 max-w-2xl leading-relaxed">
            {epic.description || "No description added yet."}
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-400">
            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
              Project:{" "}
              <span className="text-sky-300">{epic.projectId.slice(0, 10)}...</span>
            </span>

            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
              Epic ID:{" "}
              <span className="text-violet-300">{epic.id.slice(0, 10)}...</span>
            </span>
          </div>
        </div>

        <button
          onClick={() => toast("Add Task modal next 😄")}
          className="px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-black font-black transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-sky-500/20"
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MiniStat title="Total Tasks" value={String(counts.total)} icon={<ClipboardList size={16} />} />
        <MiniStat title="Todo" value={String(counts.todo)} icon={<CheckCircle2 size={16} />} />
        <MiniStat title="In Progress" value={String(counts.progress)} icon={<Layers size={16} />} />
        <MiniStat title="Completed" value={String(counts.done)} icon={<CheckCircle2 size={16} />} />
      </div>

      {/* Tasks List */}
      <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-black text-white tracking-tight">
            Tasks in this Epic
          </h2>
          <p className="text-xs text-slate-500 font-semibold">
            {tasks.length} tasks found
          </p>
        </div>

        {tasks.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
              <ClipboardList className="text-slate-400" />
            </div>
            <p className="text-slate-300 font-bold mt-4">No tasks yet</p>
            <p className="text-slate-500 text-sm mt-1">
              Create tasks to track delivery inside this epic.
            </p>

            <button
              onClick={() => toast("Add Task modal next 😄")}
              className="mt-6 px-6 py-3 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.10] text-white font-black transition active:scale-95"
            >
              + Create First Task
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition flex items-start justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="text-white font-black truncate">{t.title}</p>
                  <p className="text-slate-400 text-sm mt-1 line-clamp-2">
                    {t.description || "No description"}
                  </p>
                </div>

                <StatusBadge status={t.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------ UI Helpers ------------------ */

function MiniStat({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-widest font-black text-slate-500">
          {title}
        </p>
        <span className="text-slate-400">{icon}</span>
      </div>
      <p className="text-2xl font-black text-white mt-2">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: Task["status"] }) {
  const styles =
    status === "COMPLETED"
      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
      : status === "IN_PROGRESS"
      ? "bg-sky-500/10 border-sky-500/20 text-sky-300"
      : "bg-white/[0.04] border-white/10 text-slate-300";

  return (
    <span
      className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
