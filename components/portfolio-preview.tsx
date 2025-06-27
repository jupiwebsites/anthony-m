import Link from "next/link"
import { Camera } from "lucide-react"

export function PortfolioPreview() {
  const portfolioCategories = [
    {
      title: "Male",
      href: "/portfolio/male",
    },
    {
      title: "Female",
      href: "/portfolio/female",
    },
    {
      title: "Editorial",
      href: "/portfolio/editorial",
    },
    {
      title: "Virtual Shoots",
      href: "/portfolio/virtual-shoots",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">PORTFOLIO</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection of photography spanning portraits, editorial work, and creative virtual
            shoots.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {portfolioCategories.map((category) => (
            <Link key={category.title} href={category.href} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <div className="flex flex-col items-center justify-center text-gray-400 p-4">
                  <Camera className="w-12 h-12 mb-3" />
                  <p className="text-sm text-center font-medium">{category.title}</p>
                </div>
              </div>
              <h3 className="text-lg font-medium text-center group-hover:text-gray-600 transition-colors">
                {category.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
