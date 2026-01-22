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
  Users2,
  ChevronRight,
  UserCircle2,
} from "lucide-react";

type Role = "ADMIN" | "MANAGER" | "DEVELOPER";

type TeamMember = {
  id: string;
  name?: string;
  email?: string;
  role?: Role;
  availabilityHours?: number;
  currentWorkload?: number;
  hourlyRate?: number;
  userId?: string;
  managerId?: string;
};

export default function TeamPage() {
  const router = useRouter();
  const { status: authStatus } = useSession();

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | Role>("ALL");

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"CREATE" | "EDIT">("CREATE");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "DEVELOPER" as Role,
    availabilityHours: 40,
    currentWorkload: 0,
    hourlyRate: 0,
  });

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/team-members");
      setMembers(res.data || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authStatus === "authenticated") fetchMembers();
    if (authStatus === "unauthenticated") router.push("/auth/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus]);

  const filteredMembers = useMemo(() => {
    return members
      .filter((m) => {
        if (filter === "ALL") return true;
        return (m.role || "DEVELOPER") === filter;
      })
      .filter((m) => {
        const text = `${m.name || ""} ${m.email || ""}`.toLowerCase();
        return text.includes(search.toLowerCase());
      });
  }, [members, search, filter]);

  const openCreate = () => {
    setMode("CREATE");
    setSelectedId(null);
    setForm({
      name: "",
      email: "",
      role: "DEVELOPER",
      availabilityHours: 40,
      currentWorkload: 0,
      hourlyRate: 0,
    });
    setOpen(true);
  };

  const openEdit = (m: TeamMember) => {
    setMode("EDIT");
    setSelectedId(m.id);
    setForm({
      name: m.name || "",
      email: m.email || "",
      role: (m.role || "DEVELOPER") as Role,
      availabilityHours: m.availabilityHours ?? 40,
      currentWorkload: m.currentWorkload ?? 0,
      hourlyRate: m.hourlyRate ?? 0,
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    try {
      await api.delete(`/team-members/${id}`);
      toast.success("Member deleted 🗑️");

      // ✅ refresh again (safe)
      await fetchMembers();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) return toast.error("Name is required");

    try {
      setSubmitting(true);

      if (mode === "CREATE") {
        await api.post("/team-members", {
          name: form.name,
          email: form.email || undefined,
          role: form.role,
          availabilityHours: Number(form.availabilityHours),
          currentWorkload: Number(form.currentWorkload),
          hourlyRate: Number(form.hourlyRate) || undefined,
        });

        toast.success("Member added ✅");
      } else {
        if (!selectedId) return toast.error("Member ID missing");

        await api.put(`/team-members/${selectedId}`, {
          name: form.name,
          email: form.email || undefined,
          role: form.role,
          availabilityHours: Number(form.availabilityHours),
          currentWorkload: Number(form.currentWorkload),
          hourlyRate: Number(form.hourlyRate) || undefined,
        });

        toast.success("Member updated ✅");
      }

      setOpen(false);

      // ✅ Most important part: refresh
      await fetchMembers();
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
        <p className="text-slate-400 font-semibold">Loading team...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[78vh] flex flex-col items-center justify-center text-center px-6">
        <p className="text-rose-300 font-bold">{error}</p>
        <button
          onClick={fetchMembers}
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
            Team Members
          </h1>
          <p className="text-slate-400 mt-1 font-medium">
            Manage roles, workload and availability.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-black font-black transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-sky-500/20"
        >
          <Plus size={18} />
          Add Member
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
            placeholder="Search members..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500/30 focus:bg-white/[0.05] transition"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {["ALL", "DEVELOPER", "MANAGER", "ADMIN"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-2xl border text-xs font-black transition ${
                filter === f
                  ? "bg-white/[0.08] border-white/10 text-white"
                  : "bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filteredMembers.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
          <Users2 className="mx-auto text-slate-500 mb-3" />
          <p className="text-white font-black text-xl">No members found</p>
          <p className="text-slate-400 mt-2">
            Add team members to assign tasks later.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMembers.map((m) => (
            <div
              key={m.id}
              className="p-5 rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition flex items-start justify-between gap-4"
            >
              <button
                onClick={() => router.push(`/dashboard/team/${m.id}`)}
                className="flex-1 text-left min-w-0"
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                    <UserCircle2 className="text-sky-300" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-white font-black truncate">
                      {m.name || "Unnamed"}
                    </p>
                    <p className="text-slate-400 text-sm mt-1 truncate">
                      {m.email || "No email"}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-bold text-slate-500">
                      <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                        Role:{" "}
                        <span className="text-sky-300">
                          {m.role || "DEVELOPER"}
                        </span>
                      </span>

                      <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                        Workload:{" "}
                        <span className="text-violet-300">
                          {m.currentWorkload ?? 0}
                        </span>
                      </span>

                      <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                        Hours:{" "}
                        <span className="text-emerald-300">
                          {m.availabilityHours ?? 40}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              <div className="flex items-start gap-2">
                <button
                  onClick={() => router.push(`/dashboard/team/${m.id}`)}
                  className="p-2 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition"
                  title="Open"
                >
                  <ChevronRight size={16} className="text-slate-300" />
                </button>

                <button
                  onClick={() => openEdit(m)}
                  className="p-2 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition"
                  title="Edit"
                >
                  <Pencil size={16} className="text-slate-300" />
                </button>

                <button
                  onClick={() => handleDelete(m.id)}
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
                  {mode === "CREATE" ? "Add Team Member" : "Edit Team Member"}
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Keep your workforce organized.
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
                  Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full mt-2 bg-white/[0.03] border border-white/10 text-white rounded-2xl px-4 py-3 outline-none focus:border-sky-500/30 focus:bg-white/[0.05] transition"
                  placeholder="Aarya"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Email (optional)
                </label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full mt-2 bg-white/[0.03] border border-white/10 text-white rounded-2xl px-4 py-3 outline-none focus:border-sky-500/30 focus:bg-white/[0.05] transition"
                  placeholder="name@mail.com"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                    Role
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) =>
                      setForm({ ...form, role: e.target.value as Role })
                    }
                    className="w-full mt-2 bg-white/[0.03] border border-white/10 text-white rounded-2xl px-4 py-3 outline-none focus:border-sky-500/30 transition"
                  >
                    <option value="DEVELOPER" className="bg-[#070A12]">
                      DEVELOPER
                    </option>
                    <option value="MANAGER" className="bg-[#070A12]">
                      MANAGER
                    </option>
                    <option value="ADMIN" className="bg-[#070A12]">
                      ADMIN
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                    Availability Hours
                  </label>
                  <input
                    type="number"
                    value={form.availabilityHours}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        availabilityHours: Number(e.target.value),
                      })
                    }
                    className="w-full mt-2 bg-white/[0.03] border border-white/10 text-white rounded-2xl px-4 py-3 outline-none focus:border-sky-500/30 transition"
                    placeholder="40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                    Current Workload
                  </label>
                  <input
                    type="number"
                    value={form.currentWorkload}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        currentWorkload: Number(e.target.value),
                      })
                    }
                    className="w-full mt-2 bg-white/[0.03] border border-white/10 text-white rounded-2xl px-4 py-3 outline-none focus:border-sky-500/30 transition"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                    Hourly Rate (₹)
                  </label>
                  <input
                    type="number"
                    value={form.hourlyRate}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        hourlyRate: Number(e.target.value),
                      })
                    }
                    className="w-full mt-2 bg-white/[0.03] border border-white/10 text-white rounded-2xl px-4 py-3 outline-none focus:border-sky-500/30 transition"
                    placeholder="0"
                  />
                </div>
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
                  "Create Member"
                ) : (
                  "Update Member"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
