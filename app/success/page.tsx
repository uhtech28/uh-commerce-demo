"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">

      {/* Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="mb-8"
      >
        <CheckCircle size={90} className="text-green-500" />
      </motion.div>

      {/* Text */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold text-black text-center"
      >
        Order Confirmed 🎉
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 text-gray-600 text-center max-w-md"
      >
        Thank you for shopping with STRYDE.  
        Your premium footwear is on its way.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link href="/">
          <button className="mt-10 px-10 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition">
            Continue Shopping
          </button>
        </Link>
      </motion.div>

    </div>
  )
}
