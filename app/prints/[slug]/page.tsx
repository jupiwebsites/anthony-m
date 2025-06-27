"use client"

import { useParams } from "next/navigation"
import { ProductDetail } from "@/components/product-detail"

// This would typically come from a database or API
const products = [
  {
    id: "urban-solitude",
    title: "Urban Solitude",
    subtitle: "FLEETWOOD",
    description:
      "A striking portrait of modern urban life, capturing the essence of solitude within the bustling city environment.",
  },
  {
    id: "coastal-dreams",
    title: "Coastal Dreams",
    subtitle: "OCEANSIDE",
    description: "Serene coastal landscape that evokes the peaceful rhythm of waves against the shore.",
  },
  {
    id: "midnight-jazz",
    title: "Midnight Jazz",
    subtitle: "NIGHTLIFE",
    description: "The vibrant energy of a late-night jazz club captured in dramatic lighting and intimate moments.",
  },
]

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

export default function PrintPage() {
  const params = useParams()
  const slug = params?.slug as string

  const product = products.find((p) => p.id === slug) || products[0]

  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-20">
        <ProductDetail
          id={product.id}
          title={product.title}
          subtitle={product.subtitle}
          description={product.description}
          sizeOptions={sizeOptions}
          frameOptions={frameOptions}
        />
      </div>
    </div>
  )
}
