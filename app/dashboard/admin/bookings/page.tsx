"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Building2,
  Search,
  Filter,
  Check,
  X,
  Eye
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { GlassCard } from "@/components/ui/glass-card"
import { GlowButton } from "@/components/ui/glow-button"
import { cn } from "@/lib/utils"

const allBookings = [
  {
    id: 1,
    user: "John Doe",
    email: "john.doe@university.edu",
    resource: "Conference Room A",
    location: "Building A, Floor 2",
    date: "2026-03-25",
    time: "10:00 AM",
    duration: 2,
    eventName: "Project Review Meeting",
    attendees: 12,
    status: "pending",
  },
  {
    id: 2,
    user: "Jane Smith",
    email: "jane.smith@university.edu",
    resource: "Auditorium Hall",
    location: "Main Building, Ground Floor",
    date: "2026-03-28",
    time: "02:00 PM",
    duration: 3,
    eventName: "Annual Tech Symposium",
    attendees: 150,
    status: "pending",
  },
  {
    id: 3,
    user: "Mike Johnson",
    email: "mike.j@university.edu",
    resource: "Seminar Room B",
    location: "Building B, Floor 3",
    date: "2026-03-26",
    time: "09:00 AM",
    duration: 1,
    eventName: "Department Meeting",
    attendees: 25,
    status: "confirmed",
  },
  {
    id: 4,
    user: "Sarah Wilson",
    email: "sarah.w@university.edu",
    resource: "Computer Lab 1",
    location: "IT Building, Floor 1",
    date: "2026-03-27",
    time: "11:00 AM",
    duration: 2,
    eventName: "Coding Workshop",
    attendees: 35,
    status: "confirmed",
  },
  {
    id: 5,
    user: "Tom Brown",
    email: "tom.b@university.edu",
    resource: "Outdoor Amphitheater",
    location: "Campus Gardens",
    date: "2026-04-01",
    time: "05:00 PM",
    duration: 4,
    eventName: "Cultural Festival",
    attendees: 300,
    status: "pending",
  },
]

const resources = [
  { name: "Conference Room A", bookings: 12, utilization: 78 },
  { name: "Auditorium Hall", bookings: 8, utilization: 45 },
  { name: "Computer Lab 1", bookings: 24, utilization: 92 },
  { name: "Seminar Room B", bookings: 15, utilization: 65 },
  { name: "Study Room 101", bookings: 45, utilization: 88 },
]

const statusConfig = {
  confirmed: {
    icon: CheckCircle,
    color: "text-green-400",
    bg: "bg-green-500/20",
    label: "Confirmed",
  },
  pending: {
    icon: AlertCircle,
    color: "text-yellow-400",
    bg: "bg-yellow-500/20",
    label: "Pending",
  },
  rejected: {
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-500/20",
    label: "Rejected",
  },
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState(allBookings)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBookings = bookings.filter(b => {
    const matchesFilter = filter === "all" || b.status === filter
    const matchesSearch = b.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.eventName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleApprove = (id: number) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: "confirmed" } : b
    ))
  }

  const handleReject = (id: number) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: "rejected" } : b
    ))
  }

  const pendingCount = bookings.filter(b => b.status === "pending").length
  const todayBookings = bookings.filter(b => b.date === "2026-03-25").length

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">
              Booking <span className="text-[#DC143C]">Management</span>
            </h1>
            <p className="text-gray-400 mt-1">Review and manage resource reservations</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#DC143C] transition-colors w-64"
              />
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Bookings", value: bookings.length, icon: Calendar, color: "text-white" },
            { label: "Pending Approval", value: pendingCount, icon: AlertCircle, color: "text-yellow-400" },
            { label: "Today's Events", value: todayBookings, icon: Clock, color: "text-[#DC143C]" },
            { label: "Active Resources", value: resources.length, icon: Building2, color: "text-green-400" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className={cn("text-3xl font-bold mt-1", stat.color)}>{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#DC143C]/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-[#DC143C]" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Bookings List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              {["all", "pending", "confirmed", "rejected"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all capitalize",
                    filter === status
                      ? "bg-[#DC143C] text-white"
                      : "bg-[#1A1A1A] text-gray-400 hover:text-white border border-[#2A2A2A]"
                  )}
                >
                  {status}
                  {status === "pending" && pendingCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 bg-yellow-500 text-black text-xs rounded-full">
                      {pendingCount}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Bookings */}
            <div className="space-y-3">
              {filteredBookings.map((booking, index) => {
                const status = statusConfig[booking.status as keyof typeof statusConfig]
                const StatusIcon = status?.icon || AlertCircle
                
                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GlassCard className="p-4 hover:border-[#DC143C]/50 transition-all">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#DC143C] to-[#8B0000] flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-lg">
                            {booking.user.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="text-white font-semibold">{booking.eventName}</h3>
                              <p className="text-gray-400 text-sm">by {booking.user}</p>
                            </div>
                            {status && (
                              <div className={cn("flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium", status.bg, status.color)}>
                                <StatusIcon className="w-3 h-3" />
                                {status.label}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1 text-[#DC143C]">
                              <Building2 className="w-3 h-3" />
                              {booking.resource}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {booking.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {booking.attendees}
                            </span>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        {booking.status === "pending" && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleApprove(booking.id)}
                              className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                              title="Approve"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleReject(booking.id)}
                              className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                              title="Reject"
                            >
                              <X className="w-5 h-5" />
                            </button>
                            <button
                              className="p-2 rounded-lg bg-[#2A2A2A] text-gray-400 hover:text-white transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </GlassCard>
                  </motion.div>
                )
              })}
            </div>

            {filteredBookings.length === 0 && (
              <GlassCard className="p-8 text-center">
                <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No bookings found</p>
              </GlassCard>
            )}
          </div>

          {/* Resource Utilization */}
          <div className="space-y-4">
            <GlassCard className="p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Resource Utilization</h3>
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <motion.div
                    key={resource.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-gray-300">{resource.name}</span>
                      <span className="text-xs text-gray-500">{resource.bookings} bookings</span>
                    </div>
                    <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${resource.utilization}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={cn(
                          "h-full rounded-full",
                          resource.utilization > 80 ? "bg-[#DC143C]" :
                          resource.utilization > 50 ? "bg-yellow-500" : "bg-green-500"
                        )}
                      />
                    </div>
                    <p className="text-right text-xs text-gray-500 mt-1">{resource.utilization}% utilized</p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <GlowButton variant="outline" className="w-full justify-start">
                  <Building2 className="w-4 h-4 mr-2" />
                  Add New Resource
                </GlowButton>
                <GlowButton variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Calendar
                </GlowButton>
                <GlowButton variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Permissions
                </GlowButton>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
