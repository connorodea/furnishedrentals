"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Plus,
  Trash2,
  RefreshCw,
  ExternalLink,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { syncCalendar, addCalendarSync, removeCalendarSync, exportCalendar } from "@/app/actions/calendar"

interface CalendarSyncProps {
  propertyId: string
  syncedCalendars: any[]
  onSyncComplete: (status: "success" | "error") => void
  lastSync: Date | null
}

export function CalendarSync({ propertyId, syncedCalendars, onSyncComplete, lastSync }: CalendarSyncProps) {
  const [isAddingCalendar, setIsAddingCalendar] = useState(false)
  const [newCalendar, setNewCalendar] = useState({
    name: "",
    type: "",
    url: "",
    autoSync: true,
  })
  const [syncingCalendars, setSyncingCalendars] = useState<string[]>([])

  const calendarTypes = [
    { value: "google", label: "Google Calendar", icon: "🗓️" },
    { value: "outlook", label: "Outlook Calendar", icon: "📅" },
    { value: "ical", label: "iCal/ICS URL", icon: "📆" },
    { value: "airbnb", label: "Airbnb", icon: "🏠" },
    { value: "vrbo", label: "VRBO", icon: "🏡" },
    { value: "booking", label: "Booking.com", icon: "🛏️" },
  ]

  const handleAddCalendar = async () => {
    try {
      await addCalendarSync(propertyId, newCalendar)
      setNewCalendar({ name: "", type: "", url: "", autoSync: true })
      setIsAddingCalendar(false)
      onSyncComplete("success")
    } catch (error) {
      console.error("Failed to add calendar:", error)
      onSyncComplete("error")
    }
  }

  const handleSyncCalendar = async (calendarId: string) => {
    setSyncingCalendars((prev) => [...prev, calendarId])
    try {
      await syncCalendar(propertyId, calendarId)
      onSyncComplete("success")
    } catch (error) {
      console.error("Failed to sync calendar:", error)
      onSyncComplete("error")
    } finally {
      setSyncingCalendars((prev) => prev.filter((id) => id !== calendarId))
    }
  }

  const handleRemoveCalendar = async (calendarId: string) => {
    try {
      await removeCalendarSync(propertyId, calendarId)
      onSyncComplete("success")
    } catch (error) {
      console.error("Failed to remove calendar:", error)
      onSyncComplete("error")
    }
  }

  const handleExportCalendar = async (format: string) => {
    try {
      const exportUrl = await exportCalendar(propertyId, format)
      window.open(exportUrl, "_blank")
    } catch (error) {
      console.error("Failed to export calendar:", error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "syncing":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "syncing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Sync Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Calendar Synchronization
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Dialog open={isAddingCalendar} onOpenChange={setIsAddingCalendar}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Calendar
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add External Calendar</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="calendar-name">Calendar Name</Label>
                      <Input
                        id="calendar-name"
                        value={newCalendar.name}
                        onChange={(e) => setNewCalendar((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="My Airbnb Calendar"
                      />
                    </div>

                    <div>
                      <Label htmlFor="calendar-type">Calendar Type</Label>
                      <Select
                        value={newCalendar.type}
                        onValueChange={(value) => setNewCalendar((prev) => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select calendar type" />
                        </SelectTrigger>
                        <SelectContent>
                          {calendarTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <span className="flex items-center">
                                <span className="mr-2">{type.icon}</span>
                                {type.label}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="calendar-url">Calendar URL</Label>
                      <Input
                        id="calendar-url"
                        value={newCalendar.url}
                        onChange={(e) => setNewCalendar((prev) => ({ ...prev, url: e.target.value }))}
                        placeholder="https://calendar.google.com/calendar/ical/..."
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="auto-sync"
                        checked={newCalendar.autoSync}
                        onCheckedChange={(checked) => setNewCalendar((prev) => ({ ...prev, autoSync: checked }))}
                      />
                      <Label htmlFor="auto-sync">Enable automatic sync (every 4 hours)</Label>
                    </div>

                    <Button
                      onClick={handleAddCalendar}
                      className="w-full"
                      disabled={!newCalendar.name || !newCalendar.type || !newCalendar.url}
                    >
                      Add Calendar
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          {lastSync && <p className="text-sm text-gray-600">Last sync: {lastSync.toLocaleString()}</p>}
        </CardHeader>
        <CardContent>
          {syncedCalendars.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No External Calendars</h3>
              <p className="text-gray-600 mb-4">
                Connect your external calendars to prevent double bookings and keep availability in sync.
              </p>
              <Button onClick={() => setIsAddingCalendar(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Calendar
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {syncedCalendars.map((calendar) => (
                <div key={calendar.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {calendarTypes.find((t) => t.value === calendar.type)?.icon || "📅"}
                      </span>
                      <div>
                        <h4 className="font-semibold">{calendar.name}</h4>
                        <p className="text-sm text-gray-600">
                          {calendarTypes.find((t) => t.value === calendar.type)?.label}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(calendar.status)}>
                        {getStatusIcon(calendar.status)}
                        <span className="ml-1 capitalize">{calendar.status}</span>
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>Last sync: {new Date(calendar.lastSync).toLocaleString()}</span>
                    <span>Events imported: {calendar.eventsCount}</span>
                  </div>

                  {calendar.status === "error" && (
                    <Alert className="mb-3">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {calendar.errorMessage || "Failed to sync calendar. Please check the URL and try again."}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={calendar.autoSync}
                        onCheckedChange={(checked) => {
                          // Handle auto-sync toggle
                        }}
                      />
                      <Label className="text-sm">Auto-sync</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSyncCalendar(calendar.id)}
                        disabled={syncingCalendars.includes(calendar.id)}
                      >
                        {syncingCalendars.includes(calendar.id) ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => window.open(calendar.url, "_blank")}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRemoveCalendar(calendar.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Export Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Export Your Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Share your property's availability with other platforms by exporting your calendar.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => handleExportCalendar("ical")}>
              <Download className="h-4 w-4 mr-2" />
              Export as iCal
            </Button>
            <Button variant="outline" onClick={() => handleExportCalendar("csv")}>
              <Download className="h-4 w-4 mr-2" />
              Export as CSV
            </Button>
            <Button variant="outline" onClick={() => handleExportCalendar("json")}>
              <Download className="h-4 w-4 mr-2" />
              Export as JSON
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sync Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Sync Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Auto-sync frequency</Label>
              <p className="text-sm text-gray-600">How often to check for calendar updates</p>
            </div>
            <Select defaultValue="4h">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Every hour</SelectItem>
                <SelectItem value="4h">Every 4 hours</SelectItem>
                <SelectItem value="12h">Every 12 hours</SelectItem>
                <SelectItem value="24h">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Conflict resolution</Label>
              <p className="text-sm text-gray-600">What to do when calendars have conflicting bookings</p>
            </div>
            <Select defaultValue="block">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="block">Block dates</SelectItem>
                <SelectItem value="notify">Notify only</SelectItem>
                <SelectItem value="ignore">Ignore conflicts</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Buffer days</Label>
              <p className="text-sm text-gray-600">Block additional days around bookings</p>
            </div>
            <Select defaultValue="0">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">None</SelectItem>
                <SelectItem value="1">1 day</SelectItem>
                <SelectItem value="2">2 days</SelectItem>
                <SelectItem value="3">3 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
