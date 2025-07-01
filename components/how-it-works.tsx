import { Card, CardContent } from "@/components/ui/card"
import { Search, Calendar, Key, Star } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Search & Filter",
      description: "Browse thousands of verified furnished properties using our advanced search filters.",
    },
    {
      icon: Calendar,
      title: "Book Instantly",
      description: "Select your dates and book instantly or request approval from property owners.",
    },
    {
      icon: Key,
      title: "Move In",
      description: "Complete your booking, receive check-in instructions, and enjoy your new temporary home.",
    },
    {
      icon: Star,
      title: "Leave a Review",
      description: "Share your experience to help future guests and maintain our quality standards.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Finding and booking your perfect furnished rental is simple with our streamlined process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-sm font-medium text-primary mb-2">Step {index + 1}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
