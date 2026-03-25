"use client"

import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle, Clock, Plus } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard/layout"
import { StatCard } from "@/components/dashboard/stat-card"
import { GlassCard } from "@/components/ui/glass-card"
import { GlowButton } from "@/components/ui/glow-button"

// Mock data
const recentIssues = [
  { id: "ISS-001", title: "Water leakage in Block A", status: "in-progress", date: "2 hours ago" },
  { id: "ISS-002", title: "Broken AC in Room 205", status: "pending", date: "1 day ago" },
  { id: "ISS-003", title: "Electrical fault in Lab 3", status: "resolved", date: "3 days ago" },
  { id: "ISS-004", title: "Door lock malfunction", status: "resolved", date: "5 days ago" },
]

const statusColors = {
  pending: { bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400" },
  "in-progress": { bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-400" },
  resolved: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
}

export default function UserDashboard() {
  return (
    <DashboardLayout userType="user">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Welcome back, <span className="text-[#DC143C]">Student</span>
          </h1>
          <p className="text-[#A3A3A3] mt-1">Here&apos;s an overview of your reported issues</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/dashboard/user/report">
            <GlowButton>
              <Plus className="w-5 h-5" />
              Report New Issue
            </GlowButton>
          </Link>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Issues Submitted"
          value={12}
          icon={AlertTriangle}
          trend={{ value: 8, positive: true }}
          delay={0.1}
        />
        <StatCard
          title="In Progress"
          value={3}
          icon={Clock}
          delay={0.2}
        />
        <StatCard
          title="Resolved"
          value={9}
          icon={CheckCircle}
          trend={{ value: 15, positive: true }}
          delay={0.3}
        />
      </div>

      {/* Recent Issues */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard className="overflow-hidden" hover={false}>
          <div className="p-6 border-b border-[#2A2A2A]">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Recent Issues</h2>
              <Link 
                href="/dashboard/user/history"
                className="text-sm text-[#DC143C] hover:text-[#FF2D2D] transition-colors"
              >
                View All
              </Link>
            </div>
          </div>

          <div className="divide-y divide-[#2A2A2A]">
            {recentIssues.map((issue, index) => {
              const statusStyle = statusColors[issue.status as keyof typeof statusColors]
              return (
                <motion.div
                  key={issue.id}
                  className="p-6 hover:bg-[#1A1A1A]/50 transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#DC143C]/10 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-[#DC143C]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#A3A3A3] font-mono">{issue.id}</span>
                          <h3 className="font-medium text-white">{issue.title}</h3>
                        </div>
                        <p className="text-sm text-[#A3A3A3]">{issue.date}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusStyle.bg}`}>
                      <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
                      <span className={`text-sm capitalize ${statusStyle.text}`}>
                        {issue.status.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </GlassCard>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/dashboard/user/status">
            <GlassCard className="p-6" glow>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8B0000] to-[#DC143C] flex items-center justify-center">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Track Issues</h3>
                  <p className="text-[#A3A3A3] text-sm">Monitor the progress of your reported issues</p>
                </div>
              </div>
            </GlassCard>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link href="/dashboard/user/notifications">
            <GlassCard className="p-6" glow>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8B0000] to-[#DC143C] flex items-center justify-center relative">
                  <Clock className="w-7 h-7 text-white" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF2D2D] rounded-full text-xs flex items-center justify-center text-white font-bold">
                    3
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Notifications</h3>
                  <p className="text-[#A3A3A3] text-sm">You have 3 unread notifications</p>
                </div>
              </div>
            </GlassCard>
          </Link>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
