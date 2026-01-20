"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Rocket, BrainCircuit, LayoutList, Layers, ArrowRight, LogOut, User as UserIcon, Sparkles } from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession();

  const features = [
    { title: "Projects", desc: "AI-powered organization for all your active projects.", icon: <Rocket size={24} className="text-blue-400" />, color: "from-blue-600/10 to-blue-900/30", border: "border-blue-500/20" },
    { title: "Epics", desc: "Break down big goals into manageable milestones.", icon: <Layers size={24} className="text-purple-400" />, color: "from-purple-600/10 to-purple-900/30", border: "border-purple-500/20" },
    { title: "Tasks", desc: "Track every detail with precision and automated alerts.", icon: <LayoutList size={24} className="text-emerald-400" />, color: "from-emerald-600/10 to-emerald-900/30", border: "border-emerald-500/20" },
    { title: "AI Insights", desc: "Smart risk analysis and predictive project costings.", icon: <BrainCircuit size={24} className="text-pink-400" />, color: "from-pink-600/10 to-pink-900/30", border: "border-pink-500/20" },
  ];

  return (
    <main className="relative min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center overflow-hidden px-6 py-16">
      
      {/* Dynamic Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <section className="text-center max-w-4xl relative z-10 space-y-8">
        {/* Medium Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wide uppercase">
          <Sparkles size={14} className="animate-spin-slow" />
          V2.0 AI Insights is now active
        </div>

        {/* Medium Heading */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
          Build <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent italic">Projects</span> <br /> 
          Not Chaos
        </h1>

        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          The professional AI platform to plan, track, and deliver projects. 
          Manage teams, risks, and tasks with high-precision intelligence.
        </p>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col items-center gap-6">
          {status === "loading" ? (
            <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-md">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-400 font-bold text-sm">Syncing Session...</span>
            </div>
          ) : status === "authenticated" ? (
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-4 p-2 pr-6 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl">
                {session.user?.image ? (
                  <Image src={session.user.image} alt="User" width={40} height={40} className="rounded-full border border-blue-500/50" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
                    <UserIcon size={20} className="text-white" />
                  </div>
                )}
                <div className="text-left">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-tighter">Active Boss</p>
                  <p className="text-sm font-bold text-white leading-none">{session.user?.name}</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/dashboard" className="px-10 py-4 bg-white text-black hover:bg-blue-500 hover:text-white rounded-2xl font-black transition-all flex items-center gap-2 shadow-xl active:scale-95 text-sm">
                  GO TO DASHBOARD <ArrowRight size={18} />
                </Link>
                <button onClick={() => signOut()} className="px-10 py-4 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl font-bold transition-all flex items-center gap-2 active:scale-95 text-sm">
                  <LogOut size={18} /> LOGOUT
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/login" className="px-12 py-4.5 bg-blue-600 hover:bg-blue-500 rounded-2xl text-white font-black shadow-2xl shadow-blue-600/20 transition-all flex items-center gap-3 active:scale-95 group text-sm">
                GET STARTED FREE <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/auth/login" className="px-12 py-4.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl text-white font-black transition-all backdrop-blur-md active:scale-95 text-sm">
                VIEW DEMO
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Feature Grid - Medium Cards */}
      <section className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full z-10">
        {features.map((card, idx) => (
          <div key={card.title} className={`group relative p-8 rounded-[2rem] bg-gradient-to-br ${card.color} border ${card.border} backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}>
            <div className="mb-5 p-3.5 bg-gray-950/60 w-fit rounded-xl border border-white/5 group-hover:scale-110 transition-transform">
              {card.icon}
            </div>
            <h3 className="text-lg font-black mb-2 text-white tracking-tight">{card.title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed font-medium">{card.desc}</p>
            <span className="absolute top-6 right-8 text-white/5 font-black text-4xl italic pointer-events-none">0{idx + 1}</span>
          </div>
        ))}
      </section>
    </main>
  );
}