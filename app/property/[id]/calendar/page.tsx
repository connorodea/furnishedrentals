import { CalendarManager } from "@/components/calendar-manager"
import { Header } from "@/components/header"
import { getPropertyCalendar } from "@/app/actions/calendar"
import { notFound } from "next/navigation"

export default async function PropertyCalendarPage({ params }: { params: { id: string } }) {
  try {
    const calendarData = await getPropertyCalendar(params.id)

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container px-4 mx-auto py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendar Management</h1>
              <p className="text-gray-600">Manage availability and sync with external calendars</p>
            </div>
            <CalendarManager propertyId={params.id} initialData={calendarData} />
          </div>
        </main>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
