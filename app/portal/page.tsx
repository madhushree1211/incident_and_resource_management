"use client"

import { motion } from "framer-motion"
import { Settings, User, Wrench } from "lucide-react"
import Link from "next/link"
import { ParticleBackground, FloatingShapes } from "@/components/ui/particles"
import { LoginCard } from "@/components/auth/login-card"

const loginOptions = [
  {
    icon: User,
    title: "User Login",
    description: "Report issues and track your requests",
    href: "/login/user",
  },
  {
    icon: Wrench,
    title: "Technician Login",
    description: "Manage assigned tasks and update progress",
    href: "/login/technician",
  },
  {
    icon: Settings,
    title: "Administrator Login",
    description: "Full system access and management",
    href: "/login/admin",
  },
]

export default function PortalPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] overflow-hidden">
      <ParticleBackground />
      <FloatingShapes />

      {/* Back button */}
      <motion.div
        className="fixed top-6 left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link 
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A1A1A]/80 border border-[#2A2A2A] text-[#A3A3A3] hover:text-white hover:border-[#DC143C]/50 transition-all"
        >
          <span>←</span>
          <span className="text-sm">Back to Home</span>
        </Link>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <motion.div
            className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-[#8B0000] to-[#DC143C] flex items-center justify-center shadow-[0_0_40px_rgba(220,20,60,0.4)]"
            animate={{ 
              boxShadow: [
                "0 0 40px rgba(220, 20, 60, 0.4)",
                "0 0 60px rgba(220, 20, 60, 0.6)",
                "0 0 40px rgba(220, 20, 60, 0.4)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-white font-bold text-xl">SC</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-[#DC143C] to-[#FF2D2D] bg-clip-text text-transparent">
              Smart Campus
            </span>
          </h1>
          <p className="text-[#A3A3A3] text-lg">
            Select your login type to continue
          </p>
        </motion.div>

        {/* Login Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full px-4">
          {loginOptions.map((option, index) => (
            <LoginCard
              key={option.title}
              icon={option.icon}
              title={option.title}
              description={option.description}
              href={option.href}
              delay={0.2 + index * 0.15}
            />
          ))}
        </div>

        {/* Footer text */}
        <motion.p
          className="mt-16 text-[#A3A3A3] text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Need help?{" "}
          <span className="text-[#DC143C] hover:underline cursor-pointer">
            Contact Support
          </span>
        </motion.p>
      </div>
    </main>
  )
}
