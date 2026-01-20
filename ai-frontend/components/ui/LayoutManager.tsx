// Ye ek client component hoga jo check karega ki user abhi kaunse route par hai.


"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
import Footer from "@/components/ui/Footer";

export default function LayoutManager({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // In pages par Sidebar aur Navbar hide rahega
  const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname === "/";

  if (isAuthPage) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-gray-950/40">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}