"use client"

import { motion } from "framer-motion"
import { Activity, AlertTriangle, BarChart3, CheckCircle, Clock, Server, Users, Wrench } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard/layout"
import { StatCard } from "@/components/dashboard/stat-card"
import { GlassCard } from "@/components/ui/glass-card"

// Mock data
const systemStatus = [
  { name: "Database", status: "operational", uptime: "99.9%" },
  { name: "API Server", status: "operational", uptime: "99.8%" },
  { name: "Notification Service", status: "operational", uptime: "99.7%" },
  { name: "File Storage", status: "degraded", uptime: "98.5%" },
]

const recentActivities = [
  { action: "New issue reported", user: "John Doe", time: "2 min ago" },
  { action: "Issue #1284 resolved", user: "Tech Smith", time: "15 min ago" },
  { action: "Technician assigned", user: "Admin", time: "1 hour ago" },
  { action: "User registered", user: "Jane Wilson", time: "2 hours ago" },
  { action: "Issue escalated", user: "System", time: "3 hours ago" },
]

const topTechnicians = [
  { name: "John Smith", completed: 45, rating: 4.9 },
  { name: "Sarah Johnson", completed: 42, rating: 4.8 },
  { name: "Mike Brown", completed: 38, rating: 4.7 },
]

export default function AdminDashboard() {
  return (
    <DashboardLayout userType="admin">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Admin <span className="text-[#DC143C]">Control Center</span>
        </h1>
        <p className="text-[#A3A3A3] mt-1">Mission control for campus operations</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Issues"
          value={1284}
          icon={AlertTriangle}
          trend={{ value: 12, positive: true }}
          delay={0.1}
        />
        <StatCard
          title="Pending Issues"
          value={47}
          icon={Clock}
          trend={{ value: -8, positive: true }}
          delay={0.2}
        />
        <StatCard
          title="Active Technicians"
          value={24}
          icon={Wrench}
          delay={0.3}
        />
        <StatCard
          title="Total Users"
          value={3842}
          icon={Users}
          trend={{ value: 15, positive: true }}
          delay={0.4}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* System Status */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard hover={false} className="h-full">
            <div className="p-6 border-b border-[#2A2A2A]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8B0000] to-[#DC143C] flex items-center justify-center">
                  <Server className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">System Status</h2>
                  <p className="text-sm text-[#A3A3A3]">Real-time service monitoring</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {systemStatus.map((service, index) => (
                  <motion.div
                    key={service.name}
                    className="flex items-center justify-between p-4 rounded-xl bg-[#0B0B0B]/50 border border-[#2A2A2A]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className={`w-3 h-3 rounded-full ${
                          service.status === "operational" ? "bg-emerald-400" : "bg-amber-400"
                        }`}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.7, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-white font-medium">{service.name}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm ${
                        service.status === "operational" ? "text-emerald-400" : "text-amber-400"
                      }`}>
                        {service.status}
                      </span>
                      <p className="text-xs text-[#A3A3A3]">{service.uptime}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard hover={false} className="h-full">
            <div className="p-4 border-b border-[#2A2A2A]">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#DC143C]" />
                <h2 className="font-semibold text-white">Recent Activity</h2>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#DC143C] mt-2" />
                  <div>
                    <p className="text-sm text-white">{activity.action}</p>
                    <p className="text-xs text-[#A3A3A3]">{activity.user} • {activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Top Technicians */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard hover={false}>
            <div className="p-4 border-b border-[#2A2A2A]">
              <h2 className="font-semibold text-white">Top Technicians</h2>
            </div>
            <div className="p-4 space-y-4">
              {topTechnicians.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#0B0B0B]/50"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B0000] to-[#DC143C] flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-white">{tech.name}</p>
                      <p className="text-xs text-[#A3A3A3]">{tech.completed} tasks completed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    <span className="text-sm font-medium">{tech.rating}</span>
                    <span className="text-xs">★</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GlassCard hover={false}>
            <div className="p-4 border-b border-[#2A2A2A]">
              <h2 className="font-semibold text-white">Quick Actions</h2>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              {[
                { label: "Assign Issues", href: "/dashboard/admin/assign", icon: AlertTriangle },
                { label: "View Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
                { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
                { label: "Technicians", href: "/dashboard/admin/technicians", icon: Wrench },
              ].map((action, index) => (
                <Link key={action.label} href={action.href}>
                  <motion.div
                    className="p-4 rounded-xl bg-[#0B0B0B]/50 border border-[#2A2A2A] hover:border-[#DC143C]/30 transition-colors cursor-pointer group"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <action.icon className="w-6 h-6 text-[#DC143C] mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm text-white">{action.label}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
