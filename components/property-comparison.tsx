"use client"

import { useComparison } from "@/contexts/comparison-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Bed, Bath, Users, X, Check, Calendar, MessageCircle, Trash2, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function PropertyComparison() {
  const { comparisonProperties, removeFromComparison, clearComparison } = useComparison()

  if (comparisonProperties.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties to Compare</h3>
            <p className="text-gray-600">
              Start adding properties to your comparison by clicking the "Compare" button on property listings.
            </p>
          </div>
          <Button asChild>
            <Link href="/search">Browse Properties</Link>
          </Button>
        </div>
      </div>
    )
  }

  const allAmenities = Array.from(new Set(comparisonProperties.flatMap((property) => property.amenities))).sort()

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">Comparing {comparisonProperties.length} of 4 properties</div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={clearComparison} className="bg-white">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Property Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {comparisonProperties.map((property) => (
              <Card key={property.id} className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 z-10 bg-white hover:bg-red-50 hover:border-red-200"
                  onClick={() => removeFromComparison(property.id)}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
                <div className="relative">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 left-3">{property.type}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm">
                      {property.rating} ({property.reviews} reviews)
                    </span>
                  </div>
                  <div className="text-xl font-bold text-primary mb-4">{property.price}/month</div>
                  <div className="flex justify-between">
                    <Button size="sm" asChild>
                      <Link href={`/property/${property.id}/book`}>Book Now</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="bg-white">
                      <Link href={`/property/${property.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparison Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Basic Information */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">Basic Information</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4 font-medium">Feature</th>
                          {comparisonProperties.map((property) => (
                            <th key={property.id} className="text-left py-2 px-4 font-medium min-w-48">
                              {property.title}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4 font-medium">Price</td>
                          {comparisonProperties.map((property) => (
                            <td key={property.id} className="py-3 px-4">
                              <span className="text-lg font-bold text-primary">{property.price}/month</span>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4 font-medium">Property Type</td>
                          {comparisonProperties.map((property) => (
                            <td key={property.id} className="py-3 px-4">
                              <Badge variant="secondary">{property.type}</Badge>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4 font-medium">Location</td>
                          {comparisonProperties.map((property) => (
                            <td key={property.id} className="py-3 px-4">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                                {property.location}
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4 font-medium">Rating</td>
                          {comparisonProperties.map((property) => (
                            <td key={property.id} className="py-3 px-4">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                {property.rating} ({property.reviews} reviews)
                              </div>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <Separator />

                {/* Room Details */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">Room Details</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4 font-medium">Feature</th>
                          {comparisonProperties.map((property) => (
                            <th key={property.id} className="text-left py-2 px-4 font-medium">
                              {property.title}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4 font-medium">
                            <div className="flex items-center">
                              <Bed className="h-4 w-4 mr-2" />
                              Bedrooms
                            </div>
                          </td>
                          {comparisonProperties.map((property) => (
                            <td key={property.id} className="py-3 px-4">
                              <span className="font-semibold">{property.beds}</span>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4 font-medium">
                            <div className="flex items-center">
                              <Bath className="h-4 w-4 mr-2" />
                              Bathrooms
                            </div>
                          </td>
                          {comparisonProperties.map((property) => (
                            <td key={property.id} className="py-3 px-4">
                              <span className="font-semibold">{property.baths}</span>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4 font-medium">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2" />
                              Max Guests
                            </div>
                          </td>
                          {comparisonProperties.map((property) => (
                            <td key={property.id} className="py-3 px-4">
                              <span className="font-semibold">{property.maxGuests}</span>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <Separator />

                {/* Amenities Comparison */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">Amenities</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4 font-medium">Amenity</th>
                          {comparisonProperties.map((property) => (
                            <th key={property.id} className="text-center py-2 px-4 font-medium">
                              {property.title}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {allAmenities.map((amenity) => (
                          <tr key={amenity} className="border-b">
                            <td className="py-3 px-4 font-medium">{amenity}</td>
                            {comparisonProperties.map((property) => (
                              <td key={property.id} className="py-3 px-4 text-center">
                                {property.amenities.includes(amenity) ? (
                                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                                ) : (
                                  <X className="h-5 w-5 text-gray-300 mx-auto" />
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">Actions</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4 font-medium">Action</th>
                          {comparisonProperties.map((property) => (
                            <th key={property.id} className="text-center py-2 px-4 font-medium">
                              {property.title}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4 font-medium">Book Property</td>
                          {comparisonProperties.map((property) => (
                            <td key={property.id} className="py-3 px-4 text-center">
                              <Button size="sm" asChild>
                                <Link href={`/property/${property.id}/book`}>
                                  <Calendar className="h-4 w-4 mr-1" />
                                  Book
                                </Link>
                              </Button>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4 font-medium">Contact Owner</td>
                          {comparisonProperties.map((property) => (
                            <td key={property.id} className="py-3 px-4 text-center">
                              <Button variant="outline" size="sm" className="bg-white">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Contact
                              </Button>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium">View Details</td>
                          {comparisonProperties.map((property) => (
                            <td key={property.id} className="py-3 px-4 text-center">
                              <Button variant="outline" size="sm" asChild className="bg-white">
                                <Link href={`/property/${property.id}`}>View</Link>
                              </Button>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
