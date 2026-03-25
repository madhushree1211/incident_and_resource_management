"use client"

import { motion } from "framer-motion"
import { ArrowRight, LogIn } from "lucide-react"
import Link from "next/link"
import { GlowButton } from "@/components/ui/glow-button"
import { DashboardMockup } from "./dashboard-mockup"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B] via-[#0B0B0B] to-[#1A1A1A]" />
      
      {/* Radial glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(220, 20, 60, 0.15) 0%, transparent 70%)"
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DC143C]/10 border border-[#DC143C]/30 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#DC143C] animate-pulse" />
          <span className="text-sm text-[#DC143C] font-medium">Campus Management System</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-white">SMART CAMPUS</span>
          <br />
          <span className="bg-gradient-to-r from-[#8B0000] via-[#DC143C] to-[#FF2D2D] bg-clip-text text-transparent">
            DIGITAL PLATFORM
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-[#A3A3A3] max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Report campus issues, track requests, and streamline maintenance operations 
          with our intelligent incident management system.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/portal">
            <GlowButton size="lg" variant="primary">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </GlowButton>
          </Link>
          <Link href="/portal">
            <GlowButton size="lg" variant="secondary">
              <LogIn className="w-5 h-5" />
              Login
            </GlowButton>
          </Link>
        </motion.div>

        {/* Dashboard Mockup */}
        <DashboardMockup />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-[#DC143C]/50 flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#DC143C]"
            animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
