"use client"

import { motion } from "framer-motion"
import { 
  AlertTriangle, 
  BarChart3, 
  Bell, 
  Shield, 
  Users, 
  Zap 
} from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"

const features = [
  {
    icon: AlertTriangle,
    title: "Issue Reporting",
    description: "Quickly report campus issues with detailed descriptions, categories, and image uploads."
  },
  {
    icon: Zap,
    title: "Real-time Tracking",
    description: "Track your reported issues in real-time from submission to resolution."
  },
  {
    icon: Users,
    title: "Technician Management",
    description: "Efficiently assign and manage technicians for faster issue resolution."
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Comprehensive analytics to monitor campus maintenance performance."
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Stay updated with instant notifications on issue status changes."
  },
  {
    icon: Shield,
    title: "Secure Access",
    description: "Role-based access control for users, technicians, and administrators."
  }
]

export function FeaturesSection() {
  return (
    <section className="relative py-24 px-4 bg-[#0B0B0B]">
      {/* Background accent */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139, 0, 0, 0.1) 0%, transparent 70%)"
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful Features for
            <span className="bg-gradient-to-r from-[#DC143C] to-[#FF2D2D] bg-clip-text text-transparent"> Campus Management</span>
          </h2>
          <p className="text-[#A3A3A3] max-w-2xl mx-auto">
            Everything you need to streamline campus maintenance and incident management in one platform.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="p-6 h-full">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#8B0000] to-[#DC143C] flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-[#A3A3A3]">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
