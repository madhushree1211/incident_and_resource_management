"use client"

import { cn } from "@/lib/utils"
import { CheckCircle, XCircle, AlertCircle, Clock, Loader2 } from "lucide-react"

export type BookingStatus = "pending" | "approved" | "confirmed" | "rejected" | "completed" | "cancelled" | "in-progress"

interface BookingStatusBadgeProps {
  status: BookingStatus
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
  className?: string
}

const statusConfig: Record<BookingStatus, {
  label: string
  icon: typeof CheckCircle
  color: string
  bg: string
  glow?: string
}> = {
  pending: {
    label: "Pending",
    icon: AlertCircle,
    color: "text-yellow-400",
    bg: "bg-yellow-500/20",
    glow: "shadow-[0_0_10px_rgba(234,179,8,0.3)]"
  },
  approved: {
    label: "Approved",
    icon: CheckCircle,
    color: "text-green-400",
    bg: "bg-green-500/20",
    glow: "shadow-[0_0_10px_rgba(34,197,94,0.3)]"
  },
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle,
    color: "text-green-400",
    bg: "bg-green-500/20",
    glow: "shadow-[0_0_10px_rgba(34,197,94,0.3)]"
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-500/20",
    glow: "shadow-[0_0_10px_rgba(239,68,68,0.3)]"
  },
  completed: {
    label: "Completed",
    icon: CheckCircle,
    color: "text-blue-400",
    bg: "bg-blue-500/20",
    glow: "shadow-[0_0_10px_rgba(59,130,246,0.3)]"
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    color: "text-gray-400",
    bg: "bg-gray-500/20",
  },
  "in-progress": {
    label: "In Progress",
    icon: Loader2,
    color: "text-[#DC143C]",
    bg: "bg-[#DC143C]/20",
    glow: "shadow-[0_0_10px_rgba(220,20,60,0.3)]"
  }
}

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-2.5 py-1 text-xs gap-1.5",
  lg: "px-3 py-1.5 text-sm gap-2"
}

const iconSizes = {
  sm: "w-3 h-3",
  md: "w-3.5 h-3.5",
  lg: "w-4 h-4"
}

export function BookingStatusBadge({
  status,
  size = "md",
  showIcon = true,
  className
}: BookingStatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon
  const isAnimated = status === "in-progress"
  
  return (
    <div className={cn(
      "inline-flex items-center rounded-full font-medium",
      config.bg,
      config.color,
      config.glow,
      sizeClasses[size],
      className
    )}>
      {showIcon && (
        <Icon className={cn(
          iconSizes[size],
          isAnimated && "animate-spin"
        )} />
      )}
      {config.label}
    </div>
  )
}
