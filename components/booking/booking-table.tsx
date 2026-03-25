"use client"

import { motion } from "framer-motion"
import { 
  Calendar, 
  Clock, 
  Users, 
  Building2, 
  Eye, 
  Check, 
  X,
  Edit2,
  MoreVertical
} from "lucide-react"
import { cn } from "@/lib/utils"
import { BookingStatusBadge, BookingStatus } from "./booking-status-badge"
import { useState } from "react"

interface Booking {
  id: number
  user: string
  email?: string
  resource: string
  location: string
  date: string
  time: string
  duration: number
  eventName: string
  attendees: number
  status: BookingStatus
}

interface BookingTableProps {
  bookings: Booking[]
  onApprove?: (id: number) => void
  onReject?: (id: number) => void
  onView?: (booking: Booking) => void
  onEdit?: (booking: Booking) => void
  showActions?: boolean
  adminView?: boolean
  className?: string
}

export function BookingTable({
  bookings,
  onApprove,
  onReject,
  onView,
  onEdit,
  showActions = true,
  adminView = false,
  className
}: BookingTableProps) {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)

  return (
    <div className={cn("space-y-3", className)}>
      {bookings.map((booking, index) => (
        <motion.div
          key={booking.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="group"
        >
          <div className={cn(
            "bg-[#1A1A1A]/80 backdrop-blur-lg rounded-xl p-4 border border-[#2A2A2A]",
            "hover:border-[#DC143C]/50 hover:shadow-[0_0_20px_rgba(220,20,60,0.1)]",
            "transition-all duration-300"
          )}>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* User Avatar (Admin View) */}
              {adminView && (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#DC143C] to-[#8B0000] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-lg">
                    {booking.user.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}

              {/* Resource Icon (User View) */}
              {!adminView && (
                <div className="w-14 h-14 bg-gradient-to-br from-[#DC143C]/20 to-[#8B0000]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-7 h-7 text-[#DC143C]" />
                </div>
              )}

              {/* Booking Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition-colors">
                      {booking.eventName}
                    </h3>
                    {adminView && (
                      <p className="text-gray-400 text-sm">by {booking.user}</p>
                    )}
                    <p className="text-[#DC143C] text-sm font-medium">{booking.resource}</p>
                  </div>
                  <BookingStatusBadge status={booking.status} />
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                  {adminView && booking.email && (
                    <span className="text-gray-400">{booking.email}</span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(booking.date).toLocaleDateString('en-US', { 
                      weekday: 'short',
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {booking.time} ({booking.duration}h)
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {booking.attendees} attendees
                  </span>
                </div>
              </div>

              {/* Actions */}
              {showActions && (
                <div className="flex items-center gap-2">
                  {adminView && booking.status === "pending" && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onApprove?.(booking.id)}
                        className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                        title="Approve"
                      >
                        <Check className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onReject?.(booking.id)}
                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                        title="Reject"
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </>
                  )}
                  
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
                        <button 
                          onClick={() => {
                            onView?.(booking)
                            setActiveDropdown(null)
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-[#2A2A2A] flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        {(booking.status === "pending" || booking.status === "confirmed") && (
                          <button 
                            onClick={() => {
                              onEdit?.(booking)
                              setActiveDropdown(null)
                            }}
                            className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-[#2A2A2A] flex items-center gap-2"
                          >
                            <Edit2 className="w-4 h-4" />
                            {adminView ? "Modify Time" : "Modify Booking"}
                          </button>
                        )}
                        {!adminView && (booking.status === "pending" || booking.status === "confirmed") && (
                          <button 
                            onClick={() => {
                              onReject?.(booking.id)
                              setActiveDropdown(null)
                            }}
                            className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-[#2A2A2A] flex items-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            Cancel Booking
                          </button>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}

      {bookings.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No bookings found</p>
        </div>
      )}
    </div>
  )
}
