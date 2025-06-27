"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Camera } from "lucide-react"

export function TravelPreview() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const travelLocations = [
    { code: "LAX", name: "Los Angeles", href: "/travel/lax" },
    { code: "NYC", name: "New York", href: "/travel/nyc" },
    { code: "LAS", name: "Las Vegas", href: "/travel/las" },
    { code: "GRC", name: "Greece", href: "/travel/grc" },
    { code: "PAR", name: "Paris", href: "/travel/par" },
    { code: "ROM", name: "Rome", href: "/travel/rom" },
    { code: "VCE", name: "Venice", href: "/travel/vce" },
    { code: "ICE", name: "Iceland", href: "/travel/ice" },
    { code: "PRG", name: "Prague", href: "/travel/prg" },
  ]

  const itemsPerView = 4
  const maxSlide = Math.max(0, travelLocations.length - itemsPerView)

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1))
      }, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, maxSlide])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(Math.min(index, maxSlide))
  }

  return (
    <section className="py-20 relative">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">TRAVEL COLLECTION</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Journey through captivating destinations captured through the lens, from bustling cities to serene
            landscapes.
          </p>
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out gap-8"
            style={{
              transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)`,
              width: `${(travelLocations.length / itemsPerView) * 100}%`,
            }}
          >
            {travelLocations.map((location) => (
              <div key={location.code} className="flex-shrink-0" style={{ width: `${100 / travelLocations.length}%` }}>
                <Link href={location.href} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-600 mb-2" />
                      <span className="text-gray-800 text-xl font-bold tracking-wider">{location.code}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-center text-gray-600 group-hover:text-black transition-colors">
                    {location.name}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100 transition-colors"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100 transition-colors"
          aria-label="Next Slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: maxSlide + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2 w-2 rounded-full transition-colors ${currentSlide === idx ? "bg-black" : "bg-gray-400"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
