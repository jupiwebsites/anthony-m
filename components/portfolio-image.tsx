"use client"

import Link from "next/link"
import { Camera } from "lucide-react"

interface PortfolioImageProps {
  id: number | string
  category: string
  src?: string
  alt: string
  title: string
  location?: string
  description?: string
}

export function PortfolioImage({ id, category, alt, title, location, description }: PortfolioImageProps) {
  const productId = `${category.toLowerCase()}-${id}`

  return (
    <div className="group cursor-pointer">
      <Link href={`/product/${productId}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <div className="flex flex-col items-center justify-center text-gray-400 p-4">
            <Camera className="w-12 h-12 mb-3" />
            <p className="text-sm text-center font-medium">{title}</p>
            {location && <p className="text-xs text-center mt-1">{location}</p>}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-medium text-gray-900">{title}</h3>
          {location && <p className="text-sm text-gray-600 mt-1">{location}</p>}
          {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        </div>
      </Link>
    </div>
  )
}
