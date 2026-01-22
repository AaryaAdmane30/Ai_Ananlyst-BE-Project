"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
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

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
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
        <Loader2 className="w-10 h-10 animate-spin text-sky-300 mb-3" />
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
          className="mt-4 px-5 py-2 rounded-2xl bg-white/[0.05] border border-white/10 text-white font-semibold hover:bg-white/[0.08] transition active:scale-[0.98]"
        >
          Back to Tasks
        </button>
      </div>
    );
  }

  return (
    <div className="relative p-8 max-w-6xl mx-auto space-y-8 overflow-hidden">
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
            onClick={() => router.push("/dashboard/tasks")}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-3 tracking-tight drop-shadow-[0_8px_40px_rgba(0,0,0,0.55)]">
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
          className="px-5 py-2.5 rounded-2xl bg-white/[0.05] border border-white/10 text-white font-semibold hover:bg-white/[0.08] transition flex items-center gap-2 active:scale-[0.98]"
        >
          <Pencil size={16} />
          Edit
        </button>
      </motion.div>

      {/* Details */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.45, delay: 0.06 }}
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        <MiniCard title="Task ID" value={task.id} icon={<ClipboardList size={16} />} />
        <MiniCard title="Project Link" value={task.projectId || "N/A"} icon={<Layers size={16} />} />
        <MiniCard title="Epic Link"дmp
          value={task.epicId || "N/A"}
          icon={<CheckCircle2 size={16} />}
        />
      </motion.div>
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
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.85)] backdrop-blur"
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-widest font-extrabold text-slate-500">
          {title}
        </p>

        <span className="w-8 h-8 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300">
          {icon}
        </span>
      </div>

      <p className="text-sm text-white font-semibold mt-3 break-all">{value}</p>
    </motion.div>
  );
}
