"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ReactNode } from "react"

interface GlowButtonProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export function GlowButton({
  children,
  className,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  type = "button",
}: GlowButtonProps) {
  const variants = {
    primary: "bg-gradient-to-r from-[#8B0000] via-[#DC143C] to-[#FF2D2D] text-white",
    secondary: "bg-[#1A1A1A] border border-[#DC143C]/50 text-white",
    outline: "bg-transparent border-2 border-[#DC143C] text-[#DC143C]",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={cn(
        "relative rounded-lg font-semibold",
        "transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-[#DC143C]/50 focus:ring-offset-2 focus:ring-offset-[#0B0B0B]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      onClick={onClick}
      whileHover={!disabled ? { 
        scale: 1.05,
        boxShadow: "0 0 30px rgba(220, 20, 60, 0.6), 0 0 60px rgba(220, 20, 60, 0.3)"
      } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
    >
      {/* Animated background gradient */}
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0"
          style={{
            background: "linear-gradient(90deg, #FF2D2D, #DC143C, #8B0000, #DC143C, #FF2D2D)",
            backgroundSize: "200% 100%",
          }}
          whileHover={{ opacity: 1 }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      )}
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Ripple effect container */}
      <span className="absolute inset-0 rounded-lg overflow-hidden">
        <motion.span
          className="absolute inset-0 bg-white/20"
          initial={{ scale: 0, opacity: 0.5 }}
          whileTap={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ borderRadius: "50%", transformOrigin: "center" }}
        />
      </span>
    </motion.button>
  )
}
