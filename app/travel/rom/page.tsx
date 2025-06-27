import { PortfolioImage } from "@/components/portfolio-image"

export default function RomeTravelPage() {
  const images = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    src: "",
    alt: `Rome Photography ${i + 1}`,
    title: `Rome Moment ${i + 1}`,
    location: i % 4 === 0 ? "Colosseum" : i % 4 === 1 ? "Vatican City" : i % 4 === 2 ? "Pantheon" : "Trastevere",
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">ROME</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Wander through the ancient streets of Rome, from awe-inspiring ruins to charming piazzas and hidden
            trattorias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image) => (
            <PortfolioImage
              key={image.id}
              id={image.id}
              category="rom"
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
