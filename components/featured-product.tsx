"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"

export function FeaturedProduct() {
  const [selectedSize, setSelectedSize] = useState("medium")
  const [selectedFrame, setSelectedFrame] = useState("black")
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    try {
      const saved = localStorage.getItem("selectedCurrency")
      return saved ? JSON.parse(saved) : { code: "EUR", symbol: "€" }
    } catch {
      return { code: "EUR", symbol: "€" }
    }
  })

  const { addItem } = useCart()
  const { toast } = useToast()

  const sizeOptions = [
    { value: "small", label: "Small", dimensions: "12 x 16 cm", price: 185 },
    { value: "medium", label: "Medium", dimensions: "30 x 40 cm", price: 330 },
    { value: "large", label: "Large", dimensions: "50 x 70 cm", price: 485 },
    { value: "xlarge", label: "X-Large", dimensions: "60 x 80 cm", price: 680 },
    { value: "collector", label: "Collector", dimensions: "100 x 140 cm", price: 2900 },
  ]

  const frameOptions = [
    { value: "black", label: "Black Frame" },
    { value: "white", label: "White Frame" },
    { value: "natural", label: "Natural Wood" },
  ]

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

  useEffect(() => {
    try {
      localStorage.setItem("selectedCurrency", JSON.stringify(selectedCurrency))
    } catch {
      // ignore
    }
  }, [selectedCurrency])

  const currentSize = sizeOptions.find((s) => s.value === selectedSize) || sizeOptions[1]
  const basePrice = currentSize.price
  const rate = exchangeRates[selectedCurrency.code] || 1
  const convertedPrice = +(basePrice * rate).toFixed(2)

  const handleAddToCart = () => {
    addItem({
      id: "featured-urban-solitude",
      title: "Urban Solitude",
      image: "",
      size: currentSize,
      frame: selectedFrame as any,
      quantity: 1,
      currency: selectedCurrency.code,
      unitPrice: convertedPrice,
    })

    toast({
      title: "Added to cart",
      description: `Urban Solitude (${currentSize.label}, ${
        frameOptions.find((f) => f.value === selectedFrame)?.label
      }) in ${selectedCurrency.code} has been added.`,
    })
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">FEATURED PRINT</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Product Placeholder */}
          <div className="relative">
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 p-8 shadow-lg flex items-center justify-center">
              <div className="flex flex-col items-center justify-center text-gray-400">
                <Camera className="w-24 h-24 mb-6" />
                <p className="text-lg text-center font-medium">Urban Solitude</p>
                <p className="text-sm text-center mt-2">FLEETWOOD</p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <div className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm mb-4">
                FLEETWOOD
              </div>
              <h1 className="text-2xl font-bold mb-2">Urban Solitude</h1>
              <p className="text-gray-600 mb-6">
                A striking portrait of modern urban life, capturing the essence of solitude within the bustling city
                environment.
              </p>
            </div>

            <div className="space-y-6">
              {/* Size */}
              <div>
                <h3 className="text-lg font-medium mb-3">Select Size</h3>
                <div className="grid grid-cols-1 gap-4">
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
                      <span className="font-medium">
                        {size.label} ({size.dimensions})
                      </span>
                      <span className="font-bold">
                        {selectedCurrency.symbol}
                        {(size.price * rate).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frame */}
              <div>
                <h3 className="text-lg font-medium mb-3">Select Frame</h3>
                <div className="grid grid-cols-3 gap-4">
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

              {/* Price + Currency + Add to Cart */}
              <div className="pt-6 border-t">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-medium">Price</span>
                  <span className="text-2xl font-bold">
                    {selectedCurrency.symbol}
                    {convertedPrice}
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

                <Button className="w-full bg-black text-white hover:bg-gray-800" size="lg" onClick={handleAddToCart}>
                  ADD TO CART
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
