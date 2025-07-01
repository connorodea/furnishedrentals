"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ChevronLeft, ChevronRight, Plus, X } from "lucide-react"
import { updateAvailability } from "@/app/actions/calendar"

interface AvailabilityCalendarProps {
  propertyId: string
  calendarData: any
  onUpdate: (data: any) => void
}

export function AvailabilityCalendar({ propertyId, calendarData, onUpdate }: AvailabilityCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [isBlockingMode, setIsBlockingMode] = useState(false)
  const [blockingReason, setBlockingReason] = useState("")
  const [blockingNote, setBlockingNote] = useState("")

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getDateStatus = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    const dayData = calendarData.availability[dateStr]

    if (!dayData) return "available"
    return dayData.status // 'available', 'booked', 'blocked', 'pending'
  }

  const getDateInfo = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return calendarData.availability[dateStr] || null
  }

  const handleDateClick = (date: Date) => {
    if (isBlockingMode) {
      const isSelected = selectedDates.some((d) => d.getTime() === date.getTime())
      if (isSelected) {
        setSelectedDates(selectedDates.filter((d) => d.getTime() !== date.getTime()))
      } else {
        setSelectedDates([...selectedDates, date])
      }
    }
  }

  const handleBlockDates = async () => {
    if (selectedDates.length === 0) return

    try {
      const updatedData = await updateAvailability(propertyId, {
        dates: selectedDates.map((d) => d.toISOString().split("T")[0]),
        status: "blocked",
        reason: blockingReason,
        note: blockingNote,
      })

      onUpdate(updatedData)
      setSelectedDates([])
      setIsBlockingMode(false)
      setBlockingReason("")
      setBlockingNote("")
    } catch (error) {
      console.error("Failed to block dates:", error)
    }
  }

  const handleUnblockDate = async (date: Date) => {
    try {
      const updatedData = await updateAvailability(propertyId, {
        dates: [date.toISOString().split("T")[0]],
        status: "available",
      })

      onUpdate(updatedData)
    } catch (error) {
      console.error("Failed to unblock date:", error)
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "booked":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "blocked":
        return "bg-red-100 text-red-800 border-red-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const days = getDaysInMonth(currentDate)
  const monthYear = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Availability Calendar
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Block Dates
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Block Dates</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="reason">Reason for Blocking</Label>
                      <Select value={blockingReason} onValueChange={setBlockingReason}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="personal_use">Personal Use</SelectItem>
                          <SelectItem value="renovation">Renovation</SelectItem>
                          <SelectItem value="seasonal_closure">Seasonal Closure</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="note">Additional Notes (Optional)</Label>
                      <Textarea
                        id="note"
                        value={blockingNote}
                        onChange={(e) => setBlockingNote(e.target.value)}
                        placeholder="Add any additional details..."
                      />
                    </div>
                    <Button onClick={() => setIsBlockingMode(true)} className="w-full" disabled={!blockingReason}>
                      Start Selecting Dates
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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

          {/* Blocking Mode Banner */}
          {isBlockingMode && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-blue-900">Blocking Mode Active</p>
                  <p className="text-sm text-blue-700">Click dates to select them for blocking</p>
                  <p className="text-xs text-blue-600">Selected: {selectedDates.length} dates</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={handleBlockDates} disabled={selectedDates.length === 0}>
                    Block Selected
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setIsBlockingMode(false)
                      setSelectedDates([])
                    }}
                  >
                    <X className="h-4 w-4" />
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
                return <div key={index} className="p-2 h-16"></div>
              }

              const status = getDateStatus(date)
              const dateInfo = getDateInfo(date)
              const isSelected = selectedDates.some((d) => d.getTime() === date.getTime())
              const isToday = date.toDateString() === new Date().toDateString()
              const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))

              return (
                <div
                  key={index}
                  className={`
                    p-2 h-16 border rounded-lg cursor-pointer transition-all relative
                    ${getStatusColor(status)}
                    ${isSelected ? "ring-2 ring-blue-500" : ""}
                    ${isToday ? "ring-2 ring-purple-500" : ""}
                    ${isPast ? "opacity-50" : ""}
                    ${isBlockingMode && !isPast ? "hover:ring-2 hover:ring-blue-300" : ""}
                  `}
                  onClick={() => !isPast && handleDateClick(date)}
                >
                  <div className="text-sm font-medium">{date.getDate()}</div>
                  {status !== "available" && (
                    <Badge variant="secondary" className="text-xs absolute bottom-1 left-1 right-1">
                      {status}
                    </Badge>
                  )}
                  {dateInfo?.price && (
                    <div className="text-xs text-gray-600 absolute top-1 right-1">${dateInfo.price}</div>
                  )}
                  {status === "blocked" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-0 right-0 h-4 w-4 p-0 opacity-0 hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleUnblockDate(date)
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded mr-2"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded mr-2"></div>
              <span className="text-sm">Booked</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-100 border border-red-200 rounded mr-2"></div>
              <span className="text-sm">Blocked</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded mr-2"></div>
              <span className="text-sm">Pending</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
