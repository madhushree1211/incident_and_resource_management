"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/glass-card"

interface TimeSlot {
  time: string
  available: boolean
  bookedBy?: string
  eventName?: string
}

interface BookingCalendarProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
  bookedSlots?: Array<{
    date: string
    time: string
    bookedBy?: string
    eventName?: string
  }>
  onSlotClick?: (date: Date, time: string) => void
  className?: string
}

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
]

export function BookingCalendar({
  selectedDate,
  onDateChange,
  bookedSlots = [],
  onSlotClick,
  className
}: BookingCalendarProps) {
  const [viewMode, setViewMode] = useState<"calendar" | "timetable">("calendar")
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days: (Date | null)[] = []
    
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const navigateMonth = (direction: number) => {
    onDateChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + direction, 1))
  }

  const isDateBooked = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return bookedSlots.some(slot => slot.date === dateStr)
  }

  const getSlotInfo = (time: string): TimeSlot => {
    const dateStr = selectedDate.toISOString().split('T')[0]
    const slot = bookedSlots.find(s => s.date === dateStr && s.time === time)
    return {
      time,
      available: !slot,
      bookedBy: slot?.bookedBy,
      eventName: slot?.eventName
    }
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <div className={cn("space-y-4", className)}>
      {/* View Toggle */}
      <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-1 w-fit">
        <button
          onClick={() => setViewMode("calendar")}
          className={cn(
            "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
            viewMode === "calendar"
              ? "bg-[#DC143C] text-white"
              : "text-gray-400 hover:text-white"
          )}
        >
          Calendar
        </button>
        <button
          onClick={() => setViewMode("timetable")}
          className={cn(
            "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
            viewMode === "timetable"
              ? "bg-[#DC143C] text-white"
              : "text-gray-400 hover:text-white"
          )}
        >
          Timetable
        </button>
      </div>

      {viewMode === "calendar" ? (
        <GlassCard className="p-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 rounded-lg hover:bg-[#2A2A2A] transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>
            <h3 className="text-lg font-semibold text-white">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 rounded-lg hover:bg-[#2A2A2A] transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs text-gray-500 py-2 font-medium">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(selectedDate).map((day, index) => {
              const isSelected = day && day.toDateString() === selectedDate.toDateString()
              const isBooked = day && isDateBooked(day)
              const isPast = day && day < today
              
              return (
                <motion.button
                  key={index}
                  whileHover={day && !isPast ? { scale: 1.1 } : {}}
                  whileTap={day && !isPast ? { scale: 0.95 } : {}}
                  onClick={() => day && !isPast && onDateChange(day)}
                  disabled={!day || isPast}
                  className={cn(
                    "aspect-square rounded-lg text-sm font-medium transition-all relative",
                    !day && "invisible",
                    isSelected && "bg-[#DC143C] text-white shadow-[0_0_15px_rgba(220,20,60,0.5)]",
                    !isSelected && day && !isPast && "text-white hover:bg-[#2A2A2A]",
                    isPast && "text-gray-600 cursor-not-allowed"
                  )}
                >
                  {day?.getDate()}
                  {isBooked && !isSelected && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#DC143C]" />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#2A2A2A]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#DC143C]" />
              <span className="text-xs text-gray-400">Has bookings</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#DC143C]" />
              <span className="text-xs text-gray-400">Selected</span>
            </div>
          </div>
        </GlassCard>
      ) : (
        <GlassCard className="p-4">
          {/* Timetable Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
          </div>

          {/* Time Grid */}
          <div className="space-y-2">
            {timeSlots.map((time, index) => {
              const slot = getSlotInfo(time)
              const displayTime = new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })
              
              return (
                <motion.div
                  key={time}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => slot.available && onSlotClick?.(selectedDate, time)}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-lg transition-all cursor-pointer group",
                    slot.available 
                      ? "bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#DC143C]/50 hover:bg-[#2A2A2A]"
                      : "bg-[#DC143C]/10 border border-[#DC143C]/30"
                  )}
                >
                  <span className={cn(
                    "text-sm font-medium w-20",
                    slot.available ? "text-gray-400" : "text-[#DC143C]"
                  )}>
                    {displayTime}
                  </span>
                  
                  <div className="flex-1">
                    {slot.available ? (
                      <span className="text-green-400 text-sm">Available</span>
                    ) : (
                      <div>
                        <p className="text-white text-sm font-medium">{slot.eventName || "Booked"}</p>
                        {slot.bookedBy && (
                          <p className="text-gray-500 text-xs">{slot.bookedBy}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {slot.available && (
                    <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to book
                    </span>
                  )}
                </motion.div>
              )
            })}
          </div>
        </GlassCard>
      )}
    </div>
  )
}
