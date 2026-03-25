"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface ResourceCardProps {
  title: string
  description: string
  icon: LucideIcon
  count?: number
  onClick?: () => void
  selected?: boolean
  className?: string
}

export function ResourceCard({
  title,
  description,
  icon: Icon,
  count,
  onClick,
  selected,
  className
}: ResourceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative cursor-pointer group",
        className
      )}
    >
      {/* Animated glow border */}
      <div className={cn(
        "absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        "bg-gradient-to-r from-[#8B0000] via-[#DC143C] to-[#FF2D2D]",
        selected && "opacity-100"
      )} />
      
      {/* Card content */}
      <div className={cn(
        "relative bg-[#1A1A1A]/90 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300",
        selected 
          ? "border-[#DC143C] shadow-[0_0_30px_rgba(220,20,60,0.4)]" 
          : "border-[#2A2A2A] group-hover:border-[#DC143C]/50"
      )}>
        {/* Icon container with glow */}
        <div className="relative mb-4">
          <div className={cn(
            "w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300",
            "bg-gradient-to-br from-[#DC143C]/20 to-[#8B0000]/20",
            "group-hover:from-[#DC143C]/30 group-hover:to-[#8B0000]/30",
            selected && "from-[#DC143C]/40 to-[#8B0000]/40"
          )}>
            <Icon className={cn(
              "w-8 h-8 transition-all duration-300",
              selected ? "text-[#FF2D2D]" : "text-[#DC143C] group-hover:text-[#FF2D2D]"
            )} />
          </div>
          
          {/* Glow effect */}
          <div className={cn(
            "absolute inset-0 w-16 h-16 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl",
            "bg-[#DC143C]/30"
          )} />
        </div>
        
        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#FF2D2D] transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-3">{description}</p>
        
        {count !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#DC143C]">{count}</span>
            <span className="text-gray-500 text-sm">available</span>
          </div>
        )}
        
        {/* Hover indicator */}
        <div className={cn(
          "absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center",
          "bg-[#DC143C]/10 opacity-0 group-hover:opacity-100 transition-all duration-300",
          selected && "opacity-100 bg-[#DC143C]/20"
        )}>
          <svg className="w-4 h-4 text-[#DC143C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}
