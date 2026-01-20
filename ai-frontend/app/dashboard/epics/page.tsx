"use client";

import { useEffect } from "react";
import { Toaster, toast } from "sonner";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEpicStore } from "@/stores/useEpicStore";

// Frontend Epic type
interface Epic {
  id: string;
  title: string;
  projectId: string;
  description?: string;
}

export default function EpicsPage() {
  const { data: session, status } = useSession();
  const { epics, loading, error, fetchAll } = useEpicStore();
  const router = useRouter();

  // Fetch epics when authenticated
  useEffect(() => {
    if (status === "authenticated") fetchAll().catch(() => toast.error("Failed to fetch epics"));
    if (status === "unauthenticated") signIn("github");
  }, [status, fetchAll]);

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-gray-400 text-lg mb-6 animate-pulse">Loading epics...</p>
        <div className="flex flex-col sm:flex-row gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-72 h-36 bg-gray-800/70 rounded-2xl animate-pulse flex flex-col justify-center items-center"
            >
              <div className="h-4 w-3/4 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <p className="text-red-500 text-lg">{String(error)}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white/90">Your Epics</h2>
        <button
          onClick={() => toast("Add Epic feature coming soon!")}
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl transition"
        >
          + Add Epic
        </button>
      </div>

      {/* No epics */}
      {epics.length === 0 ? (
        <div className="p-8 text-center bg-gray-900/50 rounded-2xl flex flex-col items-center justify-center gap-4">
          <p className="text-gray-400 text-lg">
            No epics found. Start by adding a new epic!
          </p>
          <button
            onClick={() => toast("Add Epic feature coming soon!")}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl transition"
          >
            + Add Epic
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {epics.map((e: Epic) => {
            // Frontend-only status logic
            const status = "Pending"; // default for now
            const statusColor =
              status === "Active"
                ? "text-green-400 bg-green-500/20"
                : status === "Completed"
                ? "text-red-400 bg-red-500/20"
                : "text-yellow-400 bg-yellow-500/20";

            return (
              <div
                key={e.id}
                className="relative p-6 rounded-2xl bg-gray-900/70 border border-gray-700 hover:border-purple-500 shadow-lg shadow-purple-500/20 flex flex-col justify-between transition-transform hover:scale-[1.03]"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{e.title}</h3>
                <p className="text-gray-400 mb-2">{e.description ?? "No description provided"}</p>
                <p className="text-gray-400 mb-2">
                  Project ID: <span className="text-purple-400 font-medium">{e.projectId}</span>
                </p>

                {/* Frontend-only status badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
                  {status}
                </span>

                <button
                  onClick={() => router.push(`/dashboard/epics/${e.id}/tasks`)}
                  className="mt-4 w-full py-2 rounded-xl bg-purple-500 hover:bg-purple-600 transition font-semibold text-white"
                >
                  View Tasks
                </button>
              </div>
            );
          })}
        </div>
      )}

      <Toaster richColors position="bottom-right" />
    </div>
  );
}
