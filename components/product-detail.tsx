"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useCart, type SizeOption, type FrameOption } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"
import { Camera } from "lucide-react"

interface ProductDetailProps {
  id: string
  title: string
  subtitle?: string
  description?: string
  sizeOptions: SizeOption[]
  frameOptions: { value: FrameOption; label: string }[]
}

export function ProductDetail({
  id,
  title,
  subtitle,
  description,
  sizeOptions,
  frameOptions,
}: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>(sizeOptions[1]?.value || "medium")
  const [selectedFrame, setSelectedFrame] = useState<FrameOption>("black")
  const [quantity, setQuantity] = useState(1)

  const [selectedCurrency, setSelectedCurrency] = useState<{ code: string; symbol: string }>(() => {
    try {
      const saved = localStorage.getItem("selectedCurrency")
      return saved ? JSON.parse(saved) : { code: "EUR", symbol: "€" }
    } catch {
      return { code: "EUR", symbol: "€" }
    }
  })

  const { addItem } = useCart()
  const { toast } = useToast()

  const exchangeRates: Record<string, number> = {
    EUR: 1,
    USD: 1.1,
    GBP: 0.85,
    AUD: 1.6,
  }
  const currencySymbols: Record<string, string> = {
    EUR: "€",
    USD: "$",
    GBP: "£",
    AUD: "A$",
  }

  // Persist currency across page loads
  useEffect(() => {
    try {
      localStorage.setItem("selectedCurrency", JSON.stringify(selectedCurrency))
    } catch {}
  }, [selectedCurrency])

  const currentSize = sizeOptions.find((s) => s.value === selectedSize) || sizeOptions[0]
  const baseUnitPrice = currentSize.price
  const rate = exchangeRates[selectedCurrency.code] || 1
  const unitPrice = +(baseUnitPrice * rate).toFixed(2)
  const totalPrice = +(unitPrice * quantity).toFixed(2)

  const handleAddToCart = () => {
    const cartItem = {
      id: `${id}-${selectedSize}-${selectedFrame}`,
      title,
      image: "",
      size: currentSize,
      frame: selectedFrame,
      quantity,
      currency: selectedCurrency.code,
      unitPrice,
    }
    addItem(cartItem)
    toast({
      title: "Added to cart",
      description: `${title} (${currentSize.label}, ${
        frameOptions.find((f) => f.value === selectedFrame)?.label
      }) in ${selectedCurrency.code} has been added.`,
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
      {/* Image */}
      <div>
        <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 p-8 shadow-lg flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <Camera className="w-24 h-24 mb-6" />
            <p className="text-lg font-medium">{title}</p>
            {subtitle && <p className="text-sm mt-2">{subtitle}</p>}
          </div>
        </div>
        {subtitle && (
          <Badge variant="secondary" className="mt-4">
            {subtitle}
          </Badge>
        )}
      </div>

      {/* Details */}
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          {description && <p className="text-gray-600 mb-6">{description}</p>}
        </div>

        {/* Options */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Select Size</h3>
            <RadioGroup
              value={selectedSize}
              onValueChange={setSelectedSize}
              className="grid grid-cols-1 gap-4"
            >
              {sizeOptions.map((size) => (
                <div
                  key={size.value}
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedSize === size.value
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedSize(size.value)}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={size.value} id={`size-${size.value}`} />
                    <Label htmlFor={`size-${size.value}`} className="font-medium cursor-pointer">
                      {size.label} ({size.dimensions})
                    </Label>
                  </div>
                  <span className="font-bold">
                    {selectedCurrency.symbol}
                    {(size.price * rate).toFixed(2)}
                  </span>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Select Frame</h3>
            <div className="grid grid-cols-2 gap-4">
              {frameOptions.map((frame) => (
                <div
                  key={frame.value}
                  className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedFrame === frame.value
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedFrame(frame.value)}
                >
                  <div
                    className={`w-12 h-12 rounded-full mb-2 border ${
                      frame.value === "black"
                        ? "bg-black"
                        : frame.value === "white"
                        ? "bg-white border-gray-300"
                        : "bg-amber-100 border-amber-200"
                    }`}
                  />
                  <span className="text-sm font-medium">{frame.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Quantity</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-10 text-center text-lg font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Price + Currency + Add */}
        <div className="pt-6 border-t">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-medium">Total Price</span>
            <span className="text-2xl font-bold">
              {selectedCurrency.symbol}
              {totalPrice}
            </span>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <label htmlFor="currency" className="text-sm font-medium">
              Currency:
            </label>
            <select
              id="currency"
              value={selectedCurrency.code}
              onChange={(e) => {
                const code = e.target.value
                setSelectedCurrency({ code, symbol: currencySymbols[code] })
              }}
              className="border rounded px-2 py-1"
            >
              {Object.keys(exchangeRates).map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>

          <Button
            className="w-full bg-black text-white hover:bg-gray-800"
            size="lg"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </Button>
        </div>
      </div>
    </div>
  )
}
