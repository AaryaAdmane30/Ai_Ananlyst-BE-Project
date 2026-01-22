import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import LayoutManager from "@/components/ui/LayoutManager";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Project Manager AI",
  description: "Next-gen AI powered project management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen bg-[#05060B] text-slate-200 antialiased selection:bg-sky-500/30 selection:text-white`}
      >
        <SessionWrapper>
          <LayoutManager>{children}</LayoutManager>
        </SessionWrapper>

        <Toaster richColors position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
