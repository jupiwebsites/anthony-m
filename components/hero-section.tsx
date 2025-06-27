import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Camera } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 text-center text-white px-4">
        <div className="mb-8">
          <Camera className="w-16 h-16 mx-auto mb-4 text-white/80" />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">ANTHONY MICHAEL</h1>
        <p className="text-lg md:text-xl lg:text-2xl font-light tracking-wide mb-8">Framed Stories Through the Lens</p>
        <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100">
          <Link href="/portfolio/male">EXPLORE WORK</Link>
        </Button>
      </div>
    </section>
  )
}
