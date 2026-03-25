"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  onClick?: () => void
}

export function GlassCard({ children, className, hover = true, glow = false, onClick }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-xl overflow-hidden",
        "bg-gradient-to-br from-[#1A1A1A]/90 to-[#1A1A1A]/70",
        "backdrop-blur-xl border border-[#DC143C]/20",
        "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
        glow && "shadow-[0_0_30px_rgba(220,20,60,0.3)]",
        hover && "transition-all duration-300",
        onClick && "cursor-pointer",
        className
      )}
      whileHover={hover ? { 
        scale: 1.02, 
        y: -5,
        boxShadow: "0 0 40px rgba(220, 20, 60, 0.4), 0 20px 40px rgba(0, 0, 0, 0.5)"
      } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
    >
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-xl border border-[#DC143C]/30 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
      
      {/* Hover glow effect */}
      {hover && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(220, 20, 60, 0.15) 0%, transparent 70%)"
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  )
}

export function GlassPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden",
        "bg-gradient-to-br from-[#1A1A1A]/80 to-[#0F0F0F]/90",
        "backdrop-blur-xl border border-[#2A2A2A]",
        "shadow-[0_4px_24px_rgba(0,0,0,0.3)]",
        className
      )}
    >
      {children}
    </div>
  )
}
