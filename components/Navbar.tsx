"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ShoppingBag, User } from "lucide-react"
import { useCart } from "@/context/CartContext"
import CartDrawer from "./CartDrawer"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { cart } = useCart()

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black shadow-xl"
            : "bg-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-12 py-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/">
            <h1 className="text-2xl font-bold tracking-[0.4em] text-white cursor-pointer">
              STRYDE
            </h1>
          </Link>

          {/* Menu */}
          <nav className="hidden md:flex gap-12 text-sm font-medium text-white uppercase tracking-wide">
            {["New", "Men", "Women", "Kids", "Sale"].map((item) => (
              <Link key={item} href="#" className="relative group">
                {item}
                <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-8 text-white">
            <Search size={20} className="cursor-pointer hover:opacity-70 transition" />
            <User size={20} className="cursor-pointer hover:opacity-70 transition" />

            <div
              onClick={() => setOpen(true)}
              className="relative cursor-pointer hover:opacity-70 transition"
            >
              <ShoppingBag size={22} />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                  {totalItems}
                </span>
              )}
            </div>
          </div>

        </div>
      </header>

      <CartDrawer open={open} setOpen={setOpen} />
    </>
  )
}
