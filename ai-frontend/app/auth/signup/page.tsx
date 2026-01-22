"use client";

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Loader2,
  UserPlus,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("DEVELOPER");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill all details");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, role }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      toast.success("Account created ✅ Login now");
      router.push("/auth/login");
    } catch (err: any) {
      toast.error(err.message || "Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B1020] via-[#070A12] to-[#05060B] selection:bg-sky-500/30 text-white relative overflow-hidden px-6">
      {/* Glow background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[15%] -left-[15%] w-[560px] h-[560px] bg-sky-500/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute -bottom-[18%] -right-[15%] w-[620px] h-[620px] bg-violet-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="w-full max-w-md z-10">
        {/* Top Badge */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur">
            <Sparkles size={14} className="text-sky-400" />
            <span className="text-xs font-bold text-slate-300 tracking-wide">
              Project Manager AI • Register
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-violet-500 shadow-lg shadow-sky-500/20 text-white mb-4">
              <UserPlus size={26} />
            </div>

            <h1 className="text-3xl font-black tracking-tight">
              Create Account
            </h1>
            <p className="text-slate-400 mt-2 text-sm font-semibold">
              Start managing projects with AI cost & risk insights
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">
                Full Name
              </label>

              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-sky-300 transition-colors" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-white/[0.03] border border-white/10 text-white placeholder:text-slate-500 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:border-sky-500/40 focus:bg-white/[0.05] transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">
                Select Role
              </label>

              <div className="relative group">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-sky-300 transition-colors" />
                <select
                  className="w-full bg-white/[0.03] border border-white/10 text-white pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:border-sky-500/40 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="DEVELOPER" className="bg-[#070A12]">
                    Developer
                  </option>
                  <option value="MANAGER" className="bg-[#070A12]">
                    Manager
                  </option>
                  <option value="ADMIN" className="bg-[#070A12]">
                    Admin
                  </option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">
                Email
              </label>

              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-sky-300 transition-colors" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-white/[0.03] border border-white/10 text-white placeholder:text-slate-500 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:border-sky-500/40 focus:bg-white/[0.05] transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">
                Password
              </label>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-sky-300 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/10 text-white placeholder:text-slate-500 pl-12 pr-12 py-3.5 rounded-2xl outline-none focus:border-sky-500/40 focus:bg-white/[0.05] transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-400 text-black font-black py-4 rounded-2xl shadow-lg shadow-sky-500/20 transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-slate-400 text-sm font-semibold">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-sky-400 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>

        {/* Small bottom note */}
        <div className="mt-6 text-center text-[11px] text-slate-500 font-semibold">
          Secure registration • Role based access • Production style UI
        </div>
      </div>
    </div>
  );
}
