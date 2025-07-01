"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, Users, Phone, MessageCircle, Download, Star, Wifi, Car, Utensils } from "lucide-react"

interface BookingDetailsModalProps {
  booking: {
    id: string
    propertyId: number
    propertyTitle: string
    propertyLocation: string
    propertyImage: string
    checkIn: string
    checkOut: string
    guests: number
    status: "upcoming" | "current" | "completed" | "cancelled"
    total: number
    confirmationNumber: string
    hostName: string
    hostAvatar: string
    createdAt: string
    canCancel: boolean
    canModify: boolean
    needsReview: boolean
  }
  isOpen: boolean
  onClose: () => void
  onBookingUpdate: () => void
}

export function BookingDetailsModal({ booking, isOpen, onClose, onBookingUpdate }: BookingDetailsModalProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const calculateNights = () => {
    const start = new Date(booking.checkIn)
    const end = new Date(booking.checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "current":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Mock pricing breakdown
  const pricePerNight = Math.round((booking.total / calculateNights()) * 0.85)
  const subtotal = pricePerNight * calculateNights()
  const cleaningFee = Math.round(booking.total * 0.05)
  const serviceFee = Math.round(booking.total * 0.08)
  const taxes = booking.total - subtotal - cleaningFee - serviceFee

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Booking Details</span>
            <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Info */}
          <div className="flex gap-4">
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
              <img
                src={booking.propertyImage || "/placeholder.svg"}
                alt={booking.propertyTitle}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{booking.propertyTitle}</h3>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {booking.propertyLocation}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {booking.guests} guest{booking.guests > 1 ? "s" : ""}
                </div>
                <span>{calculateNights()} nights</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Booking Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">CHECK-IN</h4>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <div>
                  <div className="font-medium">{formatDate(booking.checkIn)}</div>
                  <div className="text-sm text-gray-600">After 3:00 PM</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">CHECK-OUT</h4>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <div>
                  <div className="font-medium">{formatDate(booking.checkOut)}</div>
                  <div className="text-sm text-gray-600">Before 11:00 AM</div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Host Information */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-gray-700">HOST</h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={booking.hostAvatar || "/placeholder.svg"} />
                  <AvatarFallback>{booking.hostName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{booking.hostName}</div>
                  <div className="text-sm text-gray-600">Verified Host</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Message
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Amenities */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-gray-700">AMENITIES</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-sm">
                <Wifi className="h-4 w-4 mr-2 text-gray-400" />
                WiFi
              </div>
              <div className="flex items-center text-sm">
                <Car className="h-4 w-4 mr-2 text-gray-400" />
                Parking
              </div>
              <div className="flex items-center text-sm">
                <Utensils className="h-4 w-4 mr-2 text-gray-400" />
                Kitchen
              </div>
            </div>
          </div>

          <Separator />

          {/* Price Breakdown */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-gray-700">PRICE BREAKDOWN</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>
                  ${pricePerNight} × {calculateNights()} nights
                </span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Cleaning fee</span>
                <span>${cleaningFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>${serviceFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${taxes}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${booking.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Booking Info */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Confirmation Number</span>
              <span className="font-medium">{booking.confirmationNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Booked On</span>
              <span className="font-medium">{formatDate(booking.createdAt)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button className="flex-1 bg-transparent" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            {booking.needsReview && (
              <Button className="flex-1 bg-transparent" variant="outline">
                <Star className="h-4 w-4 mr-2" />
                Write Review
              </Button>
            )}
            {booking.canCancel && (
              <Button className="flex-1" variant="destructive">
                Cancel Booking
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
