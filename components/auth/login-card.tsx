"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import Link from "next/link"

interface LoginCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
  delay?: number
}

export function LoginCard({ icon: Icon, title, description, href, delay = 0 }: LoginCardProps) {
  return (
    <Link href={href}>
      <motion.div
        className="relative group cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        whileHover={{ scale: 1.05, y: -10 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Outer glow */}
        <motion.div
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, #8B0000, #DC143C, #FF2D2D)",
            filter: "blur(20px)",
          }}
        />

        {/* Card */}
        <div 
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(15, 15, 15, 0.95) 100%)",
            backdropFilter: "blur(20px)",
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(220, 20, 60, 0.3), rgba(139, 0, 0, 0.3), rgba(255, 45, 45, 0.3))",
              padding: "1px",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner content */}
          <div className="relative m-[1px] rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] p-8">
            {/* Icon container */}
            <motion.div
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#8B0000] to-[#DC143C] flex items-center justify-center shadow-[0_0_30px_rgba(220,20,60,0.4)]"
              whileHover={{ 
                rotate: [0, -10, 10, 0],
                boxShadow: "0 0 50px rgba(220, 20, 60, 0.6)"
              }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-10 h-10 text-white" />
            </motion.div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white text-center mb-2">
              {title}
            </h3>

            {/* Description */}
            <p className="text-[#A3A3A3] text-center text-sm">
              {description}
            </p>

            {/* Hover indicator */}
            <motion.div
              className="mt-6 flex items-center justify-center gap-2 text-[#DC143C] opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ y: 10 }}
              whileHover={{ y: 0 }}
            >
              <span className="text-sm font-medium">Click to Login</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.div>
          </div>

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, transparent 50%)",
            }}
            animate={{
              backgroundPosition: ["200% 0", "-200% 0"],
            }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
          />
        </div>
      </motion.div>
    </Link>
  )
}
