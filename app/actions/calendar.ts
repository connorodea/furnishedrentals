"use server"

// Mock calendar data
const mockCalendarData = {
  stats: {
    availableDays: 245,
    bookedDays: 89,
    blockedDays: 31,
    occupancyRate: 73,
  },
  availability: {
    "2024-01-15": { status: "booked", price: 180, guest: "John Doe" },
    "2024-01-16": { status: "booked", price: 180, guest: "John Doe" },
    "2024-01-20": { status: "blocked", reason: "maintenance", note: "HVAC repair" },
    "2024-01-25": { status: "available", price: 200 },
    "2024-02-01": { status: "pending", price: 180, guest: "Jane Smith" },
    "2024-02-14": { status: "available", price: 250 }, // Valentine's Day premium
    "2024-02-15": { status: "available", price: 250 },
  },
  syncedCalendars: [
    {
      id: "cal_1",
      name: "Airbnb Calendar",
      type: "airbnb",
      url: "https://calendar.airbnb.com/calendar/ical/...",
      status: "active",
      autoSync: true,
      lastSync: "2024-01-10T10:30:00Z",
      eventsCount: 45,
      errorMessage: null,
    },
    {
      id: "cal_2",
      name: "VRBO Calendar",
      type: "vrbo",
      url: "https://www.vrbo.com/calendar/ical/...",
      status: "error",
      autoSync: true,
      lastSync: "2024-01-09T15:20:00Z",
      eventsCount: 0,
      errorMessage: "Invalid calendar URL or access denied",
    },
  ],
  pricing: {
    basePrice: 180,
    averagePrice: 195,
    maxPrice: 300,
    minPrice: 150,
    prices: {
      "2024-02-14": 250, // Valentine's Day
      "2024-02-15": 250,
      "2024-03-17": 220, // St. Patrick's Day
      "2024-07-04": 300, // July 4th
      "2024-12-25": 200, // Christmas
      "2024-12-31": 350, // New Year's Eve
    },
  },
  bookings: [
    {
      id: "booking_1",
      confirmationNumber: "FS12345ABC",
      guest: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "+1-555-0123",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      checkIn: "2024-01-15",
      checkOut: "2024-01-18",
      guests: 2,
      total: 540,
      status: "confirmed",
      createdAt: "2024-01-01T10:00:00Z",
      specialRequests: "Late check-in requested",
    },
    {
      id: "booking_2",
      confirmationNumber: "FS67890DEF",
      guest: {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        phone: "+1-555-0456",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      checkIn: "2024-02-01",
      checkOut: "2024-02-05",
      guests: 1,
      total: 720,
      status: "pending",
      createdAt: "2024-01-20T14:30:00Z",
      specialRequests: null,
    },
  ],
}

export async function getPropertyCalendar(propertyId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return mockCalendarData
}

export async function updateAvailability(propertyId: string, updates: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Update availability data
  updates.dates.forEach((date: string) => {
    mockCalendarData.availability[date] = {
      status: updates.status,
      reason: updates.reason,
      note: updates.note,
      price: mockCalendarData.pricing.basePrice,
    }
  })

  // Recalculate stats
  const totalDays = Object.keys(mockCalendarData.availability).length
  const bookedDays = Object.values(mockCalendarData.availability).filter((day) => day.status === "booked").length
  const blockedDays = Object.values(mockCalendarData.availability).filter((day) => day.status === "blocked").length
  const availableDays = totalDays - bookedDays - blockedDays

  mockCalendarData.stats = {
    availableDays,
    bookedDays,
    blockedDays,
    occupancyRate: Math.round((bookedDays / totalDays) * 100),
  }

  return mockCalendarData
}

export async function updatePricing(propertyId: string, updates: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Update pricing data
  updates.dates.forEach((date: string) => {
    mockCalendarData.pricing.prices[date] = updates.price
    if (mockCalendarData.availability[date]) {
      mockCalendarData.availability[date].price = updates.price
    }
  })

  // Recalculate pricing stats
  const prices = Object.values(mockCalendarData.pricing.prices)
  mockCalendarData.pricing.averagePrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
  mockCalendarData.pricing.maxPrice = Math.max(...prices)
  mockCalendarData.pricing.minPrice = Math.min(...prices)

  return mockCalendarData
}

export async function syncCalendar(propertyId: string, calendarId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const calendar = mockCalendarData.syncedCalendars.find((cal) => cal.id === calendarId)
  if (!calendar) {
    throw new Error("Calendar not found")
  }

  // Simulate sync process
  calendar.status = "syncing"

  // Simulate random success/failure
  const success = Math.random() > 0.2 // 80% success rate

  if (success) {
    calendar.status = "active"
    calendar.lastSync = new Date().toISOString()
    calendar.eventsCount = Math.floor(Math.random() * 50) + 10
    calendar.errorMessage = null
  } else {
    calendar.status = "error"
    calendar.errorMessage = "Sync failed. Please check calendar URL and permissions."
  }

  return mockCalendarData
}

export async function addCalendarSync(propertyId: string, calendarData: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newCalendar = {
    id: `cal_${Date.now()}`,
    name: calendarData.name,
    type: calendarData.type,
    url: calendarData.url,
    status: "active",
    autoSync: calendarData.autoSync,
    lastSync: new Date().toISOString(),
    eventsCount: Math.floor(Math.random() * 30) + 5,
    errorMessage: null,
  }

  mockCalendarData.syncedCalendars.push(newCalendar)

  return mockCalendarData
}

export async function removeCalendarSync(propertyId: string, calendarId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const index = mockCalendarData.syncedCalendars.findIndex((cal) => cal.id === calendarId)
  if (index !== -1) {
    mockCalendarData.syncedCalendars.splice(index, 1)
  }

  return mockCalendarData
}

export async function exportCalendar(propertyId: string, format: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would generate and return a download URL
  const exportUrl = `https://api.furnishedstay.com/calendar/export/${propertyId}.${format}`

  return exportUrl
}

export async function checkAvailability(propertyId: string, searchData: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const { checkIn, checkOut, guests } = searchData
  const startDate = new Date(checkIn)
  const endDate = new Date(checkOut)

  // Check each date in the range
  const unavailableDates = []
  const currentDate = new Date(startDate)

  while (currentDate < endDate) {
    const dateStr = currentDate.toISOString().split("T")[0]
    const dayData = mockCalendarData.availability[dateStr]

    if (dayData && (dayData.status === "booked" || dayData.status === "blocked")) {
      unavailableDates.push(dateStr)
    }

    currentDate.setDate(currentDate.getDate() + 1)
  }

  const isAvailable = unavailableDates.length === 0

  if (isAvailable) {
    // Calculate pricing
    const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const basePrice = mockCalendarData.pricing.basePrice
    const totalPrice = nights * basePrice

    return {
      available: true,
      status: "available",
      totalPrice,
      nights,
      pricePerNight: basePrice,
      specialOffers: nights >= 7 ? "7+ night discount applied" : null,
    }
  } else {
    // Suggest alternative dates
    const alternativeDates = [
      {
        checkIn: "2024-02-20",
        checkOut: "2024-02-25",
        price: 900,
      },
      {
        checkIn: "2024-03-01",
        checkOut: "2024-03-06",
        price: 950,
      },
    ]

    return {
      available: false,
      status: "unavailable",
      reason: `Property is not available for ${unavailableDates.length} of the selected dates`,
      unavailableDates,
      alternativeDates,
    }
  }
}
