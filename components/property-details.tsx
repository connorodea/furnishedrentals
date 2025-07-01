"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  MapPin,
  Users,
  Bed,
  Bath,
  Heart,
  Share,
  Scale,
  Shield,
  Award,
  Clock,
  Wifi,
  Car,
  Dumbbell,
  Waves,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useComparison } from "@/contexts/comparison-context"
import type { Property } from "@/app/actions/booking"

interface PropertyDetailsProps {
  property: Property
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addToComparison, removeFromComparison, isInComparison, comparisonProperties } = useComparison()

  const handleCompareToggle = () => {
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
        price: property.price.toString(),
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

  const amenityIcons = {
    WiFi: Wifi,
    Parking: Car,
    Gym: Dumbbell,
    Pool: Waves,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{property.rating}</span>
                  <span className="ml-1">({property.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setIsFavorite(!isFavorite)}>
                <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant={isInComparison(property.id) ? "default" : "outline"}
                size="sm"
                onClick={handleCompareToggle}
                disabled={!isInComparison(property.id) && comparisonProperties.length >= 4}
              >
                <Scale className="h-4 w-4 mr-2" />
                {isInComparison(property.id) ? "Added" : "Compare"}
              </Button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mb-8 h-96">
          <div className="lg:col-span-2">
            <Image
              src={property.images[currentImageIndex] || property.image}
              alt={property.title}
              width={600}
              height={400}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 gap-2">
            {property.images.slice(1, 5).map((image, index) => (
              <div key={index} className="cursor-pointer" onClick={() => setCurrentImageIndex(index + 1)}>
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${property.title} - Image ${index + 2}`}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover rounded-lg hover:opacity-80 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Overview */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      {property.type} hosted by {property.host.name}
                    </h2>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {property.maxGuests} guests
                      </div>
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        {property.beds} bedroom{property.beds !== 1 ? "s" : ""}
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        {property.baths} bathroom{property.baths !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                  <Image
                    src={property.host.avatar || "/placeholder.svg"}
                    alt={property.host.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Enhanced Clean</h4>
                      <p className="text-sm text-gray-600">This host committed to enhanced cleaning protocol.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Superhost</h4>
                      <p className="text-sm text-gray-600">Superhosts are experienced, highly rated hosts.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Great check-in experience</h4>
                      <p className="text-sm text-gray-600">
                        100% of recent guests gave the check-in process a 5-star rating.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">About this place</h3>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.amenities.map((amenity) => {
                    const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons]
                    return (
                      <div key={amenity} className="flex items-center space-x-3">
                        {IconComponent ? (
                          <IconComponent className="h-5 w-5 text-gray-600" />
                        ) : (
                          <div className="h-5 w-5 bg-gray-200 rounded" />
                        )}
                        <span>{amenity}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Policies */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">House Rules</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Check-in</span>
                    <span>{property.policies.checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out</span>
                    <span>{property.policies.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Smoking</span>
                    <span>{property.policies.smoking ? "Allowed" : "Not allowed"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pets</span>
                    <span>{property.policies.pets ? "Allowed" : "Not allowed"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Parties or events</span>
                    <span>{property.policies.parties ? "Allowed" : "Not allowed"}</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div>
                  <h4 className="font-medium mb-2">Cancellation Policy</h4>
                  <p className="text-sm text-gray-600">{property.policies.cancellation}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold">${property.price.toLocaleString()}</span>
                    <span className="text-gray-600 ml-1">/ month</span>
                  </div>
                  {property.instantBook && (
                    <Badge variant="secondary">
                      <Shield className="h-3 w-3 mr-1" />
                      Instant Book
                    </Badge>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border rounded-lg p-3">
                      <div className="text-xs font-medium text-gray-600 uppercase">Check-in</div>
                      <div className="text-sm">Add date</div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="text-xs font-medium text-gray-600 uppercase">Check-out</div>
                      <div className="text-sm">Add date</div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3">
                    <div className="text-xs font-medium text-gray-600 uppercase">Guests</div>
                    <div className="text-sm">1 guest</div>
                  </div>

                  <Link href={`/property/${property.id}/book`}>
                    <Button className="w-full" size="lg">
                      Reserve
                    </Button>
                  </Link>

                  <p className="text-center text-sm text-gray-600">You won't be charged yet</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>${property.price.toLocaleString()} × 1 month</span>
                      <span>${property.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning fee</span>
                      <span>${Math.round(property.price * 0.1).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>${Math.round(property.price * 0.12).toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>
                        $
                        {(
                          property.price +
                          Math.round(property.price * 0.1) +
                          Math.round(property.price * 0.12)
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
