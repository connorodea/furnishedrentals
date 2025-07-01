"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Calendar, MapPin, Users, CreditCard, Download, MessageCircle, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BookingConfirmationProps {
  booking: any
}

export function BookingConfirmation({ booking }: BookingConfirmationProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const calculateNights = () => {
    const checkIn = new Date(booking.dates.checkIn)
    const checkOut = new Date(booking.dates.checkOut)
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600">
          Your reservation has been confirmed. Confirmation number: <strong>{booking.confirmationNumber}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Booking Details */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Property Info */}
            <div className="flex space-x-4">
              <Image
                src={booking.property?.image || "/placeholder.svg"}
                alt={booking.property?.title || "Property"}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{booking.property?.title}</h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {booking.property?.location}
                </div>
                <Badge variant="secondary" className="mt-2">
                  {booking.status === "confirmed" ? "Confirmed" : "Pending"}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Stay Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                  <span className="font-medium">Check-in</span>
                </div>
                <span>{formatDate(booking.dates.checkIn)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                  <span className="font-medium">Check-out</span>
                </div>
                <span>{formatDate(booking.dates.checkOut)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-600" />
                  <span className="font-medium">Guests</span>
                </div>
                <span>{booking.guests}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Duration</span>
                <span>{calculateNights()} nights</span>
              </div>
            </div>

            <Separator />

            {/* Guest Information */}
            <div>
              <h4 className="font-medium mb-2">Guest Information</h4>
              <div className="text-sm text-gray-600">
                <p>
                  {booking.guest.firstName} {booking.guest.lastName}
                </p>
                <p>{booking.guest.email}</p>
                {booking.guest.phone && <p>{booking.guest.phone}</p>}
              </div>
            </div>

            {booking.specialRequests && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Special Requests</h4>
                  <p className="text-sm text-gray-600">{booking.specialRequests}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Accommodation ({calculateNights()} nights)</span>
                <span>${(booking.payment.total * 0.75).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Cleaning fee</span>
                <span>${(booking.payment.total * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>${(booking.payment.total * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${(booking.payment.total * 0.07).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${booking.payment.total}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-gray-600" />
                <span className="text-sm">Payment Method: {booking.payment.method}</span>
              </div>
              <div className="text-sm text-gray-600">Transaction ID: {booking.payment.transactionId}</div>
              {booking.status === "pending_payment" && (
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    Payment is being processed. You'll receive an email confirmation once payment is complete.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Download className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium mb-2">Download Confirmation</h4>
              <p className="text-sm text-gray-600 mb-3">Save your booking confirmation for your records</p>
              <Button variant="outline" size="sm" className="bg-white">
                Download PDF
              </Button>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium mb-2">Contact Host</h4>
              <p className="text-sm text-gray-600 mb-3">Get in touch with your host for check-in details</p>
              <Button variant="outline" size="sm" className="bg-white">
                Send Message
              </Button>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-medium mb-2">Prepare for Stay</h4>
              <p className="text-sm text-gray-600 mb-3">Review house rules and check-in instructions</p>
              <Button variant="outline" size="sm" asChild className="bg-white">
                <Link href={`/property/${booking.property?.id || 1}`}>View Property</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <Link href="/dashboard">View My Bookings</Link>
        </Button>
        <Button variant="outline" asChild className="bg-white">
          <Link href="/search">Book Another Stay</Link>
        </Button>
      </div>
    </div>
  )
}
