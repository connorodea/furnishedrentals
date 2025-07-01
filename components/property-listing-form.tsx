"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Home, MapPin, DollarSign, Camera, CheckCircle } from "lucide-react"

export function PropertyListingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    bedrooms: "",
    bathrooms: "",
    maxGuests: "",
    price: "",
    amenities: [] as string[],
    photos: [] as File[],
  })

  const steps = [
    { number: 1, title: "Property Details", icon: Home },
    { number: 2, title: "Location", icon: MapPin },
    { number: 3, title: "Pricing & Amenities", icon: DollarSign },
    { number: 4, title: "Photos", icon: Camera },
  ]

  const amenitiesList = [
    "WiFi",
    "Parking",
    "Kitchen",
    "Washer/Dryer",
    "Air Conditioning",
    "Heating",
    "TV",
    "Gym",
    "Pool",
    "Hot Tub",
    "Balcony",
    "Patio",
    "Fireplace",
    "Dishwasher",
  ]

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAmenityToggle = (amenity: string) => {
    const updatedAmenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter((a) => a !== amenity)
      : [...formData.amenities, amenity]
    handleInputChange("amenities", updatedAmenities)
  }

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formData.title || !formData.propertyType || !formData.city || !formData.price) {
        alert("Please fill in all required fields")
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Property listing submitted:", formData)

      // Show success message
      alert("Property listing submitted successfully! We'll review it and get back to you within 24 hours.")

      // Reset form
      setFormData({
        title: "",
        description: "",
        propertyType: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        bedrooms: "",
        bathrooms: "",
        maxGuests: "",
        price: "",
        amenities: [],
        photos: [],
      })
      setCurrentStep(1)
    } catch (error) {
      console.error("Failed to submit listing:", error)
      alert("Failed to submit listing. Please try again.")
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step.number ? "bg-primary text-primary-foreground" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > step.number ? <CheckCircle className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm font-medium ${currentStep >= step.number ? "text-gray-900" : "text-gray-500"}`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${currentStep > step.number ? "bg-primary" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Property Details */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Modern Downtown Apartment"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe your property..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="propertyType">Property Type</Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => handleInputChange("propertyType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="loft">Loft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="maxGuests">Maximum Guests</Label>
                <Select value={formData.maxGuests} onValueChange={(value) => handleInputChange("maxGuests", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="4">4 Guests</SelectItem>
                    <SelectItem value="6">6 Guests</SelectItem>
                    <SelectItem value="8">8+ Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Select value={formData.bedrooms} onValueChange={(value) => handleInputChange("bedrooms", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Studio</SelectItem>
                    <SelectItem value="1">1 Bedroom</SelectItem>
                    <SelectItem value="2">2 Bedrooms</SelectItem>
                    <SelectItem value="3">3 Bedrooms</SelectItem>
                    <SelectItem value="4">4+ Bedrooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Select value={formData.bathrooms} onValueChange={(value) => handleInputChange("bathrooms", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bathrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Bathroom</SelectItem>
                    <SelectItem value="1.5">1.5 Bathrooms</SelectItem>
                    <SelectItem value="2">2 Bathrooms</SelectItem>
                    <SelectItem value="2.5">2.5 Bathrooms</SelectItem>
                    <SelectItem value="3">3+ Bathrooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleNext} className="w-full">
              Continue to Location
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Location */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Property Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Chicago"
                />
              </div>

              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  placeholder="IL"
                />
              </div>

              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  placeholder="60601"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={handlePrevious} className="flex-1 bg-transparent">
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1">
                Continue to Pricing
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Pricing & Amenities */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Amenities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="price">Monthly Rate</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="2800"
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">Amenities</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenitiesList.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={formData.amenities.includes(amenity)}
                      onCheckedChange={() => handleAmenityToggle(amenity)}
                    />
                    <Label htmlFor={amenity} className="text-sm">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={handlePrevious} className="flex-1 bg-transparent">
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1">
                Continue to Photos
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Photos */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Property Photos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload Photos</h3>
              <p className="text-gray-600 mb-4">Add high-quality photos of your property</p>
              <Button variant="outline">Choose Files</Button>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Photo Tips:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Upload at least 5 high-quality photos</li>
                <li>• Include photos of all rooms and common areas</li>
                <li>• Show the property in good lighting</li>
                <li>• Highlight unique features and amenities</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={handlePrevious} className="flex-1 bg-transparent">
                Back
              </Button>
              <Button onClick={handleSubmit} className="flex-1">
                Submit Listing
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
