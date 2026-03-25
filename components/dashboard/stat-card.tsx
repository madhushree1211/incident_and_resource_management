"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    positive: boolean
  }
  delay?: number
}

export function StatCard({ title, value, icon: Icon, trend, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, rgba(220, 20, 60, 0.3), rgba(139, 0, 0, 0.3))",
          filter: "blur(10px)",
        }}
      />

      {/* Card */}
      <motion.div
        className="relative rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#2A2A2A] p-6 overflow-hidden"
        whileHover={{ y: -5, borderColor: "rgba(220, 20, 60, 0.3)" }}
        transition={{ duration: 0.2 }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#DC143C]/5 to-transparent rounded-bl-full" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#8B0000]/30 to-[#DC143C]/20 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Icon className="w-6 h-6 text-[#DC143C]" />
            </motion.div>
            
            {trend && (
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
                trend.positive 
                  ? "bg-emerald-500/10 text-emerald-400" 
                  : "bg-red-500/10 text-red-400"
              )}>
                <span>{trend.positive ? "+" : ""}{trend.value}%</span>
              </div>
            )}
          </div>

          <motion.div
            className="text-3xl font-bold text-white mb-1"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.2, type: "spring" }}
          >
            {value}
          </motion.div>
          
          <p className="text-[#A3A3A3] text-sm">{title}</p>
        </div>

        {/* Animated border on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl border border-[#DC143C]/0 pointer-events-none"
          whileHover={{ borderColor: "rgba(220, 20, 60, 0.3)" }}
        />
      </motion.div>
    </motion.div>
  )
}
