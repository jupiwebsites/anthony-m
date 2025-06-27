"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"

export function CartIcon() {
  const { itemCount } = useCart()

  return (
    <Link href="/checkout" className="relative">
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
      <span className="sr-only">Cart</span>
    </Link>
  )
}
