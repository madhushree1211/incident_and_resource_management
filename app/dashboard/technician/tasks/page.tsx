"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, CheckCircle, Clock, Filter, MapPin, User, Wrench, X } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { GlassCard } from "@/components/ui/glass-card"
import { GlowButton } from "@/components/ui/glow-button"
import { cn } from "@/lib/utils"

const allTasks = [
  { id: "ISS-001", title: "Water leakage in Block A", location: "Block A - Ground Floor", priority: "high", status: "in-progress", reportedBy: "John Doe", date: "2 hours ago", description: "Significant water leak from ceiling" },
  { id: "ISS-005", title: "Broken AC in Room 302", location: "Block B - Third Floor", priority: "medium", status: "pending", reportedBy: "Jane Smith", date: "5 hours ago", description: "AC not cooling properly" },
  { id: "ISS-007", title: "Electrical fault in Lab", location: "Science Building", priority: "high", status: "pending", reportedBy: "Mike Johnson", date: "1 day ago", description: "Power outlet sparking" },
  { id: "ISS-008", title: "Broken window", location: "Library - 2nd Floor", priority: "low", status: "pending", reportedBy: "Sarah Wilson", date: "1 day ago", description: "Window glass cracked" },
  { id: "ISS-009", title: "Door lock jammed", location: "Admin Building", priority: "medium", status: "in-progress", reportedBy: "Tom Brown", date: "2 days ago", description: "Main entrance door stuck" },
]

const priorityColors = {
  high: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },
  medium: { bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400" },
  low: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
}

const statusColors = {
  pending: { bg: "bg-amber-500/10", text: "text-amber-400" },
  "in-progress": { bg: "bg-blue-500/10", text: "text-blue-400" },
  completed: { bg: "bg-emerald-500/10", text: "text-emerald-400" },
}

export default function TechnicianTasksPage() {
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedTask, setSelectedTask] = useState<typeof allTasks[0] | null>(null)

  const filteredTasks = allTasks.filter((task) => {
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority
    const matchesStatus = filterStatus === "all" || task.status === filterStatus
    return matchesPriority && matchesStatus
  })

  return (
    <DashboardLayout userType="technician">
      {/* Task Detail Modal */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTask(null)}
          >
            <motion.div
              className="relative max-w-lg w-full"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <GlassCard className="p-6" hover={false} glow>
                <button 
                  onClick={() => setSelectedTask(null)}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[#2A2A2A] transition-colors"
                >
                  <X className="w-5 h-5 text-[#A3A3A3]" />
                </button>

                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-[#DC143C]">{selectedTask.id}</span>
                  <span className={`px-2 py-0.5 rounded text-xs capitalize ${priorityColors[selectedTask.priority as keyof typeof priorityColors].bg} ${priorityColors[selectedTask.priority as keyof typeof priorityColors].text}`}>
                    {selectedTask.priority}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white mb-4">{selectedTask.title}</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#DC143C]" />
                    <span className="text-[#A3A3A3]">{selectedTask.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-[#DC143C]" />
                    <span className="text-[#A3A3A3]">Reported by: {selectedTask.reportedBy}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#DC143C]" />
                    <span className="text-[#A3A3A3]">{selectedTask.date}</span>
                  </div>
                </div>

                <div className="bg-[#0B0B0B] rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-medium text-[#A3A3A3] mb-2">Description</h3>
                  <p className="text-white">{selectedTask.description}</p>
                </div>

                <div className="flex gap-3">
                  {selectedTask.status === "pending" ? (
                    <GlowButton className="flex-1" onClick={() => setSelectedTask(null)}>
                      Accept Task
                    </GlowButton>
                  ) : (
                    <>
                      <GlowButton variant="secondary" className="flex-1" onClick={() => setSelectedTask(null)}>
                        Update Progress
                      </GlowButton>
                      <GlowButton className="flex-1" onClick={() => setSelectedTask(null)}>
                        Mark Complete
                      </GlowButton>
                    </>
                  )}
                </div>
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
        <h1 className="text-2xl md:text-3xl font-bold text-white">Assigned Tasks</h1>
        <p className="text-[#A3A3A3] mt-1">View and manage all your assigned maintenance tasks</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="flex flex-wrap gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#A3A3A3]" />
          <span className="text-[#A3A3A3] text-sm">Filters:</span>
        </div>

        {/* Priority Filter */}
        <div className="flex gap-2">
          {["all", "high", "medium", "low"].map((priority) => (
            <button
              key={priority}
              onClick={() => setFilterPriority(priority)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm transition-all",
                filterPriority === priority
                  ? "bg-[#DC143C]/20 text-[#DC143C] border border-[#DC143C]/30"
                  : "bg-[#1A1A1A] text-[#A3A3A3] border border-[#2A2A2A] hover:border-[#DC143C]/30"
              )}
            >
              {priority === "all" ? "All Priorities" : priority.charAt(0).toUpperCase() + priority.slice(1)}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          {["all", "pending", "in-progress"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm transition-all",
                filterStatus === status
                  ? "bg-[#DC143C]/20 text-[#DC143C] border border-[#DC143C]/30"
                  : "bg-[#1A1A1A] text-[#A3A3A3] border border-[#2A2A2A] hover:border-[#DC143C]/30"
              )}
            >
              {status === "all" ? "All Status" : status.replace("-", " ").charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tasks Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredTasks.map((task, index) => {
          const priority = priorityColors[task.priority as keyof typeof priorityColors]
          const status = statusColors[task.status as keyof typeof statusColors]
          
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <GlassCard 
                className="p-6 cursor-pointer" 
                onClick={() => setSelectedTask(task)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#DC143C] text-sm">{task.id}</span>
                    <span className={`w-2 h-2 rounded-full ${priority.dot}`} />
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs capitalize ${status.bg} ${status.text}`}>
                    {task.status.replace("-", " ")}
                  </span>
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8B0000]/30 to-[#DC143C]/20 flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-5 h-5 text-[#DC143C]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">{task.title}</h3>
                    <p className="text-sm text-[#A3A3A3]">{task.location}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#A3A3A3]">{task.reportedBy}</span>
                  <span className="text-[#666]">{task.date}</span>
                </div>
              </GlassCard>
            </motion.div>
          )
        })}
      </div>

      {filteredTasks.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <p className="text-[#A3A3A3]">No tasks matching your filters</p>
        </motion.div>
      )}
    </DashboardLayout>
  )
}
