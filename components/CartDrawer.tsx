"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
}

export default function CartDrawer({ open, setOpen }: Props) {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const FREE_SHIPPING_THRESHOLD = 10000
  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100)

  const handleDemoCheckout = async () => {
    if (cart.length === 0) return

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setOpen(false)
      router.push("/order-summary")
    }, 1500)
  }

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <motion.div
        initial={{ x: 500 }}
        animate={{ x: open ? 0 : 500 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed top-0 right-0 h-full w-[440px] bg-white z-50 shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-black">
            Your Bag
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-black transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">

          {cart.length === 0 && (
            <div className="text-center mt-20">
              <p className="text-gray-900 font-semibold">
                Your bag is empty
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Add something premium ✨
              </p>
            </div>
          )}

          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="flex gap-5 border-b border-gray-100 pb-8"
              >
                {/* Image */}
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-semibold text-black text-base">
                      {item.name}
                    </p>
                    <p className="text-gray-900 text-sm mt-1 font-medium">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-black font-semibold hover:border-black hover:bg-gray-100 transition"
                    >
                      −
                    </button>

                    <span className="text-base font-bold text-black">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-black font-semibold hover:border-black hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-red-500 hover:text-red-600 font-medium transition"
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-8 py-8 bg-white space-y-6">

          {/* Free Shipping */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700 font-medium">
                Free Shipping Progress
              </span>
              <span className="text-gray-800 font-semibold">
                ₹{FREE_SHIPPING_THRESHOLD - total > 0
                  ? FREE_SHIPPING_THRESHOLD - total
                  : 0} left
              </span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-black rounded-full"
              />
            </div>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <span className="text-base font-medium text-gray-900">
              Subtotal
            </span>

            <span className="text-2xl font-bold text-black">
              ₹{total}
            </span>
          </div>

          {/* Checkout */}
          <button
            onClick={handleDemoCheckout}
            disabled={loading}
            className="w-full py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition disabled:opacity-70"
          >
            {loading ? "Processing..." : "Checkout"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Demo payment simulation
          </p>

        </div>
      </motion.div>
    </>
  )
}
