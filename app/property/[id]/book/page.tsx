import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingForm } from "@/components/booking-form"
import { PropertySummary } from "@/components/property-summary"
import { getProperty } from "@/app/actions/booking"

interface BookingPageProps {
  params: Promise<{ id: string }>
}

async function BookingContent({ params }: BookingPageProps) {
  const { id } = await params
  const property = await getProperty(id)

  if (!property) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
            <p className="text-gray-600">You're just a few steps away from your perfect stay</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BookingForm property={property} />
            </div>
            <div className="lg:col-span-1">
              <PropertySummary property={property} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function BookingPage({ params }: BookingPageProps) {
  return (
    <Suspense fallback={<div>Loading booking page...</div>}>
      <BookingContent params={params} />
    </Suspense>
  )
}
