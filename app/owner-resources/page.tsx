import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, DollarSign, Users, TrendingUp, FileText, Video, Download } from "lucide-react"
import Link from "next/link"

export default function OwnerResourcesPage() {
  const resources = [
    {
      title: "Getting Started Guide",
      description: "Complete guide to listing your first property and optimizing for bookings",
      icon: BookOpen,
      type: "Guide",
      link: "#",
    },
    {
      title: "Pricing Strategy Toolkit",
      description: "Tools and tips to maximize your rental income with dynamic pricing",
      icon: DollarSign,
      type: "Toolkit",
      link: "#",
    },
    {
      title: "Guest Communication Templates",
      description: "Pre-written messages for check-in instructions, house rules, and more",
      icon: Users,
      type: "Templates",
      link: "#",
    },
    {
      title: "Market Analysis Reports",
      description: "Monthly reports on rental trends and pricing in your area",
      icon: TrendingUp,
      type: "Reports",
      link: "#",
    },
    {
      title: "Legal Documents & Contracts",
      description: "Sample lease agreements and legal documents for furnished rentals",
      icon: FileText,
      type: "Legal",
      link: "#",
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for property management and optimization",
      icon: Video,
      type: "Videos",
      link: "#",
    },
  ]

  const webinars = [
    {
      title: "Maximizing Your Rental Income",
      date: "February 15, 2024",
      time: "2:00 PM EST",
      description: "Learn advanced pricing strategies and revenue optimization techniques",
    },
    {
      title: "Creating the Perfect Guest Experience",
      date: "February 22, 2024",
      time: "1:00 PM EST",
      description: "Best practices for guest communication and property preparation",
    },
    {
      title: "Tax Strategies for Rental Property Owners",
      date: "March 1, 2024",
      time: "3:00 PM EST",
      description: "Understanding tax implications and maximizing deductions",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Owner Resources</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Everything you need to succeed as a furnished rental property owner
            </p>
            <Button size="lg" asChild>
              <Link href="/list-property">List Your First Property</Link>
            </Button>
          </div>
        </section>

        {/* Resource Library */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Resource Library</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Access our comprehensive collection of guides, tools, and templates
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <resource.icon className="h-8 w-8 text-primary" />
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{resource.type}</span>
                    </div>
                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href={resource.link}>
                        <Download className="h-4 w-4 mr-2" />
                        Access Resource
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Webinars */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Webinars</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Join our live training sessions with industry experts</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {webinars.map((webinar, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{webinar.title}</CardTitle>
                    <div className="text-sm text-gray-600">
                      <p>{webinar.date}</p>
                      <p>{webinar.time}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{webinar.description}</p>
                    <Button className="w-full">Register Now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Success Tips */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Success Tips</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  tip: "Professional Photography",
                  description: "High-quality photos increase bookings by up to 40%",
                },
                {
                  tip: "Competitive Pricing",
                  description: "Research local market rates and adjust pricing seasonally",
                },
                {
                  tip: "Quick Response Time",
                  description: "Respond to inquiries within 1 hour to maximize bookings",
                },
                {
                  tip: "Detailed Descriptions",
                  description: "Include all amenities and nearby attractions in your listing",
                },
                {
                  tip: "Guest Communication",
                  description: "Provide clear check-in instructions and local recommendations",
                },
                {
                  tip: "Regular Updates",
                  description: "Keep your calendar and pricing updated for best results",
                },
              ].map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{item.tip}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
