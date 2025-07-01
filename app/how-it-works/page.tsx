import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HowItWorks } from "@/components/how-it-works"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Users, Shield, DollarSign } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">How FurnishedStay Works</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're looking for a furnished rental or want to list your property, our platform makes it simple
              and secure.
            </p>
          </div>
        </section>

        <HowItWorks />

        {/* For Renters Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">For Renters</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find your perfect furnished rental in just a few simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Search Properties",
                  description: "Browse thousands of verified furnished rentals using our advanced filters",
                },
                {
                  step: "2",
                  title: "Contact Owners",
                  description: "Message property owners directly and schedule virtual tours",
                },
                {
                  step: "3",
                  title: "Book Securely",
                  description: "Complete your booking with our secure payment system",
                },
                {
                  step: "4",
                  title: "Move In",
                  description: "Get check-in instructions and enjoy your furnished rental",
                },
              ].map((item, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-8 pb-6">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* For Property Owners Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">For Property Owners</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">List your property and start earning passive income</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Quality Tenants</h3>
                  <p className="text-gray-600">We screen all tenants to ensure they're professional and reliable</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                  <p className="text-gray-600">All payments are processed securely with deposit protection</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Higher Returns</h3>
                  <p className="text-gray-600">Furnished rentals typically earn 20-30% more than unfurnished</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button size="lg" asChild>
                <Link href="/list-property">Start Listing Your Property</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FurnishedStay?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                "Verified properties and owners",
                "24/7 customer support",
                "Secure payment processing",
                "Professional tenant screening",
                "Flexible lease terms",
                "No hidden fees",
                "Insurance protection",
                "Mobile-friendly platform",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
