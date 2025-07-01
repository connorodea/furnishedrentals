import { Header } from "@/components/header"
import { BookingsDashboard } from "@/components/bookings-dashboard"

export default function BookingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container px-4 mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">View and manage all your reservations</p>
        </div>
        <BookingsDashboard />
      </main>
    </div>
  )
}
