"use client"

import { motion } from "framer-motion"
import { User } from "lucide-react"
import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { CampusIllustration } from "@/components/auth/campus-illustration"

export default function UserLoginPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] flex">
      {/* Left side - Illustration */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <CampusIllustration />
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #DC143C 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Floating glow */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(220, 20, 60, 0.15) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Back button */}
        <motion.div
          className="absolute top-6 left-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link 
            href="/portal"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A1A1A]/80 border border-[#2A2A2A] text-[#A3A3A3] hover:text-white hover:border-[#DC143C]/50 transition-all"
          >
            <span>←</span>
            <span className="text-sm">Back</span>
          </Link>
        </motion.div>

        {/* Login Card */}
        <motion.div
          className="relative w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Card glow */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#8B0000]/20 via-[#DC143C]/20 to-[#FF2D2D]/20 blur-xl" />

          {/* Card content */}
          <div className="relative rounded-2xl bg-gradient-to-br from-[#1A1A1A]/95 to-[#0F0F0F]/95 border border-[#DC143C]/20 backdrop-blur-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#8B0000] to-[#DC143C] flex items-center justify-center shadow-[0_0_30px_rgba(220,20,60,0.4)]"
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(220, 20, 60, 0.4)",
                    "0 0 50px rgba(220, 20, 60, 0.6)",
                    "0 0 30px rgba(220, 20, 60, 0.4)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <User className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold text-white mb-2">User Login</h1>
              <p className="text-[#A3A3A3] text-sm">
                Sign in to report issues and track your requests
              </p>
            </div>

            {/* Form */}
            <LoginForm userType="user" />
          </div>
        </motion.div>
      </div>
    </main>
  )
}
