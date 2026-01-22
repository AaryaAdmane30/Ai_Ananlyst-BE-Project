"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Loader2,
  ArrowRight,
  User,
  Briefcase,
  Sparkles,
} from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "DEVELOPER",
  });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const res = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (res?.error) {
          toast.error("Wrong credentials. Check email/password.");
        } else {
          toast.success("Welcome back ✅");
          router.push("/dashboard");
          router.refresh();
        }
      } else {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/auth/register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Signup failed");

        toast.success("Account created ✅ Now login");
        setIsLogin(true);
      }
    } catch (err: any) {
      toast.error(err.message || "Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B1020] via-[#070A12] to-[#05060B] text-white selection:bg-sky-500/30 relative overflow-hidden px-6">
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[15%] -left-[12%] w-[520px] h-[520px] bg-sky-500/10 rounded-full blur-[130px] animate-pulse" />
        <div className="absolute -bottom-[20%] -right-[12%] w-[560px] h-[560px] bg-violet-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="w-full max-w-md z-10">
        {/* Brand mini header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur">
            <Sparkles size={14} className="text-sky-400" />
            <span className="text-xs font-bold text-slate-300 tracking-wide">
              AI Analyst Framework
            </span>
          </div>
        </div>

        <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
          {/* Tabs */}
          <div className="flex bg-white/[0.03] p-1.5 rounded-2xl mb-8 border border-white/10">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-black rounded-xl transition-all ${
                isLogin
                  ? "bg-white/[0.10] text-white border border-white/10 shadow-inner"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Log In
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-black rounded-xl transition-all ${
                !isLogin
                  ? "bg-white/[0.10] text-white border border-white/10 shadow-inner"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Register
            </button>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black tracking-tight">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-slate-400 mt-2 text-sm font-semibold">
              {isLogin
                ? "Access your dashboard & manage work with AI insights"
                : "Start managing projects with cost + risk optimization"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {/* Name */}
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Full Name
                </label>

                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-sky-300 transition-colors" />
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    className="w-full bg-white/[0.03] border border-white/10 text-white placeholder:text-slate-500 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:border-sky-500/40 focus:bg-white/[0.05] transition-all"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                Email
              </label>

              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-sky-300 transition-colors" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full bg-white/[0.03] border border-white/10 text-white placeholder:text-slate-500 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:border-sky-500/40 focus:bg-white/[0.05] transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Role */}
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Select Role
                </label>

                <div className="relative group">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-sky-300 transition-colors" />
                  <select
                    className="w-full bg-white/[0.03] border border-white/10 text-white pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:border-sky-500/40 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  >
                    <option value="DEVELOPER" className="bg-[#070A12]">
                      Developer
                    </option>
                    <option value="MANAGER" className="bg-[#070A12]">
                      Manager
                    </option>
                  </select>
                </div>
              </div>
            )}

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                Password
              </label>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-sky-300 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/10 text-white placeholder:text-slate-500 pl-12 pr-12 py-3.5 rounded-2xl outline-none focus:border-sky-500/40 focus:bg-white/[0.05] transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
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
              className="w-full bg-sky-500 hover:bg-sky-400 text-black font-black py-4 rounded-2xl shadow-lg shadow-sky-500/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-xs font-semibold">
              Secured by AI Analyst Guard 🛡️
            </p>
          </div>
        </div>

        {/* Bottom tiny note */}
        <div className="mt-6 text-center text-[11px] text-slate-500 font-semibold">
          Built for final-year project • Clean UI • Real backend auth
        </div>
      </div>
    </div>
  );
}
