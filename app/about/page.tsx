import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Target, Award, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">About FurnishedStay</h1>
              <p className="text-xl text-gray-600 mb-8">
                We're revolutionizing the furnished rental market by connecting quality properties with professional
                tenants nationwide.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-gray-600 mb-6">
                  At FurnishedStay, we believe that finding quality furnished housing shouldn't be complicated or
                  stressful. Our mission is to create a trusted marketplace where traveling professionals can find their
                  perfect temporary home, and property owners can earn reliable income.
                </p>
                <p className="text-gray-600 mb-8">
                  Founded in 2020, we've helped thousands of healthcare workers, consultants, and relocating families
                  find comfortable, fully-furnished accommodations across the United States.
                </p>
                <Button size="lg" asChild>
                  <Link href="/search">Start Your Search</Link>
                </Button>
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Modern furnished apartment"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These core values guide everything we do at FurnishedStay
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Trust</h3>
                  <p className="text-gray-600">
                    We verify all properties and screen tenants to build a trusted community
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Quality</h3>
                  <p className="text-gray-600">We maintain high standards for all properties on our platform</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                  <p className="text-gray-600">We strive for excellence in every interaction and service we provide</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Care</h3>
                  <p className="text-gray-600">We genuinely care about our users' experience and success</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <p className="text-xl opacity-90">See how we're making a difference in the furnished rental market</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="opacity-90">Happy Renters</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">15K+</div>
                <div className="opacity-90">Properties Listed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="opacity-90">Cities Covered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">4.9</div>
                <div className="opacity-90">Average Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Meet the team behind FurnishedStay's success</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  name: "Sarah Johnson",
                  role: "CEO & Co-Founder",
                  bio: "Former healthcare executive with 15 years of experience in temporary housing solutions.",
                },
                {
                  name: "Michael Chen",
                  role: "CTO & Co-Founder",
                  bio: "Tech veteran who previously built platforms at scale for major real estate companies.",
                },
                {
                  name: "Lisa Rodriguez",
                  role: "VP of Operations",
                  bio: "Operations expert focused on creating seamless experiences for renters and property owners.",
                },
              ].map((member, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <Image
                      src="/placeholder.svg?height=120&width=120"
                      alt={member.name}
                      width={120}
                      height={120}
                      className="rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
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
