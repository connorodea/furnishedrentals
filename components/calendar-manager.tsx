"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AvailabilityCalendar } from "./availability-calendar"
import { CalendarSync } from "./calendar-sync"
import { BookingsList } from "./bookings-list"
import { PricingCalendar } from "./pricing-calendar"
import { Calendar, FolderSyncIcon as Sync, DollarSign, List, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CalendarManagerProps {
  propertyId: string
  initialData: any
}

export function CalendarManager({ propertyId, initialData }: CalendarManagerProps) {
  const [calendarData, setCalendarData] = useState(initialData)
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle")
  const [lastSync, setLastSync] = useState<Date | null>(null)

  const handleCalendarUpdate = (updatedData: any) => {
    setCalendarData(updatedData)
  }

  const handleSyncComplete = (status: "success" | "error") => {
    setSyncStatus(status)
    setLastSync(new Date())
    setTimeout(() => setSyncStatus("idle"), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Sync Status Alert */}
      {syncStatus !== "idle" && (
        <Alert className={syncStatus === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
          <AlertCircle className={`h-4 w-4 ${syncStatus === "error" ? "text-red-600" : "text-green-600"}`} />
          <AlertDescription className={syncStatus === "error" ? "text-red-800" : "text-green-800"}>
            {syncStatus === "syncing" && "Syncing calendars..."}
            {syncStatus === "success" && "Calendars synced successfully!"}
            {syncStatus === "error" && "Calendar sync failed. Please try again."}
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Days</p>
                <p className="text-2xl font-bold text-green-600">{calendarData.stats.availableDays}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Booked Days</p>
                <p className="text-2xl font-bold text-blue-600">{calendarData.stats.bookedDays}</p>
              </div>
              <List className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Blocked Days</p>
                <p className="text-2xl font-bold text-red-600">{calendarData.stats.blockedDays}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Occupancy Rate</p>
                <p className="text-2xl font-bold text-purple-600">{calendarData.stats.occupancyRate}%</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Calendar Interface */}
      <Tabs defaultValue="availability" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="availability" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Availability
          </TabsTrigger>
          <TabsTrigger value="sync" className="flex items-center">
            <Sync className="h-4 w-4 mr-2" />
            Calendar Sync
          </TabsTrigger>
          <TabsTrigger value="pricing" className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            Pricing
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex items-center">
            <List className="h-4 w-4 mr-2" />
            Bookings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="availability">
          <AvailabilityCalendar propertyId={propertyId} calendarData={calendarData} onUpdate={handleCalendarUpdate} />
        </TabsContent>

        <TabsContent value="sync">
          <CalendarSync
            propertyId={propertyId}
            syncedCalendars={calendarData.syncedCalendars}
            onSyncComplete={handleSyncComplete}
            lastSync={lastSync}
          />
        </TabsContent>

        <TabsContent value="pricing">
          <PricingCalendar propertyId={propertyId} pricingData={calendarData.pricing} onUpdate={handleCalendarUpdate} />
        </TabsContent>

        <TabsContent value="bookings">
          <BookingsList propertyId={propertyId} bookings={calendarData.bookings} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
