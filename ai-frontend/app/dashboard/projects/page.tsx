"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "sonner";
import { 
  Plus, X, Loader2, FolderPlus, 
  Search, Calendar, 
  ChevronRight, Trash2, LayoutGrid 
} from "lucide-react";
import { useProjectStore } from "@/stores/useProjectStore";

export default function ProjectsPage() {
  const router = useRouter();
  const { data: session } = useSession(); // Access user session
  const { projects, loading, fetchAll, removeProject, addProject } = useProjectStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchAll().catch(() => toast.error("Database connection failed"));
  }, [fetchAll]);

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- YE LOGIC FIX KIYA HAI DEPLOY KE LIYE ---
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return toast.error("Please enter project name");

    // @ts-ignore (Session mein humne ID add kar di hai callbacks ke through)
    const userId = session?.user?.id;

    if (!userId) {
      return toast.error("Session expired. Please login again.");
    }

    setIsSubmitting(true);
    try {
      // NestJS backend ko managerId chahiye hi chahiye
      await addProject({
        ...formData,
        managerId: userId, // Pass the logged-in user's ID
        status: "TODO",
        laborCost: 0,
        reworkCost: 0,
        infrastructureCost: 0,
        totalSavings: 0
      });

      toast.success("Project initialized successfully");
      setIsModalOpen(false);
      setFormData({ name: "", description: "" });
    } catch (err: any) {
      toast.error(err.message || "Failed to deploy project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await removeProject(id);
        toast.success("Project deleted");
      } catch (err: any) {
        toast.error("Failed to delete");
      }
    }
  };

  if (loading && projects.length === 0) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-500 font-bold animate-pulse">Syncing Projects...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Projects</h1>
          <p className="text-gray-500 mt-1 font-medium">Manage your AI-assisted development cycles.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search projects..."
              className="bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50 w-64 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-2xl font-black text-sm transition-all flex items-center gap-2 shadow-xl shadow-blue-600/20 active:scale-95"
          >
            <Plus size={20} /> <span className="hidden sm:inline">CREATE NEW</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white/[0.02] border-2 border-dashed border-white/5 rounded-[3rem] py-24 flex flex-col items-center justify-center">
          <div className="bg-blue-600/10 p-6 rounded-full mb-6">
            <FolderPlus className="text-blue-500" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-white">No projects found</h3>
          <p className="text-gray-500 mt-2 text-center max-w-sm">Start your journey by creating a new workspace for your team.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <div key={p.id} className="group relative bg-[#0d1117] border border-white/5 rounded-[2rem] p-8 hover:border-blue-500/30 transition-all duration-300 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={() => handleDelete(p.id, p.name)} className="text-gray-600 hover:text-red-500">
                    <Trash2 size={18} />
                 </button>
              </div>

              <div className="mb-6 bg-white/5 w-fit p-3 rounded-2xl">
                <LayoutGrid className="text-blue-500" size={24} />
              </div>

              <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors line-clamp-1">{p.name}</h3>
              <p className="text-gray-500 text-sm mt-3 line-clamp-2 leading-relaxed font-medium">
                {p.description || "Establish your roadmap and track progress using AI insights."}
              </p>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <Calendar size={12} />
                  {new Date().toLocaleDateString()}
                </div>
                <button 
                  onClick={() => router.push(`/dashboard/projects/${p.id}`)}
                  className="flex items-center gap-2 text-xs font-black text-blue-400 hover:text-white transition-colors group/btn"
                >
                  OPEN <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-[#0d1117] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-10 shadow-3xl animate-in fade-in zoom-in-95 duration-300">
            <h2 className="text-3xl font-black text-white mb-2">New Project</h2>
            <p className="text-gray-500 mb-8 font-medium">Define your project scope and let AI do the heavy lifting.</p>
            
            <form onSubmit={handleCreate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Title</label>
                <input 
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-blue-500 focus:outline-none transition-all"
                  placeholder="Software Alpha 2.0"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Brief Description</label>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-blue-500 focus:outline-none transition-all h-32 resize-none"
                  placeholder="Describe the goals and key outcomes..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl text-white font-black transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98]"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "DEPLOY PROJECT"}
              </button>
            </form>
          </div>
        </div>
      )}

      <Toaster position="bottom-right" richColors theme="dark" />
    </div>
  );
}