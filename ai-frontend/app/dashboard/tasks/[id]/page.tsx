"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Loader2,
  ClipboardList,
  Layers,
  CheckCircle2,
  Pencil,
} from "lucide-react";

import { api } from "@/lib/api";

type Status = "TODO" | "IN_PROGRESS" | "COMPLETED";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
  projectId?: string | null;
  epicId?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export default function TaskDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (!taskId) return;

    const run = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/tasks/${taskId}`);
        setTask(res.data);
      } catch (err: any) {
        toast.error("Failed to load task");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [taskId]);

  const badgeStyle = useMemo(() => {
    if (!task) return "bg-white/[0.04] border-white/10 text-slate-300";

    return task.status === "COMPLETED"
      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
      : task.status === "IN_PROGRESS"
      ? "bg-sky-500/10 border-sky-500/20 text-sky-300"
      : "bg-white/[0.04] border-white/10 text-slate-300";
  }, [task]);

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-sky-400 mb-3" />
        <p className="text-slate-400 font-semibold">Loading task...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <p className="text-slate-300 font-semibold">Task not found.</p>
        <button
          onClick={() => router.push("/dashboard/tasks")}
          className="mt-4 px-5 py-2 rounded-2xl bg-white/[0.05] border border-white/10 text-white font-bold hover:bg-white/[0.08] transition"
        >
          Back to Tasks
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
            onClick={() => router.push("/dashboard/tasks")}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <h1 className="text-3xl md:text-4xl font-black text-white mt-3 tracking-tight">
            {task.title}
          </h1>

          <p className="text-slate-400 mt-2 max-w-2xl leading-relaxed">
            {task.description || "No description added yet."}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400">
            <span className={`px-3 py-1 rounded-full border ${badgeStyle}`}>
              {task.status.replace("_", " ")}
            </span>

            {task.projectId && (
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                Project:{" "}
                <span className="text-sky-300">
                  {task.projectId.slice(0, 10)}...
                </span>
              </span>
            )}

            {task.epicId && (
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                Epic:{" "}
                <span className="text-violet-300">
                  {task.epicId.slice(0, 10)}...
                </span>
              </span>
            )}
          </div>
        </div>

        {/* Future Edit */}
        <button
          onClick={() => toast("Edit task page next 😄")}
          className="px-4 py-2 rounded-2xl bg-white/[0.05] border border-white/10 text-white font-bold hover:bg-white/[0.08] transition flex items-center gap-2"
        >
          <Pencil size={16} />
          Edit
        </button>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <MiniCard title="Task ID" value={task.id} icon={<ClipboardList size={16} />} />
        <MiniCard title="Project Link" value={task.projectId || "N/A"} icon={<Layers size={16} />} />
        <MiniCard title="Epic Link" value={task.epicId || "N/A"} icon={<CheckCircle2 size={16} />} />
      </div>
    </div>
  );
}

function MiniCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-widest font-black text-slate-500">
          {title}
        </p>
        <span className="text-slate-400">{icon}</span>
      </div>
      <p className="text-sm text-white font-bold mt-3 break-all">
        {value}
      </p>
    </div>
  );
}
