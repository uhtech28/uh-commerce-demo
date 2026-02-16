"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import { useCart } from "@/context/CartContext"
import { products } from "@/data/products"

export default function ProductPage() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [showToast, setShowToast] = useState(false)

  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="pt-40 text-center text-xl">
          Product not found
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main className="pt-24 bg-white text-black min-h-screen">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-20 grid md:grid-cols-2 gap-20">

          {/* LEFT IMAGE */}
          <div className="relative h-[600px] bg-gray-50 rounded-3xl overflow-hidden shadow-sm">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* RIGHT INFO */}
          <div className="flex flex-col justify-center">

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {product.name}
            </h1>

            <p className="mt-6 text-2xl font-semibold">
              ₹{product.price}
            </p>

            {/* SIZE SELECTOR */}
            <div className="mt-10">
              <p className="font-medium mb-4">Select Size</p>

              <div className="flex gap-4 flex-wrap">
                {[7, 8, 9, 10, 11].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 border rounded-xl transition font-medium
                      ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "hover:border-black"
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-12 space-y-4">

              {/* ADD TO BAG */}
              <button
                onClick={() => {
                  if (!selectedSize) {
                    alert("Please select a size")
                    return
                  }

                  addToCart(product)

                  setShowToast(true)
                  setTimeout(() => setShowToast(false), 3000)
                }}
                className="w-full py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition"
              >
                Add to Bag
              </button>

              {/* BUY NOW */}
              <button
                onClick={() => {
                  if (!selectedSize) {
                    alert("Please select a size")
                    return
                  }

                  addToCart(product)
                }}
                className="w-full py-4 border border-black rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Buy Now
              </button>

            </div>

            {/* DESCRIPTION */}
            <div className="mt-16 border-t pt-10">
              <h3 className="font-semibold mb-4 text-lg">
                Product Description
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

          </div>
        </div>
      </main>

      {/* TOAST POPUP */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-black text-white px-6 py-4 rounded-xl shadow-xl z-50 animate-fade-in">
          {product.name} added to bag ✓
        </div>
      )}
    </>
  )
}
