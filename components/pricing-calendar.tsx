"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react"
import { updatePricing } from "@/app/actions/calendar"

interface PricingCalendarProps {
  propertyId: string
  pricingData: any
  onUpdate: (data: any) => void
}

export function PricingCalendar({ propertyId, pricingData, onUpdate }: PricingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [isPricingMode, setIsPricingMode] = useState(false)
  const [newPrice, setNewPrice] = useState("")
  const [pricingReason, setPricingReason] = useState("")

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getDatePrice = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return pricingData.prices[dateStr] || pricingData.basePrice
  }

  const getPriceColor = (price: number) => {
    const basePrice = pricingData.basePrice
    if (price > basePrice * 1.2) return "text-green-600 bg-green-50"
    if (price < basePrice * 0.8) return "text-red-600 bg-red-50"
    return "text-gray-600 bg-gray-50"
  }

  const handleDateClick = (date: Date) => {
    if (isPricingMode) {
      const isSelected = selectedDates.some((d) => d.getTime() === date.getTime())
      if (isSelected) {
        setSelectedDates(selectedDates.filter((d) => d.getTime() !== date.getTime()))
      } else {
        setSelectedDates([...selectedDates, date])
      }
    }
  }

  const handleUpdatePricing = async () => {
    if (selectedDates.length === 0 || !newPrice) return

    try {
      const updatedData = await updatePricing(propertyId, {
        dates: selectedDates.map((d) => d.toISOString().split("T")[0]),
        price: Number.parseFloat(newPrice),
        reason: pricingReason,
      })

      onUpdate(updatedData)
      setSelectedDates([])
      setIsPricingMode(false)
      setNewPrice("")
      setPricingReason("")
    } catch (error) {
      console.error("Failed to update pricing:", error)
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const days = getDaysInMonth(currentDate)
  const monthYear = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Dynamic Pricing Calendar
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Update Pricing
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Pricing</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="price">New Price per Night</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        placeholder="150"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reason">Pricing Reason</Label>
                      <Select value={pricingReason} onValueChange={setPricingReason}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high_demand">High Demand Period</SelectItem>
                          <SelectItem value="holiday">Holiday/Special Event</SelectItem>
                          <SelectItem value="weekend">Weekend Premium</SelectItem>
                          <SelectItem value="seasonal">Seasonal Adjustment</SelectItem>
                          <SelectItem value="promotion">Promotional Rate</SelectItem>
                          <SelectItem value="last_minute">Last Minute Discount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={() => setIsPricingMode(true)}
                      className="w-full"
                      disabled={!newPrice || !pricingReason}
                    >
                      Start Selecting Dates
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Pricing Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600">Base Price</p>
              <p className="text-2xl font-bold text-blue-900">${pricingData.basePrice}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600">Avg. Price</p>
              <p className="text-2xl font-bold text-green-900">${pricingData.averagePrice}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600">Max Price</p>
              <p className="text-2xl font-bold text-purple-900">${pricingData.maxPrice}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-orange-600">Min Price</p>
              <p className="text-2xl font-bold text-orange-900">${pricingData.minPrice}</p>
            </div>
          </div>

          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-semibold">{monthYear}</h3>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Pricing Mode Banner */}
          {isPricingMode && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-green-900">Pricing Mode Active</p>
                  <p className="text-sm text-green-700">Click dates to update pricing to ${newPrice}/night</p>
                  <p className="text-xs text-green-600">Selected: {selectedDates.length} dates</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={handleUpdatePricing} disabled={selectedDates.length === 0}>
                    Update Pricing
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setIsPricingMode(false)
                      setSelectedDates([])
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              if (!date) {
                return <div key={index} className="p-2 h-20"></div>
              }

              const price = getDatePrice(date)
              const isSelected = selectedDates.some((d) => d.getTime() === date.getTime())
              const isToday = date.toDateString() === new Date().toDateString()
              const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))

              return (
                <div
                  key={index}
                  className={`
                    p-2 h-20 border rounded-lg cursor-pointer transition-all relative
                    ${getPriceColor(price)}
                    ${isSelected ? "ring-2 ring-green-500" : ""}
                    ${isToday ? "ring-2 ring-purple-500" : ""}
                    ${isPast ? "opacity-50" : ""}
                    ${isPricingMode && !isPast ? "hover:ring-2 hover:ring-green-300" : ""}
                  `}
                  onClick={() => !isPast && handleDateClick(date)}
                >
                  <div className="text-sm font-medium">{date.getDate()}</div>
                  <div className="text-xs font-bold mt-1">${price}</div>
                  {price !== pricingData.basePrice && (
                    <Badge variant="secondary" className="text-xs absolute bottom-1 left-1 right-1">
                      {price > pricingData.basePrice ? "+" : "-"}
                      {Math.round(((price - pricingData.basePrice) / pricingData.basePrice) * 100)}%
                    </Badge>
                  )}
                </div>
              )
            })}
          </div>

          {/* Pricing Legend */}
          <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-50 border border-green-200 rounded mr-2"></div>
              <span className="text-sm">Premium (+20%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded mr-2"></div>
              <span className="text-sm">Base Price</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-50 border border-red-200 rounded mr-2"></div>
              <span className="text-sm">Discount (-20%)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
