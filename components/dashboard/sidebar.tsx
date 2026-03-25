"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  ChevronLeft,
  Clock,
  FileText,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  Users,
  Wrench,
  BarChart3,
  ClipboardList,
  Activity,
  CalendarPlus,
  CalendarCheck,
  Building2,
  Package
} from "lucide-react"

interface SidebarItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface DashboardSidebarProps {
  userType: "user" | "technician" | "admin"
}

const userMenuItems: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard/user", icon: LayoutDashboard },
  { label: "Report Issue", href: "/dashboard/user/report", icon: AlertTriangle },
  { label: "Issue Status", href: "/dashboard/user/status", icon: Clock },
  { label: "Issue History", href: "/dashboard/user/history", icon: History },
  { label: "Book Resource", href: "/dashboard/user/booking", icon: CalendarPlus },
  { label: "My Bookings", href: "/dashboard/user/my-bookings", icon: CalendarCheck },
  { label: "Notifications", href: "/dashboard/user/notifications", icon: Bell },
  { label: "Profile", href: "/dashboard/user/profile", icon: User },
]

const technicianMenuItems: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard/technician", icon: LayoutDashboard },
  { label: "Assigned Tasks", href: "/dashboard/technician/tasks", icon: ClipboardList },
  { label: "Update Status", href: "/dashboard/technician/update", icon: CheckCircle },
  { label: "Work Reports", href: "/dashboard/technician/reports", icon: FileText },
  { label: "Profile", href: "/dashboard/technician/profile", icon: User },
]

const adminMenuItems: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Manage Technicians", href: "/dashboard/admin/technicians", icon: Wrench },
  { label: "Assign Issues", href: "/dashboard/admin/assign", icon: AlertTriangle },
  { label: "Manage Resources", href: "/dashboard/admin/resources", icon: Package },
  { label: "Manage Bookings", href: "/dashboard/admin/bookings", icon: Building2 },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  { label: "System Logs", href: "/dashboard/admin/logs", icon: Activity },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
]

export function DashboardSidebar({ userType }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = userType === "user" 
    ? userMenuItems 
    : userType === "technician" 
    ? technicianMenuItems 
    : adminMenuItems

  const userLabel = userType === "user" 
    ? "User Portal" 
    : userType === "technician" 
    ? "Technician Portal" 
    : "Admin Portal"

  const SidebarContent = () => (
    <>
      {/* Logo Section */}
      <div className="p-4 border-b border-[#2A2A2A]">
        <Link href="/" className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8B0000] to-[#DC143C] flex items-center justify-center shadow-[0_0_20px_rgba(220,20,60,0.4)]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white font-bold text-sm">SC</span>
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <span className="text-white font-semibold whitespace-nowrap">Smart Campus</span>
                <p className="text-xs text-[#DC143C]">{userLabel}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={item.href}>
                <motion.div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                    "hover:bg-[#DC143C]/10 group",
                    isActive && "bg-gradient-to-r from-[#8B0000]/30 to-[#DC143C]/20 border border-[#DC143C]/30"
                  )}
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center transition-all",
                      isActive 
                        ? "bg-gradient-to-br from-[#8B0000] to-[#DC143C] shadow-[0_0_15px_rgba(220,20,60,0.4)]" 
                        : "bg-[#1A1A1A] group-hover:bg-[#2A2A2A]"
                    )}
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon className={cn(
                      "w-5 h-5",
                      isActive ? "text-white" : "text-[#A3A3A3] group-hover:text-[#DC143C]"
                    )} />
                  </motion.div>
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className={cn(
                          "whitespace-nowrap overflow-hidden",
                          isActive ? "text-white font-medium" : "text-[#A3A3A3] group-hover:text-white"
                        )}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* Collapse Button (Desktop) */}
      <div className="hidden lg:block p-4 border-t border-[#2A2A2A]">
        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-[#A3A3A3] hover:text-white hover:bg-[#1A1A1A] transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-[#2A2A2A]">
        <Link href="/portal">
          <motion.div
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#A3A3A3] hover:text-[#FF2D2D] hover:bg-[#FF2D2D]/10 transition-all"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="w-5 h-5" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </Link>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
        whileTap={{ scale: 0.95 }}
      >
        <Menu className="w-6 h-6" />
      </motion.button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-40 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            className="lg:hidden fixed top-0 left-0 z-50 h-full w-64 bg-[#0F0F0F] border-r border-[#2A2A2A] flex flex-col"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        className={cn(
          "hidden lg:flex fixed top-0 left-0 h-full bg-[#0F0F0F] border-r border-[#2A2A2A] flex-col z-40",
          "transition-all duration-300"
        )}
        animate={{ width: collapsed ? 80 : 256 }}
      >
        <SidebarContent />
      </motion.aside>
    </>
  )
}
