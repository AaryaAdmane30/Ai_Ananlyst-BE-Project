"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { api } from "@/lib/api";

import {
  Plus,
  Search,
  Loader2,
  X,
  Pencil,
  Trash2,
  Layers,
  ChevronRight,
} from "lucide-react";

type Epic = {
  id: string;
  title: string;
  description?: string;
  projectId: string;
};

export default function EpicsPage() {
  const router = useRouter();
  const { status: authStatus } = useSession();

  const [epics, setEpics] = useState<Epic[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("");

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"CREATE" | "EDIT">("CREATE");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    projectId: "",
  });

  const fetchEpics = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/epics");
      setEpics(res.data || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load epics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authStatus === "authenticated") fetchEpics();
    if (authStatus === "unauthenticated") router.push("/auth/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus]);

  const filteredEpics = useMemo(() => {
    return epics
      .filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase().trim())
      )
      .filter((e) => {
        if (!projectFilter.trim()) return true;
        return (e.projectId || "")
          .toLowerCase()
          .includes(projectFilter.toLowerCase().trim());
      });
  }, [epics, search, projectFilter]);

  const openCreate = () => {
    setMode("CREATE");
    setSelectedId(null);
    setForm({
      title: "",
      description: "",
      projectId: "",
    });
    setOpen(true);
  };

  const openEdit = (epic: Epic) => {
    setMode("EDIT");
    setSelectedId(epic.id);
    setForm({
      title: epic.title || "",
      description: epic.description || "",
      projectId: epic.projectId || "",
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this epic?")) return;

    try {
      await api.delete(`/epics/${id}`);
      toast.success("Epic deleted 🗑️");
      setEpics((prev) => prev.filter((e) => e.id !== id));
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim()) return toast.error("Epic title required");
    if (!form.projectId.trim()) return toast.error("Project ID required");

    try {
      setSubmitting(true);

      if (mode === "CREATE") {
        const res = await api.post("/epics", {
          title: form.title,
          description: form.description || undefined,
          projectId: form.projectId,
        });

        toast.success("Epic created ✅");
        setEpics((prev) => [res.data, ...prev]);
      } else {
        if (!selectedId) return toast.error("Epic ID missing");

        const res = await api.patch(`/epics/${selectedId}`, {
          title: form.title,
          description: form.description || undefined,
          projectId: form.projectId,
        });

        toast.success("Epic updated ✅");
        setEpics((prev) =>
          prev.map((e) => (e.id === selectedId ? res.data : e))
        );
      }

      setOpen(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Action failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[78vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-sky-400 mb-3" />
        <p className="text-slate-400 font-semibold">Loading epics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[78vh] flex flex-col items-center justify-center text-center px-6">
        <p className="text-rose-300 font-bold">{error}</p>

        <button
          onClick={fetchEpics}
          className="mt-4 px-6 py-3 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.10] text-white font-black transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Epics
          </h1>
          <p className="text-slate-400 mt-1 font-medium">
            Organize big milestones inside projects.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-black font-black transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-sky-500/20"
        >
          <Plus size={18} />
          Add Epic
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="relative w-full md:w-[380px] group">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-300 transition"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search epics..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500/30 focus:bg-white/[0.05] transition"
          />
        </div>

        <input
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          placeholder="Filter by projectId (optional)"
          className="w-full md:w-[320px] bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500/30 focus:bg-white/[0.05] transition"
        />
      </div>

      {/* List */}
      {filteredEpics.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
          <Layers className="mx-auto text-slate-500 mb-3" />
          <p className="text-white font-black text-xl">No epics found</p>
          <p className="text-slate-400 mt-2">
            Create an epic to structure your project workflow.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEpics.map((e) => (
            <div
              key={e.id}
              className="p-5 rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition flex items-start justify-between gap-4"
            >
              {/* Open details */}
              <button
                onClick={() => router.push(`/dashboard/epics/${e.id}`)}
                className="flex-1 text-left min-w-0"
              >
                <p className="text-white font-black truncate">{e.title}</p>
                <p className="text-slate-400 text-sm mt-1 line-clamp-2">
                  {e.description || "No description"}
                </p>

                <div className="mt-3 text-[11px] font-bold text-slate-500">
                  <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                    Project:{" "}
                    <span className="text-sky-300">
                      {e.projectId.slice(0, 8)}...
                    </span>
                  </span>
                </div>
              </button>

              <div className="flex items-start gap-2">
                <button
                  onClick={() => router.push(`/dashboard/epics/${e.id}`)}
                  className="p-2 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition"
                  title="Open"
                >
                  <ChevronRight size={16} className="text-slate-300" />
                </button>

                <button
                  onClick={() => openEdit(e)}
                  className="p-2 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition"
                  title="Edit"
                >
                  <Pencil size={16} className="text-slate-300" />
                </button>

                <button
                  onClick={() => handleDelete(e.id)}
                  className="p-2 rounded-2xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition"
                  title="Delete"
                >
                  <Trash2 size={16} className="text-rose-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => !submitting && setOpen(false)}
          />

          <div className="relative w-full max-w-lg rounded-[2rem] bg-[#0b1020] border border-white/10 shadow-2xl p-7">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-xl font-black text-white">
                  {mode === "CREATE" ? "Create Epic" : "Edit Epic"}
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Bigger goals → smaller tasks.
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
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Epic Title
                </label>
                <input
                  value={form.title}
                  onChange={(ev) => setForm({ ...form, title: ev.target.value })}
                  className="w-full mt-2 bg-white/[0.03] border border-white/10 text-white rounded-2xl px-4 py-3 outline-none focus:border-sky-500/30 focus:bg-white/[0.05] transition"
                  placeholder="Frontend Milestones"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Description (optional)
                </label>
                <textarea
                  value={form.description}
                  onChange={(ev) =>
                    setForm({ ...form, description: ev.target.value })
                  }
                  className="w-full mt-2 bg-white/[0.03] border border-white/10 text-white rounded-2xl px-4 py-3 outline-none focus:border-sky-500/30 focus:bg-white/[0.05] transition h-28 resize-none"
                  placeholder="Short details about this epic..."
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Project ID
                </label>
                <input
                  value={form.projectId}
                  onChange={(ev) =>
                    setForm({ ...form, projectId: ev.target.value })
                  }
                  className="w-full mt-2 bg-white/[0.03] border border-white/10 text-white rounded-2xl px-4 py-3 outline-none focus:border-sky-500/30 transition"
                  placeholder="project uuid"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-black font-black transition active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : mode === "CREATE" ? (
                  "Create Epic"
                ) : (
                  "Update Epic"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
