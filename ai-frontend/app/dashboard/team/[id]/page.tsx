"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  Loader2,
  Trash2,
  Pencil,
  UserCircle2,
  Clock3,
  Briefcase,
  BadgeIndianRupee,
  ShieldCheck,
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
  preferences?: any;
  userId?: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function TeamMemberDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const rawId = (params as any)?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<TeamMember | null>(null);

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "DEVELOPER" as Role,
    availabilityHours: 40,
    currentWorkload: 0,
    hourlyRate: 0,
  });

  const fetchMember = async () => {
    if (!id) return;

    try {
      setLoading(true);

      const res = await api.get(`/team-members/${id}`);

      if (!res.data) {
        setMember(null);
        return;
      }

      setMember(res.data);

      setForm({
        name: res.data?.name || "",
        email: res.data?.email || "",
        role: (res.data?.role || "DEVELOPER") as Role,
        availabilityHours: res.data?.availabilityHours ?? 40,
        currentWorkload: res.data?.currentWorkload ?? 0,
        hourlyRate: res.data?.hourlyRate ?? 0,
      });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to load member");
      setMember(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      router.push("/dashboard/team");
      return;
    }
    fetchMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleUpdate = async () => {
    if (!form.name.trim()) return toast.error("Name is required");

    try {
      setSaving(true);

      await api.put(`/team-members/${id}`, {
        name: form.name,
        email: form.email || undefined,
        role: form.role,
        availabilityHours: Number(form.availabilityHours),
        currentWorkload: Number(form.currentWorkload),
        hourlyRate: Number(form.hourlyRate) || undefined,
      });

      toast.success("Member updated ✅");
      setEditing(false);
      await fetchMember();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!member) return;
    if (!confirm(`Delete ${member.name || "this member"}?`)) return;

    try {
      await api.delete(`/team-members/${id}`);
      toast.success("Member deleted 🗑️");
      router.push("/dashboard/team");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  const roleBadge = useMemo(() => {
    const role = form.role;

    if (role === "ADMIN")
      return "bg-rose-500/10 border-rose-500/20 text-rose-200";
    if (role === "MANAGER")
      return "bg-violet-500/10 border-violet-500/20 text-violet-200";
    return "bg-sky-500/10 border-sky-500/20 text-sky-200";
  }, [form.role]);

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-sky-300 mb-3" />
        <p className="text-slate-400 font-semibold">Loading member...</p>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <p className="text-slate-300 font-semibold">Member not found.</p>
        <button
          onClick={() => router.push("/dashboard/team")}
          className="mt-4 px-5 py-2 rounded-2xl bg-white/[0.05] border border-white/10 text-white font-semibold hover:bg-white/[0.08] transition active:scale-[0.98]"
        >
          Back to Team
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

      {/* Top */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.45 }}
        className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6"
      >
        <div className="min-w-0">
          <button
            onClick={() => router.push("/dashboard/team")}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-3 tracking-tight flex items-center gap-3 drop-shadow-[0_8px_40px_rgba(0,0,0,0.55)]">
            <span className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
              <UserCircle2 className="text-sky-300" />
            </span>
            <span className="truncate">{member.name || "Team Member"}</span>
          </h1>

          <p className="text-slate-400 mt-2">
            {member.email || "No email provided"}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400">
            <span className={`px-3 py-1 rounded-full border ${roleBadge}`}>
              {form.role}
            </span>

            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300">
              Availability:{" "}
              <span className="text-sky-200 font-extrabold">
                {form.availabilityHours}h
              </span>
            </span>

            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300">
              Workload:{" "}
              <span className="text-violet-200 font-extrabold">
                {form.currentWorkload}%
              </span>
            </span>

            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300">
              Rate:{" "}
              <span className="text-emerald-200 font-extrabold">
                ₹{form.hourlyRate}
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditing((p) => !p)}
            className="px-4 py-2.5 rounded-2xl bg-white/[0.05] border border-white/10 text-white font-semibold hover:bg-white/[0.08] transition flex items-center gap-2 active:scale-[0.98]"
          >
            <Pencil size={16} />
            {editing ? "Cancel" : "Edit"}
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-200 font-semibold hover:bg-rose-500/15 transition flex items-center gap-2 active:scale-[0.98]"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </motion.div>

      {/* Quick Stat Cards */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.45, delay: 0.06 }}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        <MiniStat
          title="Role"
          value={form.role}
          icon={<ShieldCheck size={16} />}
        />
        <MiniStat
          title="Availability"
          value={`${form.availabilityHours} hrs/week`}
          icon={<Clock3 size={16} />}
        />
        <MiniStat
          title="Workload"
          value={`${form.currentWorkload}%`}
          icon={<Briefcase size={16} />}
        />
        <MiniStat
          title="Hourly Rate"
          value={`₹ ${form.hourlyRate}`}
          icon={<BadgeIndianRupee size={16} />}
        />
      </motion.div>

      {/* Card */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.45, delay: 0.1 }}
        className="relative z-10 bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-[0_18px_80px_-40px_rgba(0,0,0,0.9)] space-y-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Name">
            <input
              disabled={!editing}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass(editing)}
            />
          </Field>

          <Field label="Email">
            <input
              disabled={!editing}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass(editing)}
            />
          </Field>

          <Field label="Role">
            <select
              disabled={!editing}
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value as Role })
              }
              className={inputClass(editing)}
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
          </Field>

          <Field label="Availability Hours">
            <input
              type="number"
              disabled={!editing}
              value={form.availabilityHours}
              onChange={(e) =>
                setForm({
                  ...form,
                  availabilityHours: Number(e.target.value),
                })
              }
              className={inputClass(editing)}
            />
          </Field>

          <Field label="Current Workload">
            <input
              type="number"
              disabled={!editing}
              value={form.currentWorkload}
              onChange={(e) =>
                setForm({ ...form, currentWorkload: Number(e.target.value) })
              }
              className={inputClass(editing)}
            />
          </Field>

          <Field label="Hourly Rate (₹)">
            <input
              type="number"
              disabled={!editing}
              value={form.hourlyRate}
              onChange={(e) =>
                setForm({ ...form, hourlyRate: Number(e.target.value) })
              }
              className={inputClass(editing)}
            />
          </Field>
        </div>

        {editing && (
          <button
            onClick={handleUpdate}
            disabled={saving}
            className="w-full px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-400 to-violet-400 hover:from-sky-300 hover:to-violet-300 text-black font-extrabold transition active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        )}
      </motion.div>
    </div>
  );
}

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
      <p className="text-lg font-extrabold text-white mt-2">{value}</p>
    </motion.div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function inputClass(editing: boolean) {
  return `w-full rounded-2xl px-4 py-3 outline-none transition border ${
    editing
      ? "bg-white/[0.03] border-white/10 text-white focus:border-sky-500/30 focus:bg-white/[0.05]"
      : "bg-white/[0.02] border-white/5 text-slate-300 opacity-90 cursor-not-allowed"
  }`;
}
