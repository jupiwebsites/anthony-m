"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function ProductDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const [category, itemId] = id?.split("-") || ["", ""]
  const [selectedSize, setSelectedSize] = useState("medium")
  const [selectedFrame, setSelectedFrame] = useState("black")
  const [quantity, setQuantity] = useState(1)

  const [selectedCurrency, setSelectedCurrency] = useState<{ code: string; symbol: string }>(() => {
    try {
      const stored = localStorage.getItem("selectedCurrency")
      return stored ? JSON.parse(stored) : { code: "EUR", symbol: "€" }
    } catch {
      return { code: "EUR", symbol: "€" }
    }
  })

  const { addItem } = useCart()
  const { toast } = useToast()

  const sizeOptions = [
    { value: "small", label: "Small", dimensions: "20 x 30 cm", price: 185 },
    { value: "medium", label: "Medium", dimensions: "40 x 60 cm", price: 330 },
    { value: "large", label: "Large", dimensions: "60 x 90 cm", price: 485 },
  ]

  const frameOptions = [
    { value: "black", label: "Black Frame" },
    { value: "white", label: "White Frame" },
    { value: "natural", label: "Natural Wood" },
    { value: "silver", label: "Silver Metal" },
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
    } catch {}
  }, [selectedCurrency])

  const currentSize = sizeOptions.find((s) => s.value === selectedSize) || sizeOptions[1]
  const basePrice = currentSize.price
  const rate = exchangeRates[selectedCurrency.code] ?? 1
  const unitPrice = +(basePrice * rate).toFixed(2)
  const totalPrice = +(unitPrice * quantity).toFixed(2)

  const getTitle = () => {
    switch (category) {
      case "male":
        return `Male Portrait ${itemId}`
      case "female":
        return `Female Portrait ${itemId}`
      case "editorial":
        return `Editorial Series ${itemId}`
      case "virtual":
        return `Virtual Creation ${itemId}`
      case "lax":
        return `Los Angeles ${itemId}`
      case "nyc":
        return `New York ${itemId}`
      case "las":
        return `Las Vegas ${itemId}`
      case "grc":
        return `Greece ${itemId}`
      case "par":
        return `Paris ${itemId}`
      case "rom":
        return `Rome ${itemId}`
      case "vce":
        return `Venice ${itemId}`
      case "ice":
        return `Iceland ${itemId}`
      case "prg":
        return `Prague ${itemId}`
      default:
        return `Print ${itemId}`
    }
  }

  const getDescription = () => {
    switch (category) {
      case "male":
        return "A powerful masculine portrait capturing strength, character, and authentic emotion."
      case "female":
        return "An elegant feminine portrait celebrating grace, beauty, and inner strength."
      case "editorial":
        return "A conceptual editorial piece that tells a story through visual narrative."
      case "virtual":
        return "A cutting-edge virtual creation blending photography with digital artistry."
      case "lax":
        return "Capturing the golden hour magic of Los Angeles - from Venice Beach to Hollywood Hills."
      case "nyc":
        return "The raw energy and soul of New York City frozen in time."
      case "las":
        return "The electric energy of Las Vegas after dark - neon lights and desert landscapes."
      case "grc":
        return "The timeless beauty of Greece - ancient history meets Mediterranean charm."
      case "par":
        return "The romantic elegance of Paris captured through intimate street photography."
      case "rom":
        return "The eternal beauty of Rome where ancient history lives alongside modern life."
      case "vce":
        return "The dreamlike quality of Venice captured in reflections and shadows."
      case "ice":
        return "The raw, otherworldly beauty of Iceland's dramatic landscapes."
      case "prg":
        return "The fairy-tale architecture of Prague with its hundred spires and cobblestone streets."
      default:
        return "A limited edition fine art print from our exclusive collection."
    }
  }

  const handleAddToCart = () => {
    try {
      addItem({
        id: `${id}-${selectedSize}-${selectedFrame}`,
        title: getTitle(),
        image: "",
        size: currentSize,
        frame: selectedFrame as any,
        quantity,
        currency: selectedCurrency.code,
        unitPrice,
      })
      toast({
        title: "Added to cart",
        description: `${getTitle()} (${currentSize.label}, ${selectedFrame} frame) in ${selectedCurrency.code} has been added.`,
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to add to cart. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Placeholder Image */}
          <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-md flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-gray-400 p-8">
              <Camera className="w-24 h-24 mb-6" />
              <p className="text-lg text-center font-medium">{getTitle()}</p>
              <p className="text-sm text-center mt-2">{category?.toUpperCase()}</p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <div className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm mb-4">
                {category?.toUpperCase()}
              </div>
              <h1 className="text-2xl font-bold mb-2">{getTitle()}</h1>
              <p className="text-gray-600 mb-6">{getDescription()}</p>
            </div>

            <div className="space-y-6">
              {/* Size */}
              <div>
                <h3 className="text-lg font-medium mb-3">Select Size</h3>
                <div className="grid gap-4">
                  {sizeOptions.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setSelectedSize(s.value)}
                      className={`w-full flex justify-between p-4 border rounded-lg ${
                        selectedSize === s.value ? "border-black bg-gray-50" : "border-gray-200"
                      }`}
                    >
                      <span>
                        {s.label} ({s.dimensions})
                      </span>
                      <span>
                        {selectedCurrency.symbol}
                        {(s.price * rate).toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Frame */}
              <div>
                <h3 className="text-lg font-medium mb-3">Select Frame</h3>
                <div className="grid grid-cols-2 gap-4">
                  {frameOptions.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setSelectedFrame(f.value)}
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        selectedFrame === f.value ? "border-black bg-gray-50" : "border-gray-200"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 mb-2 rounded-full ${
                          f.value === "black"
                            ? "bg-black"
                            : f.value === "white"
                              ? "bg-white border border-gray-300"
                              : f.value === "natural"
                                ? "bg-amber-100"
                                : "bg-gray-400"
                        }`}
                      />
                      <span className="text-sm">{f.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-medium mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 border rounded">
                    –
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 border rounded">
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price, Currency & Add */}
            <div className="pt-6 border-t space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total Price</span>
                <span className="text-2xl font-bold">
                  {selectedCurrency.symbol}
                  {totalPrice}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <label htmlFor="currency" className="font-medium">
                  Currency:
                </label>
                <select
                  id="currency"
                  className="border rounded px-2 py-1"
                  value={selectedCurrency.code}
                  onChange={(e) => {
                    const code = e.target.value
                    setSelectedCurrency({ code, symbol: currencySymbols[code] })
                  }}
                >
                  {Object.keys(exchangeRates).map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </div>

              <Button className="w-full" onClick={handleAddToCart}>
                ADD TO CART
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
