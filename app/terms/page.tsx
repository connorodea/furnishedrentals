import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container px-4 mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-600">Last updated: January 1, 2024</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  By accessing and using FurnishedStay, you accept and agree to be bound by the terms and provision of
                  this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Use License</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="mb-4">
                  Permission is granted to temporarily download one copy of FurnishedStay's materials for personal,
                  non-commercial transitory viewing only.
                </p>
                <p className="mb-4">
                  This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on the website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Accounts</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="mb-4">
                  When you create an account with us, you must provide information that is accurate, complete, and
                  current at all times.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You are responsible for safeguarding your account password</li>
                  <li>You must not share your account with others</li>
                  <li>You must notify us immediately of any unauthorized use</li>
                  <li>We reserve the right to terminate accounts that violate our terms</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Property Listings</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="mb-4">Property owners who list on FurnishedStay agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete property information</li>
                  <li>Maintain the property in good condition</li>
                  <li>Honor confirmed bookings</li>
                  <li>Comply with local laws and regulations</li>
                  <li>Respond to guest inquiries in a timely manner</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Booking and Payment</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="mb-4">
                  All bookings are subject to availability and confirmation. Payment terms include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment is due at time of booking</li>
                  <li>Cancellation policies vary by property</li>
                  <li>Service fees are non-refundable</li>
                  <li>Disputes must be reported within 24 hours of check-in</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prohibited Uses</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="mb-4">You may not use our service:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations or laws</li>
                  <li>
                    To infringe upon or violate our intellectual property rights or the intellectual property rights of
                    others
                  </li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  In no event shall FurnishedStay or its suppliers be liable for any damages (including, without
                  limitation, damages for loss of data or profit, or due to business interruption) arising out of the
                  use or inability to use the materials on FurnishedStay's website.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="mb-4">If you have any questions about these Terms of Service, please contact us at:</p>
                <ul className="list-none space-y-2">
                  <li>Email: legal@furnishedstay.com</li>
                  <li>Phone: 1-800-FURNISHED</li>
                  <li>Address: 123 Legal Street, Terms City, TC 12345</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
