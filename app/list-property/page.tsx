import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyListingForm } from "@/components/property-listing-form"

export default function ListPropertyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container px-4 mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">List Your Property</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of property owners earning passive income through furnished rentals
            </p>
          </div>
          <PropertyListingForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
