"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Users, Bed, Bath, Shield, Award, Clock } from "lucide-react"
import Image from "next/image"
import type { Property } from "@/app/actions/booking"

interface PropertySummaryProps {
  property: Property
}

export function PropertySummary({ property }: PropertySummaryProps) {
  const basePrice = property.price
  const cleaningFee = Math.round(basePrice * 0.1)
  const serviceFee = Math.round(basePrice * 0.12)
  const taxes = Math.round((basePrice + cleaningFee + serviceFee) * 0.08)
  const totalPrice = basePrice + cleaningFee + serviceFee + taxes

  return (
    <div className="space-y-6">
      {/* Property Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="w-20 h-20 flex-shrink-0">
              <Image
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                width={80}
                height={80}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg line-clamp-2">{property.title}</h3>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {property.location}
              </div>
              <div className="flex items-center mt-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">{property.rating}</span>
                <span className="text-sm text-gray-600 ml-1">({property.reviews} reviews)</span>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center mb-1">
                <Bed className="h-4 w-4 text-gray-600" />
              </div>
              <div className="text-sm text-gray-600">
                {property.beds} bed{property.beds !== 1 ? "s" : ""}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-1">
                <Bath className="h-4 w-4 text-gray-600" />
              </div>
              <div className="text-sm text-gray-600">
                {property.baths} bath{property.baths !== 1 ? "s" : ""}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-1">
                <Users className="h-4 w-4 text-gray-600" />
              </div>
              <div className="text-sm text-gray-600">{property.maxGuests} guests</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>${property.price.toLocaleString()} × 1 month</span>
            <span>${basePrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Cleaning fee</span>
            <span>${cleaningFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Service fee</span>
            <span>${serviceFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes</span>
            <span>${taxes.toLocaleString()}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Host Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Host</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3">
            <Image
              src={property.host.avatar || "/placeholder.svg"}
              alt={property.host.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{property.host.name}</span>
                {property.host.verified && (
                  <Badge variant="secondary" className="text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Responds {property.host.responseTime}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Amenities Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {property.amenities.slice(0, 6).map((amenity) => (
              <div key={amenity} className="text-sm text-gray-600">
                • {amenity}
              </div>
            ))}
            {property.amenities.length > 6 && (
              <div className="text-sm text-gray-500 col-span-2">+{property.amenities.length - 6} more amenities</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Booking Protection */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Award className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium mb-1">Booking Protection</h4>
              <p className="text-sm text-gray-600">Your booking is protected by our comprehensive guarantee program.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
