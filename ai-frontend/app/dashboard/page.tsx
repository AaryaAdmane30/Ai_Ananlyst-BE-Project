"use client";

import { useSession } from "next-auth/react";
import { 
  TrendingUp, 
  Users, 
  Target, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Plus
} from "lucide-react";

// Mock data - In production, fetch this from your NestJS API
const stats = [
  { label: "Total Projects", value: "24", icon: <Target className="text-blue-400" />, trend: "+12%", up: true },
  { label: "Active Tasks", value: "142", icon: <TrendingUp className="text-emerald-400" />, trend: "+5%", up: true },
  { label: "Team Members", value: "12", icon: <Users className="text-purple-400" />, trend: "0%", up: true },
  { label: "Risk Factors", value: "3", icon: <AlertCircle className="text-amber-400" />, trend: "-2%", up: false },
];

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome back, {session?.user?.name?.split(" ")[0] || "Bhai"}!
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Here is what is happening across your projects today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all">
            Download Report
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20">
            <Plus size={18} /> Create Project
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-gray-900/40 border border-white/5 p-6 rounded-3xl hover:border-white/10 transition-all group">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-emerald-400' : 'text-amber-400'}`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold mt-1 text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Project Activity Table */}
        <div className="lg:col-span-2 bg-gray-900/40 border border-white/5 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-lg font-bold">Recent Projects</h2>
            <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                  <th className="px-6 py-4 font-semibold">Project Name</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Progress</th>
                  <th className="px-6 py-4 font-semibold"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { name: "AI Content Engine", status: "In Progress", progress: 65, color: "bg-blue-500" },
                  { name: "Fintech Dashboard", status: "Review", progress: 90, color: "bg-purple-500" },
                  { name: "Mobile App Redesign", status: "Planning", progress: 15, color: "bg-amber-500" },
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-medium text-sm">{row.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider">
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full max-w-[100px] bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div className={`${row.color} h-full transition-all duration-1000`} style={{ width: `${row.progress}%` }} />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-500 hover:text-white transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Suggestions / Side Panel */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border border-blue-500/20 p-6 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
               <Target size={80} />
            </div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              AI Suggestion
            </h3>
            <p className="text-sm text-gray-300 mt-3 leading-relaxed">
              Bhai, Project **"AI Content Engine"** ka scope badh gaya hai. 2 aur team members assign karne se delivery 4 din pehle ho sakti hai.
            </p>
            <button className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-900/40 uppercase tracking-widest">
              Apply Optimization
            </button>
          </div>

          <div className="bg-gray-900/40 border border-white/5 p-6 rounded-3xl">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Team Activity</h3>
            <div className="mt-6 space-y-6">
              {[
                { name: "Rahul", action: "closed task", target: "Auth API", time: "2m ago" },
                { name: "Sameer", action: "created epic", target: "Payments", time: "1h ago" },
              ].map((act, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold">
                    {act.name[0]}
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">
                      <span className="font-bold text-white">{act.name}</span> {act.action} <span className="text-blue-400">{act.target}</span>
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}