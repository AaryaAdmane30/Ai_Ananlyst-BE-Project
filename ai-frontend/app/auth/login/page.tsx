"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, Loader2, ArrowRight, User, UserPlus, Briefcase } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle logic
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "DEVELOPER"
  });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // LOGIN LOGIC
        const res = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (res?.error) {
          toast.error("Galti hai! Credentials check karein.");
        } else {
          toast.success("Welcome back, Boss!");
          router.push("/dashboard");
          router.refresh();
        }
      } else {
        // SIGNUP LOGIC
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Signup failed");

        toast.success("Account ban gaya! Ab login karein.");
        setIsLogin(true); // Switch to login tab
      }
    } catch (err: any) {
      toast.error(err.message || "Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] selection:bg-blue-500/30 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[45%] h-[45%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[45%] h-[45%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md z-10 px-6">
        <div className="bg-gray-900/40 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
          
          {/* Custom Tabs */}
          <div className="flex bg-white/5 p-1.5 rounded-2xl mb-10 border border-white/5">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${isLogin ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Log In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${!isLogin ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Register
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white tracking-tight italic">
              {isLogin ? "Welcome Back" : "Join the Elite"}
            </h1>
            <p className="text-gray-400 mt-2 text-sm font-medium">
              {isLogin ? "Access your AI dashboard" : "Start your AI project journey"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    className="w-full bg-gray-800/30 border border-white/10 text-white pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:border-blue-500/50 transition-all"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full bg-gray-800/30 border border-white/10 text-white pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:border-blue-500/50 transition-all"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Select Role</label>
                <div className="relative group">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                  <select 
                    className="w-full bg-gray-800/30 border border-white/10 text-white pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="DEVELOPER" className="bg-[#030712]">Developer</option>
                    <option value="MANAGER" className="bg-[#030712]">Manager</option>
                  </select>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-800/30 border border-white/10 text-white pl-12 pr-12 py-3.5 rounded-2xl outline-none focus:border-blue-500/50 transition-all"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-black py-4 rounded-2xl shadow-xl hover:bg-blue-400 hover:text-white transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Get Started"} 
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-xs">
              Securely encrypted by AI Analyst Guard 🛡️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}