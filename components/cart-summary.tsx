"use client"

import { useState, useEffect } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

export function CartSummary() {
  const { items, removeItem, updateQuantity } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  // Map of symbols
  const currencySymbols: Record<string, string> = {
    EUR: "€",
    USD: "$",
    GBP: "£",
    AUD: "A$",
  }

  // Persist the currency of the first-added item
  const [currency, setCurrency] = useState<string>("EUR")

  useEffect(() => {
    if (items.length > 0) {
      setCurrency((prev) => items[0].currency ?? prev)
    }
  }, [items])

  const symbol = currencySymbols[currency] || "€"

  // Totals in the selected currency
  const lineTotals = items.map((item) => item.unitPrice * item.quantity)
  const subtotal = lineTotals.reduce((sum, n) => sum + n, 0)
  const shippingFee = 25
  const tax = Math.round(subtotal * 0.2)
  const total = subtotal + shippingFee + tax

  const handleCheckout = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      alert(
        "This is a placeholder for checkout integration. In a real application, this would connect to a payment processor."
      )
    }, 1500)
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">
          Add some beautiful prints to your cart and come back here to check out.
        </p>
        <Button asChild>
          <a href="/">Continue Shopping</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold">Your Cart</h2>
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={`${item.id}-${item.size.value}-${item.frame}`}
            className="flex gap-4 py-4 border-b"
          >
            <div className="relative w-24 h-32 bg-gray-100 flex-shrink-0 flex items-center justify-center">
              <div className="text-gray-400 text-xs text-center">
                {item.title}
                <br />
                {item.size.label}
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex justify-between">
                <h3 className="font-medium">{item.title}</h3>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-500 hover:text-red-500"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {item.size.label} ({item.size.dimensions})
              </p>
              <p className="text-sm text-gray-600">
                {item.frame.charAt(0).toUpperCase() + item.frame.slice(1)} Frame
              </p>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center space-x-2 mr-4">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-sm"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-sm"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <p className="font-medium">
                  {currency} {symbol}
                  {(item.unitPrice * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>
              {currency} {symbol}
              {subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>
              {currency} {symbol}
              {shippingFee.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (20%)</span>
            <span>
              {currency} {symbol}
              {tax.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>
              {currency} {symbol}
              {total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <Button
        className="w-full bg-black text-white hover:bg-gray-800"
        size="lg"
        onClick={handleCheckout}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Proceed to Checkout"}
      </Button>
    </div>
  )
}
