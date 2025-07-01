"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, MapPin, Bed, Bath, Users, Wifi, Car, Dumbbell, Waves, Scale, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useComparison } from "@/contexts/comparison-context"

interface Property {
  id: number
  title: string
  location: string
  price: string
  beds: number
  baths: number
  maxGuests: number
  image: string
  amenities: string[]
  type: string
  rating: number
  reviews: number
  instantBook?: boolean
}

interface PropertyGridProps {
  properties: Property[]
  loading?: boolean
}

export function PropertyGrid({ properties, loading = false }: PropertyGridProps) {
  const [favorites, setFavorites] = useState<number[]>([])
  const { addToComparison, removeFromComparison, isInComparison, comparisonProperties } = useComparison()

  const toggleFavorite = (propertyId: number) => {
    setFavorites((prev) => (prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]))
  }

  const handleCompareToggle = (property: Property) => {
    if (isInComparison(property.id)) {
      removeFromComparison(property.id)
    } else {
      if (comparisonProperties.length >= 4) {
        alert("You can only compare up to 4 properties at a time.")
        return
      }
      addToComparison({
        id: property.id,
        title: property.title,
        location: property.location,
        price: property.price,
        beds: property.beds,
        baths: property.baths,
        maxGuests: property.maxGuests,
        image: property.image,
        amenities: property.amenities,
        type: property.type,
        rating: property.rating,
        reviews: property.reviews,
      })
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="animate-pulse">
              <div className="h-48 bg-gray-200" />
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No properties found</div>
        <div className="text-gray-400">Try adjusting your search criteria</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
          <div className="relative">
            <Link href={`/property/${property.id}`}>
              <Image
                src={property.image || "/placeholder.svg?height=200&width=300&text=Property"}
                alt={property.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <div className="absolute top-3 left-3 flex gap-2">
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
            <div className="absolute top-3 right-3 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-white/90 hover:bg-white"
                onClick={(e) => {
                  e.preventDefault()
                  toggleFavorite(property.id)
                }}
              >
                <Heart className={`h-4 w-4 ${favorites.includes(property.id) ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`h-8 w-8 hover:bg-white ${
                  isInComparison(property.id) ? "bg-primary text-white" : "bg-white/90"
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  handleCompareToggle(property)
                }}
                disabled={!isInComparison(property.id) && comparisonProperties.length >= 4}
              >
                <Scale className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <CardContent className="p-4">
            <Link href={`/property/${property.id}`} className="block">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{property.title}</h3>
                  <div className="flex items-center text-gray-600 text-sm">
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
                  <div className="flex items-center space-x-2">
                    {property.amenities.slice(0, 3).map((amenity) => {
                      const icons = {
                        WiFi: Wifi,
                        Parking: Car,
                        Gym: Dumbbell,
                        Pool: Waves,
                      }
                      const IconComponent = icons[amenity as keyof typeof icons]
                      return IconComponent ? <IconComponent key={amenity} className="h-4 w-4 text-gray-400" /> : null
                    })}
                    {property.amenities.length > 3 && (
                      <span className="text-xs text-gray-500">+{property.amenities.length - 3}</span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">${property.price}</div>
                    <div className="text-xs text-gray-600">per month</div>
                  </div>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
