import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Traveler",
      avatar: "/placeholder.svg?height=60&width=60&text=SJ",
      rating: 5,
      comment:
        "FurnishedStay made my 3-month work assignment so much easier. The property was exactly as described and the booking process was seamless.",
    },
    {
      name: "Michael Chen",
      role: "Relocating Family",
      avatar: "/placeholder.svg?height=60&width=60&text=MC",
      rating: 5,
      comment:
        "We needed temporary housing while our new home was being built. The family-friendly property we found was perfect for our needs.",
    },
    {
      name: "Emily Rodriguez",
      role: "Digital Nomad",
      avatar: "/placeholder.svg?height=60&width=60&text=ER",
      rating: 5,
      comment:
        "As someone who travels frequently for work, I appreciate the quality and consistency of FurnishedStay properties. Highly recommended!",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Guests Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied guests have to say about their experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
