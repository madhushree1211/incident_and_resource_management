"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus,
  Search,
  Filter,
  Building2,
  MapPin,
  Users,
  Edit2,
  Trash2,
  MoreVertical,
  X,
  Check,
  Loader2,
  Calendar,
  Power,
  PowerOff,
  Projector,
  Monitor,
  Wifi,
  Coffee
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { GlassCard } from "@/components/ui/glass-card"
import { GlowButton } from "@/components/ui/glow-button"
import { BookingToast, useBookingToast } from "@/components/booking/booking-toast"
import { cn } from "@/lib/utils"

interface Resource {
  id: number
  name: string
  type: string
  location: string
  capacity: number
  amenities: string[]
  status: "active" | "inactive" | "maintenance"
  bookingsThisMonth: number
}

const initialResources: Resource[] = [
  {
    id: 1,
    name: "Conference Room A",
    type: "seminar",
    location: "Building A, Floor 2",
    capacity: 20,
    amenities: ["projector", "whiteboard", "wifi"],
    status: "active",
    bookingsThisMonth: 12
  },
  {
    id: 2,
    name: "Auditorium Hall",
    type: "seminar",
    location: "Main Building, Ground Floor",
    capacity: 200,
    amenities: ["projector", "sound-system", "stage", "wifi"],
    status: "active",
    bookingsThisMonth: 8
  },
  {
    id: 3,
    name: "Computer Lab 1",
    type: "lab",
    location: "IT Building, Floor 1",
    capacity: 40,
    amenities: ["computers", "projector", "wifi"],
    status: "maintenance",
    bookingsThisMonth: 24
  },
  {
    id: 4,
    name: "Classroom 101",
    type: "classroom",
    location: "Academic Block, Floor 1",
    capacity: 60,
    amenities: ["projector", "whiteboard", "wifi"],
    status: "active",
    bookingsThisMonth: 45
  },
  {
    id: 5,
    name: "Seminar Room B",
    type: "seminar",
    location: "Building B, Floor 3",
    capacity: 50,
    amenities: ["projector", "whiteboard", "wifi", "refreshments"],
    status: "inactive",
    bookingsThisMonth: 0
  },
]

const resourceTypes = ["all", "classroom", "lab", "seminar", "equipment"]
const amenityOptions = ["projector", "whiteboard", "wifi", "computers", "sound-system", "refreshments", "stage"]

const amenityIcons: Record<string, React.ReactNode> = {
  projector: <Projector className="w-4 h-4" />,
  whiteboard: <Monitor className="w-4 h-4" />,
  wifi: <Wifi className="w-4 h-4" />,
  computers: <Monitor className="w-4 h-4" />,
  "sound-system": <Monitor className="w-4 h-4" />,
  refreshments: <Coffee className="w-4 h-4" />,
  stage: <Building2 className="w-4 h-4" />,
}

const statusConfig = {
  active: { label: "Active", color: "text-green-400", bg: "bg-green-500/20" },
  inactive: { label: "Inactive", color: "text-gray-400", bg: "bg-gray-500/20" },
  maintenance: { label: "Maintenance", color: "text-yellow-400", bg: "bg-yellow-500/20" }
}

export default function ResourceManagementPage() {
  const [resources, setResources] = useState<Resource[]>(initialResources)
  const [filterType, setFilterType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  
  const { toasts, hideToast, showSuccess, showError } = useBookingToast()

  const filteredResources = resources.filter(r => {
    const matchesType = filterType === "all" || r.type === filterType
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         r.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const handleDelete = (id: number) => {
    const resource = resources.find(r => r.id === id)
    setResources(resources.filter(r => r.id !== id))
    showSuccess("Resource Deleted", `${resource?.name} has been removed.`)
  }

  const handleToggleStatus = (id: number) => {
    setResources(resources.map(r => {
      if (r.id === id) {
        const newStatus = r.status === "active" ? "inactive" : "active"
        return { ...r, status: newStatus }
      }
      return r
    }))
    showSuccess("Status Updated", "Resource status has been changed.")
  }

  const totalCapacity = resources.reduce((sum, r) => sum + r.capacity, 0)
  const activeCount = resources.filter(r => r.status === "active").length

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
              Resource <span className="text-[#DC143C]">Management</span>
            </h1>
            <p className="text-gray-400 mt-1">Add, edit, and manage campus resources</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#DC143C] transition-colors w-64"
              />
            </div>
            <GlowButton onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Resource
            </GlowButton>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Resources", value: resources.length, icon: Building2, color: "text-white" },
            { label: "Active Resources", value: activeCount, icon: Power, color: "text-green-400" },
            { label: "Total Capacity", value: totalCapacity, icon: Users, color: "text-[#DC143C]" },
            { label: "Under Maintenance", value: resources.filter(r => r.status === "maintenance").length, icon: Calendar, color: "text-yellow-400" },
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

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
          {resourceTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize whitespace-nowrap",
                filterType === type
                  ? "bg-[#DC143C] text-white"
                  : "bg-[#1A1A1A] text-gray-400 hover:text-white border border-[#2A2A2A]"
              )}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredResources.map((resource, index) => {
              const status = statusConfig[resource.status]
              
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <GlassCard className="p-4 hover:border-[#DC143C]/50 transition-all group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#DC143C]/20 to-[#8B0000]/20 rounded-xl flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-[#DC143C]" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn("px-2 py-1 rounded-full text-xs font-medium", status.bg, status.color)}>
                          {status.label}
                        </span>
                        <div className="relative">
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === resource.id ? null : resource.id)}
                            className="p-1 rounded hover:bg-[#2A2A2A] transition-colors"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          </button>
                          
                          {activeDropdown === resource.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute right-0 top-full mt-1 w-40 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg shadow-xl z-10 overflow-hidden"
                            >
                              <button
                                onClick={() => {
                                  setEditingResource(resource)
                                  setShowAddModal(true)
                                  setActiveDropdown(null)
                                }}
                                className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-[#2A2A2A] flex items-center gap-2"
                              >
                                <Edit2 className="w-4 h-4" />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  handleToggleStatus(resource.id)
                                  setActiveDropdown(null)
                                }}
                                className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-[#2A2A2A] flex items-center gap-2"
                              >
                                {resource.status === "active" ? (
                                  <><PowerOff className="w-4 h-4" /> Deactivate</>
                                ) : (
                                  <><Power className="w-4 h-4" /> Activate</>
                                )}
                              </button>
                              <button
                                onClick={() => {
                                  handleDelete(resource.id)
                                  setActiveDropdown(null)
                                }}
                                className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-[#2A2A2A] flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#FF2D2D] transition-colors">
                      {resource.name}
                    </h3>
                    <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {resource.location}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {resource.capacity}
                      </span>
                      <span className="text-gray-500 px-2 py-0.5 bg-[#2A2A2A] rounded capitalize text-xs">
                        {resource.type}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3">
                      {resource.amenities.slice(0, 4).map((amenity) => (
                        <span
                          key={amenity}
                          className="w-7 h-7 rounded-md bg-[#2A2A2A] flex items-center justify-center text-gray-400"
                          title={amenity}
                        >
                          {amenityIcons[amenity] || <Monitor className="w-4 h-4" />}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-[#2A2A2A]">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">This month</span>
                        <span className="text-[#DC143C] font-semibold">{resource.bookingsThisMonth} bookings</span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {filteredResources.length === 0 && (
          <GlassCard className="p-12 text-center">
            <Building2 className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No resources found</p>
          </GlassCard>
        )}
      </div>

      {/* Add/Edit Modal */}
      <ResourceModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false)
          setEditingResource(null)
        }}
        resource={editingResource}
        onSave={(resource) => {
          if (editingResource) {
            setResources(resources.map(r => r.id === resource.id ? resource : r))
            showSuccess("Resource Updated", `${resource.name} has been updated.`)
          } else {
            setResources([...resources, { ...resource, id: Date.now(), bookingsThisMonth: 0 }])
            showSuccess("Resource Added", `${resource.name} has been added.`)
          }
          setShowAddModal(false)
          setEditingResource(null)
        }}
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

// Resource Modal Component
function ResourceModal({
  isOpen,
  onClose,
  resource,
  onSave
}: {
  isOpen: boolean
  onClose: () => void
  resource: Resource | null
  onSave: (resource: Resource) => void
}) {
  const [name, setName] = useState(resource?.name || "")
  const [type, setType] = useState(resource?.type || "classroom")
  const [location, setLocation] = useState(resource?.location || "")
  const [capacity, setCapacity] = useState(resource?.capacity?.toString() || "")
  const [amenities, setAmenities] = useState<string[]>(resource?.amenities || [])
  const [status, setStatus] = useState<"active" | "inactive" | "maintenance">(resource?.status || "active")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    onSave({
      id: resource?.id || 0,
      name,
      type,
      location,
      capacity: parseInt(capacity),
      amenities,
      status,
      bookingsThisMonth: resource?.bookingsThisMonth || 0
    })
    
    setIsSubmitting(false)
  }

  const toggleAmenity = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg"
      >
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">
              {resource ? "Edit Resource" : "Add New Resource"}
            </h3>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#2A2A2A] transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Resource Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Conference Room A"
                className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#DC143C] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:border-[#DC143C] transition-colors"
                >
                  <option value="classroom">Classroom</option>
                  <option value="lab">Computer Lab</option>
                  <option value="seminar">Seminar Hall</option>
                  <option value="equipment">Equipment</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Capacity</label>
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  placeholder="50"
                  className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#DC143C] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Building A, Floor 2"
                className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#DC143C] transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {amenityOptions.map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm font-medium transition-all capitalize",
                      amenities.includes(amenity)
                        ? "bg-[#DC143C] text-white"
                        : "bg-[#2A2A2A] text-gray-400 hover:bg-[#3A3A3A]"
                    )}
                  >
                    {amenity.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Status</label>
              <div className="flex gap-2">
                {(["active", "inactive", "maintenance"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                      status === s
                        ? "bg-[#DC143C] text-white"
                        : "bg-[#2A2A2A] text-gray-400 hover:bg-[#3A3A3A]"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg bg-[#2A2A2A] text-gray-300 hover:bg-[#3A3A3A] transition-colors"
            >
              Cancel
            </button>
            <GlowButton
              className="flex-1"
              onClick={handleSubmit}
              disabled={!name || !location || !capacity || isSubmitting}
            >
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
              ) : (
                <><Check className="w-4 h-4 mr-2" /> {resource ? "Update" : "Add"} Resource</>
              )}
            </GlowButton>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}
