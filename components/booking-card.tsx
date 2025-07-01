"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  MessageCircle,
  Star,
  MoreHorizontal,
  Eye,
  X,
  Edit,
  Download,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CancelBookingDialog } from "@/components/cancel-booking-dialog"
import { ReviewDialog } from "@/components/review-dialog"

interface BookingCardProps {
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
  onViewDetails: () => void
  onBookingUpdate: () => void
}

export function BookingCard({ booking, onViewDetails, onBookingUpdate }: BookingCardProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showReviewDialog, setShowReviewDialog] = useState(false)

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const calculateNights = () => {
    const start = new Date(booking.checkIn)
    const end = new Date(booking.checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const handleContactHost = () => {
    // In a real app, this would open a messaging interface
    console.log("Contact host:", booking.hostName)
  }

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    console.log("Download receipt for booking:", booking.id)
  }

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Property Image */}
            <div className="lg:w-48 lg:h-32 w-full h-48 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
              <img
                src={booking.propertyImage || "/placeholder.svg"}
                alt={booking.propertyTitle}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Booking Details */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{booking.propertyTitle}</h3>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {booking.propertyLocation}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {booking.guests} guest{booking.guests > 1 ? "s" : ""}
                    </div>
                    <span>{calculateNights()} nights</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={onViewDetails}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleDownloadReceipt}>
                        <Download className="h-4 w-4 mr-2" />
                        Download Receipt
                      </DropdownMenuItem>
                      {booking.canModify && (
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Modify Booking
                        </DropdownMenuItem>
                      )}
                      {booking.canCancel && (
                        <DropdownMenuItem onClick={() => setShowCancelDialog(true)} className="text-red-600">
                          <X className="h-4 w-4 mr-2" />
                          Cancel Booking
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={booking.hostAvatar || "/placeholder.svg"} />
                      <AvatarFallback>{booking.hostName[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">Host: {booking.hostName}</span>
                  </div>
                  <div className="flex items-center text-sm font-semibold">
                    <DollarSign className="h-4 w-4 mr-1" />${booking.total.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {booking.needsReview && (
                    <Button size="sm" variant="outline" onClick={() => setShowReviewDialog(true)}>
                      <Star className="h-4 w-4 mr-1" />
                      Write Review
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={handleContactHost}>
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Contact Host
                  </Button>
                  <Button size="sm" onClick={onViewDetails}>
                    View Details
                  </Button>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                Confirmation #{booking.confirmationNumber} • Booked {formatDate(booking.createdAt)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <CancelBookingDialog
        booking={booking}
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onCancel={onBookingUpdate}
      />

      <ReviewDialog
        booking={booking}
        isOpen={showReviewDialog}
        onClose={() => setShowReviewDialog(false)}
        onSubmit={onBookingUpdate}
      />
    </>
  )
}
