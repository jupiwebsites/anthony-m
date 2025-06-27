"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { ZoomIn, ZoomOut, X, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageZoomProps {
  src: string
  alt: string
  title: string
  className?: string
}

export function ImageZoom({ src, alt, title, className = "" }: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!imageRef.current || !isZoomed) return

      const rect = imageRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      setMousePosition({ x, y })
    },
    [isZoomed],
  )

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal()
    }
  }, [])

  // Add escape key listener
  useState(() => {
    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  })

  return (
    <>
      {/* Main Image Container */}
      <div className={`relative group ${className}`}>
        <div
          ref={imageRef}
          className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden cursor-zoom-in flex items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onClick={openModal}
          style={{
            transform: isZoomed ? `scale(1.5)` : "scale(1)",
            transformOrigin: isZoomed ? `${mousePosition.x}% ${mousePosition.y}%` : "center",
            transition: "transform 0.3s ease",
          }}
        >
          {/* Placeholder Content */}
          <div className="flex flex-col items-center justify-center text-gray-400 p-8">
            <Camera className="w-16 h-16 mb-4" />
            <p className="text-sm text-center font-medium">{title}</p>
            <p className="text-xs text-center mt-1">Photography Print</p>
          </div>

          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleZoom()
                }}
              >
                {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Zoom Hint */}
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/80 text-white text-xs px-2 py-1 rounded">
              {isZoomed ? "Move mouse to explore" : "Hover to zoom • Click for full view"}
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white"
              onClick={closeModal}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Full Size Image Placeholder */}
            <div className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center">
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 w-full h-full max-w-2xl max-h-[80vh] rounded-lg flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-white p-8">
                  <Camera className="w-24 h-24 mb-6" />
                  <p className="text-lg text-center font-medium">{title}</p>
                  <p className="text-sm text-center mt-2 text-gray-300">Full resolution preview</p>
                </div>
              </div>
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg max-w-md">
              <h3 className="font-medium mb-1">{title}</h3>
              <p className="text-sm text-gray-300">Professional photography print • Museum quality</p>
            </div>
          </div>

          {/* Click outside to close */}
          <div className="absolute inset-0 -z-10" onClick={closeModal} />
        </div>
      )}
    </>
  )
}
