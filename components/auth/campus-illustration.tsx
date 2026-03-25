"use client"

import { motion } from "framer-motion"

export function CampusIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0B0B] via-[#1A1A1A] to-[#0B0B0B]" />

      {/* Animated red glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(220, 20, 60, 0.3) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139, 0, 0, 0.4) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.4, 0.6],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Digital campus illustration */}
      <div className="relative z-10 w-full max-w-md p-8">
        {/* Main building */}
        <motion.svg
          viewBox="0 0 400 300"
          className="w-full h-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Grid background */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(220, 20, 60, 0.1)" strokeWidth="0.5" />
            </pattern>
            <linearGradient id="buildingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#DC143C" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8B0000" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="400" height="300" fill="url(#grid)" />

          {/* Main building structure */}
          <motion.g
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Building base */}
            <rect x="100" y="120" width="200" height="130" fill="url(#buildingGrad)" stroke="#DC143C" strokeWidth="1" rx="4" />
            
            {/* Windows - animated */}
            {[0, 1, 2, 3].map((row) =>
              [0, 1, 2, 3, 4].map((col) => (
                <motion.rect
                  key={`${row}-${col}`}
                  x={115 + col * 38}
                  y={135 + row * 28}
                  width="25"
                  height="18"
                  fill="#0B0B0B"
                  stroke="#DC143C"
                  strokeWidth="0.5"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0.3, 0.8, 0.3],
                    fill: ["#0B0B0B", "#1A1A1A", "#0B0B0B"]
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: (row * 5 + col) * 0.1,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 2
                  }}
                />
              ))
            )}
          </motion.g>

          {/* Tower/Dome */}
          <motion.g
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <rect x="165" y="70" width="70" height="50" fill="url(#buildingGrad)" stroke="#DC143C" strokeWidth="1" rx="2" />
            <polygon points="200,40 165,70 235,70" fill="url(#buildingGrad)" stroke="#DC143C" strokeWidth="1" />
            
            {/* Beacon light */}
            <motion.circle
              cx="200"
              cy="55"
              r="5"
              fill="#FF2D2D"
              filter="url(#glow)"
              animate={{
                opacity: [0.5, 1, 0.5],
                r: [5, 7, 5],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.g>

          {/* Side buildings */}
          <motion.g
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <rect x="30" y="160" width="60" height="90" fill="url(#buildingGrad)" stroke="#DC143C" strokeWidth="1" rx="3" />
            {[0, 1, 2].map((row) =>
              [0, 1].map((col) => (
                <motion.rect
                  key={`left-${row}-${col}`}
                  x={40 + col * 25}
                  y={175 + row * 25}
                  width="15"
                  height="15"
                  fill="#0B0B0B"
                  stroke="#DC143C"
                  strokeWidth="0.5"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, delay: Math.random() * 2, repeat: Infinity }}
                />
              ))
            )}
          </motion.g>

          <motion.g
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <rect x="310" y="160" width="60" height="90" fill="url(#buildingGrad)" stroke="#DC143C" strokeWidth="1" rx="3" />
            {[0, 1, 2].map((row) =>
              [0, 1].map((col) => (
                <motion.rect
                  key={`right-${row}-${col}`}
                  x={320 + col * 25}
                  y={175 + row * 25}
                  width="15"
                  height="15"
                  fill="#0B0B0B"
                  stroke="#DC143C"
                  strokeWidth="0.5"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, delay: Math.random() * 2, repeat: Infinity }}
                />
              ))
            )}
          </motion.g>

          {/* Ground line */}
          <motion.line
            x1="0"
            y1="250"
            x2="400"
            y2="250"
            stroke="#DC143C"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          />

          {/* Data streams */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={`stream-${i}`}
              cx={100 + i * 100}
              cy={280}
              r="3"
              fill="#FF2D2D"
              initial={{ y: 0, opacity: 0 }}
              animate={{ 
                y: [-30, -150],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2, 
                delay: i * 0.5, 
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          ))}
        </motion.svg>

        {/* Text overlay */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">Smart Campus</h2>
          <p className="text-[#A3A3A3] text-sm">Digital Transformation in Education</p>
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#DC143C]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  )
}
