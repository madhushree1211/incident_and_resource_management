"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, CheckCircle, X, FileImage } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { GlassCard } from "@/components/ui/glass-card"
import { GlowButton } from "@/components/ui/glow-button"

const categories = [
  "Electrical",
  "Plumbing",
  "HVAC",
  "Structural",
  "Furniture",
  "IT/Network",
  "Cleaning",
  "Security",
  "Other"
]

const locations = [
  "Block A - Ground Floor",
  "Block A - First Floor",
  "Block A - Second Floor",
  "Block B - Ground Floor",
  "Block B - First Floor",
  "Block B - Second Floor",
  "Library",
  "Cafeteria",
  "Sports Complex",
  "Admin Building",
  "Parking Area",
  "Other"
]

export default function ReportIssuePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    image: null as File | null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [generatedId, setGeneratedId] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate random issue ID
    const id = `ISS-${Math.floor(Math.random() * 9000 + 1000)}`
    setGeneratedId(id)
    setIsSubmitting(false)
    setShowSuccess(true)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] })
    }
  }

  const resetForm = () => {
    setFormData({ title: "", description: "", category: "", location: "", image: null })
    setShowSuccess(false)
  }

  return (
    <DashboardLayout userType="user">
      {/* Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-md w-full"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <GlassCard className="p-8 text-center" hover={false} glow>
                {/* Close button */}
                <button 
                  onClick={resetForm}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[#2A2A2A] transition-colors"
                >
                  <X className="w-5 h-5 text-[#A3A3A3]" />
                </button>

                {/* Success icon */}
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.4 }}
                  >
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </motion.div>
                </motion.div>

                <h2 className="text-2xl font-bold text-white mb-2">Issue Submitted!</h2>
                <p className="text-[#A3A3A3] mb-6">
                  Your issue has been successfully reported. We&apos;ll get back to you soon.
                </p>

                <div className="bg-[#0B0B0B] rounded-lg p-4 mb-6">
                  <p className="text-sm text-[#A3A3A3] mb-1">Issue ID</p>
                  <p className="text-2xl font-mono font-bold text-[#DC143C]">{generatedId}</p>
                  <p className="text-sm text-[#A3A3A3] mt-2">Status: <span className="text-amber-400">Pending</span></p>
                </div>

                <GlowButton onClick={resetForm} className="w-full">
                  Report Another Issue
                </GlowButton>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white">Report an Issue</h1>
        <p className="text-[#A3A3A3] mt-1">Fill out the form below to report a campus issue</p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="max-w-2xl mx-auto" hover={false}>
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            {/* Issue Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#A3A3A3]">Issue Title *</label>
              <motion.input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Brief description of the issue"
                className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-white placeholder-[#666] focus:outline-none focus:border-[#DC143C] focus:shadow-[0_0_20px_rgba(220,20,60,0.2)] transition-all"
                whileFocus={{ scale: 1.01 }}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#A3A3A3]">Description *</label>
              <motion.textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide detailed information about the issue"
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-white placeholder-[#666] focus:outline-none focus:border-[#DC143C] focus:shadow-[0_0_20px_rgba(220,20,60,0.2)] transition-all resize-none"
                whileFocus={{ scale: 1.01 }}
                required
              />
            </div>

            {/* Category & Location */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#A3A3A3]">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-white focus:outline-none focus:border-[#DC143C] focus:shadow-[0_0_20px_rgba(220,20,60,0.2)] transition-all"
                  required
                >
                  <option value="" className="bg-[#1A1A1A]">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#1A1A1A]">{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#A3A3A3]">Location *</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-white focus:outline-none focus:border-[#DC143C] focus:shadow-[0_0_20px_rgba(220,20,60,0.2)] transition-all"
                  required
                >
                  <option value="" className="bg-[#1A1A1A]">Select location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc} className="bg-[#1A1A1A]">{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#A3A3A3]">Upload Image (Optional)</label>
              <motion.label
                className="flex flex-col items-center justify-center w-full h-40 rounded-xl bg-[#1A1A1A] border-2 border-dashed border-[#2A2A2A] cursor-pointer hover:border-[#DC143C]/50 transition-colors"
                whileHover={{ scale: 1.01 }}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                {formData.image ? (
                  <div className="flex items-center gap-3 text-[#DC143C]">
                    <FileImage className="w-8 h-8" />
                    <span className="text-white">{formData.image.name}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-[#A3A3A3]">
                    <Upload className="w-10 h-10" />
                    <span className="text-sm">Click or drag image to upload</span>
                    <span className="text-xs text-[#666]">PNG, JPG up to 10MB</span>
                  </div>
                )}
              </motion.label>
            </div>

            {/* Submit Button */}
            <GlowButton
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                "Submit Issue"
              )}
            </GlowButton>
          </form>
        </GlassCard>
      </motion.div>
    </DashboardLayout>
  )
}
