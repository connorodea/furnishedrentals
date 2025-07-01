"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, DollarSign } from "lucide-react"
import { cancelBooking } from "@/app/actions/user-bookings"

interface CancelBookingDialogProps {
  booking: {
    id: string
    propertyTitle: string
    checkIn: string
    total: number
    confirmationNumber: string
  }
  isOpen: boolean
  onClose: () => void
  onCancel: () => void
}

export function CancelBookingDialog({ booking, isOpen, onClose, onCancel }: CancelBookingDialogProps) {
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const calculateRefund = () => {
    const checkInDate = new Date(booking.checkIn)
    const today = new Date()
    const daysUntilCheckIn = Math.ceil((checkInDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilCheckIn >= 7) {
      return booking.total // Full refund
    } else if (daysUntilCheckIn >= 3) {
      return Math.round(booking.total * 0.5) // 50% refund
    } else {
      return 0 // No refund
    }
  }

  const refundAmount = calculateRefund()
  const refundPercentage = Math.round((refundAmount / booking.total) * 100)

  const handleCancel = async () => {
    setIsSubmitting(true)
    try {
      await cancelBooking(booking.id, reason)
      onCancel()
      onClose()
    } catch (error) {
      console.error("Failed to cancel booking:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Cancel Booking
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">{booking.propertyTitle}</h4>
            <div className="text-sm text-gray-600">
              <div>Check-in: {formatDate(booking.checkIn)}</div>
              <div>Confirmation: {booking.confirmationNumber}</div>
            </div>
          </div>

          <Alert>
            <DollarSign className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-1">
                <div>
                  Refund Amount: <strong>${refundAmount.toLocaleString()}</strong> ({refundPercentage}%)
                </div>
                <div className="text-sm text-gray-600">
                  {refundPercentage === 100
                    ? "Full refund available (7+ days before check-in)"
                    : refundPercentage === 50
                      ? "Partial refund available (3-6 days before check-in)"
                      : "No refund available (less than 3 days before check-in)"}
                </div>
              </div>
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for cancellation (optional)</Label>
            <Textarea
              id="reason"
              placeholder="Please let us know why you're cancelling..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This action cannot be undone. Your booking will be cancelled immediately.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Keep Booking
          </Button>
          <Button variant="destructive" onClick={handleCancel} disabled={isSubmitting}>
            {isSubmitting ? "Cancelling..." : "Cancel Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
