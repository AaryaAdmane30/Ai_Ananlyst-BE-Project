"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import {
  Plus,
  Loader2,
  FolderPlus,
  Search,
  Calendar,
  ChevronRight,
  Trash2,
  LayoutGrid,
  X,
} from "lucide-react";

import { useProjectStore } from "@/stores/useProjectStore";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const pop = {
  hidden: { opacity: 0, scale: 0.96, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 10 },
};

export default function ProjectsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { projects, loading, fetchAll, removeProject, addProject } =
    useProjectStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetchAll().catch(() => toast.error("Failed to fetch projects"));
    }
  }, [status, fetchAll]);

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) return toast.error("Please enter project name");

    // @ts-ignore
    const userId = session?.user?.id;
    if (!userId) return toast.error("Session expired. Please login again.");

    setIsSubmitting(true);
    try {
      await addProject({
        ...formData,
        managerId: userId,
        status: "TODO",
        laborCost: 0,
        reworkCost: 0,
        infrastructureCost: 0,
        totalSavings: 0,
      });

      toast.success("Project created ✅");
      setIsModalOpen(false);
      setFormData({ name: "", description: "" });
    } catch (err: any) {
      toast.error(err.message || "Failed to create project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      await removeProject(id);
      toast.success("Project deleted");
    } catch {
      toast.error("Failed to delete project");
    }
  };

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

      <div className="relative z-10 p-8 max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-[0_8px_40px_rgba(0,0,0,0.55)]">
              Projects
            </h1>
            <p className="text-slate-300/90 mt-2">
              Manage your AI-assisted development cycles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-300 transition"
                size={18}
              />
              <input
                type="text"
                placeholder="Search projects..."
                className="bg-white/[0.04] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500/40 focus:bg-white/[0.06] w-64 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Create */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-sky-400 to-violet-400 hover:from-sky-300 hover:to-violet-300 text-black px-6 py-2.5 rounded-2xl font-extrabold text-sm transition-all flex items-center gap-2 shadow-lg shadow-sky-500/20 active:scale-[0.98]"
            >
              <Plus size={18} /> CREATE
            </button>
          </div>
        </motion.div>

        {/* Loading */}
        {loading && projects.length === 0 ? (
          <div className="h-[65vh] flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 text-sky-300 animate-spin mb-4" />
            <p className="text-slate-400 font-bold animate-pulse">
              Syncing Projects...
            </p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.45 }}
            className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] py-24 flex flex-col items-center justify-center shadow-[0_18px_60px_-30px_rgba(0,0,0,0.85)] backdrop-blur"
          >
            <div className="bg-sky-500/10 p-6 rounded-full mb-6 border border-sky-500/20">
              <FolderPlus className="text-sky-300" size={40} />
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              No projects found
            </h3>
            <p className="text-slate-400 mt-2 text-center max-w-sm">
              Create a new project workspace to begin planning.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-7 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-400 to-violet-400 hover:from-sky-300 hover:to-violet-300 text-black font-extrabold transition active:scale-[0.98]"
            >
              Create your first project
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.45, delay: 0.05 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((p, idx) => (
              <motion.div
                key={p.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                whileHover={{ y: -6 }}
                className="group relative bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 hover:border-sky-500/30 transition-all duration-300 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.85)] overflow-hidden backdrop-blur"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleDelete(p.id, p.name)}
                    className="text-slate-500 hover:text-rose-300 transition"
                    title="Delete project"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="mb-6 bg-white/[0.03] border border-white/10 w-fit p-3 rounded-2xl">
                  <LayoutGrid className="text-sky-300" size={22} />
                </div>

                <h3 className="text-xl font-extrabold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                  {p.name}
                </h3>

                <p className="text-slate-400 text-sm mt-3 line-clamp-2 leading-relaxed font-medium">
                  {p.description ||
                    "Define scope, track execution, and optimize with AI insights."}
                </p>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                    <Calendar size={12} />
                    {new Date().toLocaleDateString()}
                  </div>

                  <button
                    onClick={() => router.push(`/dashboard/projects/${p.id}`)}
                    className="flex items-center gap-2 text-xs font-extrabold text-sky-300 hover:text-white transition-colors"
                  >
                    OPEN <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
                onClick={() => !isSubmitting && setIsModalOpen(false)}
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
                className="relative bg-white/[0.03] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-10 shadow-[0_22px_90px_-45px_rgba(0,0,0,0.95)] backdrop-blur-xl"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-3xl font-extrabold text-white mb-1">
                      New Project
                    </h2>
                    <p className="text-slate-400 font-medium">
                      Create a workspace and track cost insights.
                    </p>
                  </div>

                  <button
                    onClick={() => !isSubmitting && setIsModalOpen(false)}
                    className="p-2 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition active:scale-[0.98]"
                  >
                    <X size={18} className="text-slate-300" />
                  </button>
                </div>

                <form onSubmit={handleCreate} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">
                      Title
                    </label>
                    <input
                      autoFocus
                      className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 focus:border-sky-500/40 focus:outline-none transition-all"
                      placeholder="Software Alpha 2.0"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">
                      Brief Description
                    </label>
                    <textarea
                      className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 focus:border-sky-500/40 focus:outline-none transition-all h-32 resize-none"
                      placeholder="Describe goals and expected outcome..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-sky-400 to-violet-400 hover:from-sky-300 hover:to-violet-300 py-5 rounded-2xl text-black font-extrabold transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "CREATE PROJECT"
                    )}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Toaster position="bottom-right" richColors theme="dark" />
      </div>
    </div>
  );
}
