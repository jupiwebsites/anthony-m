import Link from "next/link"
import { Camera } from "lucide-react"

export default function PrintsPage() {
  const prints = [
    {
      id: "urban-solitude",
      title: "Urban Solitude",
      subtitle: "FLEETWOOD",
      price: 330,
    },
    {
      id: "coastal-dreams",
      title: "Coastal Dreams",
      subtitle: "OCEANSIDE",
      price: 330,
    },
    {
      id: "midnight-jazz",
      title: "Midnight Jazz",
      subtitle: "NIGHTLIFE",
      price: 330,
    },
    {
      id: "desert-mirage",
      title: "Desert Mirage",
      subtitle: "LANDSCAPE",
      price: 330,
    },
    {
      id: "city-lights",
      title: "City Lights",
      subtitle: "URBAN",
      price: 330,
    },
    {
      id: "portrait-in-red",
      title: "Portrait in Red",
      subtitle: "EDITORIAL",
      price: 330,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">PRINT COLLECTION</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of fine art photography prints, each one carefully selected to bring beauty
            and emotion to your space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prints.map((print) => (
            <Link key={print.id} href={`/prints/${print.id}`} className="group">
              <div className="bg-white p-4 shadow-sm rounded-lg">
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <div className="flex flex-col items-center justify-center text-gray-400 p-4">
                    <Camera className="w-12 h-12 mb-3" />
                    <p className="text-sm text-center font-medium">{print.title}</p>
                    <p className="text-xs text-center mt-1">{print.subtitle}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">{print.subtitle}</p>
                  <h3 className="font-medium text-lg mb-1">{print.title}</h3>
                  <p className="text-gray-900">From €{print.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
