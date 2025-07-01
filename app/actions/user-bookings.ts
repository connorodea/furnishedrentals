"use server"

// Mock user bookings data
const mockUserBookings = [
  {
    id: "BK001",
    propertyId: 1,
    propertyTitle: "Modern Downtown Loft",
    propertyLocation: "Chicago, IL",
    propertyImage: "/placeholder.svg?height=400&width=600&text=Modern+Downtown+Loft",
    checkIn: "2024-03-15",
    checkOut: "2024-03-22",
    guests: 2,
    status: "upcoming" as const,
    total: 5600,
    confirmationNumber: "MDL2024001",
    hostName: "Sarah Johnson",
    hostAvatar: "/placeholder.svg?height=100&width=100&text=Sarah",
    createdAt: "2024-02-01",
    canCancel: true,
    canModify: true,
    needsReview: false,
  },
  {
    id: "BK002",
    propertyId: 2,
    propertyTitle: "Cozy Studio Apartment",
    propertyLocation: "New York, NY",
    propertyImage: "/placeholder.svg?height=400&width=600&text=Cozy+Studio+Apartment",
    checkIn: "2024-02-01",
    checkOut: "2024-02-05",
    guests: 1,
    status: "current" as const,
    total: 1280,
    confirmationNumber: "CSA2024002",
    hostName: "Michael Chen",
    hostAvatar: "/placeholder.svg?height=100&width=100&text=Michael",
    createdAt: "2024-01-15",
    canCancel: false,
    canModify: false,
    needsReview: false,
  },
  {
    id: "BK003",
    propertyId: 3,
    propertyTitle: "Luxury Penthouse Suite",
    propertyLocation: "Miami, FL",
    propertyImage: "/placeholder.svg?height=400&width=600&text=Luxury+Penthouse+Suite",
    checkIn: "2024-01-10",
    checkOut: "2024-01-17",
    guests: 4,
    status: "completed" as const,
    total: 11550,
    confirmationNumber: "LPS2024003",
    hostName: "Isabella Rodriguez",
    hostAvatar: "/placeholder.svg?height=100&width=100&text=Isabella",
    createdAt: "2023-12-20",
    canCancel: false,
    canModify: false,
    needsReview: true,
  },
  {
    id: "BK004",
    propertyId: 4,
    propertyTitle: "Charming Brownstone",
    propertyLocation: "Boston, MA",
    propertyImage: "/placeholder.svg?height=400&width=600&text=Charming+Brownstone",
    checkIn: "2023-12-01",
    checkOut: "2023-12-08",
    guests: 3,
    status: "cancelled" as const,
    total: 2870,
    confirmationNumber: "CB2023004",
    hostName: "David Thompson",
    hostAvatar: "/placeholder.svg?height=100&width=100&text=David",
    createdAt: "2023-11-15",
    canCancel: false,
    canModify: false,
    needsReview: false,
  },
  {
    id: "BK005",
    propertyId: 5,
    propertyTitle: "Beachfront Condo",
    propertyLocation: "San Diego, CA",
    propertyImage: "/placeholder.svg?height=400&width=600&text=Beachfront+Condo",
    checkIn: "2024-04-01",
    checkOut: "2024-04-08",
    guests: 2,
    status: "upcoming" as const,
    total: 7800,
    confirmationNumber: "BC2024005",
    hostName: "Amanda Wilson",
    hostAvatar: "/placeholder.svg?height=100&width=100&text=Amanda",
    createdAt: "2024-02-10",
    canCancel: true,
    canModify: true,
    needsReview: false,
  },
]

export async function getUserBookings() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return mockUserBookings
}

export async function cancelBooking(bookingId: string, reason?: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log(`Booking ${bookingId} cancelled. Reason: ${reason || "No reason provided"}`)

  // In a real app, this would update the database and send notifications
  return { success: true, message: "Booking cancelled successfully" }
}

export async function submitReview(bookingId: string, rating: number, review: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log(`Review submitted for booking ${bookingId}: ${rating} stars - ${review}`)

  // In a real app, this would save the review to the database
  return { success: true, message: "Review submitted successfully" }
}
