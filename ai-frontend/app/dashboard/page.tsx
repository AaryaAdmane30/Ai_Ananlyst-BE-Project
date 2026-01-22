"use client";

import { useEffect, useMemo, useState } from "react";
import { toast, Toaster } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  TrendingUp,
  Users,
  Target,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Loader2,
  Calendar,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";

import { fetchDashboardOverview } from "@/lib/api";

type RecentProject = {
  id: string;
  name: string;
  status?: "TODO" | "IN_PROGRESS" | "COMPLETED" | string | null;
  createdAt?: string | null;
};

type Overview = {
  totalProjects: number;
  activeTasks: number;
  teamMembers: number;
  unresolvedRisks: number;
  recentProjects: RecentProject[];
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const router = useRouter();
  const { status } = useSession();

  const [overview, setOverview] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchDashboardOverview();
      setOverview(data);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load dashboard data");
      setOverview(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") load();
  }, [status]);

  const stats = useMemo(() => {
    const unresolved = overview?.unresolvedRisks ?? 0;

    return [
      {
        label: "Total Projects",
        value: overview?.totalProjects ?? 0,
        icon: <Target className="text-sky-300" size={20} />,
        trend: "realtime",
        up: true,
      },
      {
        label: "Active Tasks",
        value: overview?.activeTasks ?? 0,
        icon: <TrendingUp className="text-emerald-300" size={20} />,
        trend: "in motion",
        up: true,
      },
      {
        label: "Team Members",
        value: overview?.teamMembers ?? 0,
        icon: <Users className="text-violet-300" size={20} />,
        trend: "available",
        up: true,
      },
      {
        label: "Risk Factors",
        value: unresolved,
        icon: <AlertCircle className="text-rose-300" size={20} />,
        trend: unresolved > 0 ? "needs review" : "stable",
        up: unresolved === 0,
      },
    ];
  }, [overview]);

  return (
    <div className="min-h-screen bg-[#05060B] text-white overflow-hidden">
      {/* Grid texture */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.07]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] [background-size:26px_26px]" />
      </div>

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-24 -left-24 w-[560px] h-[560px] rounded-full bg-sky-500/10 blur-[110px]" />
        <div className="absolute -bottom-32 -right-32 w-[620px] h-[620px] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-[0_6px_30px_rgba(0,0,0,0.6)]">
              Dashboard
            </h1>
            <p className="text-slate-300/90 mt-2">
              Real-time summary of projects, risks and team execution.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={load}
              className="px-5 py-2.5 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] text-sm font-semibold transition-all active:scale-[0.98]"
            >
              Refresh
            </button>

            <button
              onClick={() => router.push("/dashboard/projects")}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-400 to-violet-400 hover:from-sky-300 hover:to-violet-300 text-black text-sm font-extrabold flex items-center gap-2 shadow-lg shadow-sky-500/20 transition active:scale-[0.98]"
            >
              <Plus size={18} /> Create Project
            </button>
          </div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.45 }}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-5 flex items-center gap-3 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.85)]"
          >
            <Loader2 size={18} className="animate-spin text-sky-300" />
            <p className="text-sm text-slate-300 font-semibold">
              Syncing overview...
            </p>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !overview && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.45 }}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-10 text-center shadow-[0_18px_60px_-30px_rgba(0,0,0,0.85)]"
          >
            <p className="text-white font-extrabold text-xl">
              No dashboard data
            </p>
            <p className="text-slate-400 mt-2">
              Backend is not responding or session token missing.
            </p>
            <button
              onClick={load}
              className="mt-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-400 to-violet-400 hover:from-sky-300 hover:to-violet-300 text-black font-extrabold transition active:scale-[0.98]"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* Stats + Recent Projects */}
        {!!overview && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 hover:border-white/20 transition-all shadow-[0_18px_60px_-30px_rgba(0,0,0,0.85)] backdrop-blur"
                >
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                      {s.icon}
                    </div>

                    <div
                      className={`flex items-center gap-1 text-xs font-bold ${
                        s.up ? "text-emerald-300" : "text-rose-300"
                      }`}
                    >
                      {s.up ? (
                        <ArrowUpRight size={14} />
                      ) : (
                        <ArrowDownRight size={14} />
                      )}
                      {s.trend}
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-sm text-slate-400 font-semibold">
                      {s.label}
                    </p>
                    <p className="text-3xl font-extrabold mt-1">{s.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent projects */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-white/[0.03] border border-white/10 shadow-[0_18px_80px_-40px_rgba(0,0,0,0.9)] overflow-hidden backdrop-blur"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="text-sky-300" size={18} />
                  <h2 className="text-lg font-extrabold">Recent Projects</h2>
                </div>

                <button
                  onClick={() => router.push("/dashboard/projects")}
                  className="text-sm font-semibold text-sky-300 hover:text-white transition"
                >
                  View All
                </button>
              </div>

              <div className="divide-y divide-white/10">
                {overview?.recentProjects?.length ? (
                  overview.recentProjects.map((p, idx) => (
                    <motion.button
                      key={p.id}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.35, delay: idx * 0.03 }}
                      onClick={() => router.push(`/dashboard/projects/${p.id}`)}
                      className="w-full text-left p-6 hover:bg-white/[0.03] transition flex items-center justify-between"
                    >
                      <div>
                        <p className="text-white font-bold">{p.name}</p>

                        <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-400 font-semibold">
                          <span className="inline-flex items-center gap-2">
                            <Calendar size={14} />
                            {p.createdAt
                              ? new Date(p.createdAt).toLocaleDateString()
                              : "No date"}
                          </span>

                          <span
                            className={`px-2 py-1 rounded-full border text-[11px] font-extrabold uppercase tracking-widest ${
                              p.status === "COMPLETED"
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                                : p.status === "IN_PROGRESS"
                                ? "bg-sky-500/10 border-sky-500/20 text-sky-300"
                                : "bg-white/[0.04] border-white/10 text-slate-300"
                            }`}
                          >
                            {p.status || "TODO"}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className="text-slate-500" size={18} />
                    </motion.button>
                  ))
                ) : (
                  <div className="p-10 text-center">
                    <p className="text-slate-400 font-semibold">
                      No recent projects found.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}

        <Toaster position="bottom-right" richColors theme="dark" />
      </div>
    </div>
  );
}
