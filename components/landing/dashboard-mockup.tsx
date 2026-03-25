"use client"

import { motion } from "framer-motion"
import { Activity, AlertTriangle, CheckCircle, Clock, Users } from "lucide-react"

export function DashboardMockup() {
  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {/* 3D Container */}
      <motion.div
        className="relative transform-gpu"
        animate={{ 
          rotateX: [0, 2, 0],
          rotateY: [-2, 2, -2],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{ 
          transformStyle: "preserve-3d",
          transform: "rotateX(10deg) rotateY(-5deg)"
        }}
      >
        {/* Main Dashboard Panel */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#DC143C]/30 shadow-[0_0_60px_rgba(220,20,60,0.2)]">
          {/* Header Bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2A2A2A] bg-[#0F0F0F]/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 rounded-md bg-[#2A2A2A] text-xs text-[#A3A3A3]">
                campus.platform.io/dashboard
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6 space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Total Issues", value: "1,284", icon: AlertTriangle, trend: "+12%" },
                { label: "In Progress", value: "47", icon: Clock, trend: "+5%" },
                { label: "Resolved", value: "1,198", icon: CheckCircle, trend: "+18%" },
                { label: "Technicians", value: "24", icon: Users, trend: "+2" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="p-4 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#2A2A2A]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-5 h-5 text-[#DC143C]" />
                    <span className="text-xs text-emerald-400">{stat.trend}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-[#A3A3A3]">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Chart Area */}
            <div className="flex gap-4">
              {/* Line Chart */}
              <div className="flex-1 p-4 rounded-xl bg-[#0F0F0F] border border-[#2A2A2A]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-white">Issue Analytics</span>
                  <Activity className="w-4 h-4 text-[#DC143C]" />
                </div>
                <div className="h-32 flex items-end gap-1">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-[#8B0000] to-[#DC143C] rounded-t-sm"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 1 + i * 0.05, duration: 0.5 }}
                    />
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="w-64 p-4 rounded-xl bg-[#0F0F0F] border border-[#2A2A2A]">
                <span className="text-sm font-medium text-white">Recent Activity</span>
                <div className="mt-4 space-y-3">
                  {[
                    { text: "Issue #1284 resolved", time: "2m ago" },
                    { text: "New report: Block A", time: "5m ago" },
                    { text: "Technician assigned", time: "12m ago" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#DC143C]" />
                      <div className="flex-1">
                        <div className="text-xs text-white">{item.text}</div>
                        <div className="text-[10px] text-[#A3A3A3]">{item.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating accent elements */}
        <motion.div
          className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#DC143C]/20 blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-[#FF2D2D]/20 blur-xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.8, 0.5, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  )
}
