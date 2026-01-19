"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

import { FaUserCircle, FaChevronDown, FaSignOutAlt, FaThLarge } from "react-icons/fa";

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
    <nav className="h-14 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-[100]">
      {/* Logo Area */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
          <span className="font-black text-white text-xs">AI</span>
        </div>
        <span className="text-lg font-black tracking-tighter text-white uppercase">Analyst</span>
      </Link>

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center gap-1">
        {[
          { title: "Home", href: "/" },
          { title: "Dashboard", href: "/dashboard" },
        ].map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive 
                    ? "bg-white/10 text-white" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
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
          <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-blue-500 animate-spin" />
        ) : status === "authenticated" ? (
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all focus:outline-none"
          >
            <span className="text-[11px] font-bold text-gray-300 ml-2 hidden sm:block">
              {session.user?.name?.split(" ")[0] || "User"}
            </span>
            {session.user?.image ? (
              <img src={session.user.image} alt="user" className="w-7 h-7 rounded-full object-cover shadow-sm border border-white/10" />
            ) : (
              <FaUserCircle size={24} className="text-blue-500" />
            )}
            <FaChevronDown size={10} className={`text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
          </button>
        ) : (
          <Link 
            href="/auth/login" 
            className="text-xs font-bold bg-white text-black px-5 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-lg active:scale-95"
          >
            SIGN IN
          </Link>
        )}

        {/* Dropdown Menu */}
        {open && status === "authenticated" && (
          <div className="absolute right-0 mt-3 w-52 bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Account</p>
              <p className="text-sm font-bold text-white truncate">{session.user?.email}</p>
            </div>

            <div className="p-1">
              <Link 
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition"
                onClick={() => setOpen(false)}
              >
                <FaThLarge className="text-blue-400" /> My Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 rounded-xl transition"
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}