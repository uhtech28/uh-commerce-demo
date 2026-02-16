"use client"

import { useCart } from "@/context/CartContext"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function OrderSummaryPage() {
  const { cart, clearCart } = useCart()
  const router = useRouter()

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const shipping = subtotal > 10000 ? 0 : 499
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + shipping + tax

  const handlePlaceOrder = () => {
    clearCart()
    router.push("/success")
  }

  return (
    <main className="min-h-screen bg-[#f8f8f8] pt-32 pb-20 px-6">

      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-black mb-12"
        >
          Order Summary
        </motion.h1>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-10">

          {/* Products */}
          <div className="space-y-8">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 pb-8"
              >
                <div className="flex items-center gap-6">

                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-lg font-semibold text-black">
                      {item.name}
                    </p>
                    <p className="text-gray-700 text-sm mt-1">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                </div>

                <p className="text-lg font-semibold text-black">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}

          </div>

          {/* Pricing */}
          <div className="mt-10 space-y-4 text-[15px]">

            <div className="flex justify-between text-gray-800">
              <span>Subtotal</span>
              <span className="font-medium text-black">₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-gray-800">
              <span>Shipping</span>
              <span className="font-medium text-black">
                {shipping === 0 ? "Free" : `₹${shipping}`}
              </span>
            </div>

            <div className="flex justify-between text-gray-800">
              <span>Tax (5%)</span>
              <span className="font-medium text-black">₹{tax}</span>
            </div>

            <div className="border-t border-gray-300 pt-6 flex justify-between text-xl font-bold text-black">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

          </div>

          {/* Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handlePlaceOrder}
            className="w-full mt-10 py-4 bg-black text-white rounded-full font-semibold text-lg hover:bg-gray-900 transition shadow-md hover:shadow-xl"
          >
            Place Order
          </motion.button>

        </div>

      </div>

    </main>
  )
}
