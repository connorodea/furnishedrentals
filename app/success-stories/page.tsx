import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, DollarSign, TrendingUp, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SuccessStoriesPage() {
  const stories = [
    {
      name: "Sarah Martinez",
      location: "Austin, TX",
      propertyType: "2BR Condo",
      monthlyRevenue: "$4,200",
      occupancyRate: "92%",
      timeOnPlatform: "18 months",
      image: "/placeholder.svg?height=300&width=400",
      quote:
        "FurnishedStay has completely transformed my rental income. I was struggling to find reliable tenants for my condo, but now I have consistent bookings from traveling professionals.",
      results: [
        "300% increase in monthly revenue",
        "Reduced vacancy from 40% to 8%",
        "Zero property damage incidents",
        "5-star average rating",
      ],
    },
    {
      name: "Michael Chen",
      location: "Seattle, WA",
      propertyType: "3BR House",
      monthlyRevenue: "$6,800",
      occupancyRate: "88%",
      timeOnPlatform: "2 years",
      image: "/placeholder.svg?height=300&width=400",
      quote:
        "As a software engineer, I appreciate the platform's technology and automation. The calendar sync and pricing tools have saved me hours of work each week.",
      results: [
        "Automated 80% of property management",
        "Increased revenue by 250%",
        "Expanded to 3 properties",
        "Passive income of $15K/month",
      ],
    },
    {
      name: "Lisa Rodriguez",
      location: "Miami, FL",
      propertyType: "1BR Apartment",
      monthlyRevenue: "$3,500",
      occupancyRate: "95%",
      timeOnPlatform: "14 months",
      image: "/placeholder.svg?height=300&width=400",
      quote:
        "I was skeptical about furnished rentals, but the support team guided me through everything. Now I'm earning more than I ever did with traditional rentals.",
      results: [
        "200% ROI improvement",
        "Premium pricing achieved",
        "Excellent guest relationships",
        "Stress-free management",
      ],
    },
  ]

  const stats = [
    {
      icon: DollarSign,
      value: "$2.3M+",
      label: "Total Owner Earnings",
      description: "Paid out to property owners in 2023",
    },
    {
      icon: TrendingUp,
      value: "240%",
      label: "Average Revenue Increase",
      description: "Compared to traditional rentals",
    },
    {
      icon: Users,
      value: "15,000+",
      label: "Successful Owners",
      description: "Earning passive income on our platform",
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Owner Satisfaction",
      description: "Average rating from property owners",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Success Stories</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Real property owners sharing their journey to financial success with FurnishedStay
            </p>
            <Button size="lg" asChild>
              <Link href="/list-property">Start Your Success Story</Link>
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-lg font-semibold mb-2">{stat.label}</div>
                    <div className="text-sm text-gray-600">{stat.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Owner Success Stories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover how property owners are achieving financial freedom through furnished rentals
              </p>
            </div>

            <div className="space-y-12">
              {stories.map((story, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                    >
                      <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                        <Image
                          src={story.image || "/placeholder.svg"}
                          alt={`${story.name}'s property`}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-green-100 text-green-800">Success Story</Badge>
                        </div>
                      </div>
                      <div className={`p-8 lg:p-12 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                        <div className="flex items-center mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{story.name}</h3>
                            <p className="text-gray-600">{story.location}</p>
                          </div>
                        </div>

                        <blockquote className="text-lg text-gray-700 italic mb-6">"{story.quote}"</blockquote>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-blue-900">{story.monthlyRevenue}</div>
                            <div className="text-sm text-blue-700">Monthly Revenue</div>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-green-900">{story.occupancyRate}</div>
                            <div className="text-sm text-green-700">Occupancy Rate</div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-6">
                          <h4 className="font-semibold text-gray-900">Key Results:</h4>
                          {story.results.map((result, resultIndex) => (
                            <div key={resultIndex} className="flex items-center text-sm text-gray-600">
                              <Star className="h-4 w-4 text-yellow-500 mr-2" />
                              {result}
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Property:</span> {story.propertyType}
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">On platform:</span> {story.timeOnPlatform}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Owners Are Saying</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "David Kim",
                  location: "Portland, OR",
                  quote: "The platform's automation features have made property management effortless.",
                  revenue: "+180% revenue",
                },
                {
                  name: "Amanda Foster",
                  location: "Nashville, TN",
                  quote: "Best decision I made was switching to furnished rentals with FurnishedStay.",
                  revenue: "+220% revenue",
                },
                {
                  name: "Robert Johnson",
                  location: "Denver, CO",
                  quote: "The quality of guests and support team exceeded all my expectations.",
                  revenue: "+195% revenue",
                },
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 mb-4">"{testimonial.quote}"</blockquote>
                    <div className="border-t pt-4">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.location}</div>
                      <div className="text-sm font-medium text-green-600 mt-1">{testimonial.revenue}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of property owners earning passive income with furnished rentals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Link href="/list-property">List Your Property</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                <Link href="/owner-resources">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
