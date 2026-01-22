// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { useState } from "react";

// import {
//   FolderRoot,
//   Layers,
//   CheckCircle2,
//   Sparkles,
//   Users2,
//   Wallet,
//   AlertOctagon,
//   ChevronRight,
//   Bell,
//   PanelLeftClose,
//   PanelLeftOpen,
// } from "lucide-react";

// export default function Sidebar() {
//   const pathname = usePathname();
//   const { data: session } = useSession();
//   const [collapsed, setCollapsed] = useState(false);

//   const links = [
//     { title: "Projects", href: "/dashboard/projects", icon: <FolderRoot size={18} /> },
//     { title: "Epics", href: "/dashboard/epics", icon: <Layers size={18} /> },
//     { title: "Tasks", href: "/dashboard/tasks", icon: <CheckCircle2 size={18} /> },
//     { title: "AI Insights", href: "/dashboard/ai", icon: <Sparkles size={18} />, special: true },
//     { title: "Team", href: "/dashboard/team", icon: <Users2 size={18} /> },
//     { title: "Costs", href: "/dashboard/costs", icon: <Wallet size={18} /> },
//     { title: "Risks", href: "/dashboard/risks", icon: <AlertOctagon size={18} /> },
//   ];

//   return (
//     <aside
//       className={`min-h-screen sticky top-0 border-r border-white/10 bg-white/[0.03] backdrop-blur-xl flex flex-col transition-all duration-300 ${
//         collapsed ? "w-20 p-4" : "w-72 p-6"
//       }`}
//     >
//       {/* Brand + Collapse Toggle */}
//       <div className={`mb-8 flex items-center justify-between ${collapsed ? "px-0" : "px-1"}`}>
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500/90 to-violet-500/90 flex items-center justify-center shadow-lg shadow-sky-500/20">
//             <span className="text-white font-black text-xs tracking-wider">AI</span>
//           </div>

//           {!collapsed && (
//             <div className="leading-tight">
//               <p className="text-sm font-extrabold tracking-tight text-white">
//                 AI Manager
//               </p>
//               <p className="text-[11px] font-semibold text-slate-400">
//                 Pro Dashboard
//               </p>
//             </div>
//           )}
//         </div>

//         <button
//           onClick={() => setCollapsed((p) => !p)}
//           className="p-2 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition"
//         >
//           {collapsed ? (
//             <PanelLeftOpen size={18} className="text-slate-200" />
//           ) : (
//             <PanelLeftClose size={18} className="text-slate-200" />
//           )}
//         </button>
//       </div>

//       {/* Nav */}
//       <nav className="flex-1">
//         {!collapsed && (
//           <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black mb-4 px-2">
//             Main Menu
//           </p>
//         )}

//         <ul className="space-y-2">
//           {links.map((link) => {
//             const isActive = pathname.startsWith(link.href);

//             return (
//               <li key={link.href}>
//                 <Link
//                   href={link.href}
//                   title={collapsed ? link.title : undefined}
//                   className={`group flex items-center justify-between transition-all duration-200 border ${
//                     collapsed ? "px-3 py-3 rounded-2xl" : "px-4 py-3 rounded-2xl"
//                   } ${
//                     isActive
//                       ? "bg-white/[0.06] border-sky-500/25 text-white shadow-[0_0_25px_rgba(56,189,248,0.10)]"
//                       : "bg-transparent border-transparent text-slate-300 hover:bg-white/[0.05] hover:border-white/10 hover:text-white"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <span
//                       className={`transition-colors ${
//                         isActive
//                           ? "text-sky-400"
//                           : "text-slate-500 group-hover:text-sky-300"
//                       }`}
//                     >
//                       {link.icon}
//                     </span>

//                     {!collapsed && (
//                       <span className="text-sm font-bold">{link.title}</span>
//                     )}
//                   </div>

//                   {!collapsed && isActive && (
//                     <ChevronRight size={16} className="text-sky-300 animate-pulse" />
//                   )}

//                   {!collapsed && link.special && !isActive && (
//                     <span className="text-[10px] bg-violet-500/15 text-violet-300 px-2 py-0.5 rounded-full border border-violet-500/25 font-bold">
//                       New
//                     </span>
//                   )}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>

//         {/* Notifications */}
//         <div className="pt-6">
//           {!collapsed && (
//             <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black mb-4 px-2">
//               System
//             </p>
//           )}

//           <Link
//             href="/dashboard/notifications"
//             title={collapsed ? "Notifications" : undefined}
//             className={`group flex items-center justify-between transition-all duration-200 border ${
//               collapsed ? "px-3 py-3 rounded-2xl" : "px-4 py-3 rounded-2xl"
//             } ${
//               pathname === "/dashboard/notifications"
//                 ? "bg-white/[0.06] border-white/10 text-white"
//                 : "bg-transparent border-transparent text-slate-300 hover:bg-white/[0.05] hover:border-white/10 hover:text-white"
//             }`}
//           >
//             <div className="flex items-center gap-3">
//               <Bell
//                 size={18}
//                 className="text-slate-500 group-hover:text-sky-300 transition-colors"
//               />
//               {!collapsed && (
//                 <span className="text-sm font-bold">Notifications</span>
//               )}
//             </div>

//             {/* Badge */}
//             <div className="flex items-center justify-center bg-rose-500/90 text-[10px] text-white font-black w-6 h-6 rounded-full shadow-lg shadow-rose-500/20 border border-rose-400/30">
//               3
//             </div>
//           </Link>
//         </div>
//       </nav>

//       {/* User footer */}
//       <div className="mt-auto pt-6 border-t border-white/10">
//         {session ? (
//           <div
//             className={`flex items-center gap-3 rounded-3xl bg-white/[0.04] border border-white/10 shadow-inner ${
//               collapsed ? "p-3 justify-center" : "p-3"
//             }`}
//           >
//             <div className="relative">
//               {session.user?.image ? (
//                 <img
//                   src={session.user.image}
//                   alt="user"
//                   className="w-10 h-10 rounded-2xl object-cover border border-white/10"
//                 />
//               ) : (
//                 <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center text-white font-black">
//                   {session.user?.name?.[0] || "U"}
//                 </div>
//               )}

//               <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-[#070A12] rounded-full"></div>
//             </div>

//             {!collapsed && (
//               <div className="overflow-hidden">
//                 <p className="text-sm font-extrabold text-white truncate leading-tight">
//                   {session.user?.name || "Member"}
//                 </p>
//                 <p className="text-[10px] text-slate-500 truncate lowercase font-semibold mt-0.5">
//                   {session.user?.email}
//                 </p>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div
//             className={`bg-white/[0.04] border border-white/10 rounded-3xl animate-pulse ${
//               collapsed ? "h-14 w-full" : "h-14 w-full"
//             }`}
//           />
//         )}
//       </div>
//     </aside>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

import {
  FolderRoot,
  Layers,
  CheckCircle2,
  Sparkles,
  Users2,
  Wallet,
  AlertOctagon,
  ChevronRight,
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
  Activity,
} from "lucide-react";

import { api } from "@/lib/api";

type NavLink = {
  title: string;
  href: string;
  icon: React.ReactNode;
  special?: boolean;
};

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const [collapsed, setCollapsed] = useState(false);
  const [notifCount, setNotifCount] = useState<number>(0);
  const [notifLoading, setNotifLoading] = useState(false);

  const links: NavLink[] = useMemo(
    () => [
      {
        title: "Projects",
        href: "/dashboard/projects",
        icon: <FolderRoot size={18} />,
      },
      {
        title: "Epics",
        href: "/dashboard/epics",
        icon: <Layers size={18} />,
      },
      {
        title: "Workflows",
        href: "/dashboard/workflows",
        icon: <Activity size={18} />,
      },
      {
        title: "Tasks",
        href: "/dashboard/tasks",
        icon: <CheckCircle2 size={18} />,
      },
      {
        title: "AI Insights",
        href: "/dashboard/ai",
        icon: <Sparkles size={18} />,
        special: true,
      },
      {
        title: "Team",
        href: "/dashboard/team",
        icon: <Users2 size={18} />,
      },
      {
        title: "Costs",
        href: "/dashboard/costs",
        icon: <Wallet size={18} />,
      },
      {
        title: "Risks",
        href: "/dashboard/risks",
        icon: <AlertOctagon size={18} />,
      },
    ],
    []
  );

  const isActive = (href: string) => {
    // ✅ Always highlight correct tab for nested pages too
    // Example: /dashboard/projects/abc => still active for /dashboard/projects
    return pathname === href || pathname.startsWith(href + "/");
  };

  // ✅ Fetch unread notifications count dynamically
  useEffect(() => {
    const fetchUnread = async () => {
      // only fetch when logged in
      if (status !== "authenticated") return;

      try {
        setNotifLoading(true);

        /**
         * Expected API:
         * GET /notifications/unread-count
         * Response: { count: number }
         *
         * If you don't have this endpoint yet, tell me,
         * I'll give controller/service code for NestJS.
         */
        const res = await api.get("/notifications/unread-count");
        setNotifCount(Number(res.data?.count || 0));
      } catch (err) {
        setNotifCount(0);
      } finally {
        setNotifLoading(false);
      }
    };

    fetchUnread();
  }, [status]);

  return (
    <aside
      className={`min-h-screen sticky top-0 border-r border-white/10 bg-white/[0.03] backdrop-blur-xl flex flex-col transition-all duration-300 ${
        collapsed ? "w-20 p-4" : "w-72 p-6"
      }`}
    >
      {/* Brand + Collapse Toggle */}
      <div
        className={`mb-8 flex items-center justify-between ${
          collapsed ? "px-0" : "px-1"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500/90 to-violet-500/90 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <span className="text-white font-black text-xs tracking-wider">
              AI
            </span>
          </div>

          {!collapsed && (
            <div className="leading-tight">
              <p className="text-sm font-extrabold tracking-tight text-white">
                AI Manager
              </p>
              <p className="text-[11px] font-semibold text-slate-400">
                Pro Dashboard
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed((p) => !p)}
          className="p-2 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition active:scale-[0.98]"
        >
          {collapsed ? (
            <PanelLeftOpen size={18} className="text-slate-200" />
          ) : (
            <PanelLeftClose size={18} className="text-slate-200" />
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1">
        {!collapsed && (
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black mb-4 px-2">
            Main Menu
          </p>
        )}

        <ul className="space-y-2">
          {links.map((link) => {
            const active = isActive(link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  title={collapsed ? link.title : undefined}
                  className={`group flex items-center justify-between transition-all duration-200 border ${
                    collapsed ? "px-3 py-3 rounded-2xl" : "px-4 py-3 rounded-2xl"
                  } ${
                    active
                      ? "bg-white/[0.06] border-sky-500/25 text-white shadow-[0_0_25px_rgba(56,189,248,0.10)]"
                      : "bg-transparent border-transparent text-slate-300 hover:bg-white/[0.05] hover:border-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`transition-colors ${
                        active
                          ? "text-sky-400"
                          : "text-slate-500 group-hover:text-sky-300"
                      }`}
                    >
                      {link.icon}
                    </span>

                    {!collapsed && (
                      <span className="text-sm font-bold">{link.title}</span>
                    )}
                  </div>

                  {!collapsed && active && (
                    <ChevronRight
                      size={16}
                      className="text-sky-300 animate-pulse"
                    />
                  )}

                  {!collapsed && link.special && !active && (
                    <span className="text-[10px] bg-violet-500/15 text-violet-300 px-2 py-0.5 rounded-full border border-violet-500/25 font-bold">
                      New
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Notifications */}
        <div className="pt-6">
          {!collapsed && (
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black mb-4 px-2">
              System
            </p>
          )}

          {(() => {
            const notifActive = isActive("/dashboard/notifications");

            return (
              <Link
                href="/dashboard/notifications"
                title={collapsed ? "Notifications" : undefined}
                className={`group flex items-center justify-between transition-all duration-200 border ${
                  collapsed ? "px-3 py-3 rounded-2xl" : "px-4 py-3 rounded-2xl"
                } ${
                  notifActive
                    ? "bg-white/[0.06] border-sky-500/25 text-white shadow-[0_0_25px_rgba(56,189,248,0.10)]"
                    : "bg-transparent border-transparent text-slate-300 hover:bg-white/[0.05] hover:border-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Bell
                    size={18}
                    className={`transition-colors ${
                      notifActive
                        ? "text-sky-400"
                        : "text-slate-500 group-hover:text-sky-300"
                    }`}
                  />
                  {!collapsed && (
                    <span className="text-sm font-bold">Notifications</span>
                  )}
                </div>

                {/* ✅ Dynamic Badge */}
                {!collapsed && (
                  <div className="flex items-center gap-2">
                    {notifLoading ? (
                      <div className="w-6 h-6 rounded-full bg-white/10 border border-white/10 animate-pulse" />
                    ) : notifCount > 0 ? (
                      <div className="flex items-center justify-center bg-rose-500/90 text-[10px] text-white font-black w-6 h-6 rounded-full shadow-lg shadow-rose-500/20 border border-rose-400/30">
                        {notifCount > 99 ? "99+" : notifCount}
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-slate-400 flex items-center justify-center">
                        0
                      </div>
                    )}
                  </div>
                )}
              </Link>
            );
          })()}
        </div>
      </nav>

      {/* User footer */}
      <div className="mt-auto pt-6 border-t border-white/10">
        {session ? (
          <div
            className={`flex items-center gap-3 rounded-3xl bg-white/[0.04] border border-white/10 shadow-inner ${
              collapsed ? "p-3 justify-center" : "p-3"
            }`}
          >
            <div className="relative">
              {session.user?.image ? (
                <img
                  src={session.user.image as string}
                  alt="user"
                  className="w-10 h-10 rounded-2xl object-cover border border-white/10"
                />
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center text-white font-black">
                  {session.user?.name?.[0] || "U"}
                </div>
              )}

              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-[#070A12] rounded-full" />
            </div>

            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-extrabold text-white truncate leading-tight">
                  {session.user?.name || "Member"}
                </p>
                <p className="text-[10px] text-slate-500 truncate lowercase font-semibold mt-0.5">
                  {session.user?.email}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white/[0.04] border border-white/10 rounded-3xl animate-pulse h-14 w-full" />
        )}
      </div>
    </aside>
  );
}

