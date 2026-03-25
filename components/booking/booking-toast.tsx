"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, AlertCircle, X, Calendar, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

export type ToastType = "success" | "error" | "warning" | "info"

interface BookingToastProps {
  isVisible: boolean
  type: ToastType
  title: string
  message: string
  onClose: () => void
  duration?: number
}

const toastConfig: Record<ToastType, {
  icon: typeof CheckCircle
  color: string
  bg: string
  border: string
  glow: string
}> = {
  success: {
    icon: CheckCircle,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    glow: "shadow-[0_0_30px_rgba(34,197,94,0.3)]"
  },
  error: {
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    glow: "shadow-[0_0_30px_rgba(239,68,68,0.3)]"
  },
  warning: {
    icon: AlertCircle,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    glow: "shadow-[0_0_30px_rgba(234,179,8,0.3)]"
  },
  info: {
    icon: Bell,
    color: "text-[#DC143C]",
    bg: "bg-[#DC143C]/10",
    border: "border-[#DC143C]/30",
    glow: "shadow-[0_0_30px_rgba(220,20,60,0.3)]"
  }
}

export function BookingToast({
  isVisible,
  type,
  title,
  message,
  onClose,
  duration = 5000
}: BookingToastProps) {
  const config = toastConfig[type]
  const Icon = config.icon

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={cn(
            "fixed top-4 right-4 z-50 max-w-sm w-full",
            "backdrop-blur-xl rounded-xl border p-4",
            config.bg,
            config.border,
            config.glow
          )}
        >
          <div className="flex items-start gap-3">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
              config.bg
            )}>
              <Icon className={cn("w-5 h-5", config.color)} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-semibold text-sm">{title}</h4>
              <p className="text-gray-400 text-sm mt-0.5">{message}</p>
            </div>
            
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          
          {/* Progress bar */}
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            className={cn("absolute bottom-0 left-0 h-0.5 rounded-full", config.color.replace("text-", "bg-"))}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook for managing toasts
import { useState, useCallback } from "react"

interface Toast {
  id: string
  type: ToastType
  title: string
  message: string
}

export function useBookingToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((type: ToastType, title: string, message: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { id, type, title, message }])
  }, [])

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const showSuccess = useCallback((title: string, message: string) => {
    showToast("success", title, message)
  }, [showToast])

  const showError = useCallback((title: string, message: string) => {
    showToast("error", title, message)
  }, [showToast])

  const showWarning = useCallback((title: string, message: string) => {
    showToast("warning", title, message)
  }, [showToast])

  const showInfo = useCallback((title: string, message: string) => {
    showToast("info", title, message)
  }, [showToast])

  return {
    toasts,
    showToast,
    hideToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
}
