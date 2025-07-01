import { BookingConfirmation } from "@/components/booking-confirmation"
import { Header } from "@/components/header"
import { getBooking } from "@/app/actions/booking"
import { notFound } from "next/navigation"

export default async function BookingConfirmationPage({ params }: { params: { id: string } }) {
  try {
    const booking = await getBooking(params.id)

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container px-4 mx-auto py-8">
          <BookingConfirmation booking={booking} />
        </main>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
