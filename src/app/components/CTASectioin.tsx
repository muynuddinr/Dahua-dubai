'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function DahuaHeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center font-[Open_Sans,sans-serif] overflow-hidden"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      {/* Background Image with Scroll Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{
          duration: 2.5,
          ease: 'easeOut',
        }}
      >
        <img
          src="/images/red.jpg"
          alt="Professional security monitoring"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Overlay for darkening with scroll animation */}
      <motion.div
        className="absolute inset-0 bg-black/60 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Centered Content Box with scroll animation */}
      <div className="relative z-20 flex items-center justify-start w-full h-full px-4 sm:px-6 lg:px-8">
        <motion.div
          className="w-full max-w-xl bg-black/70 p-6 sm:p-8 md:p-10 rounded-lg shadow-xl 
                     mx-auto sm:mx-0 sm:ml-4 md:ml-8 lg:ml-12 xl:ml-16
                     mt-8 mb-8 sm:mt-12 sm:mb-12 md:mt-16 md:mb-16"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: 'easeOut',
          }}
        >
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                       font-bold text-white mb-4 sm:mb-5 md:mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            At Dahua, we&apos;re
            <br />
            <span className="text-red-600">security-driven.</span>
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-gray-300 
                       mb-6 sm:mb-7 md:mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Let&apos;s build a more secure, intelligent, and connected world together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 
                         px-5 py-2.5 sm:px-6 sm:py-3 md:px-7 md:py-3 
                         border-2 border-white text-white bg-transparent 
                         hover:bg-red-600 hover:border-red-600 hover:text-white 
                         transition-all duration-300 font-semibold group 
                         text-sm sm:text-base w-full sm:w-auto
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              Contact Us
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
