"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/context/cart-context"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          ANTHONY MICHAEL
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex flex-1 justify-center">
          <NavigationMenuList className="flex w-full max-w-md justify-between">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="px-3 py-2 text-sm font-medium rounded hover:text-gray-600 hover:bg-white/95 transition-colors"
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium px-3 py-2 rounded hover:text-gray-600 hover:bg-white/95 transition-colors">
                Portfolio
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-48 p-2">
                  {["male", "female", "editorial", "virtual-shoots"].map((cat) => (
                    <NavigationMenuLink asChild key={cat}>
                      <Link href={`/portfolio/${cat}`} className="block px-3 py-2 text-sm hover:bg-gray-50 rounded">
                        {cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ")}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium px-3 py-2 rounded hover:text-gray-600 hover:bg-white/95 transition-colors">
                Travel
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-48 p-2">
                  {["lax", "nyc", "las", "grc", "par", "rom", "vce", "ice", "prg"].map((loc) => (
                    <NavigationMenuLink asChild key={loc}>
                      <Link href={`/travel/${loc}`} className="block px-3 py-2 text-sm hover:bg-gray-50 rounded">
                        {loc.toUpperCase()}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/contact"
                  className="px-3 py-2 text-sm font-medium rounded hover:text-gray-600 hover:bg-white/95 transition-colors"
                >
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <Link href="/checkout" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </Link>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-8">
                <Link href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Home
                </Link>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Portfolio</h3>
                  <div className="pl-4 space-y-2">
                    {["male", "female", "editorial", "virtual-shoots"].map((cat) => (
                      <Link
                        key={cat}
                        href={`/portfolio/${cat}`}
                        className="block text-sm text-gray-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ")}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Travel</h3>
                  <div className="pl-4 space-y-2">
                    {["lax", "nyc", "las", "grc", "par", "rom", "vce", "ice", "prg"].map((loc) => (
                      <Link
                        key={loc}
                        href={`/travel/${loc}`}
                        className="block text-sm text-gray-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {loc.toUpperCase()}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link href="/contact" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Contact
                </Link>

                <Link href="/checkout" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Cart ({itemCount})
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
