"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, CheckCircle, MapPin, User, Wrench, X } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { GlassCard } from "@/components/ui/glass-card"
import { GlowButton } from "@/components/ui/glow-button"
import { cn } from "@/lib/utils"

const unassignedIssues = [
  { id: "ISS-010", title: "Broken window in Lab 2", location: "Science Block", priority: "medium", category: "Structural", date: "1 hour ago", reportedBy: "John Doe" },
  { id: "ISS-011", title: "Power outage in Cafeteria", location: "Main Building", priority: "high", category: "Electrical", date: "2 hours ago", reportedBy: "Jane Smith" },
  { id: "ISS-012", title: "AC malfunction Room 401", location: "Block A", priority: "medium", category: "HVAC", date: "3 hours ago", reportedBy: "Mike Johnson" },
  { id: "ISS-013", title: "Water heater not working", location: "Hostel Block", priority: "high", category: "Plumbing", date: "4 hours ago", reportedBy: "Sarah Wilson" },
]

const technicians = [
  { id: 1, name: "John Smith", specialization: "Electrical", currentTasks: 3, rating: 4.9, available: true },
  { id: 2, name: "Sarah Johnson", specialization: "Plumbing", currentTasks: 2, rating: 4.8, available: true },
  { id: 3, name: "Mike Brown", specialization: "HVAC", currentTasks: 4, rating: 4.7, available: true },
  { id: 4, name: "Lisa Kim", specialization: "General", currentTasks: 5, rating: 4.6, available: false },
  { id: 5, name: "Tom Wilson", specialization: "Structural", currentTasks: 2, rating: 4.8, available: true },
]

const priorityColors = {
  high: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" },
  medium: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  low: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
}

export default function AssignIssuesPage() {
  const [selectedIssue, setSelectedIssue] = useState<typeof unassignedIssues[0] | null>(null)
  const [selectedTechnician, setSelectedTechnician] = useState<number | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleAssign = () => {
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setSelectedIssue(null)
      setSelectedTechnician(null)
    }, 2000)
  }

  return (
    <DashboardLayout userType="admin">
      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-lg"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="text-white">Issue assigned successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Assignment Modal */}
      <AnimatePresence>
        {selectedIssue && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <GlassCard className="p-6" hover={false} glow>
                <button 
                  onClick={() => { setSelectedIssue(null); setSelectedTechnician(null); }}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[#2A2A2A] transition-colors"
                >
                  <X className="w-5 h-5 text-[#A3A3A3]" />
                </button>

                <h2 className="text-xl font-bold text-white mb-6">Assign Technician</h2>

                {/* Issue Summary */}
                <div className="bg-[#0B0B0B] rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[#DC143C]">{selectedIssue.id}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${priorityColors[selectedIssue.priority as keyof typeof priorityColors].bg} ${priorityColors[selectedIssue.priority as keyof typeof priorityColors].text}`}>
                      {selectedIssue.priority}
                    </span>
                  </div>
                  <h3 className="text-white font-medium mb-2">{selectedIssue.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-[#A3A3A3]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {selectedIssue.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" /> {selectedIssue.reportedBy}
                    </span>
                  </div>
                </div>

                {/* Technician Selection */}
                <h3 className="text-lg font-medium text-white mb-4">Select Technician</h3>
                <div className="space-y-3 mb-6">
                  {technicians.filter(t => t.available).map((tech) => (
                    <motion.div
                      key={tech.id}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all",
                        selectedTechnician === tech.id
                          ? "bg-[#DC143C]/10 border-[#DC143C]/50"
                          : "bg-[#0B0B0B] border-[#2A2A2A] hover:border-[#DC143C]/30"
                      )}
                      onClick={() => setSelectedTechnician(tech.id)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B0000] to-[#DC143C] flex items-center justify-center text-white font-bold">
                          {tech.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-white">{tech.name}</p>
                          <p className="text-sm text-[#A3A3A3]">{tech.specialization}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-[#A3A3A3]">{tech.currentTasks} active tasks</p>
                        <p className="text-sm text-amber-400">{tech.rating} ★</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <GlowButton 
                  className="w-full" 
                  disabled={!selectedTechnician}
                  onClick={handleAssign}
                >
                  Assign Technician
                </GlowButton>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white">Assign Issues</h1>
        <p className="text-[#A3A3A3] mt-1">Assign pending issues to available technicians</p>
      </motion.div>

      {/* Unassigned Issues */}
      <div className="grid gap-4">
        {unassignedIssues.map((issue, index) => {
          const priority = priorityColors[issue.priority as keyof typeof priorityColors]
          return (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <GlassCard className={`p-6 border-l-4 ${priority.border}`}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B0000]/30 to-[#DC143C]/20 flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-[#DC143C]" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-sm text-[#DC143C]">{issue.id}</span>
                        <span className={`px-2 py-0.5 rounded text-xs capitalize ${priority.bg} ${priority.text}`}>
                          {issue.priority}
                        </span>
                        <span className="px-2 py-0.5 rounded text-xs bg-[#2A2A2A] text-[#A3A3A3]">
                          {issue.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-white">{issue.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#A3A3A3]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {issue.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" /> {issue.reportedBy}
                        </span>
                        <span>{issue.date}</span>
                      </div>
                    </div>
                  </div>

                  <GlowButton onClick={() => setSelectedIssue(issue)}>
                    <Wrench className="w-5 h-5" />
                    Assign
                  </GlowButton>
                </div>
              </GlassCard>
            </motion.div>
          )
        })}
      </div>

      {unassignedIssues.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">All Caught Up!</h2>
          <p className="text-[#A3A3A3]">There are no unassigned issues at the moment.</p>
        </motion.div>
      )}
    </DashboardLayout>
  )
}
