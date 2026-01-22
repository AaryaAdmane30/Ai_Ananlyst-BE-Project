"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { useWorkflowStore } from "@/stores/useWorkflowStore";

import {
  Activity,
  ChevronRight,
  Loader2,
  Search,
  Trash2,
  Filter,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function WorkflowsPage() {
  const router = useRouter();

  const { workflows, loading, error, fetchAll, removeWorkflow } =
    useWorkflowStore();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "ALL" | "PENDING" | "RUNNING" | "COMPLETED" | "FAILED"
  >("ALL");

  useEffect(() => {
    fetchAll().catch(() => toast.error("Failed to load workflows"));
  }, [fetchAll]);

  const filtered = useMemo(() => {
    return workflows
      .filter((w) => {
        if (filter === "ALL") return true;
        return w.status === filter;
      })
      .filter((w) => {
        const hay =
          `${w.id} ${w.status} ${w.epicId} ${w.epic?.title || ""}`.toLowerCase();
        return hay.includes(search.toLowerCase().trim());
      });
  }, [workflows, search, filter]);

  const onDelete = async (id: string) => {
    if (!confirm("Delete this workflow run?")) return;
    try {
      await removeWorkflow(id);
      toast.success("Workflow deleted 🗑️");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading && workflows.length === 0) {
    return (
      <div className="h-[75vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-sky-300 mb-3" />
        <p className="text-slate-400 font-semibold">Loading workflows...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[75vh] flex flex-col items-center justify-center text-center px-6">
        <p className="text-rose-300 font-bold">{error}</p>
        <button
          onClick={() => fetchAll()}
          className="mt-4 px-6 py-3 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.10] text-white font-extrabold transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative p-8 max-w-7xl mx-auto space-y-8 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] [background-size:26px_26px]" />
      </div>
      <div className="pointer-events-none absolute -top-24 -left-28 w-[520px] h-[520px] rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-28 -right-32 w-[600px] h-[600px] rounded-full bg-violet-500/10 blur-[130px]" />

      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.45 }}
        className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Workflow Runs
          </h1>
          <p className="text-slate-400 mt-1 font-medium">
            Track automation execution logs per epic.
          </p>
        </div>

        <button
          onClick={() => fetchAll()}
          className="px-5 py-2.5 rounded-2xl bg-white/[0.05] border border-white/10 text-white font-semibold hover:bg-white/[0.08] transition active:scale-[0.98]"
        >
          Refresh
        </button>
      </motion.div>

      {/* Controls */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.45, delay: 0.06 }}
        className="relative z-10 flex flex-col md:flex-row gap-3 md:items-center md:justify-between"
      >
        <div className="relative w-full md:w-[420px] group">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-300 transition"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search workflow runs..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500/30 focus:bg-white/[0.05] transition"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-extrabold text-slate-300">
            <Filter size={14} /> Status
          </span>

          {["ALL", "PENDING", "RUNNING", "COMPLETED", "FAILED"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s as any)}
              className={`px-4 py-2 rounded-2xl border text-xs font-extrabold transition-all active:scale-[0.98] ${
                filter === s
                  ? "bg-white/[0.08] border-sky-500/25 text-white shadow-[0_0_20px_rgba(56,189,248,0.10)]"
                  : "bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </motion.div>

      {/* List */}
      <div className="relative z-10 space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <Activity className="mx-auto text-slate-500 mb-3" />
            <p className="text-white font-extrabold text-xl">
              No workflow runs found
            </p>
            <p className="text-slate-400 mt-2">
              Trigger a workflow to see execution history.
            </p>
          </div>
        ) : (
          filtered.map((w) => (
            <div
              key={w.id}
              className="rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition p-5 flex items-start justify-between gap-4"
            >
              <button
                onClick={() => router.push(`/dashboard/workflows/${w.id}`)}
                className="flex-1 min-w-0 text-left"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <StatusBadge status={w.status} />

                  <span className="text-[11px] font-extrabold text-slate-500">
                    Epic:
                  </span>
                  <span className="text-[11px] font-extrabold text-sky-300">
                    {w.epic?.title || w.epicId.slice(0, 10) + "..."}
                  </span>
                </div>

                <p className="text-white font-extrabold mt-2 truncate">
                  Run ID: {w.id}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Started:{" "}
                  {w.startedAt
                    ? new Date(w.startedAt).toLocaleString()
                    : "Unknown"}
                  {w.finishedAt
                    ? ` • Finished: ${new Date(w.finishedAt).toLocaleString()}`
                    : ""}
                </p>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push(`/dashboard/workflows/${w.id}`)}
                  className="p-2 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition"
                  title="Open"
                >
                  <ChevronRight size={16} className="text-slate-300" />
                </button>

                <button
                  onClick={() => onDelete(w.id)}
                  className="p-2 rounded-2xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition"
                  title="Delete"
                >
                  <Trash2 size={16} className="text-rose-300" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";
}) {
  const styles =
    status === "COMPLETED"
      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
      : status === "RUNNING"
      ? "bg-sky-500/10 border-sky-500/20 text-sky-300"
      : status === "FAILED"
      ? "bg-rose-500/10 border-rose-500/20 text-rose-300"
      : "bg-white/[0.04] border-white/10 text-slate-300";

  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${styles}`}
    >
      {status}
    </span>
  );
}
