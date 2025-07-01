import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyDetails } from "@/components/property-details"
import { getProperty } from "@/app/actions/booking"

interface PropertyPageProps {
  params: Promise<{ id: string }>
}

async function PropertyContent({ params }: PropertyPageProps) {
  const { id } = await params
  const property = await getProperty(id)

  if (!property) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PropertyDetails property={property} />
      <Footer />
    </div>
  )
}

export default function PropertyPage({ params }: PropertyPageProps) {
  return (
    <Suspense fallback={<div>Loading property...</div>}>
      <PropertyContent params={params} />
    </Suspense>
  )
}
