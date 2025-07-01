"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Search, Menu, Heart, Scale, Bell } from "lucide-react"
import { useComparison } from "@/contexts/comparison-context"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { comparisonProperties } = useComparison()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">FR</span>
          </div>
          <span className="font-bold text-xl hidden sm:inline-block">FurnishedRentals</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/search" className="text-gray-600 hover:text-gray-900 transition-colors">
            Search
          </Link>
          <Link href="/list-property" className="text-gray-600 hover:text-gray-900 transition-colors">
            List Property
          </Link>
          <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
            How It Works
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
            About
          </Link>
        </nav>

        {/* Search Bar (Desktop) */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search destinations..." className="pl-10 pr-4" onFocus={() => setIsSearchOpen(true)} />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Search Button (Mobile) */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Comparison Button */}
          {comparisonProperties.length > 0 && (
            <Link href="/compare">
              <Button variant="ghost" size="icon" className="relative">
                <Scale className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {comparisonProperties.length}
                </Badge>
              </Button>
            </Link>
          )}

          {/* Favorites */}
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/search" className="text-lg font-medium">
                  Search Properties
                </Link>
                <Link href="/list-property" className="text-lg font-medium">
                  List Your Property
                </Link>
                <Link href="/how-it-works" className="text-lg font-medium">
                  How It Works
                </Link>
                <Link href="/about" className="text-lg font-medium">
                  About Us
                </Link>
                <div className="border-t pt-4 space-y-2">
                  <Link href="/login">
                    <Button variant="outline" className="w-full bg-transparent">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
