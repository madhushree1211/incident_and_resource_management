"use client"

import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/dashboard/layout"
import { GlassCard } from "@/components/ui/glass-card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts"

// Mock data
const monthlyData = [
  { month: "Jan", issues: 65, resolved: 58 },
  { month: "Feb", issues: 82, resolved: 75 },
  { month: "Mar", issues: 91, resolved: 85 },
  { month: "Apr", issues: 78, resolved: 72 },
  { month: "May", issues: 110, resolved: 98 },
  { month: "Jun", issues: 95, resolved: 88 },
]

const categoryData = [
  { name: "Electrical", value: 35, color: "#DC143C" },
  { name: "Plumbing", value: 25, color: "#8B0000" },
  { name: "HVAC", value: 20, color: "#FF2D2D" },
  { name: "IT/Network", value: 12, color: "#FF6B6B" },
  { name: "Other", value: 8, color: "#B91C1C" },
]

const technicianWorkload = [
  { name: "John S.", tasks: 45, completed: 42 },
  { name: "Sarah J.", tasks: 38, completed: 35 },
  { name: "Mike B.", tasks: 42, completed: 38 },
  { name: "Lisa K.", tasks: 35, completed: 33 },
  { name: "Tom W.", tasks: 28, completed: 25 },
]

const weeklyTrend = [
  { day: "Mon", issues: 12 },
  { day: "Tue", issues: 15 },
  { day: "Wed", issues: 18 },
  { day: "Thu", issues: 14 },
  { day: "Fri", issues: 22 },
  { day: "Sat", issues: 8 },
  { day: "Sun", issues: 5 },
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-3 shadow-lg">
        <p className="text-white font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalyticsPage() {
  return (
    <DashboardLayout userType="admin">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white">Analytics Dashboard</h1>
        <p className="text-[#A3A3A3] mt-1">Comprehensive insights into campus operations</p>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Issues Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard hover={false} className="p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Monthly Issue Trends</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="issuesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC143C" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#DC143C" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="month" 
                    stroke="#666" 
                    tick={{ fill: '#A3A3A3' }}
                    axisLine={{ stroke: '#2A2A2A' }}
                  />
                  <YAxis 
                    stroke="#666" 
                    tick={{ fill: '#A3A3A3' }}
                    axisLine={{ stroke: '#2A2A2A' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="issues" 
                    stroke="#DC143C" 
                    fill="url(#issuesGradient)" 
                    strokeWidth={2}
                    name="Reported"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="resolved" 
                    stroke="#10B981" 
                    fill="url(#resolvedGradient)" 
                    strokeWidth={2}
                    name="Resolved"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard hover={false} className="p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Issue Categories</h2>
            <div className="h-72 flex items-center">
              <ResponsiveContainer width="60%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-40 space-y-2">
                {categoryData.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm text-[#A3A3A3]">{entry.name}</span>
                    <span className="text-sm text-white ml-auto">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Technician Workload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard hover={false} className="p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Technician Workload</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={technicianWorkload} layout="vertical">
                  <XAxis 
                    type="number" 
                    stroke="#666" 
                    tick={{ fill: '#A3A3A3' }}
                    axisLine={{ stroke: '#2A2A2A' }}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    stroke="#666" 
                    tick={{ fill: '#A3A3A3' }}
                    axisLine={{ stroke: '#2A2A2A' }}
                    width={60}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="tasks" 
                    fill="#8B0000" 
                    name="Assigned"
                    radius={[0, 4, 4, 0]}
                  />
                  <Bar 
                    dataKey="completed" 
                    fill="#DC143C" 
                    name="Completed"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* Weekly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard hover={false} className="p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Weekly Issue Trend</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrend}>
                  <XAxis 
                    dataKey="day" 
                    stroke="#666" 
                    tick={{ fill: '#A3A3A3' }}
                    axisLine={{ stroke: '#2A2A2A' }}
                  />
                  <YAxis 
                    stroke="#666" 
                    tick={{ fill: '#A3A3A3' }}
                    axisLine={{ stroke: '#2A2A2A' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="issues" 
                    stroke="#DC143C" 
                    strokeWidth={3}
                    dot={{ fill: '#DC143C', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#FF2D2D' }}
                    name="Issues"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Summary Stats */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {[
          { label: "Avg Resolution Time", value: "4.2 hrs" },
          { label: "Resolution Rate", value: "94.5%" },
          { label: "User Satisfaction", value: "4.7/5" },
          { label: "Active Issues", value: "47" },
        ].map((stat, index) => (
          <GlassCard key={stat.label} className="p-4 text-center" hover={false}>
            <p className="text-2xl font-bold text-[#DC143C]">{stat.value}</p>
            <p className="text-sm text-[#A3A3A3]">{stat.label}</p>
          </GlassCard>
        ))}
      </motion.div>
    </DashboardLayout>
  )
}
