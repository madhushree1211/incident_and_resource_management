"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { GlowButton } from "@/components/ui/glow-button"

interface LoginFormProps {
  userType: "user" | "technician" | "admin"
}

export function LoginForm({ userType }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userType,
          email,
          password,
          id: userId,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || "Login failed")
        setIsLoading(false)
        return
      }

      if (userType === "user") {
        router.push("/dashboard/user")
      } else if (userType === "technician") {
        router.push("/dashboard/technician")
      } else {
        router.push("/dashboard/admin")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Register Number / ID */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#A3A3A3]">
          {userType === "user" ? "Register Number" : userType === "technician" ? "Employee ID" : "Admin ID"}
        </label>
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A3A3A3] group-focus-within:text-[#DC143C] transition-colors" />
          <motion.input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder={userType === "user" ? "Enter your register number" : "Enter your ID"}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-white placeholder-[#666] focus:outline-none focus:border-[#DC143C] focus:shadow-[0_0_20px_rgba(220,20,60,0.2)] transition-all"
            whileFocus={{ scale: 1.01 }}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#A3A3A3]">Email</label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A3A3A3] group-focus-within:text-[#DC143C] transition-colors" />
          <motion.input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-white placeholder-[#666] focus:outline-none focus:border-[#DC143C] focus:shadow-[0_0_20px_rgba(220,20,60,0.2)] transition-all"
            whileFocus={{ scale: 1.01 }}
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#A3A3A3]">Password</label>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A3A3A3] group-focus-within:text-[#DC143C] transition-colors" />
          <motion.input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full pl-12 pr-12 py-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-white placeholder-[#666] focus:outline-none focus:border-[#DC143C] focus:shadow-[0_0_20px_rgba(220,20,60,0.2)] transition-all"
            whileFocus={{ scale: 1.01 }}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {/* Forgot Password */}
      <div className="flex justify-end">
        <Link
          href="#"
          className="text-sm text-[#DC143C] hover:text-[#FF2D2D] transition-colors"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit Button */}
      <GlowButton
        type="submit"
        className="w-full"
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? (
          <motion.div
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          "Login"
        )}
      </GlowButton>

      {/* Sign Up Link */}
      {userType === "user" && (
        <p className="text-center text-[#A3A3A3] text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#DC143C] hover:text-[#FF2D2D] transition-colors">
            Sign Up
          </Link>
        </p>
      )}
    </motion.form>
  )
}
