"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"
import { checkAvailability } from "@/app/actions/calendar"

interface AvailabilityCheckerProps {
  propertyId: string
}

export function AvailabilityChecker({ propertyId }: AvailabilityCheckerProps) {
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(1)
  const [isChecking, setIsChecking] = useState(false)
  const [availabilityResult, setAvailabilityResult] = useState<any>(null)

  const handleCheckAvailability = async () => {
    if (!checkIn || !checkOut) return

    setIsChecking(true)
    try {
      const result = await checkAvailability(propertyId, {
        checkIn,
        checkOut,
        guests,
      })
      setAvailabilityResult(result)
    } catch (error) {
      console.error("Failed to check availability:", error)
      setAvailabilityResult({
        available: false,
        error: "Failed to check availability. Please try again.",
      })
    } finally {
      setIsChecking(false)
    }
  }

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const getAvailabilityIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "unavailable":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "partial":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "available":
        return "border-green-200 bg-green-50"
      case "unavailable":
        return "border-red-200 bg-red-50"
      case "partial":
        return "border-yellow-200 bg-yellow-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Check Availability
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="checkin">Check-in Date</Label>
            <Input
              id="checkin"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <Label htmlFor="checkout">Check-out Date</Label>
            <Input
              id="checkout"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <Label htmlFor="guests">Guests</Label>
            <Input
              id="guests"
              type="number"
              min="1"
              max="8"
              value={guests}
              onChange={(e) => setGuests(Number.parseInt(e.target.value))}
            />
          </div>
        </div>

        <Button onClick={handleCheckAvailability} disabled={!checkIn || !checkOut || isChecking} className="w-full">
          {isChecking ? (
            <>
              <Clock className="h-4 w-4 mr-2 animate-spin" />
              Checking Availability...
            </>
          ) : (
            <>
              <Calendar className="h-4 w-4 mr-2" />
              Check Availability
            </>
          )}
        </Button>

        {availabilityResult && (
          <Alert className={getAvailabilityColor(availabilityResult.status)}>
            {getAvailabilityIcon(availabilityResult.status)}
            <AlertDescription>
              {availabilityResult.available ? (
                <div>
                  <p className="font-semibold text-green-800 mb-2">✅ Available for {calculateNights()} nights</p>
                  <div className="space-y-1 text-sm">
                    <p>
                      Total Price: <span className="font-semibold">${availabilityResult.totalPrice}</span>
                    </p>
                    <p>
                      Average per night:{" "}
                      <span className="font-semibold">
                        ${Math.round(availabilityResult.totalPrice / calculateNights())}
                      </span>
                    </p>
                    {availabilityResult.specialOffers && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {availabilityResult.specialOffers}
                      </Badge>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-red-800 mb-2">❌ Not Available</p>
                  <p className="text-sm text-red-700">
                    {availabilityResult.reason || "The selected dates are not available for booking."}
                  </p>
                  {availabilityResult.alternativeDates && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-red-800">Suggested alternatives:</p>
                      <ul className="text-sm text-red-700 list-disc list-inside">
                        {availabilityResult.alternativeDates.map((alt: any, index: number) => (
                          <li key={index}>
                            {alt.checkIn} to {alt.checkOut} - ${alt.price}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
