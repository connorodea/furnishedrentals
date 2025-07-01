"use server"

import { redirect } from "next/navigation"

export interface Property {
  id: number
  title: string
  location: string
  price: number
  beds: number
  baths: number
  maxGuests: number
  image: string
  images: string[]
  amenities: string[]
  type: string
  rating: number
  reviews: number
  description: string
  host: {
    name: string
    avatar: string
    verified: boolean
    responseTime: string
    responseRate: string
  }
  policies: {
    checkIn: string
    checkOut: string
    cancellation: string
    smoking: boolean
    pets: boolean
    parties: boolean
  }
  instantBook?: boolean
}

// Mock property data
const mockProperties: Property[] = [
  {
    id: 1,
    title: "Modern Downtown Loft",
    location: "Chicago, IL",
    price: 2800,
    beds: 2,
    baths: 2,
    maxGuests: 4,
    image: "/placeholder.svg?height=400&width=600&text=Modern+Downtown+Loft",
    images: [
      "/placeholder.svg?height=400&width=600&text=Modern+Downtown+Loft",
      "/placeholder.svg?height=400&width=600&text=Living+Room",
      "/placeholder.svg?height=400&width=600&text=Bedroom",
      "/placeholder.svg?height=400&width=600&text=Kitchen",
      "/placeholder.svg?height=400&width=600&text=Bathroom",
    ],
    amenities: ["WiFi", "Parking", "Gym", "Pool", "Kitchen", "Laundry", "Air Conditioning", "Heating"],
    type: "Loft",
    rating: 4.9,
    reviews: 127,
    description:
      "Experience urban living at its finest in this stunning modern loft located in the heart of downtown Chicago. This beautifully designed space features floor-to-ceiling windows, exposed brick walls, and contemporary furnishings throughout.",
    host: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=100&width=100&text=Sarah",
      verified: true,
      responseTime: "Within an hour",
      responseRate: "100%",
    },
    policies: {
      checkIn: "3:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 7 days before check-in",
      smoking: false,
      pets: false,
      parties: false,
    },
    instantBook: true,
  },
  {
    id: 2,
    title: "Cozy Studio Apartment",
    location: "New York, NY",
    price: 3200,
    beds: 1,
    baths: 1,
    maxGuests: 2,
    image: "/placeholder.svg?height=400&width=600&text=Cozy+Studio+Apartment",
    images: [
      "/placeholder.svg?height=400&width=600&text=Cozy+Studio+Apartment",
      "/placeholder.svg?height=400&width=600&text=Living+Area",
      "/placeholder.svg?height=400&width=600&text=Kitchen",
      "/placeholder.svg?height=400&width=600&text=Bathroom",
    ],
    amenities: ["WiFi", "Gym", "Laundry", "Kitchen", "Air Conditioning"],
    type: "Studio",
    rating: 4.7,
    reviews: 89,
    description:
      "A perfectly designed studio apartment in the heart of Manhattan. This cozy space maximizes every square foot with smart storage solutions and modern amenities.",
    host: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=100&width=100&text=Michael",
      verified: true,
      responseTime: "Within 2 hours",
      responseRate: "98%",
    },
    policies: {
      checkIn: "4:00 PM",
      checkOut: "10:00 AM",
      cancellation: "Moderate cancellation policy",
      smoking: false,
      pets: false,
      parties: false,
    },
    instantBook: false,
  },
  {
    id: 3,
    title: "Luxury Penthouse Suite",
    location: "Miami, FL",
    price: 5500,
    beds: 3,
    baths: 3,
    maxGuests: 6,
    image: "/placeholder.svg?height=400&width=600&text=Luxury+Penthouse+Suite",
    images: [
      "/placeholder.svg?height=400&width=600&text=Luxury+Penthouse+Suite",
      "/placeholder.svg?height=400&width=600&text=Living+Room",
      "/placeholder.svg?height=400&width=600&text=Master+Bedroom",
      "/placeholder.svg?height=400&width=600&text=Kitchen",
      "/placeholder.svg?height=400&width=600&text=Terrace",
      "/placeholder.svg?height=400&width=600&text=Pool",
    ],
    amenities: ["WiFi", "Parking", "Pool", "Gym", "Concierge", "Kitchen", "Laundry", "Balcony", "Ocean View"],
    type: "Penthouse",
    rating: 4.8,
    reviews: 203,
    description:
      "Indulge in luxury at this stunning penthouse suite with breathtaking ocean views. Features include a private terrace, premium furnishings, and access to world-class amenities.",
    host: {
      name: "Isabella Rodriguez",
      avatar: "/placeholder.svg?height=100&width=100&text=Isabella",
      verified: true,
      responseTime: "Within 30 minutes",
      responseRate: "100%",
    },
    policies: {
      checkIn: "4:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Strict cancellation policy",
      smoking: false,
      pets: true,
      parties: false,
    },
    instantBook: true,
  },
  {
    id: 4,
    title: "Charming Brownstone",
    location: "Boston, MA",
    price: 4100,
    beds: 3,
    baths: 2,
    maxGuests: 6,
    image: "/placeholder.svg?height=400&width=600&text=Charming+Brownstone",
    images: [
      "/placeholder.svg?height=400&width=600&text=Charming+Brownstone",
      "/placeholder.svg?height=400&width=600&text=Living+Room",
      "/placeholder.svg?height=400&width=600&text=Dining+Room",
      "/placeholder.svg?height=400&width=600&text=Kitchen",
      "/placeholder.svg?height=400&width=600&text=Bedroom",
    ],
    amenities: ["WiFi", "Parking", "Kitchen", "Laundry", "Fireplace", "Garden"],
    type: "Townhouse",
    rating: 4.6,
    reviews: 156,
    description:
      "Step into history with this beautifully restored Victorian brownstone in Boston's historic Back Bay. Original architectural details meet modern comfort in this elegant home.",
    host: {
      name: "David Thompson",
      avatar: "/placeholder.svg?height=100&width=100&text=David",
      verified: true,
      responseTime: "Within 4 hours",
      responseRate: "95%",
    },
    policies: {
      checkIn: "3:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Moderate cancellation policy",
      smoking: false,
      pets: false,
      parties: false,
    },
    instantBook: false,
  },
  {
    id: 5,
    title: "Beachfront Condo",
    location: "San Diego, CA",
    price: 3900,
    beds: 2,
    baths: 2,
    maxGuests: 4,
    image: "/placeholder.svg?height=400&width=600&text=Beachfront+Condo",
    images: [
      "/placeholder.svg?height=400&width=600&text=Beachfront+Condo",
      "/placeholder.svg?height=400&width=600&text=Ocean+View",
      "/placeholder.svg?height=400&width=600&text=Living+Room",
      "/placeholder.svg?height=400&width=600&text=Bedroom",
      "/placeholder.svg?height=400&width=600&text=Balcony",
    ],
    amenities: ["WiFi", "Pool", "Beach Access", "Parking", "Kitchen", "Balcony", "Ocean View"],
    type: "Condo",
    rating: 4.9,
    reviews: 178,
    description:
      "Wake up to stunning ocean views in this beautiful beachfront condo. Just steps from the sand with all the amenities you need for the perfect beach getaway.",
    host: {
      name: "Amanda Wilson",
      avatar: "/placeholder.svg?height=100&width=100&text=Amanda",
      verified: true,
      responseTime: "Within 1 hour",
      responseRate: "100%",
    },
    policies: {
      checkIn: "4:00 PM",
      checkOut: "10:00 AM",
      cancellation: "Free cancellation up to 14 days before check-in",
      smoking: false,
      pets: true,
      parties: false,
    },
    instantBook: true,
  },
  {
    id: 6,
    title: "Urban Loft Space",
    location: "Seattle, WA",
    price: 2600,
    beds: 1,
    baths: 1,
    maxGuests: 3,
    image: "/placeholder.svg?height=400&width=600&text=Urban+Loft+Space",
    images: [
      "/placeholder.svg?height=400&width=600&text=Urban+Loft+Space",
      "/placeholder.svg?height=400&width=600&text=Living+Area",
      "/placeholder.svg?height=400&width=600&text=Workspace",
      "/placeholder.svg?height=400&width=600&text=Kitchen",
    ],
    amenities: ["WiFi", "Gym", "Workspace", "Kitchen", "Laundry"],
    type: "Loft",
    rating: 4.5,
    reviews: 92,
    description:
      "A modern urban loft perfect for digital nomads and business travelers. Features a dedicated workspace area and all the amenities needed for extended stays.",
    host: {
      name: "James Park",
      avatar: "/placeholder.svg?height=100&width=100&text=James",
      verified: true,
      responseTime: "Within 3 hours",
      responseRate: "97%",
    },
    policies: {
      checkIn: "3:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Moderate cancellation policy",
      smoking: false,
      pets: false,
      parties: false,
    },
    instantBook: false,
  },
]

export async function getProperty(id: string): Promise<Property | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const property = mockProperties.find((p) => p.id === Number.parseInt(id))
  return property || null
}

export async function getAllProperties(): Promise<Property[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockProperties
}

export async function searchProperties(filters: {
  location?: string
  checkIn?: string
  checkOut?: string
  guests?: number
  minPrice?: number
  maxPrice?: number
  propertyTypes?: string[]
  amenities?: string[]
  bedrooms?: string
}): Promise<Property[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  let filtered = [...mockProperties]

  if (filters.location) {
    filtered = filtered.filter((property) => property.location.toLowerCase().includes(filters.location!.toLowerCase()))
  }

  if (filters.guests) {
    filtered = filtered.filter((property) => property.maxGuests >= filters.guests!)
  }

  if (filters.minPrice) {
    filtered = filtered.filter((property) => property.price >= filters.minPrice!)
  }

  if (filters.maxPrice) {
    filtered = filtered.filter((property) => property.price <= filters.maxPrice!)
  }

  if (filters.propertyTypes && filters.propertyTypes.length > 0) {
    filtered = filtered.filter((property) => filters.propertyTypes!.includes(property.type))
  }

  if (filters.amenities && filters.amenities.length > 0) {
    filtered = filtered.filter((property) =>
      filters.amenities!.every((amenity) => property.amenities.includes(amenity)),
    )
  }

  if (filters.bedrooms && filters.bedrooms !== "any") {
    if (filters.bedrooms === "studio") {
      filtered = filtered.filter((property) => property.beds === 0 || property.type === "Studio")
    } else if (filters.bedrooms === "4+") {
      filtered = filtered.filter((property) => property.beds >= 4)
    } else {
      filtered = filtered.filter((property) => property.beds === Number.parseInt(filters.bedrooms!))
    }
  }

  return filtered
}

export interface BookingData {
  propertyId: number
  checkIn: string
  checkOut: string
  guests: number
  firstName: string
  lastName: string
  email: string
  phone: string
  specialRequests?: string
  paymentMethod: string
  totalAmount: number
}

export async function createBooking(data: BookingData) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Generate a random booking ID
  const bookingId = Math.random().toString(36).substr(2, 9).toUpperCase()

  // In a real app, you would save to database and send confirmation emails
  console.log("Booking created:", { ...data, bookingId })

  // Redirect to confirmation page
  redirect(`/booking/confirmation/${bookingId}`)
}

export interface Booking {
  id: string
  propertyId: number
  property: Property
  checkIn: string
  checkOut: string
  guests: number
  firstName: string
  lastName: string
  email: string
  phone: string
  specialRequests?: string
  paymentMethod: string
  subtotal: number
  cleaningFee: number
  serviceFee: number
  taxes: number
  total: number
  status: "confirmed" | "pending" | "cancelled"
  createdAt: string
}

export async function getBooking(id: string): Promise<Booking | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Mock booking data - in a real app, this would come from a database
  const mockBooking: Booking = {
    id,
    propertyId: 1,
    property: mockProperties[0], // Use the first property as default
    checkIn: "2024-02-15",
    checkOut: "2024-03-15",
    guests: 2,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    specialRequests: "Late check-in requested",
    paymentMethod: "Credit Card",
    subtotal: 8400,
    cleaningFee: 150,
    serviceFee: 1008,
    taxes: 764.64,
    total: 10322.64,
    status: "confirmed",
    createdAt: "2024-01-15T10:30:00Z",
  }

  return mockBooking
}
