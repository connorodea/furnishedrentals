"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, User, CreditCard } from "lucide-react"
import { PaymentProcessor } from "@/components/payment-processor"
import { createBooking, type Property } from "@/app/actions/booking"

interface BookingFormProps {
  property: Property
}

export function BookingForm({ property }: BookingFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "credit-card",
  })

  const basePrice = property.price
  const cleaningFee = Math.round(basePrice * 0.1)
  const serviceFee = Math.round(basePrice * 0.12)
  const taxes = Math.round((basePrice + cleaningFee + serviceFee) * 0.08)
  const totalAmount = basePrice + cleaningFee + serviceFee + taxes

  const steps = [
    { number: 1, title: "Dates & Guests", icon: Calendar },
    { number: 2, title: "Guest Information", icon: User },
    { number: 3, title: "Payment", icon: CreditCard },
  ]

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await createBooking({
        propertyId: property.id,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
        firstName: bookingData.firstName,
        lastName: bookingData.lastName,
        email: bookingData.email,
        phone: bookingData.phone,
        specialRequests: bookingData.specialRequests,
        paymentMethod: bookingData.paymentMethod,
        totalAmount,
      })
    } catch (error) {
      console.error("Booking failed:", error)
      setLoading(false)
    }
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return bookingData.checkIn && bookingData.checkOut && bookingData.guests > 0
      case 2:
        return bookingData.firstName && bookingData.lastName && bookingData.email && bookingData.phone
      case 3:
        return true // Payment validation would be more complex in real app
      default:
        return false
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number
              const isValid = isStepValid(step.number)

              return (
                <div key={step.number} className="flex items-center">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <div className={`text-sm font-medium ${isActive ? "text-primary" : "text-gray-600"}`}>
                        Step {step.number}
                      </div>
                      <div className={`text-xs ${isActive ? "text-primary" : "text-gray-500"}`}>{step.title}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-4">
                      <div className={`h-0.5 ${isCompleted ? "bg-green-500" : "bg-gray-200"}`} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Select Dates & Guests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="checkin">Check-in Date</Label>
                <Input
                  id="checkin"
                  type="date"
                  value={bookingData.checkIn}
                  onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <Label htmlFor="checkout">Check-out Date</Label>
                <Input
                  id="checkout"
                  type="date"
                  value={bookingData.checkOut}
                  onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                  min={bookingData.checkIn || new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="guests">Number of Guests</Label>
              <Select
                value={bookingData.guests.toString()}
                onValueChange={(value) => setBookingData({ ...bookingData, guests: Number.parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: property.maxGuests }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} Guest{num > 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-600 mt-1">Maximum {property.maxGuests} guests allowed</p>
            </div>

            {/* Policies */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Booking Policies</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Check-in: {property.policies.checkIn}</div>
                <div>• Check-out: {property.policies.checkOut}</div>
                <div>• Cancellation: {property.policies.cancellation}</div>
                <div>• Smoking: {property.policies.smoking ? "Allowed" : "Not allowed"}</div>
                <div>• Pets: {property.policies.pets ? "Allowed" : "Not allowed"}</div>
                <div>• Parties: {property.policies.parties ? "Allowed" : "Not allowed"}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Guest Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={bookingData.firstName}
                  onChange={(e) => setBookingData({ ...bookingData, firstName: e.target.value })}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={bookingData.lastName}
                  onChange={(e) => setBookingData({ ...bookingData, lastName: e.target.value })}
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={bookingData.email}
                onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={bookingData.phone}
                onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
              <Textarea
                id="specialRequests"
                value={bookingData.specialRequests}
                onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                placeholder="Any special requests or requirements?"
                rows={4}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Important Information</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Please ensure all guest information is accurate</li>
                <li>• You will receive booking confirmation via email</li>
                <li>• Host contact details will be provided after booking</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <PaymentProcessor
          totalAmount={totalAmount}
          onPaymentMethodChange={(method) => setBookingData({ ...bookingData, paymentMethod: method })}
          onSubmit={handleSubmit}
          loading={loading}
        />
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
          Back
        </Button>

        {currentStep < 3 ? (
          <Button onClick={handleNext} disabled={!isStepValid(currentStep)}>
            Continue
          </Button>
        ) : null}
      </div>
    </div>
  )
}
