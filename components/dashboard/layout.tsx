"use client"

import { ReactNode } from "react"
import { DashboardSidebar } from "./sidebar"

interface DashboardLayoutProps {
  children: ReactNode
  userType: "user" | "technician" | "admin"
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <DashboardSidebar userType={userType} />
      
      {/* Main Content */}
      <main className="lg:pl-64 min-h-screen">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          {children}
        </div>
      </main>

      {/* Background accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(220, 20, 60, 0.05) 0%, transparent 70%)",
          }}
        />
        <div 
          className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139, 0, 0, 0.05) 0%, transparent 70%)",
          }}
        />
      </div>
    </div>
  )
}
