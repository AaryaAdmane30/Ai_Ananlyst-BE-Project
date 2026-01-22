"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { api } from "@/lib/api";

import {
  ArrowLeft,
  Loader2,
  ClipboardList,
  Copy,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from "lucide-react";

type WorkflowStatus = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";

type WorkflowRun = {
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

export default function WorkflowRunDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const workflowId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [workflow, setWorkflow] = useState<WorkflowRun | null>(null);

  const fetchOne = async () => {
    if (!workflowId) return;

    try {
      setLoading(true);
      const res = await api.get(`/workflow/${workflowId}`);
      setWorkflow(res.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to load workflow run");
      setWorkflow(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOne();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workflowId]);

  const statusStyle = useMemo(() => {
    const s = workflow?.status;

    if (s === "COMPLETED")
      return "bg-emerald-500/10 border-emerald-500/20 text-emerald-300";
    if (s === "RUNNING")
      return "bg-sky-500/10 border-sky-500/20 text-sky-300";
    if (s === "FAILED") return "bg-rose-500/10 border-rose-500/20 text-rose-300";
    return "bg-white/[0.04] border-white/10 text-slate-300";
  }, [workflow]);

  const prettyLogs = useMemo(() => {
    try {
      return JSON.stringify(workflow?.logs ?? {}, null, 2);
    } catch {
      return String(workflow?.logs ?? "");
    }
  }, [workflow]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied ✅");
    } catch {
      toast.error("Copy failed");
    }
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-sky-400 mb-3" />
        <p className="text-slate-400 font-semibold">Loading workflow...</p>
      </div>
    );
  }

  if (!workflow) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <p className="text-slate-300 font-semibold">Workflow run not found.</p>
        <button
          onClick={() => router.push("/dashboard/workflows")}
          className="mt-4 px-5 py-2 rounded-2xl bg-white/[0.05] border border-white/10 text-white font-bold hover:bg-white/[0.08] transition"
        >
          Back to Workflows
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
            onClick={() => router.push("/dashboard/workflows")}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <h1 className="text-3xl md:text-4xl font-black text-white mt-3 tracking-tight">
            Workflow Run
          </h1>

          <p className="text-slate-400 mt-2">
            Track orchestration logs and execution status.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400">
            <span className={`px-3 py-1 rounded-full border ${statusStyle}`}>
              {workflow.status}
            </span>

            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
              Epic:{" "}
              <span className="text-sky-300">
                {workflow.epic?.title || workflow.epicId.slice(0, 10) + "..."}
              </span>
            </span>

            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
              Run ID:{" "}
              <span className="text-violet-300">
                {workflow.id.slice(0, 12)}...
              </span>
            </span>
          </div>
        </div>

        <button
          onClick={() => fetchOne()}
          className="px-5 py-2 rounded-2xl bg-white/[0.05] border border-white/10 text-white font-bold hover:bg-white/[0.08] transition"
        >
          Refresh
        </button>
      </div>

      {/* Timeline cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <MiniCard
          title="Started"
          value={
            workflow.startedAt
              ? new Date(workflow.startedAt).toLocaleString()
              : "Unknown"
          }
          icon={<Clock size={16} />}
        />

        <MiniCard
          title="Finished"
          value={
            workflow.finishedAt
              ? new Date(workflow.finishedAt).toLocaleString()
              : "Not finished yet"
          }
          icon={
            workflow.status === "COMPLETED" ? (
              <CheckCircle2 size={16} />
            ) : workflow.status === "FAILED" ? (
              <AlertTriangle size={16} />
            ) : (
              <ClipboardList size={16} />
            )
          }
        />

        <MiniCard title="Epic ID" value={workflow.epicId} icon={<ClipboardList size={16} />} />
      </div>

      {/* Logs */}
      <div className="rounded-3xl bg-white/[0.04] border border-white/10 shadow-xl overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <p className="text-white font-black text-lg">Execution Logs</p>
            <p className="text-slate-400 text-sm mt-1">
              Stored as JSON from workflow engine.
            </p>
          </div>

          <button
            onClick={() => copyToClipboard(prettyLogs)}
            className="px-4 py-2 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition text-sm font-bold text-white flex items-center gap-2"
          >
            <Copy size={16} />
            Copy Logs
          </button>
        </div>

        <pre className="p-5 text-xs text-slate-200 overflow-auto max-h-[420px] leading-relaxed">
          {prettyLogs}
        </pre>
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
      <p className="text-sm text-white font-bold mt-3 break-all">{value}</p>
    </div>
  );
}
