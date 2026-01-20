"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  FolderRoot, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Users2, 
  Wallet, 
  AlertOctagon,
  ChevronRight,
  Bell
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    { title: "Projects", href: "/dashboard/projects", icon: <FolderRoot size={20} /> },
    { title: "Epics", href: "/dashboard/epics", icon: <Layers size={20} /> },
    { title: "Tasks", href: "/dashboard/tasks", icon: <CheckCircle2 size={20} /> },
    { title: "AI Insights", href: "/dashboard/ai", icon: <Sparkles size={20} />, special: true },
    { title: "Team", href: "/dashboard/team", icon: <Users2 size={20} /> },
    { title: "Costs", href: "/dashboard/costs", icon: <Wallet size={20} /> },
    { title: "Risks", href: "/dashboard/risks", icon: <AlertOctagon size={20} /> },
  ];

  return (
    <aside className="w-72 min-h-screen bg-[#030712]/60 backdrop-blur-xl border-r border-white/5 p-6 flex flex-col sticky top-0">
      
      {/* Brand Logo */}
      <div className="mb-10 px-2">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
          AI Manager <span className="text-xs font-medium text-blue-500/50">PRO</span>
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-4 px-2">Main Menu</p>
        <ul className="space-y-2">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`${isActive ? "text-blue-400" : "text-gray-500 group-hover:text-blue-400 transition-colors"}`}>
                      {link.icon}
                    </span>
                    <span className="text-sm font-medium">{link.title}</span>
                  </div>
                  {isActive && <ChevronRight size={14} className="animate-pulse" />}
                  {link.special && !isActive && (
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30">New</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* --- Notifications Section Added Here --- */}
        <div className="pt-6">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-4 px-2">System</p>
          <Link
            href="/dashboard/notifications"
            className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
              pathname === "/dashboard/notifications" 
                ? "bg-white/10 text-white" 
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <Bell size={20} className="group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-medium">Notifications</span>
            </div>
            {/* Notification Badge - Real-time feeling */}
            <div className="flex items-center justify-center bg-rose-500 text-[10px] text-white font-bold w-5 h-5 rounded-full shadow-lg shadow-rose-500/20">
              3
            </div>
          </Link>
        </div>
      </nav>

      {/* User Footer Section */}
      <div className="mt-auto pt-6 border-t border-white/5">
        {session ? (
          <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/[0.02] border border-white/5 shadow-inner">
            <div className="relative">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt="user"
                  className="w-10 h-10 rounded-xl object-cover border border-white/10"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                  {session.user?.name?.[0] || "U"}
                </div>
              )}
              {/* Green Online Indicator */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#030712] rounded-full"></div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate leading-tight">
                {session.user?.name || "Member"}
              </p>
              <p className="text-[10px] text-gray-500 truncate lowercase">
                {session.user?.email}
              </p>
            </div>
          </div>
        ) : (
          <div className="h-12 w-full bg-white/5 rounded-xl animate-pulse" />
        )}
      </div>
    </aside>
  );
}