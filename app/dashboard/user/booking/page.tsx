"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Monitor, 
  Projector,
  Wifi,
  Coffee,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Building2,
  Sparkles,
  GraduationCap,
  Laptop,
  Presentation,
  Package,
  ArrowLeft
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { GlassCard } from "@/components/ui/glass-card"
import { GlowButton } from "@/components/ui/glow-button"
import { ResourceCard } from "@/components/booking/resource-card"
import { BookingCalendar } from "@/components/booking/booking-calendar"
import { BookingFormModal, BookingFormData } from "@/components/booking/booking-form-modal"
import { BookingToast, useBookingToast } from "@/components/booking/booking-toast"
import { cn } from "@/lib/utils"

const resourceTypes = [
  {
    id: "classroom",
    title: "Classroom",
    description: "Lecture halls and teaching rooms",
    icon: GraduationCap,
    count: 12
  },
  {
    id: "lab",
    title: "Computer Lab",
    description: "Fully equipped computer labs",
    icon: Laptop,
    count: 5
  },
  {
    id: "seminar",
    title: "Seminar Hall",
    description: "Conference and seminar spaces",
    icon: Presentation,
    count: 8
  },
  {
    id: "equipment",
    title: "Equipment",
    description: "Projectors, mics & AV gear",
    icon: Package,
    count: 24
  }
]

const allResources = [
  {
    id: 1,
    name: "Conference Room A",
    type: "seminar",
    capacity: 20,
    location: "Building A, Floor 2",
    amenities: ["projector", "whiteboard", "video-conf", "wifi"],
    available: true,
  },
  {
    id: 2,
    name: "Auditorium Hall",
    type: "seminar",
    capacity: 200,
    location: "Main Building, Ground Floor",
    amenities: ["projector", "sound-system", "stage", "wifi"],
    available: true,
  },
  {
    id: 3,
    name: "Computer Lab 1",
    type: "lab",
    capacity: 40,
    location: "IT Building, Floor 1",
    amenities: ["computers", "projector", "wifi", "printer"],
    available: false,
  },
  {
    id: 4,
    name: "Seminar Room B",
    type: "seminar",
    capacity: 50,
    location: "Building B, Floor 3",
    amenities: ["projector", "whiteboard", "wifi", "refreshments"],
    available: true,
  },
  {
    id: 5,
    name: "Classroom 101",
    type: "classroom",
    capacity: 60,
    location: "Academic Block, Floor 1",
    amenities: ["projector", "whiteboard", "wifi"],
    available: true,
  },
  {
    id: 6,
    name: "Classroom 102",
    type: "classroom",
    capacity: 45,
    location: "Academic Block, Floor 1",
    amenities: ["projector", "whiteboard", "wifi"],
    available: true,
  },
  {
    id: 7,
    name: "Computer Lab 2",
    type: "lab",
    capacity: 35,
    location: "IT Building, Floor 2",
    amenities: ["computers", "projector", "wifi"],
    available: true,
  },
  {
    id: 8,
    name: "Portable Projector Set",
    type: "equipment",
    capacity: 1,
    location: "Equipment Room",
    amenities: ["projector", "screen"],
    available: true,
  },
  {
    id: 9,
    name: "Wireless Microphone Kit",
    type: "equipment",
    capacity: 1,
    location: "Equipment Room",
    amenities: ["microphone", "receiver"],
    available: true,
  },
]

const amenityIcons: Record<string, React.ReactNode> = {
  projector: <Projector className="w-4 h-4" />,
  whiteboard: <Monitor className="w-4 h-4" />,
  "video-conf": <Monitor className="w-4 h-4" />,
  wifi: <Wifi className="w-4 h-4" />,
  "sound-system": <Sparkles className="w-4 h-4" />,
  stage: <Building2 className="w-4 h-4" />,
  computers: <Monitor className="w-4 h-4" />,
  printer: <Monitor className="w-4 h-4" />,
  refreshments: <Coffee className="w-4 h-4" />,
  microphone: <Sparkles className="w-4 h-4" />,
  screen: <Monitor className="w-4 h-4" />,
  receiver: <Sparkles className="w-4 h-4" />,
}

const bookedSlots = [
  { date: "2026-03-25", time: "10:00", bookedBy: "John Doe", eventName: "Team Meeting" },
  { date: "2026-03-25", time: "14:00", bookedBy: "Jane Smith", eventName: "Workshop" },
  { date: "2026-03-26", time: "09:00", bookedBy: "Mike Johnson", eventName: "Training" },
]

export default function BookingPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedResource, setSelectedResource] = useState<typeof allResources[0] | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [resources, setResources] = useState(allResources)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  
  const { toasts, hideToast, showSuccess, showInfo } = useBookingToast()

  useEffect(() => {
    async function loadResources() {
      try {
        const response = await fetch('/api/resources')
        if (!response.ok) {
          throw new Error('Failed to load resources')
        }
        const serverResources = await response.json()
        setResources(serverResources)
      } catch {
        setFetchError('Could not load backend resources. Using local sample data.')
      }
    }
    loadResources()
  }, [])

  const filteredResources = resources.filter(r => {
    const matchesType = !selectedType || r.type === selectedType
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         r.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const handleSlotClick = (date: Date, time: string) => {
    setSelectedDate(date)
    setSelectedTime(time)
    if (selectedResource) {
      setShowBookingModal(true)
    }
  }

  const handleBookingSubmit = (data: BookingFormData) => {
    showSuccess("Booking Submitted", `Your booking for ${data.resourceName} has been submitted for approval.`)
    setSelectedResource(null)
    setSelectedTime(null)
  }

  const handleResourceSelect = (resource: typeof allResources[0]) => {
    setSelectedResource(resource)
    showInfo("Resource Selected", `${resource.name} selected. Choose a time slot to book.`)
  }

  return (
    <DashboardLayout userType="user">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            {selectedType && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => {
                  setSelectedType(null)
                  setSelectedResource(null)
                }}
                className="p-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#DC143C]/50 transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </motion.button>
            )}
            <div>
              <motion.h1 
                className="text-3xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={selectedType || "main"}
              >
                {selectedType ? (
                  <>Book <span className="text-[#DC143C]">{resourceTypes.find(t => t.id === selectedType)?.title}</span></>
                ) : (
                  <>Book Campus <span className="text-[#DC143C]">Resources</span></>
                )}
              </motion.h1>
              <p className="text-gray-400 mt-1">
                {selectedType 
                  ? "Select a resource and time slot to book" 
                  : "Select a resource type to get started"}
              </p>
            </div>
          </div>
          
          {selectedType && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#DC143C] transition-colors w-64"
              />
            </motion.div>
          )}
        </motion.div>

        {/* Resource Type Selection */}
        {!selectedType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {resourceTypes.map((type, index) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ResourceCard
                    title={type.title}
                    description={type.description}
                    icon={type.icon}
                    count={type.count}
                    onClick={() => setSelectedType(type.id)}
                  />
                </motion.div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {[
                { label: "Total Resources", value: "49", color: "text-white" },
                { label: "Available Now", value: "38", color: "text-green-400" },
                { label: "Your Bookings", value: "3", color: "text-[#DC143C]" },
                { label: "Pending Approval", value: "1", color: "text-yellow-400" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <GlassCard className="p-4">
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className={cn("text-3xl font-bold mt-1", stat.color)}>{stat.value}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Resource List & Calendar */}
        {selectedType && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Resources List */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GlassCard
                      className={cn(
                        "p-4 cursor-pointer transition-all duration-300",
                        selectedResource?.id === resource.id
                          ? "border-[#DC143C] shadow-[0_0_30px_rgba(220,20,60,0.3)]"
                          : "hover:border-[#DC143C]/50"
                      )}
                      onClick={() => handleResourceSelect(resource)}
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#DC143C]/20 to-[#8B0000]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-10 h-10 text-[#DC143C]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-white">{resource.name}</h3>
                              <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3" />
                                {resource.location}
                              </p>
                            </div>
                            <span className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium",
                              resource.available
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            )}>
                              {resource.available ? "Available" : "Booked"}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-3">
                            <span className="text-gray-400 text-sm flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {resource.capacity} {resource.type === "equipment" ? "unit" : "people"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            {resource.amenities.slice(0, 4).map((amenity) => (
                              <span
                                key={amenity}
                                className="w-7 h-7 rounded-md bg-[#2A2A2A] flex items-center justify-center text-gray-400"
                                title={amenity}
                              >
                                {amenityIcons[amenity] || <Sparkles className="w-4 h-4" />}
                              </span>
                            ))}
                            {resource.amenities.length > 4 && (
                              <span className="text-xs text-gray-500">
                                +{resource.amenities.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredResources.length === 0 && (
                <GlassCard className="p-12 text-center">
                  <Building2 className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No resources found matching your search</p>
                </GlassCard>
              )}
            </div>

            {/* Calendar & Time Selection */}
            <div className="space-y-4">
              <BookingCalendar
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                bookedSlots={bookedSlots}
                onSlotClick={handleSlotClick}
              />

              {selectedResource && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <GlassCard className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Selected Resource</h3>
                    <div className="bg-[#2A2A2A] rounded-lg p-3">
                      <p className="text-[#DC143C] font-medium">{selectedResource.name}</p>
                      <p className="text-gray-400 text-sm">{selectedResource.location}</p>
                    </div>
                    <GlowButton
                      className="w-full mt-4"
                      onClick={() => setShowBookingModal(true)}
                      disabled={!selectedTime}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {selectedTime ? "Complete Booking" : "Select a Time Slot"}
                    </GlowButton>
                  </GlassCard>
                </motion.div>
              )}

              {!selectedResource && (
                <GlassCard className="p-6 text-center">
                  <Building2 className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">Select a resource to view availability and book</p>
                </GlassCard>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingFormModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        resource={selectedResource}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onSubmit={handleBookingSubmit}
      />

      {/* Toast Notifications */}
      {toasts.map(toast => (
        <BookingToast
          key={toast.id}
          isVisible={true}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </DashboardLayout>
  )
}
