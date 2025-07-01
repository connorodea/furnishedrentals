import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MessageCircle, Clock, HelpCircle, Users, Shield, DollarSign } from "lucide-react"

export default function OwnerSupportPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container px-4 mx-auto py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Owner Support Center</h1>
            <p className="text-xl text-gray-600">Dedicated support for property owners and managers</p>
          </div>

          {/* Priority Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center border-primary">
              <CardContent className="p-6">
                <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Priority Phone Support</h3>
                <p className="text-gray-600 mb-4">Direct line for property owners</p>
                <Button className="w-full">1-800-OWNER-HELP</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Instant help from our owner specialists</p>
                <Button className="w-full">Start Owner Chat</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">Detailed assistance via email</p>
                <Button className="w-full bg-transparent" variant="outline">
                  owners@furnishedstay.com
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Support Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Guest Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Guest screening and verification</li>
                  <li>• Communication best practices</li>
                  <li>• Handling difficult situations</li>
                  <li>• Check-in/check-out procedures</li>
                  <li>• Guest feedback management</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Revenue Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Dynamic pricing strategies</li>
                  <li>• Market analysis and trends</li>
                  <li>• Seasonal pricing adjustments</li>
                  <li>• Revenue reporting and analytics</li>
                  <li>• Tax optimization guidance</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Property Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Damage protection coverage</li>
                  <li>• Insurance claim assistance</li>
                  <li>• Security deposit management</li>
                  <li>• Legal compliance guidance</li>
                  <li>• Risk mitigation strategies</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Owner Support Form */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Owner Support</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ownerName">Property Owner Name</Label>
                    <Input id="ownerName" placeholder="John Smith" />
                  </div>
                  <div>
                    <Label htmlFor="propertyId">Property ID (if applicable)</Label>
                    <Input id="propertyId" placeholder="PROP123456" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="ownerEmail">Email Address</Label>
                  <Input id="ownerEmail" type="email" placeholder="owner@example.com" />
                </div>

                <div>
                  <Label htmlFor="supportCategory">Support Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="listing">Listing Management</SelectItem>
                      <SelectItem value="booking">Booking Issues</SelectItem>
                      <SelectItem value="payment">Payment & Payouts</SelectItem>
                      <SelectItem value="guest">Guest Relations</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="legal">Legal Questions</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - General inquiry</SelectItem>
                      <SelectItem value="medium">Medium - Non-urgent issue</SelectItem>
                      <SelectItem value="high">High - Urgent issue</SelectItem>
                      <SelectItem value="critical">Critical - Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="ownerMessage">Describe Your Issue</Label>
                  <Textarea
                    id="ownerMessage"
                    placeholder="Please provide detailed information about your issue or question..."
                    rows={5}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Support Request
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Owner FAQ */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" />
                Owner FAQ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    question: "How do I optimize my listing for more bookings?",
                    answer:
                      "Use professional photos, write detailed descriptions, price competitively, and respond quickly to inquiries. Our team can provide a free listing review.",
                  },
                  {
                    question: "When do I receive payouts?",
                    answer:
                      "Payouts are processed 24 hours after guest check-in and typically arrive in your account within 3-5 business days.",
                  },
                  {
                    question: "What if a guest damages my property?",
                    answer:
                      "All bookings include damage protection. Report any issues within 24 hours of checkout and we'll help you file a claim.",
                  },
                  {
                    question: "Can I block dates for personal use?",
                    answer:
                      "Yes, you can block any dates in your calendar for personal use, maintenance, or other reasons through your property dashboard.",
                  },
                  {
                    question: "How do I handle guest complaints?",
                    answer:
                      "Contact our owner support team immediately. We'll help mediate the situation and work toward a resolution that protects your reputation.",
                  },
                ].map((faq, index) => (
                  <div key={index} className="border-b pb-4">
                    <h4 className="font-semibold mb-2">{faq.question}</h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Support Hours */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Owner Support Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Priority Phone Support</h4>
                  <p className="text-gray-600 mb-1">Monday - Friday: 6 AM - 10 PM EST</p>
                  <p className="text-gray-600 mb-1">Saturday - Sunday: 8 AM - 8 PM EST</p>
                  <p className="text-sm text-primary">Emergency line available 24/7</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Email & Chat Support</h4>
                  <p className="text-gray-600 mb-1">24/7 availability</p>
                  <p className="text-gray-600 mb-1">Average response time: 15 minutes</p>
                  <p className="text-sm text-primary">Priority queue for Pro owners</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
