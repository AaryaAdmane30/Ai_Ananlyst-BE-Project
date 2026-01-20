"use client";

import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  const year: number = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-black/90 backdrop-blur px-6 py-6 text-gray-400">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        <p className="text-sm">
          © {year} AI PM. Built for builders.
        </p>

        <div className="flex gap-4 text-sm">
          <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition">Terms</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </div>

        <p className="text-xs text-gray-500">
          Discipline beats chaos.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
