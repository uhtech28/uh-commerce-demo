"use client"

import { Check } from "lucide-react"

interface Props {
  productName: string
  visible: boolean
}

export default function AddToCartToast({ productName, visible }: Props) {
  return (
    <div
      className={`fixed top-24 right-8 z-[100] transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <div className="bg-black text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[280px]">
        <div className="bg-white text-black rounded-full p-1">
          <Check size={16} />
        </div>
        <div>
          <p className="text-sm font-medium">Added to Bag</p>
          <p className="text-xs opacity-70">{productName}</p>
        </div>
      </div>
    </div>
  )
}
