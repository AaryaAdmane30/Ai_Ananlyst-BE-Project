"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api";

import {
  ArrowLeft,
  Loader2,
  Trash2,
  Pencil,
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
  preferences?: any;
  userId?: string;
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

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-sky-400 mb-3" />
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
          className="mt-4 px-5 py-2 rounded-2xl bg-white/[0.05] border border-white/10 text-white font-bold hover:bg-white/[0.08] transition"
        >
          Back to Team
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <button
            onClick={() => router.push("/dashboard/team")}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <h1 className="text-3xl md:text-4xl font-black text-white mt-3 tracking-tight flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
              <UserCircle2 className="text-sky-300" />
            </span>
            {member.name || "Team Member"}
          </h1>

          <p className="text-slate-400 mt-2">
            {member.email || "No email provided"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditing((p) => !p)}
            className="px-4 py-2 rounded-2xl bg-white/[0.05] border border-white/10 text-white font-bold hover:bg-white/[0.08] transition flex items-center gap-2"
          >
            <Pencil size={16} />
            {editing ? "Cancel" : "Edit"}
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 font-bold hover:bg-rose-500/15 transition flex items-center gap-2"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-5">
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
            className="w-full px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-black font-black transition active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
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
      </div>
    </div>
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
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
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
