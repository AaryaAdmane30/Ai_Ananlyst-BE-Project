"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Rocket,
  BrainCircuit,
  LayoutList,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Shield,
  BarChart3,
  User as UserIcon,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Home() {
  const { data: session, status } = useSession();

  const features = [
    {
      title: "Projects",
      desc: "Plan and manage projects with clean timelines and ownership.",
      icon: <Rocket size={22} className="text-sky-300" />,
    },
    {
      title: "Epics",
      desc: "Break big goals into milestones and track progress smoothly.",
      icon: <Layers size={22} className="text-violet-300" />,
    },
    {
      title: "Tasks",
      desc: "Track tasks with status, priority, due dates and accountability.",
      icon: <LayoutList size={22} className="text-emerald-300" />,
    },
    {
      title: "AI Insights",
      desc: "Identify risks and optimize cost with smart recommendations.",
      icon: <BrainCircuit size={22} className="text-rose-300" />,
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#05060B] text-white overflow-hidden">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] [background-size:26px_26px]" />
      </div>

      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 -left-28 w-[560px] h-[560px] rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-[620px] h-[620px] rounded-full bg-violet-500/10 blur-[130px]" />
      </div>

      {/* NAVBAR (Sticky) */}
      <header className="sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 pt-6 pb-4">
          <motion.nav
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl px-5 py-4 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.8)]"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-400/90 to-violet-400/90 flex items-center justify-center shadow-md shadow-sky-500/20">
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
            <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-300">
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
                    className="px-4 py-2.5 bg-white/[0.06] hover:bg-white/[0.09] border border-white/10 text-white rounded-2xl text-sm font-semibold transition-all active:scale-[0.98]"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => signOut()}
                    className="px-4 py-2.5 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/15 text-rose-200 rounded-2xl text-sm font-semibold transition-all active:scale-[0.98]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="px-4 py-2.5 bg-white/[0.06] hover:bg-white/[0.09] border border-white/10 text-slate-200 rounded-2xl text-sm font-semibold transition-all active:scale-[0.98]"
                  >
                    Login
                  </Link>

                  <Link
                    href="/auth/login"
                    className="px-4 py-2.5 bg-gradient-to-r from-sky-400 to-violet-400 hover:from-sky-300 hover:to-violet-300 text-black rounded-2xl text-sm font-extrabold transition-all shadow-lg shadow-sky-500/20 active:scale-[0.98]"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-7">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 text-xs font-semibold tracking-wide shadow-sm backdrop-blur"
            >
              <Sparkles size={14} className="text-sky-300" />
              AI Analyst Framework • v2.0
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.55, delay: 0.06 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
            >
              Run Projects like a{" "}
              <span className="bg-gradient-to-r from-sky-300 via-violet-300 to-rose-300 bg-clip-text text-transparent">
                Professional
              </span>
              .
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-slate-300/90 text-base md:text-lg leading-relaxed max-w-xl"
            >
              Manage projects, tasks, risks and costs in one place. Get AI
              suggestions to reduce rework and improve delivery speed — without
              chaos.
            </motion.p>

            {/* Quick points */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.55, delay: 0.14 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <div className="flex items-center gap-2 text-sm text-slate-100 font-semibold">
                <CheckCircle2 className="text-emerald-300" size={18} />
                Real-time project tracking
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-100 font-semibold">
                <Shield className="text-violet-300" size={18} />
                Role-based secure access
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-100 font-semibold">
                <BarChart3 className="text-sky-300" size={18} />
                Cost & risk analytics
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-100 font-semibold">
                <BrainCircuit className="text-rose-300" size={18} />
                AI optimization insights
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.55, delay: 0.18 }}
              className="flex flex-col sm:flex-row gap-3 pt-3"
            >
              {status === "loading" ? (
                <div className="flex items-center gap-3 bg-white/[0.05] px-6 py-3 rounded-2xl border border-white/10 backdrop-blur">
                  <div className="w-5 h-5 border-2 border-sky-300 border-t-transparent rounded-full animate-spin" />
                  <span className="text-slate-300 font-semibold text-sm">
                    Syncing session...
                  </span>
                </div>
              ) : status === "authenticated" ? (
                <>
                  <Link
                    href="/dashboard"
                    className="px-8 py-3.5 bg-gradient-to-r from-sky-400 to-violet-400 hover:from-sky-300 hover:to-violet-300 text-black rounded-2xl font-extrabold transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-[0.98] text-sm"
                  >
                    Go to Dashboard <ArrowRight size={18} />
                  </Link>

                  <div className="flex items-center gap-3 px-4 py-3.5 bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur">
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
                    className="px-8 py-3.5 bg-gradient-to-r from-sky-400 to-violet-400 hover:from-sky-300 hover:to-violet-300 text-black rounded-2xl font-extrabold transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-[0.98] text-sm"
                  >
                    Get Started <ArrowRight size={18} />
                  </Link>

                  <Link
                    href="/auth/login"
                    className="px-8 py-3.5 bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] text-white rounded-2xl font-semibold transition-all active:scale-[0.98] text-sm text-center"
                  >
                    View Demo
                  </Link>
                </>
              )}
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            id="preview"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="bg-white/[0.03] border border-white/10 rounded-3xl shadow-[0_18px_80px_-40px_rgba(0,0,0,0.85)] backdrop-blur p-5"
            >
              {/* Fake Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                </div>
                <p className="text-xs font-bold text-slate-400">
                  Dashboard Preview
                </p>
              </div>

              {/* Fake dashboard blocks */}
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="text-xs font-bold text-slate-400">
                    Total Projects
                  </p>
                  <p className="text-2xl font-extrabold text-white mt-2">12</p>
                  <p className="text-[11px] text-slate-400 mt-1">+2 this week</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="text-xs font-bold text-slate-400">
                    Active Tasks
                  </p>
                  <p className="text-2xl font-extrabold text-white mt-2">48</p>
                  <p className="text-[11px] text-slate-400 mt-1">8 in progress</p>
                </div>

                <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
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
                      <div className="h-full w-[72%] bg-gradient-to-r from-sky-400 to-violet-400 rounded-full" />
                    </div>
                    <p className="text-[11px] font-bold text-slate-400">72%</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Glow */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-72 h-72 rounded-full bg-sky-500/10 blur-[90px]" />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="relative z-10 max-w-6xl mx-auto px-6 py-10"
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mb-7"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Everything you need to ship faster
          </h2>
          <p className="text-slate-300/90 mt-2 max-w-2xl">
            Designed for final-year projects and real teams — structured, fast,
            and clean.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((card, idx) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: idx * 0.04 }}
              whileHover={{ y: -6 }}
              className="group bg-white/[0.03] border border-white/10 rounded-3xl p-7 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.8)] hover:bg-white/[0.045] transition-all backdrop-blur"
            >
              <div className="mb-5 p-3 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 w-fit rounded-2xl group-hover:scale-[1.06] transition-transform">
                {card.icon}
              </div>

              <h3 className="text-base font-extrabold text-white tracking-tight">
                {card.title}
              </h3>

              <p className="text-slate-300/90 text-sm mt-2 leading-relaxed">
                {card.desc}
              </p>

              <div className="mt-6 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                Feature 0{idx + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section
        id="trust"
        className="relative z-10 max-w-6xl mx-auto px-6 py-10"
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur shadow-[0_18px_60px_-30px_rgba(0,0,0,0.8)] p-8"
        >
          <h3 className="text-lg font-extrabold text-white">
            Trusted by teams who love clarity
          </h3>
          <p className="text-slate-300/90 mt-2">
            Built for engineering workflows: tasks → epics → projects → insights.
          </p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["Startup Teams", "College Projects", "Product Teams", "Agile Squads"].map(
              (t) => (
                <div
                  key={t}
                  className="rounded-2xl bg-white/[0.02] border border-white/10 px-4 py-4 text-center hover:bg-white/[0.04] transition"
                >
                  <p className="text-sm font-bold text-slate-100">{t}</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Optimized workflows
                  </p>
                </div>
              )
            )}
          </div>
        </motion.div>
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
