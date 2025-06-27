"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { ZoomIn, ZoomOut, X, RotateCw, Maximize2, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdvancedImageZoomProps {
  src: string
  alt: string
  title: string
  className?: string
}

export function AdvancedImageZoom({ src, alt, title, className = "" }: AdvancedImageZoomProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const imageRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const openModal = () => {
    setIsModalOpen(true)
    setScale(1)
    setPosition({ x: 0, y: 0 })
    setRotation(0)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const zoomIn = () => {
    setScale((prev) => Math.min(prev * 1.5, 5))
  }

  const zoomOut = () => {
    setScale((prev) => Math.max(prev / 1.5, 0.5))
  }

  const resetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const rotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!isModalOpen) return
      e.preventDefault()

      const delta = e.deltaY > 0 ? 0.9 : 1.1
      setScale((prev) => Math.min(Math.max(prev * delta, 0.5), 5))
    },
    [isModalOpen],
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (scale <= 1) return
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    },
    [scale, position],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || scale <= 1) return

      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    },
    [isDragging, dragStart, scale],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isModalOpen) return

      switch (e.key) {
        case "Escape":
          closeModal()
          break
        case "+":
        case "=":
          zoomIn()
          break
        case "-":
          zoomOut()
          break
        case "0":
          resetZoom()
          break
        case "r":
        case "R":
          rotate()
          break
      }
    },
    [isModalOpen],
  )

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("wheel", handleWheel, { passive: false })
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("wheel", handleWheel)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isModalOpen, handleWheel, handleMouseMove, handleMouseUp, handleKeyDown])

  return (
    <>
      {/* Thumbnail Image */}
      <div className={`relative group ${className}`}>
        <div
          className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 cursor-zoom-in overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
          onClick={openModal}
        >
          <div className="flex flex-col items-center justify-center text-gray-400 p-8">
            <Camera className="w-16 h-16 mb-4" />
            <p className="text-sm text-center font-medium">{title}</p>
          </div>

          {/* Zoom Icon */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 p-2 rounded-full">
              <Maximize2 className="h-4 w-4" />
            </div>
          </div>

          {/* Zoom Hint */}
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/80 text-white text-xs px-2 py-1 rounded">Click to view full size</div>
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div ref={modalRef} className="relative w-full h-full flex items-center justify-center">
            {/* Controls */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <div className="bg-black/80 text-white px-4 py-2 rounded-lg">
                <h3 className="font-medium">{title}</h3>
                <p className="text-sm text-gray-300">Zoom: {Math.round(scale * 100)}%</p>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="secondary" onClick={zoomOut} disabled={scale <= 0.5}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" onClick={resetZoom}>
                  <span className="text-xs">1:1</span>
                </Button>
                <Button size="sm" variant="secondary" onClick={zoomIn} disabled={scale >= 5}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" onClick={rotate}>
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" onClick={closeModal}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Image Container */}
            <div
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              onMouseDown={handleMouseDown}
              style={{ cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
            >
              <div
                className="relative transition-transform duration-200 ease-out"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
                  transformOrigin: "center center",
                }}
              >
                <div className="bg-gradient-to-br from-gray-700 to-gray-800 w-96 h-96 rounded-lg flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center text-white p-8">
                    <Camera className="w-24 h-24 mb-6" />
                    <p className="text-lg text-center font-medium">{title}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg max-w-md">
              <p className="text-sm">
                <strong>Controls:</strong> Scroll to zoom • Drag to pan • R to rotate • ESC to close
              </p>
              <p className="text-xs text-gray-300 mt-1">Keyboard: +/- to zoom • 0 to reset • R to rotate</p>
            </div>
          </div>

          {/* Click outside to close */}
          <div className="absolute inset-0 -z-10" onClick={closeModal} />
        </div>
      )}
    </>
  )
}
