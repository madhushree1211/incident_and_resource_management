"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  X, 
  Check,
  Loader2,
  FileText,
  Building2
} from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { GlowButton } from "@/components/ui/glow-button"
import { cn } from "@/lib/utils"

interface Resource {
  id: number
  name: string
  type: string
  location: string
  capacity: number
}

interface BookingFormModalProps {
  isOpen: boolean
  onClose: () => void
  resource: Resource | null
  selectedDate: Date
  selectedTime: string | null
  onSubmit: (data: BookingFormData) => void
}

export interface BookingFormData {
  resourceId: number
  resourceName: string
  date: string
  startTime: string
  endTime: string
  duration: number
  eventName: string
  purpose: string
  attendees: number
}

const durationOptions = [1, 2, 3, 4, 5, 6]

export function BookingFormModal({
  isOpen,
  onClose,
  resource,
  selectedDate,
  selectedTime,
  onSubmit
}: BookingFormModalProps) {
  const [eventName, setEventName] = useState("")
  const [purpose, setPurpose] = useState("")
  const [attendees, setAttendees] = useState("")
  const [duration, setDuration] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false)
  const [availabilityChecked, setAvailabilityChecked] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckAvailability = async () => {
    setIsCheckingAvailability(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsCheckingAvailability(false)
    setAvailabilityChecked(true)
  }

  const handleSubmit = async () => {
    if (!resource || !selectedTime || !eventName || !attendees) return
    
    setError(null)
    setIsSubmitting(true)
    
    const startHour = parseInt(selectedTime.split(":")[0])
    const endHour = startHour + duration
    const endTime = `${endHour.toString().padStart(2, '0')}:00`

    const bookingPayload = {
      resourceId: resource.id,
      resourceName: resource.name,
      date: selectedDate.toISOString().split('T')[0],
      startTime: selectedTime,
      endTime,
      duration,
      eventName,
      purpose,
      attendees: parseInt(attendees),
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      })
      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Unable to submit booking')
        setIsSubmitting(false)
        return
      }

      onSubmit(bookingPayload)
      setIsSubmitting(false)
      setIsSuccess(true)

      setTimeout(() => {
        setIsSuccess(false)
        onClose()
        setEventName("")
        setPurpose("")
        setAttendees("")
        setDuration(1)
        setAvailabilityChecked(false)
      }, 2000)
    } catch (err) {
      setError('Unable to submit booking. Please try again.')
      setIsSubmitting(false)
    }
  }

  const formatTime = (time: string) => {
    const hour = parseInt(time.split(':')[0])
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:00 ${ampm}`
  }

  return (
    <AnimatePresence>
      {isOpen && resource && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => !isSubmitting && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg"
          >
            <GlassCard className="p-6 relative overflow-hidden">
              {/* Background glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#DC143C]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#8B0000]/20 rounded-full blur-3xl" />
              
              <div className="relative">
                {isSuccess ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 relative"
                    >
                      <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
                      <Check className="w-12 h-12 text-green-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Booking Submitted!</h3>
                    <p className="text-gray-400">Your reservation request has been sent for approval.</p>
                  </motion.div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">Confirm Booking</h3>
                      <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-[#2A2A2A] transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>

                    {/* Resource Summary */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gradient-to-r from-[#DC143C]/10 to-[#8B0000]/10 rounded-xl p-4 mb-6 border border-[#DC143C]/20"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#DC143C]/20 flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-6 h-6 text-[#DC143C]" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{resource.name}</h4>
                          <p className="text-gray-400 text-sm flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            {resource.location}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="flex items-center gap-1 text-gray-300">
                              <Calendar className="w-4 h-4 text-[#DC143C]" />
                              {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            {selectedTime && (
                              <span className="flex items-center gap-1 text-gray-300">
                                <Clock className="w-4 h-4 text-[#DC143C]" />
                                {formatTime(selectedTime)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        <label className="text-sm text-gray-400 mb-1.5 block">Event Name *</label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            placeholder="e.g., Project Review, Workshop"
                            className="w-full pl-10 pr-4 py-2.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#DC143C] transition-all"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="text-sm text-gray-400 mb-1.5 block">Purpose</label>
                        <textarea
                          value={purpose}
                          onChange={(e) => setPurpose(e.target.value)}
                          placeholder="Brief description of the event purpose..."
                          rows={2}
                          className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#DC143C] transition-all resize-none"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="grid grid-cols-2 gap-4"
                      >
                        <div>
                          <label className="text-sm text-gray-400 mb-1.5 block">Attendees *</label>
                          <div className="relative">
                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                              type="number"
                              value={attendees}
                              onChange={(e) => setAttendees(e.target.value)}
                              placeholder="Count"
                              max={resource.capacity}
                              className="w-full pl-10 pr-4 py-2.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#DC143C] transition-all"
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Max: {resource.capacity}</p>
                        </div>

                        <div>
                          <label className="text-sm text-gray-400 mb-1.5 block">Duration (hours)</label>
                          <div className="flex gap-1">
                            {durationOptions.slice(0, 4).map((h) => (
                              <button
                                key={h}
                                onClick={() => setDuration(h)}
                                className={cn(
                                  "flex-1 py-2.5 rounded-lg text-sm font-medium transition-all",
                                  duration === h
                                    ? "bg-[#DC143C] text-white"
                                    : "bg-[#1A1A1A] border border-[#2A2A2A] text-gray-400 hover:border-[#DC143C]/50"
                                )}
                              >
                                {h}h
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>

                      {error && (
                        <p className="text-sm text-red-400">{error}</p>
                      )}

                    </div>

                    {/* Actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex gap-3 mt-6"
                    >
                      {!availabilityChecked ? (
                        <GlowButton
                          variant="outline"
                          className="flex-1"
                          onClick={handleCheckAvailability}
                          disabled={isCheckingAvailability}
                        >
                          {isCheckingAvailability ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Checking...
                            </>
                          ) : (
                            <>
                              <Clock className="w-4 h-4 mr-2" />
                              Check Availability
                            </>
                          )}
                        </GlowButton>
                      ) : (
                        <div className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-green-500/20 rounded-lg text-green-400 text-sm">
                          <Check className="w-4 h-4" />
                          Time slot is available
                        </div>
                      )}

                      <GlowButton
                        className="flex-1"
                        onClick={handleSubmit}
                        disabled={!eventName || !attendees || isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Booking...
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Confirm Booking
                          </>
                        )}
                      </GlowButton>
                    </motion.div>
                  </>
                )}
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
