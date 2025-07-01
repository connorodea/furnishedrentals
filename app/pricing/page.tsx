import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Star } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for getting started",
      features: ["List up to 1 property", "Basic calendar management", "Standard support", "5% booking fee"],
      limitations: ["Limited customization", "No priority support", "Basic analytics"],
      popular: false,
      cta: "Get Started",
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "Best for growing property portfolios",
      features: [
        "List up to 5 properties",
        "Advanced calendar sync",
        "Priority support",
        "3% booking fee",
        "Custom pricing rules",
        "Advanced analytics",
        "Multi-platform sync",
      ],
      limitations: [],
      popular: true,
      cta: "Start Free Trial",
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For large property management companies",
      features: [
        "Unlimited properties",
        "White-label solution",
        "Dedicated account manager",
        "2% booking fee",
        "Custom integrations",
        "Advanced reporting",
        "API access",
        "24/7 phone support",
      ],
      limitations: [],
      popular: false,
      cta: "Contact Sales",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose the plan that fits your property portfolio. No hidden fees, no surprises.
            </p>
            <div className="flex justify-center items-center space-x-4 mb-8">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                30-day free trial
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                No setup fees
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Cancel anytime
              </Badge>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative ${plan.popular ? "ring-2 ring-primary shadow-lg scale-105" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">
                        <Star className="h-4 w-4 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-gray-600">{plan.period}</span>}
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">What's included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Limitations:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, limitIndex) => (
                            <li key={limitIndex} className="flex items-center">
                              <X className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button
                      className={`w-full ${plan.popular ? "" : "bg-transparent"}`}
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href={plan.name === "Enterprise" ? "/contact" : "/signup"}>{plan.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "What's included in the booking fee?",
                  answer:
                    "The booking fee covers payment processing, customer support, insurance protection, and platform maintenance. It's only charged when you receive a booking.",
                },
                {
                  question: "Can I change plans anytime?",
                  answer:
                    "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments.",
                },
                {
                  question: "Is there a setup fee?",
                  answer:
                    "No setup fees, ever. You only pay the monthly subscription fee and booking fees when you receive reservations.",
                },
                {
                  question: "What happens if I cancel?",
                  answer:
                    "You can cancel anytime. Your account will remain active until the end of your current billing period, and you'll retain access to all your data.",
                },
                {
                  question: "Do you offer discounts for annual billing?",
                  answer:
                    "Yes! Save 20% when you pay annually. Contact our sales team for enterprise volume discounts.",
                },
              ].map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of property owners who trust FurnishedStay to manage their rentals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup">Start Free Trial</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
