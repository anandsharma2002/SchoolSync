import React from 'react'
import { motion } from 'framer-motion'

export default function AnimatedExample() {
  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  // Hover animation variants
  const hoverVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  }

  // Scroll animation variants
  const scrollVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="p-8 space-y-12">
      {/* Text Animation Example */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={textVariants}
        className="text-center"
      >
        <motion.h1 
          className="text-4xl font-bold mb-4"
          variants={textVariants}
        >
          Welcome to Our Platform
        </motion.h1>
        <motion.p 
          className="text-xl"
          variants={textVariants}
        >
          Experience the power of modern animations
        </motion.p>
      </motion.div>

      {/* Hover Animation Example */}
      <div className="flex justify-center space-x-4">
        <motion.button
          variants={hoverVariants}
          initial="initial"
          whileHover="hover"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg"
        >
          Hover Me
        </motion.button>
        <motion.button
          variants={hoverVariants}
          initial="initial"
          whileHover="hover"
          className="px-6 py-3 bg-green-500 text-white rounded-lg"
        >
          Hover Me Too
        </motion.button>
      </div>

      {/* Scroll Animation Example */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scrollVariants}
        className="bg-gray-100 p-6 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-2">Scroll Animation</h2>
        <p>This content animates when it comes into view</p>
      </motion.div>

      {/* Click Animation Example */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        className="bg-purple-500 text-white p-6 rounded-lg text-center cursor-pointer"
      >
        Click Me
      </motion.div>

      {/* Page Load Animation Example */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        className="bg-yellow-500 text-white p-6 rounded-lg text-center"
      >
        Page Load Animation
      </motion.div>
    </div>
  )
} 