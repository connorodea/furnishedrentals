"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Building2, Smartphone, Shield, Lock } from "lucide-react"

interface PaymentProcessorProps {
  totalAmount: number
  onPaymentMethodChange: (method: string) => void
  onSubmit: () => void
  loading: boolean
}

export function PaymentProcessor({ totalAmount, onPaymentMethodChange, onSubmit, loading }: PaymentProcessorProps) {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    routingNumber: "",
    accountType: "checking",
  })

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method)
    onPaymentMethodChange(method)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lock className="h-5 w-5 mr-2" />
          Payment Information
        </CardTitle>
        <div className="flex items-center text-sm text-gray-600">
          <Shield className="h-4 w-4 mr-1" />
          Your payment information is encrypted and secure
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Method Selection */}
        <div>
          <Label className="text-base font-medium">Choose Payment Method</Label>
          <div className="grid grid-cols-1 gap-3 mt-3">
            <div
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                paymentMethod === "credit-card"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handlePaymentMethodChange("credit-card")}
            >
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5" />
                <div>
                  <div className="font-medium">Credit or Debit Card</div>
                  <div className="text-sm text-gray-600">Visa, Mastercard, American Express</div>
                </div>
              </div>
            </div>

            <div
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                paymentMethod === "bank-transfer"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handlePaymentMethodChange("bank-transfer")}
            >
              <div className="flex items-center space-x-3">
                <Building2 className="h-5 w-5" />
                <div>
                  <div className="font-medium">Bank Transfer</div>
                  <div className="text-sm text-gray-600">Direct bank account transfer</div>
                </div>
              </div>
            </div>

            <div
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                paymentMethod === "digital-wallet"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handlePaymentMethodChange("digital-wallet")}
            >
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5" />
                <div>
                  <div className="font-medium">Digital Wallet</div>
                  <div className="text-sm text-gray-600">PayPal, Apple Pay, Google Pay</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Payment Details Forms */}
        {paymentMethod === "credit-card" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })}
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })}
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, "") })}
                  maxLength={4}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="card-name">Name on Card</Label>
              <Input
                id="card-name"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
              />
            </div>
          </div>
        )}

        {paymentMethod === "bank-transfer" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="account-number">Account Number</Label>
              <Input
                id="account-number"
                placeholder="Enter your account number"
                value={bankDetails.accountNumber}
                onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="routing-number">Routing Number</Label>
              <Input
                id="routing-number"
                placeholder="Enter routing number"
                value={bankDetails.routingNumber}
                onChange={(e) => setBankDetails({ ...bankDetails, routingNumber: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="account-type">Account Type</Label>
              <Select
                value={bankDetails.accountType}
                onValueChange={(value) => setBankDetails({ ...bankDetails, accountType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">Checking</SelectItem>
                  <SelectItem value="savings">Savings</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {paymentMethod === "digital-wallet" && (
          <div className="space-y-4">
            <div className="text-center py-8">
              <div className="space-y-4">
                <Button variant="outline" className="w-full bg-transparent">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-6 h-6 bg-blue-600 rounded"></div>
                    <span>Pay with PayPal</span>
                  </div>
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-6 h-6 bg-black rounded"></div>
                    <span>Pay with Apple Pay</span>
                  </div>
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-6 h-6 bg-green-600 rounded"></div>
                    <span>Pay with Google Pay</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        )}

        <Separator />

        {/* Total and Submit */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total Amount</span>
            <span>${totalAmount.toLocaleString()}</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>Protected by our secure payment system</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Lock className="h-4 w-4" />
              <span>256-bit SSL encryption</span>
            </div>
          </div>

          <Button onClick={onSubmit} disabled={loading} className="w-full" size="lg">
            {loading ? "Processing..." : `Complete Booking - $${totalAmount.toLocaleString()}`}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By completing this booking, you agree to our Terms of Service and Privacy Policy. You will be charged
            immediately upon confirmation.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
