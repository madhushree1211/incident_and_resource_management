"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle, Clock, Search } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"

const allIssues = [
  { id: "ISS-001", title: "Water leakage in Block A", status: "in-progress", category: "Plumbing", date: "Mar 20, 2024" },
  { id: "ISS-002", title: "Broken AC in Room 205", status: "pending", category: "HVAC", date: "Mar 19, 2024" },
  { id: "ISS-003", title: "Electrical fault in Lab 3", status: "resolved", category: "Electrical", date: "Mar 17, 2024" },
  { id: "ISS-004", title: "Door lock malfunction", status: "resolved", category: "Structural", date: "Mar 15, 2024" },
  { id: "ISS-005", title: "Network connectivity issue", status: "resolved", category: "IT/Network", date: "Mar 12, 2024" },
  { id: "ISS-006", title: "Broken window in Library", status: "resolved", category: "Structural", date: "Mar 10, 2024" },
  { id: "ISS-007", title: "Faulty projector Room 301", status: "resolved", category: "IT/Network", date: "Mar 8, 2024" },
  { id: "ISS-008", title: "Restroom cleaning needed", status: "resolved", category: "Cleaning", date: "Mar 5, 2024" },
]

const statusConfig = {
  pending: { bg: "bg-amber-500/10", text: "text-amber-400", icon: Clock },
  "in-progress": { bg: "bg-blue-500/10", text: "text-blue-400", icon: Clock },
  resolved: { bg: "bg-emerald-500/10", text: "text-emerald-400", icon: CheckCircle },
}

export default function IssueHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredIssues = allIssues.filter((issue) => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          issue.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || issue.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <DashboardLayout userType="user">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white">Issue History</h1>
        <p className="text-[#A3A3A3] mt-1">View all your previously reported issues</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="flex flex-col md:flex-row gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A3A3A3]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID or title..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-white placeholder-[#666] focus:outline-none focus:border-[#DC143C] transition-all"
          />
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          {["all", "pending", "in-progress", "resolved"].map((status) => (
            <motion.button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                filterStatus === status
                  ? "bg-gradient-to-r from-[#8B0000] to-[#DC143C] text-white"
                  : "bg-[#1A1A1A] text-[#A3A3A3] hover:text-white border border-[#2A2A2A]"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Issues Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="overflow-hidden" hover={false}>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0B0B0B]/50">
                <tr className="border-b border-[#2A2A2A]">
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#A3A3A3]">Issue ID</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#A3A3A3]">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#A3A3A3]">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#A3A3A3]">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#A3A3A3]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A2A]">
                {filteredIssues.map((issue, index) => {
                  const status = statusConfig[issue.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  return (
                    <motion.tr
                      key={issue.id}
                      className="hover:bg-[#1A1A1A]/50 cursor-pointer transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-[#DC143C]">{issue.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#DC143C]/10 flex items-center justify-center">
                            <AlertTriangle className="w-4 h-4 text-[#DC143C]" />
                          </div>
                          <span className="text-white">{issue.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#A3A3A3]">{issue.category}</td>
                      <td className="px-6 py-4 text-[#A3A3A3]">{issue.date}</td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${status.bg}`}>
                          <StatusIcon className={`w-4 h-4 ${status.text}`} />
                          <span className={`text-sm capitalize ${status.text}`}>
                            {issue.status.replace("-", " ")}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-[#2A2A2A]">
            {filteredIssues.map((issue, index) => {
              const status = statusConfig[issue.status as keyof typeof statusConfig]
              const StatusIcon = status.icon
              return (
                <motion.div
                  key={issue.id}
                  className="p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[#DC143C] text-sm">{issue.id}</span>
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${status.bg}`}>
                      <StatusIcon className={`w-3 h-3 ${status.text}`} />
                      <span className={`text-xs capitalize ${status.text}`}>
                        {issue.status.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-white font-medium mb-1">{issue.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-[#A3A3A3]">
                    <span>{issue.category}</span>
                    <span>{issue.date}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Empty State */}
          {filteredIssues.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-[#A3A3A3]">No issues found matching your criteria</p>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </DashboardLayout>
  )
}
