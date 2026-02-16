"use client"

import { useState } from "react"
import { products } from "@/data/products"
import Navbar from "@/components/Navbar"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { motion, AnimatePresence } from "framer-motion"


export default function HomePage() {
  const { addToCart } = useCart()

  const [category, setCategory] = useState("All")
  const [sort, setSort] = useState("default")
  const [minRating, setMinRating] = useState(0)

  let filtered = [...products]

  if (category !== "All") {
    filtered = filtered.filter((p) => p.category === category)
  }

  if (minRating > 0) {
    filtered = filtered.filter((p) => p.rating >= minRating)
  }

  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price)
  }

  if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price)
  }

  return (
    <>
      <Navbar />

      <main className="pt-28 bg-white text-black min-h-screen">

        {/* ================= HERO ================= */}
        <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552"
            alt="Luxury Shoes"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 text-center text-white px-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Move Without Limits
            </h1>

            <p className="mt-6 text-lg opacity-90 max-w-xl mx-auto">
              Premium performance footwear engineered for speed,
              comfort and precision.
            </p>
          </div>
        </section>

        {/* ================= PREMIUM FILTER BAR ================= */}
        <div className="w-full bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-12 py-8 flex flex-wrap items-center justify-between gap-8">

            {/* Categories */}
            <div className="flex gap-4 flex-wrap">
              {["All", "Running", "Training", "Lifestyle"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`
                    px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                    ${
                      category === cat
                        ? "bg-black text-white border-black shadow-sm"
                        : "bg-white border-gray-300 hover:border-black"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort + Rating */}
            <div className="flex gap-6 items-center flex-wrap">
              <select
                onChange={(e) => setSort(e.target.value)}
                className="px-6 py-2 rounded-full border border-gray-300 text-sm bg-white hover:border-black transition focus:outline-none"
              >
                <option value="default">Sort</option>
                <option value="low">Price: Low → High</option>
                <option value="high">Price: High → Low</option>
              </select>

              <select
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="px-6 py-2 rounded-full border border-gray-300 text-sm bg-white hover:border-black transition focus:outline-none"
              >
                <option value="0">All Ratings</option>
                <option value="4">4★ & above</option>
                <option value="4.5">4.5★ & above</option>
              </select>
            </div>

          </div>
        </div>

        {/* ================= PRODUCT GRID ================= */}
<section className="max-w-7xl mx-auto px-12 py-24">

  <motion.div
    layout
    className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14"
  >
    <AnimatePresence mode="wait">

      {filtered.map((product) => (
        <motion.div
          key={product.id}
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="group"
        >
          <Link href={`/product/${product.id}`}>
            <div className="relative h-[460px] bg-gray-50 rounded-xl overflow-hidden cursor-pointer">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
          </Link>

          <div className="mt-6">
            <h3 className="text-lg font-medium tracking-tight">
              {product.name}
            </h3>

            <div className="flex items-center mt-2 gap-1 text-sm">
              {"★".repeat(Math.floor(product.rating))}
              <span className="text-gray-600 ml-2">
                ({product.rating})
              </span>
            </div>

            <p className="mt-2 text-lg font-semibold">
              ₹{product.price}
            </p>

            <button
              onClick={() => addToCart(product)}
              className="mt-4 text-sm uppercase tracking-wider border-b border-black pb-1 hover:opacity-60 transition"
            >
              Add to Bag
            </button>
          </div>
        </motion.div>
      ))}

    </AnimatePresence>
  </motion.div>

</section>


        {/* ================= FOOTER ================= */}
        <footer className="border-t py-24 px-12 bg-white">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">

            <div>
              <h3 className="text-2xl font-bold tracking-wide">
                STRYDE
              </h3>
              <p className="mt-6 text-gray-600 text-sm max-w-xs leading-relaxed">
                Performance footwear engineered with precision,
                balance and restraint.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Shop</h4>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li>Men</li>
                <li>Women</li>
                <li>Collections</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Company</h4>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li>About</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Support</h4>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li>Shipping</li>
                <li>Returns</li>
                <li>Contact</li>
              </ul>
            </div>

          </div>

          <div className="mt-16 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} STRYDE. All rights reserved.
          </div>
        </footer>

      </main>
    </>
  )
}
