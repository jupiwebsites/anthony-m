import Link from "next/link"
import { Instagram, Twitter, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">THE STUDIO</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-black">
                  About
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-black">
                  Process
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">COLLECTIONS</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/portfolio/male" className="hover:text-black">
                  Male Portraits
                </Link>
              </li>
              <li>
                <Link href="/portfolio/female" className="hover:text-black">
                  Female Portraits
                </Link>
              </li>
              <li>
                <Link href="/portfolio/editorial" className="hover:text-black">
                  Editorial
                </Link>
              </li>
              <li>
                <Link href="/travel/nyc" className="hover:text-black">
                  Travel Collection
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">CLIENT SERVICES</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/faq" className="hover:text-black">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-black">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/custom" className="hover:text-black">
                  Custom Orders
                </Link>
              </li>
              <li>
                <Link href="/care" className="hover:text-black">
                  Print Care
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">MORE</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/terms" className="hover:text-black">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-black">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-black">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="#" className="text-gray-600 hover:text-black">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-black">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-black">
              <Facebook className="h-5 w-5" />
            </Link>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Anthony Michael. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
