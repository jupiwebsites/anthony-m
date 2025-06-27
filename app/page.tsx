import { HeroSection } from "@/components/hero-section"
import { PortfolioPreview } from "@/components/portfolio-preview"
import { TravelPreview } from "@/components/travel-preview"
import { FeaturedProduct } from "@/components/featured-product"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PortfolioPreview />
      <TravelPreview />
      <FeaturedProduct />
    </main>
  )
}
