"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  Rocket,
  BrainCircuit,
  LayoutList,
  Layers,
  ArrowRight,
  LogOut,
  User as UserIcon,
  Sparkles,
  CheckCircle2,
  Shield,
  BarChart3,
} from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession();

  const features = [
    {
      title: "Projects",
      desc: "Plan and manage projects with clean timelines and ownership.",
      icon: <Rocket size={22} className="text-sky-400" />,
    },
    {
      title: "Epics",
      desc: "Break big goals into milestones and track progress smoothly.",
      icon: <Layers size={22} className="text-violet-400" />,
    },
    {
      title: "Tasks",
      desc: "Track tasks with status, priority, due dates and accountability.",
      icon: <LayoutList size={22} className="text-emerald-400" />,
    },
    {
      title: "AI Insights",
      desc: "Identify risks and optimize cost with smart recommendations.",
      icon: <BrainCircuit size={22} className="text-rose-400" />,
    },
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#0B1020] via-[#070A12] to-[#05060B] text-white overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 -left-28 w-[560px] h-[560px] rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-[620px] h-[620px] rounded-full bg-violet-500/10 blur-[130px]" />
      </div>

      {/* NAVBAR */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 pt-8">
        <nav className="flex items-center justify-between rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl px-5 py-4 shadow-2xl">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-sky-500/90 to-violet-500/90 flex items-center justify-center shadow-md shadow-sky-500/20">
              <Sparkles size={16} className="text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-extrabold text-white tracking-tight">
                Project Manager AI
              </p>
              <p className="text-[11px] text-slate-400 font-semibold">
                Cost Optimization • Risk Insights
              </p>
            </div>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#preview" className="hover:text-white transition">
              Preview
            </a>
            <a href="#trust" className="hover:text-white transition">
              Trusted
            </a>
          </div>

          {/* Auth */}
          <div className="flex items-center gap-3">
            {status === "authenticated" ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white rounded-2xl text-sm font-bold transition shadow-sm active:scale-95"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/15 text-rose-200 rounded-2xl text-sm font-bold transition shadow-sm active:scale-95"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/10 text-slate-200 rounded-2xl text-sm font-bold transition shadow-sm active:scale-95"
                >
                  Login
                </Link>

                <Link
                  href="/auth/login"
                  className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-black rounded-2xl text-sm font-black transition shadow-lg shadow-sky-500/20 active:scale-95"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 text-slate-300 text-xs font-semibold tracking-wide shadow-sm backdrop-blur">
              <Sparkles size={14} className="text-sky-400" />
              AI Analyst Framework • v2.0
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-white">
              Run Projects like a{" "}
              <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-rose-400 bg-clip-text text-transparent">
                Professional
              </span>
              .
            </h1>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl">
              Manage projects, tasks, risks and costs in one place. Get AI
              suggestions to reduce rework and improve delivery speed — without
              chaos.
            </p>

            {/* Quick points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-200 font-semibold">
                <CheckCircle2 className="text-emerald-400" size={18} />
                Real-time project tracking
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-200 font-semibold">
                <Shield className="text-violet-400" size={18} />
                Role-based secure access
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-200 font-semibold">
                <BarChart3 className="text-sky-400" size={18} />
                Cost & risk analytics
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-200 font-semibold">
                <BrainCircuit className="text-rose-400" size={18} />
                AI optimization insights
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {status === "loading" ? (
                <div className="flex items-center gap-3 bg-white/[0.05] px-6 py-3 rounded-2xl border border-white/10 backdrop-blur">
                  <div className="w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-slate-300 font-semibold text-sm">
                    Syncing session...
                  </span>
                </div>
              ) : status === "authenticated" ? (
                <>
                  <Link
                    href="/dashboard"
                    className="px-8 py-3.5 bg-sky-500 hover:bg-sky-400 text-black rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-95 text-sm"
                  >
                    Go to Dashboard <ArrowRight size={18} />
                  </Link>

                  <div className="flex items-center gap-3 px-4 py-3.5 bg-white/[0.05] border border-white/10 rounded-2xl backdrop-blur">
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="User"
                        width={36}
                        height={36}
                        className="rounded-xl border border-white/10"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                        <UserIcon size={16} className="text-slate-200" />
                      </div>
                    )}
                    <div className="text-left leading-tight">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Signed in
                      </p>
                      <p className="text-sm font-bold text-white">
                        {session?.user?.name}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="px-8 py-3.5 bg-sky-500 hover:bg-sky-400 text-black rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-95 text-sm"
                  >
                    Get Started <ArrowRight size={18} />
                  </Link>

                  <Link
                    href="/auth/login"
                    className="px-8 py-3.5 bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] text-white rounded-2xl font-bold transition-all active:scale-95 text-sm text-center"
                  >
                    View Demo
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right: Product Preview */}
          <div id="preview" className="relative">
            <div className="bg-white/[0.04] border border-white/10 rounded-3xl shadow-2xl backdrop-blur p-5">
              {/* Fake Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <p className="text-xs font-bold text-slate-400">
                  Dashboard Preview
                </p>
              </div>

              {/* Fake dashboard blocks */}
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-bold text-slate-400">Total Projects</p>
                  <p className="text-2xl font-extrabold text-white mt-2">12</p>
                  <p className="text-[11px] text-slate-400 mt-1">+2 this week</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-bold text-slate-400">Active Tasks</p>
                  <p className="text-2xl font-extrabold text-white mt-2">48</p>
                  <p className="text-[11px] text-slate-400 mt-1">8 in progress</p>
                </div>

                <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-bold text-slate-400">
                    AI Suggestion
                  </p>
                  <p className="text-sm text-slate-200 mt-2 leading-relaxed">
                    Reduce rework cost by improving code review checklist.
                    Estimated savings:{" "}
                    <b className="text-white">₹12,000</b> this sprint.
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-[72%] bg-sky-400 rounded-full" />
                    </div>
                    <p className="text-[11px] font-bold text-slate-400">72%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle glow */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-72 h-72 rounded-full bg-sky-500/10 blur-[90px]" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Everything you need to ship faster
          </h2>
          <p className="text-slate-300 mt-2 max-w-2xl">
            Designed for final-year projects and real teams — structured, fast,
            and clean.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((card, idx) => (
            <div
              key={card.title}
              className="group bg-white/[0.04] border border-white/10 rounded-3xl p-7 shadow-xl hover:shadow-2xl transition-all backdrop-blur"
            >
              <div className="mb-5 p-3 bg-white/[0.03] border border-white/10 w-fit rounded-2xl group-hover:scale-105 transition-transform">
                {card.icon}
              </div>

              <h3 className="text-base font-extrabold text-white tracking-tight">
                {card.title}
              </h3>

              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                {card.desc}
              </p>

              <div className="mt-6 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                Feature 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section id="trust" className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        <div className="rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur shadow-xl p-8">
          <h3 className="text-lg font-extrabold text-white">
            Trusted by teams who love clarity
          </h3>
          <p className="text-slate-300 mt-2">
            Built for engineering workflows: tasks → epics → projects → insights.
          </p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["Startup Teams", "College Projects", "Product Teams", "Agile Squads"].map(
              (t) => (
                <div
                  key={t}
                  className="rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-4 text-center"
                >
                  <p className="text-sm font-bold text-slate-100">{t}</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Optimized workflows
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 max-w-6xl mx-auto px-6 pb-10 pt-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p className="font-semibold">
            © {new Date().getFullYear()} Project Manager AI — Built for delivery.
          </p>

          <div className="flex items-center gap-4 font-semibold">
            <Link href="/auth/login" className="hover:text-white transition">
              Login
            </Link>
            <Link href="/dashboard" className="hover:text-white transition">
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
