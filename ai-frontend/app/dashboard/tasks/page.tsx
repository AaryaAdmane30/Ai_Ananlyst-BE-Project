"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { useTaskStore } from "@/stores/useTaskStore";

import {
  Plus,
  Search,
  Loader2,
  X,
  Pencil,
  Trash2,
  ClipboardList,
  Layers,
  CheckCircle2,
} from "lucide-react";

type Status = "TODO" | "IN_PROGRESS" | "COMPLETED";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const pop = {
  hidden: { opacity: 0, scale: 0.96, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 10 },
};

export default function TasksPage() {
  const { status: authStatus } = useSession();
  const router = useRouter();

  const { tasks, loading, error, fetchAll, addTask, editTask, removeTask } =
    useTaskStore();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | Status>("ALL");

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"CREATE" | "EDIT">("CREATE");
  const [submitting, setSubmitting] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "TODO" as Status,
    projectId: "",
    epicId: "",
  });

  useEffect(() => {
    if (authStatus === "authenticated") {
      fetchAll().catch((e) => toast.error(e.message));
    }
    if (authStatus === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [authStatus, fetchAll, router]);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        if (filter === "ALL") return true;
        return t.status === filter;
      })
      .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));
  }, [tasks, search, filter]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const todo = tasks.filter((t) => t.status === "TODO").length;
    const prog = tasks.filter((t) => t.status === "IN_PROGRESS").length;
    const done = tasks.filter((t) => t.status === "COMPLETED").length;
    return { total, todo, prog, done };
  }, [tasks]);

  const openCreate = () => {
    setMode("CREATE");
    setSelectedId(null);
    setForm({
      title: "",
      description: "",
      status: "TODO",
      projectId: "",
      epicId: "",
    });
    setOpen(true);
  };

  const openEdit = (task: any) => {
    setMode("EDIT");
    setSelectedId(task.id);
    setForm({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "TODO",
      projectId: task.projectId || "",
      epicId: task.epicId || "",
    });
    setOpen(true);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Task title required");

    try {
      setSubmitting(true);

      if (mode === "CREATE") {
        await addTask({
          title: form.title,
          description: form.description,
          status: form.status,
          projectId: form.projectId || undefined,
          epicId: form.epicId || undefined,
        });
        toast.success("Task created ✅");
      } else {
        if (!selectedId) return toast.error("Task ID missing");
        await editTask(selectedId, {
          title: form.title,
          description: form.description,
          status: form.status,
          projectId: form.projectId || undefined,
          epicId: form.epicId || undefined,
        });
        toast.success("Task updated ✅");
      }

      setOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Action failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this task?")) return;
    try {
      await removeTask(id);
      toast.success("Task deleted 🗑️");
    } catch (err: any) {
      toast.error(err.message || "Delete failed");
    }
  };

  if (loading && tasks.length === 0) {
    return (
      <div className="h-[75vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-sky-300 mb-3" />
        <p className="text-slate-400 font-semibold">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[75vh] flex flex-col items-center justify-center text-center px-6">
        <p className="text-rose-300 font-bold">{error}</p>
        <button
          onClick={() => fetchAll()}
          className="mt-4 px-6 py-3 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.10] text-white font-extrabold transition active:scale-[0.98]"
        >
          Retry
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

      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.45 }}
        className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_8px_40px_rgba(0,0,0,0.55)]">
            Tasks
          </h1>
          <p className="text-slate-400 mt-1 font-medium">
            Monitor work items across epics & projects.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-400 to-violet-400 hover:from-sky-300 hover:to-violet-300 text-black font-extrabold transition-all active:scale-[0.98] flex items-center gap-2 shadow-lg shadow-sky-500/20"
        >
          <Plus size={18} />
          Add Task
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.45, delay: 0.06 }}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        <MiniStat title="Total" value={stats.total} icon={<ClipboardList size={16} />} />
        <MiniStat title="Todo" value={stats.todo} icon={<ClipboardList size={16} />} />
        <MiniStat title="In Progress" value={stats.prog} icon={<Layers size={16} />} />
        <MiniStat title="Completed" value={stats.done} icon={<CheckCircle2 size={16} />} />
      </motion.div>

      {/* Controls */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.45, delay: 0.1 }}
        className="relative z-10 flex flex-col md:flex-row gap-3 md:items-center md:justify-between"
      >
        <div className="relative w-full md:w-[380px] group">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-300 transition"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500/30 focus:bg-white/[0.05] transition"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {["ALL", "TODO", "IN_PROGRESS", "COMPLETED"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-2xl border text-xs font-extrabold transition-all active:scale-[0.98] ${
                filter === f
                  ? "bg-gradient-to-r from-sky-500/15 to-violet-500/15 border-sky-500/25 text-white shadow-[0_0_20px_rgba(56,189,248,0.10)]"
                  : "bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {f === "IN_PROGRESS" ? "In Progress" : f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* List */}
      <div className="relative z-10">
        {filteredTasks.length === 0 ? (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.45 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center shadow-[0_18px_60px_-30px_rgba(0,0,0,0.85)] backdrop-blur"
          >
            <p className="text-white font-extrabold text-xl">No tasks found</p>
            <p className="text-slate-400 mt-2">
              Create tasks for your project workflow.
            </p>

            <button
              onClick={openCreate}
              className="mt-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-400 to-violet-400 hover:from-sky-300 hover:to-violet-300 text-black font-extrabold transition active:scale-[0.98]"
            >
              Create your first task
            </button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((t, idx) => (
              <motion.div
                key={t.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                whileHover={{ y: -4 }}
                className="p-5 rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-all shadow-[0_18px_60px_-30px_rgba(0,0,0,0.85)] backdrop-blur flex items-start justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="text-white font-extrabold truncate">{t.title}</p>
                  <p className="text-slate-400 text-sm mt-1 line-clamp-2">
                    {t.description || "No description"}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-bold text-slate-500">
                    {t.projectId && (
                      <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                        Project:{" "}
                        <span className="text-sky-300">
                          {t.projectId.slice(0, 8)}...
                        </span>
                      </span>
                    )}
                    {t.epicId && (
                      <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                        Epic:{" "}
                        <span className="text-violet-300">
                          {t.epicId.slice(0, 8)}...
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <StatusBadge status={t.status} />

                  <button
                    onClick={() => router.push(`/dashboard/tasks/${t.id}`)}
                    className="px-3 py-2 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition text-xs font-extrabold text-sky-300 hover:text-white"
                  >
                    OPEN
                  </button>

                  <button
                    onClick={() => openEdit(t)}
                    className="p-2 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition"
                  >
                    <Pencil size={16} className="text-slate-300" />
                  </button>

                  <button
                    onClick={() => handleDelete(t.id)}
                    className="p-2 rounded-2xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition"
                  >
                    <Trash2 size={16} className="text-rose-300" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => !submitting && setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              variants={pop}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="relative w-full max-w-lg rounded-[2rem] bg-white/[0.03] border border-white/10 shadow-[0_22px_90px_-45px_rgba(0,0,0,0.95)] backdrop-blur-xl p-7"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-xl font-extrabold text-white">
                    {mode === "CREATE" ? "Create Task" : "Edit Task"}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Keep work structured.
                  </p>
                </div>

                <button
                  onClick={() => !submitting && setOpen(false)}
                  className="p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] transition"
                >
                  <X size={18} className="text-slate-300" />
                </button>
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">
                    Task Title
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full mt-2 bg-white/[0.03] border border-white/10 text-white rounded-2xl px-4 py-3 outline-none focus:border-sky-500/30 focus:bg-white/[0.05] transition"
                    placeholder="Implement dashboard"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full mt-2 bg-white/[0.03] border border-white/10 text-white rounded-2xl px-4 py-3 outline-none focus:border-sky-500/30 focus:bg-white/[0.05] transition h-28 resize-none"
                    placeholder="Optional details..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">
                      Status
                    </label>
                    <select
                      value={form.status}
                      onChange={(e) =>
                        setForm({ ...form, status: e.target.value as Status })
                      }
                      className="w-full mt-2 bg-white/[0.03] border border-white/10 text-white rounded-2xl px-4 py-3 outline-none focus:border-sky-500/30 transition"
                    >
                      <option value="TODO" className="bg-[#070A12]">
                        TODO
                      </option>
                      <option value="IN_PROGRESS" className="bg-[#070A12]">
                        IN PROGRESS
                      </option>
                      <option value="COMPLETED" className="bg-[#070A12]">
                        COMPLETED
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">
                      Project ID (optional)
                    </label>
                    <input
                      value={form.projectId}
                      onChange={(e) =>
                        setForm({ ...form, projectId: e.target.value })
                      }
                      className="w-full mt-2 bg-white/[0.03] border border-white/10 text-white rounded-2xl px-4 py-3 outline-none focus:border-sky-500/30 transition"
                      placeholder="project uuid"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">
                    Epic ID (optional)
                  </label>
                  <input
                    value={form.epicId}
                    onChange={(e) =>
                      setForm({ ...form, epicId: e.target.value })
                    }
                    className="w-full mt-2 bg-white/[0.03] border border-white/10 text-white rounded-2xl px-4 py-3 outline-none focus:border-sky-500/30 transition"
                    placeholder="epic uuid"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-400 to-violet-400 hover:from-sky-300 hover:to-violet-300 text-black font-extrabold transition active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : mode === "CREATE" ? (
                    "Create Task"
                  ) : (
                    "Update Task"
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.85)] backdrop-blur"
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-widest font-extrabold text-slate-500">
          {title}
        </p>

        <span className="w-8 h-8 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300">
          {icon}
        </span>
      </div>

      <p className="text-2xl font-extrabold text-white mt-2">{value}</p>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const styles =
    status === "COMPLETED"
      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
      : status === "IN_PROGRESS"
      ? "bg-sky-500/10 border-sky-500/20 text-sky-300"
      : "bg-white/[0.04] border-white/10 text-slate-300";

  return (
    <span
      className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${styles}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
