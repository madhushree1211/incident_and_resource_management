"use client"

import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle, ClipboardList, Clock, Wrench } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard/layout"
import { StatCard } from "@/components/dashboard/stat-card"
import { GlassCard } from "@/components/ui/glass-card"
import { GlowButton } from "@/components/ui/glow-button"

const assignedTasks = [
  { 
    id: "ISS-001", 
    title: "Water leakage in Block A", 
    location: "Block A - Ground Floor",
    priority: "high",
    status: "in-progress",
    reportedBy: "John Doe",
    date: "2 hours ago"
  },
  { 
    id: "ISS-005", 
    title: "Broken AC in Room 302", 
    location: "Block B - Third Floor",
    priority: "medium",
    status: "pending",
    reportedBy: "Jane Smith",
    date: "5 hours ago"
  },
  { 
    id: "ISS-007", 
    title: "Electrical fault in Lab", 
    location: "Science Building",
    priority: "high",
    status: "pending",
    reportedBy: "Mike Johnson",
    date: "1 day ago"
  },
]

const priorityColors = {
  high: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" },
  medium: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  low: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
}

export default function TechnicianDashboard() {
  return (
    <DashboardLayout userType="technician">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Welcome, <span className="text-[#DC143C]">Technician</span>
          </h1>
          <p className="text-[#A3A3A3] mt-1">Manage your assigned tasks and track progress</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/dashboard/technician/tasks">
            <GlowButton>
              <ClipboardList className="w-5 h-5" />
              View All Tasks
            </GlowButton>
          </Link>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Assigned Tasks"
          value={8}
          icon={ClipboardList}
          delay={0.1}
        />
        <StatCard
          title="In Progress"
          value={3}
          icon={Clock}
          delay={0.2}
        />
        <StatCard
          title="Completed Today"
          value={5}
          icon={CheckCircle}
          trend={{ value: 20, positive: true }}
          delay={0.3}
        />
        <StatCard
          title="High Priority"
          value={2}
          icon={AlertTriangle}
          delay={0.4}
        />
      </div>

      {/* Assigned Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Assigned Tasks</h2>
          <Link 
            href="/dashboard/technician/tasks"
            className="text-sm text-[#DC143C] hover:text-[#FF2D2D] transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-6">
          {assignedTasks.map((task, index) => {
            const priority = priorityColors[task.priority as keyof typeof priorityColors]
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <GlassCard className={`p-6 border-l-4 ${priority.border}`}>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B0000]/30 to-[#DC143C]/20 flex items-center justify-center">
                        <Wrench className="w-6 h-6 text-[#DC143C]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm text-[#DC143C]">{task.id}</span>
                          <span className={`px-2 py-0.5 rounded text-xs capitalize ${priority.bg} ${priority.text}`}>
                            {task.priority} Priority
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-white">{task.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#A3A3A3]">
                          <span>Location: {task.location}</span>
                          <span>Reported by: {task.reportedBy}</span>
                          <span>{task.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pl-16 lg:pl-0">
                      {task.status === "pending" ? (
                        <GlowButton size="sm">
                          Accept Task
                        </GlowButton>
                      ) : (
                        <>
                          <GlowButton size="sm" variant="secondary">
                            Update Progress
                          </GlowButton>
                          <GlowButton size="sm">
                            Mark Complete
                          </GlowButton>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Progress bar for in-progress tasks */}
                  {task.status === "in-progress" && (
                    <div className="mt-4 pt-4 border-t border-[#2A2A2A]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#A3A3A3]">Progress</span>
                        <span className="text-sm text-[#DC143C]">60%</span>
                      </div>
                      <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#8B0000] to-[#DC143C]"
                          initial={{ width: 0 }}
                          animate={{ width: "60%" }}
                          transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                        />
                      </div>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
