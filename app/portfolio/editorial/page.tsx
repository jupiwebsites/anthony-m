import { PortfolioImage } from "@/components/portfolio-image"

export default function EditorialPortfolioPage() {
  const images = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    src: "",
    alt: `Editorial Shot ${i + 1}`,
    title: `Editorial Series ${i + 1}`,
    description: "Styled editorial photography",
  }))

  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">EDITORIAL</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Showcasing creative editorial shoots that blend fashion, storytelling, and artistic vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image) => (
            <PortfolioImage
              key={image.id}
              id={image.id}
              category="editorial"
              src=""
              alt={image.alt}
              title={image.title}
              description={image.description}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Book an Editorial Session</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Looking for visually striking editorial imagery? Let's collaborate on your next creative project.
          </p>
          <button className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  )
}
