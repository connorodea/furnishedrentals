"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, MapPin, Bed, Bath, Users, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const featuredProperties = [
  {
    id: 1,
    title: "Modern Downtown Loft",
    location: "Chicago, IL",
    price: "2,800",
    beds: 2,
    baths: 2,
    maxGuests: 4,
    image: "/placeholder.svg?height=200&width=300&text=Modern+Loft",
    type: "Loft",
    rating: 4.9,
    reviews: 127,
    instantBook: true,
  },
  {
    id: 2,
    title: "Luxury Penthouse Suite",
    location: "Miami, FL",
    price: "5,500",
    beds: 3,
    baths: 3,
    maxGuests: 6,
    image: "/placeholder.svg?height=200&width=300&text=Penthouse+Suite",
    type: "Penthouse",
    rating: 4.8,
    reviews: 203,
    instantBook: true,
  },
  {
    id: 3,
    title: "Beachfront Condo",
    location: "San Diego, CA",
    price: "3,900",
    beds: 2,
    baths: 2,
    maxGuests: 4,
    image: "/placeholder.svg?height=200&width=300&text=Beachfront+Condo",
    type: "Condo",
    rating: 4.9,
    reviews: 178,
    instantBook: true,
  },
]

export function FeaturedProperties() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (propertyId: number) => {
    setFavorites((prev) => (prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]))
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium furnished rentals in top destinations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative">
                <Link href={`/property/${property.id}`}>
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    width={400}
                    height={250}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    {property.type}
                  </Badge>
                  {property.instantBook && (
                    <Badge variant="outline" className="bg-white/90 text-green-600 border-green-600">
                      <Zap className="h-3 w-3 mr-1" />
                      Instant
                    </Badge>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-4 right-4 h-8 w-8 bg-white/90 hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault()
                    toggleFavorite(property.id)
                  }}
                >
                  <Heart className={`h-4 w-4 ${favorites.includes(property.id) ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>

              <CardContent className="p-6">
                <Link href={`/property/${property.id}`}>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.location}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          {property.beds}
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          {property.baths}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {property.maxGuests}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{property.rating}</span>
                        <span className="text-sm text-gray-600 ml-1">({property.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">${property.price}</div>
                        <div className="text-sm text-gray-600">per month</div>
                      </div>
                      <Button className="ml-4">View Details</Button>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/search">View All Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
