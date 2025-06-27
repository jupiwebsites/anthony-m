import { PortfolioImage } from "@/components/portfolio-image"

export default function LAXTravelPage() {
  const images = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    src: "",
    alt: `LAX Photography ${i + 1}`,
    title: `Los Angeles Moment ${i + 1}`,
    location: i % 4 === 0 ? "Downtown" : i % 4 === 1 ? "Hollywood" : i % 4 === 2 ? "Venice Beach" : "Santa Monica",
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">LOS ANGELES</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the vibrant spirit of L.A. through captivating street scenes, iconic landmarks, and coastal
            vibes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image) => (
            <PortfolioImage
              key={image.id}
              id={image.id}
              category="lax"
              src=""
              alt={image.alt}
              title={image.title}
              location={image.location}
              description="Limited edition print"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
