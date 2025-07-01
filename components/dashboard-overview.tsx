import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Home, DollarSign, MessageCircle, Plus } from "lucide-react"
import Link from "next/link"

export function DashboardOverview() {
  const mockBookings = [
    {
      id: "1",
      property: "Modern Downtown Loft",
      location: "Chicago, IL",
      checkIn: "2024-02-01",
      checkOut: "2024-03-01",
      status: "confirmed",
      total: 3548,
    },
    {
      id: "2",
      property: "Cozy Suburban House",
      location: "Austin, TX",
      checkIn: "2024-03-15",
      checkOut: "2024-04-15",
      status: "pending",
      total: 3200,
    },
  ]

  const mockProperties = [
    {
      id: "1",
      title: "Downtown Apartment",
      location: "Chicago, IL",
      status: "active",
      bookings: 3,
      revenue: 8400,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Bookings</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Properties Listed</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <Home className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">$8,400</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Messages</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <MessageCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Bookings</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/search">
                <Plus className="h-4 w-4 mr-2" />
                New Booking
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">{booking.property}</h4>
                  <p className="text-sm text-gray-600">{booking.location}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <Badge
                    className={
                      booking.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {booking.status}
                  </Badge>
                  <p className="text-sm font-semibold mt-1">${booking.total}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* My Properties */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>My Properties</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/list-property">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProperties.map((property) => (
              <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">{property.title}</h4>
                  <p className="text-sm text-gray-600">{property.location}</p>
                  <p className="text-sm text-gray-600">{property.bookings} bookings this year</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800 mb-2">{property.status}</Badge>
                  <p className="text-sm font-semibold">${property.revenue} revenue</p>
                  <Button size="sm" variant="outline" className="mt-2 bg-transparent" asChild>
                    <Link href={`/property/${property.id}/calendar`}>Manage Calendar</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
