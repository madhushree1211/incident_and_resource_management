"use client"

import { ParticleBackground, FloatingShapes } from "@/components/ui/particles"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] overflow-x-hidden">
      {/* Background Effects */}
      <ParticleBackground />
      <FloatingShapes />
      
      {/* Content */}
      <HeroSection />
      <FeaturesSection />
      
      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-[#2A2A2A]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B0000] to-[#DC143C] flex items-center justify-center">
              <span className="text-white font-bold text-sm">SC</span>
            </div>
            <span className="text-white font-semibold">Smart Campus</span>
          </div>
          <p className="text-[#A3A3A3] text-sm">
            2024 Smart Campus Digital Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
