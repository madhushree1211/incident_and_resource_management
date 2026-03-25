"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Building2
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"

const bookings = [
  {
    id: 1,
    resource: "Conference Room A",
    location: "Building A, Floor 2",
    date: "2026-03-25",
    time: "10:00 AM",
    duration: 2,
    eventName: "Project Review Meeting",
    attendees: 12,
    status: "confirmed",
  },
  {
    id: 2,
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
    resource: "Seminar Room B",
    location: "Building B, Floor 3",
    date: "2026-03-20",
    time: "09:00 AM",
    duration: 1,
    eventName: "Team Standup",
    attendees: 8,
    status: "completed",
  },
  {
    id: 4,
    resource: "Study Room 101",
    location: "Library, Floor 2",
    date: "2026-03-22",
    time: "03:00 PM",
    duration: 2,
    eventName: "Study Group Session",
    attendees: 6,
    status: "cancelled",
  },
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
  completed: {
    icon: CheckCircle,
    color: "text-blue-400",
    bg: "bg-blue-500/20",
    label: "Completed",
  },
  cancelled: {
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-500/20",
    label: "Cancelled",
  },
}

export default function MyBookingsPage() {
  const [filter, setFilter] = useState("all")
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)

  const filteredBookings = bookings.filter(b => 
    filter === "all" || b.status === filter
  )

  const upcomingCount = bookings.filter(b => b.status === "confirmed" || b.status === "pending").length
  const completedCount = bookings.filter(b => b.status === "completed").length

  return (
    <DashboardLayout userType="user">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white">
            My <span className="text-[#DC143C]">Bookings</span>
          </h1>
          <p className="text-gray-400 mt-1">Manage your resource reservations</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Bookings", value: bookings.length, color: "text-white" },
            { label: "Upcoming", value: upcomingCount, color: "text-[#DC143C]" },
            { label: "Completed", value: completedCount, color: "text-green-400" },
            { label: "This Month", value: bookings.length, color: "text-blue-400" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-4">
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className={cn("text-3xl font-bold mt-1", stat.color)}>{stat.value}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {["all", "confirmed", "pending", "completed", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize whitespace-nowrap",
                filter === status
                  ? "bg-[#DC143C] text-white"
                  : "bg-[#1A1A1A] text-gray-400 hover:text-white border border-[#2A2A2A]"
              )}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking, index) => {
            const status = statusConfig[booking.status as keyof typeof statusConfig]
            const StatusIcon = status.icon
            
            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard className="p-4 hover:border-[#DC143C]/50 transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Resource Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-[#DC143C]/20 to-[#8B0000]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-8 h-8 text-[#DC143C]" />
                    </div>
                    
                    {/* Booking Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{booking.eventName}</h3>
                          <p className="text-[#DC143C] text-sm font-medium">{booking.resource}</p>
                        </div>
                        <div className={cn("flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium", status.bg, status.color)}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {booking.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(booking.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {booking.time} ({booking.duration}h)
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {booking.attendees} attendees
                        </span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === booking.id ? null : booking.id)}
                        className="p-2 rounded-lg hover:bg-[#2A2A2A] transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                      
                      {activeDropdown === booking.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-0 top-full mt-2 w-48 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg shadow-xl z-10 overflow-hidden"
                        >
                          <button className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-[#2A2A2A] flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                          {(booking.status === "confirmed" || booking.status === "pending") && (
                            <>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-[#2A2A2A] flex items-center gap-2">
                                <Edit2 className="w-4 h-4" />
                                Modify Booking
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-[#2A2A2A] flex items-center gap-2">
                                <Trash2 className="w-4 h-4" />
                                Cancel Booking
                              </button>
                            </>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>

        {filteredBookings.length === 0 && (
          <GlassCard className="p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Bookings Found</h3>
            <p className="text-gray-400">You don&apos;t have any {filter !== "all" ? filter : ""} bookings yet.</p>
          </GlassCard>
        )}
      </div>
    </DashboardLayout>
  )
}
