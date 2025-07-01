"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchFilters } from "@/components/search-filters"
import { PropertyGrid } from "@/components/property-grid"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Grid, List, Map } from "lucide-react"
import { Star } from "lucide-react" // Import Star component
import Image from "next/image" // Import Image component
import Link from "next/link" // Import Link component

// Mock properties data
const mockProperties = [
  {
    id: 1,
    title: "Modern Downtown Loft",
    location: "Chicago, IL",
    price: "2,800",
    beds: 2,
    baths: 2,
    maxGuests: 4,
    image: "/placeholder.svg?height=200&width=300&text=Modern+Loft",
    amenities: ["WiFi", "Parking", "Gym", "Pool"],
    type: "Loft",
    rating: 4.9,
    reviews: 127,
    instantBook: true,
  },
  {
    id: 2,
    title: "Cozy Studio Apartment",
    location: "New York, NY",
    price: "3,200",
    beds: 1,
    baths: 1,
    maxGuests: 2,
    image: "/placeholder.svg?height=200&width=300&text=Studio+Apartment",
    amenities: ["WiFi", "Gym", "Laundry"],
    type: "Studio",
    rating: 4.7,
    reviews: 89,
    instantBook: false,
  },
  {
    id: 3,
    title: "Luxury Penthouse Suite",
    location: "Miami, FL",
    price: "5,500",
    beds: 3,
    baths: 3,
    maxGuests: 6,
    image: "/placeholder.svg?height=200&width=300&text=Penthouse+Suite",
    amenities: ["WiFi", "Parking", "Pool", "Gym", "Concierge"],
    type: "Penthouse",
    rating: 4.8,
    reviews: 203,
    instantBook: true,
  },
  {
    id: 4,
    title: "Charming Brownstone",
    location: "Boston, MA",
    price: "4,100",
    beds: 3,
    baths: 2,
    maxGuests: 6,
    image: "/placeholder.svg?height=200&width=300&text=Brownstone",
    amenities: ["WiFi", "Parking", "Kitchen", "Laundry"],
    type: "Townhouse",
    rating: 4.6,
    reviews: 156,
    instantBook: false,
  },
  {
    id: 5,
    title: "Beachfront Condo",
    location: "San Diego, CA",
    price: "3,900",
    beds: 2,
    baths: 2,
    maxGuests: 4,
    image: "/placeholder.svg?height=200&width=300&text=Beachfront+Condo",
    amenities: ["WiFi", "Pool", "Beach Access", "Parking"],
    type: "Condo",
    rating: 4.9,
    reviews: 178,
    instantBook: true,
  },
  {
    id: 6,
    title: "Urban Loft Space",
    location: "Seattle, WA",
    price: "2,600",
    beds: 1,
    baths: 1,
    maxGuests: 3,
    image: "/placeholder.svg?height=200&width=300&text=Urban+Loft",
    amenities: ["WiFi", "Gym", "Workspace"],
    type: "Loft",
    rating: 4.5,
    reviews: 92,
    instantBook: false,
  },
]

function SearchContent() {
  const searchParams = useSearchParams()
  const [properties, setProperties] = useState(mockProperties)
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [sortBy, setSortBy] = useState("recommended")

  // Get search parameters
  const location = searchParams.get("location") || ""
  const checkIn = searchParams.get("checkIn") || ""
  const checkOut = searchParams.get("checkOut") || ""
  const guests = searchParams.get("guests") || ""

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    const timer = setTimeout(() => {
      // Filter properties based on search params
      let filtered = mockProperties

      if (location) {
        filtered = filtered.filter((property) => property.location.toLowerCase().includes(location.toLowerCase()))
      }

      if (guests) {
        const guestCount = Number.parseInt(guests)
        filtered = filtered.filter((property) => property.maxGuests >= guestCount)
      }

      // Sort properties
      switch (sortBy) {
        case "price-low":
          filtered.sort((a, b) => Number.parseInt(a.price.replace(",", "")) - Number.parseInt(b.price.replace(",", "")))
          break
        case "price-high":
          filtered.sort((a, b) => Number.parseInt(b.price.replace(",", "")) - Number.parseInt(a.price.replace(",", "")))
          break
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case "newest":
          // Keep original order for newest
          break
        default:
          // Recommended - keep original order
          break
      }

      setProperties(filtered)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [location, checkIn, checkOut, guests, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Search Summary */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {location ? `Properties in ${location}` : "All Properties"}
          </h1>
          <div className="flex items-center text-gray-600 space-x-4">
            {checkIn && checkOut && (
              <span>
                {checkIn} - {checkOut}
              </span>
            )}
            {guests && (
              <span>
                {guests} guest{Number.parseInt(guests) > 1 ? "s" : ""}
              </span>
            )}
            <span>{properties.length} properties found</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="bg-white">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <div className="flex items-center border rounded-lg bg-white">
              <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
                <List className="h-4 w-4" />
              </Button>
              <Button variant={viewMode === "map" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("map")}>
                <Map className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <SearchFilters />
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {viewMode === "grid" && <PropertyGrid properties={properties} loading={loading} />}

            {viewMode === "list" && (
              <div className="space-y-4">
                {loading
                  ? [...Array(5)].map((_, i) => (
                      <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                        <div className="flex space-x-4">
                          <div className="w-48 h-32 bg-gray-200 rounded-lg" />
                          <div className="flex-1 space-y-3">
                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                            <div className="h-4 bg-gray-200 rounded w-1/2" />
                            <div className="h-4 bg-gray-200 rounded w-1/4" />
                          </div>
                        </div>
                      </div>
                    ))
                  : properties.map((property) => (
                      <div key={property.id} className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="flex space-x-6">
                          <div className="w-48 h-32 flex-shrink-0">
                            <Image
                              src={property.image || "/placeholder.svg"}
                              alt={property.title}
                              width={200}
                              height={130}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-semibold">{property.title}</h3>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-primary">${property.price}</div>
                                <div className="text-sm text-gray-600">per month</div>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-2">{property.location}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <span>{property.beds} beds</span>
                              <span>{property.baths} baths</span>
                              <span>Up to {property.maxGuests} guests</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                <span className="font-medium">{property.rating}</span>
                                <span className="text-gray-600 ml-1">({property.reviews} reviews)</span>
                              </div>
                              <Button asChild>
                                <Link href={`/property/${property.id}`}>View Details</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            )}

            {viewMode === "map" && (
              <div className="bg-white rounded-lg p-8 text-center">
                <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-500">Interactive Map View</span>
                </div>
                <p className="text-gray-600">Map integration would be implemented here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}
