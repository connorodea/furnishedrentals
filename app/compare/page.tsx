import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyComparison } from "@/components/property-comparison"

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container px-4 mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Properties</h1>
          <p className="text-gray-600">Compare up to 4 properties side by side to find your perfect match</p>
        </div>
        <PropertyComparison />
      </main>
      <Footer />
    </div>
  )
}
