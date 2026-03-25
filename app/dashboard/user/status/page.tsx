"use client"

import { motion } from "framer-motion"
import { CheckCircle, Clock, FileText, Send, User } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { GlassCard } from "@/components/ui/glass-card"

// Mock data for issue tracking
const trackedIssue = {
  id: "ISS-001",
  title: "Water leakage in Block A",
  description: "There is a significant water leak from the ceiling in the corridor near Room 105. The leak appears to be coming from the floor above.",
  category: "Plumbing",
  location: "Block A - Ground Floor",
  reportedDate: "March 20, 2024",
  currentStage: 2, // 0-3 for the four stages
  stages: [
    { name: "Submitted", date: "Mar 20, 9:30 AM", completed: true },
    { name: "Assigned", date: "Mar 20, 11:45 AM", completed: true, technician: "John Smith" },
    { name: "In Progress", date: "Mar 21, 8:00 AM", completed: false },
    { name: "Completed", date: null, completed: false },
  ]
}

const otherIssues = [
  { id: "ISS-002", title: "Broken AC in Room 205", stage: 1, date: "1 day ago" },
  { id: "ISS-003", title: "Electrical fault in Lab 3", stage: 3, date: "3 days ago" },
]

export default function IssueStatusPage() {
  return (
    <DashboardLayout userType="user">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white">Issue Status</h1>
        <p className="text-[#A3A3A3] mt-1">Track the progress of your reported issues</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Issue Tracker */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="overflow-hidden" hover={false}>
              {/* Issue Header */}
              <div className="p-6 border-b border-[#2A2A2A]">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-mono text-[#DC143C]">{trackedIssue.id}</span>
                      <span className="px-2 py-0.5 rounded text-xs bg-blue-500/10 text-blue-400">
                        In Progress
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-white">{trackedIssue.title}</h2>
                  </div>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-6">Progress Timeline</h3>
                
                {/* Timeline */}
                <div className="relative">
                  {/* Progress line background */}
                  <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-[#2A2A2A]" />
                  
                  {/* Animated progress line */}
                  <motion.div
                    className="absolute left-6 top-6 w-0.5 bg-gradient-to-b from-[#DC143C] to-[#FF2D2D]"
                    initial={{ height: 0 }}
                    animate={{ height: `${(trackedIssue.currentStage / 3) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />

                  <div className="space-y-8">
                    {trackedIssue.stages.map((stage, index) => {
                      const isActive = index === trackedIssue.currentStage
                      const isCompleted = stage.completed
                      
                      const icons = [Send, User, Clock, CheckCircle]
                      const Icon = icons[index]

                      return (
                        <motion.div
                          key={stage.name}
                          className="relative flex items-start gap-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.15 }}
                        >
                          {/* Node */}
                          <motion.div
                            className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                              isCompleted || isActive
                                ? "bg-gradient-to-br from-[#8B0000] to-[#DC143C] shadow-[0_0_20px_rgba(220,20,60,0.4)]"
                                : "bg-[#1A1A1A] border border-[#2A2A2A]"
                            }`}
                            animate={isActive ? {
                              boxShadow: [
                                "0 0 20px rgba(220, 20, 60, 0.4)",
                                "0 0 40px rgba(220, 20, 60, 0.6)",
                                "0 0 20px rgba(220, 20, 60, 0.4)",
                              ]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Icon className={`w-5 h-5 ${
                              isCompleted || isActive ? "text-white" : "text-[#A3A3A3]"
                            }`} />
                          </motion.div>

                          {/* Content */}
                          <div className="flex-1 pb-2">
                            <div className="flex items-center gap-3">
                              <h4 className={`font-medium ${
                                isCompleted || isActive ? "text-white" : "text-[#A3A3A3]"
                              }`}>
                                {stage.name}
                              </h4>
                              {isActive && (
                                <motion.span
                                  className="px-2 py-0.5 rounded text-xs bg-[#DC143C]/20 text-[#DC143C]"
                                  animate={{ opacity: [1, 0.5, 1] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                  Current
                                </motion.span>
                              )}
                            </div>
                            {stage.date && (
                              <p className="text-sm text-[#A3A3A3] mt-1">{stage.date}</p>
                            )}
                            {stage.technician && (
                              <p className="text-sm text-[#DC143C] mt-1">
                                Assigned to: {stage.technician}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Issue Details */}
              <div className="p-6 border-t border-[#2A2A2A] bg-[#0B0B0B]/50">
                <h3 className="text-lg font-medium text-white mb-4">Issue Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#A3A3A3]">Category</p>
                    <p className="text-white">{trackedIssue.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#A3A3A3]">Location</p>
                    <p className="text-white">{trackedIssue.location}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-[#A3A3A3]">Description</p>
                    <p className="text-white">{trackedIssue.description}</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Other Issues Sidebar */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard hover={false}>
              <div className="p-4 border-b border-[#2A2A2A]">
                <h3 className="font-medium text-white">Other Active Issues</h3>
              </div>
              <div className="divide-y divide-[#2A2A2A]">
                {otherIssues.map((issue, index) => (
                  <motion.div
                    key={issue.id}
                    className="p-4 hover:bg-[#1A1A1A]/50 cursor-pointer transition-colors"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#DC143C]/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#DC143C]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#DC143C] font-mono">{issue.id}</p>
                        <p className="text-sm text-white truncate">{issue.title}</p>
                        <p className="text-xs text-[#A3A3A3]">{issue.date}</p>
                      </div>
                    </div>
                    {/* Mini progress bar */}
                    <div className="mt-3 h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#8B0000] to-[#DC143C]"
                        initial={{ width: 0 }}
                        animate={{ width: `${((issue.stage + 1) / 4) * 100}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}
