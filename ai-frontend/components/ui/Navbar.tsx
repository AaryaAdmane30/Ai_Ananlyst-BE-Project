"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

import {
  FaUserCircle,
  FaChevronDown,
  FaSignOutAlt,
  FaThLarge,
} from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="sticky top-0 z-[100] border-b border-white/10 bg-white/[0.04] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-sky-500/90 to-violet-500/90 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <span className="font-black text-white text-xs tracking-wider">
              AI
            </span>
          </div>
          <div className="leading-tight">
            <p className="text-sm font-extrabold tracking-tight text-white">
              Analyst
            </p>
            <p className="text-[11px] font-semibold text-slate-400">
              Cost • Risk • Projects
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-2">
          {[
            { title: "Home", href: "/" },
            { title: "Dashboard", href: "/dashboard" },
          ].map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-2xl text-sm font-bold transition-all ${
                    isActive
                      ? "bg-white/10 text-white border border-white/10"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Auth & Profile Section */}
        <div className="relative" ref={ref}>
          {status === "loading" ? (
            <div className="w-9 h-9 rounded-full border-2 border-white/10 border-t-sky-400 animate-spin" />
          ) : status === "authenticated" ? (
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 pl-3 pr-2 py-2 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-white/20 transition-all focus:outline-none"
            >
              <span className="text-sm font-bold text-slate-200 hidden sm:block">
                {session.user?.name?.split(" ")[0] || "User"}
              </span>

              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt="user"
                  className="w-8 h-8 rounded-xl object-cover shadow-sm border border-white/10"
                />
              ) : (
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                  <FaUserCircle size={18} className="text-sky-400" />
                </div>
              )}

              <FaChevronDown
                size={10}
                className={`text-slate-400 transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="text-sm font-black bg-sky-500 text-black px-5 py-2.5 rounded-2xl hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/20 active:scale-95"
            >
              SIGN IN
            </Link>
          )}

          {/* Dropdown Menu */}
          {open && status === "authenticated" && (
            <div className="absolute right-0 mt-3 w-56 bg-[#0B1020] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 py-3 border-b border-white/10 bg-white/[0.03]">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Account
                </p>
                <p className="text-sm font-bold text-white truncate">
                  {session.user?.email}
                </p>
              </div>

              <div className="p-2 space-y-1">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-slate-200 hover:bg-white/[0.06] rounded-2xl transition"
                  onClick={() => setOpen(false)}
                >
                  <FaThLarge className="text-sky-400" /> My Dashboard
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-rose-300 hover:bg-rose-500/10 rounded-2xl transition"
                >
                  <FaSignOutAlt /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
