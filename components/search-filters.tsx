"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"

interface SearchFiltersProps {
  onFiltersChange?: (filters: any) => void
}

export function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [priceRange, setPriceRange] = useState([1000, 5000])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([])
  const [bedrooms, setBedrooms] = useState("any")
  const [location, setLocation] = useState("")

  const amenities = [
    "WiFi",
    "Parking",
    "Gym",
    "Pool",
    "Laundry",
    "Pet Friendly",
    "Balcony",
    "Dishwasher",
    "Air Conditioning",
    "Heating",
    "Kitchen",
    "Workspace",
  ]

  const propertyTypes = ["Apartment", "House", "Condo", "Studio", "Loft", "Townhouse", "Penthouse"]

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const updated = checked ? [...selectedAmenities, amenity] : selectedAmenities.filter((a) => a !== amenity)
    setSelectedAmenities(updated)

    if (onFiltersChange) {
      onFiltersChange({
        priceRange,
        amenities: updated,
        propertyTypes: selectedPropertyTypes,
        bedrooms,
        location,
      })
    }
  }

  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    const updated = checked ? [...selectedPropertyTypes, type] : selectedPropertyTypes.filter((t) => t !== type)
    setSelectedPropertyTypes(updated)

    if (onFiltersChange) {
      onFiltersChange({
        priceRange,
        amenities: selectedAmenities,
        propertyTypes: updated,
        bedrooms,
        location,
      })
    }
  }

  const handlePriceRangeChange = (newRange: number[]) => {
    setPriceRange(newRange)

    if (onFiltersChange) {
      onFiltersChange({
        priceRange: newRange,
        amenities: selectedAmenities,
        propertyTypes: selectedPropertyTypes,
        bedrooms,
        location,
      })
    }
  }

  const clearFilters = () => {
    setPriceRange([1000, 5000])
    setSelectedAmenities([])
    setSelectedPropertyTypes([])
    setBedrooms("any")
    setLocation("")

    if (onFiltersChange) {
      onFiltersChange({
        priceRange: [1000, 5000],
        amenities: [],
        propertyTypes: [],
        bedrooms: "any",
        location: "",
      })
    }
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location */}
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="City, State"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="checkin">Check-in</Label>
            <Input id="checkin" type="date" />
          </div>
          <div>
            <Label htmlFor="checkout">Check-out</Label>
            <Input id="checkout" type="date" />
          </div>
        </div>

        {/* Guests */}
        <div>
          <Label htmlFor="guests">Guests</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Number of guests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Guest</SelectItem>
              <SelectItem value="2">2 Guests</SelectItem>
              <SelectItem value="3">3 Guests</SelectItem>
              <SelectItem value="4">4 Guests</SelectItem>
              <SelectItem value="5+">5+ Guests</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <Label>Price Range (per month)</Label>
          <div className="px-2 py-4">
            <Slider
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              max={10000}
              min={500}
              step={100}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <Label>Property Type</Label>
          <div className="space-y-2 mt-2">
            {propertyTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={selectedPropertyTypes.includes(type)}
                  onCheckedChange={(checked) => handlePropertyTypeChange(type, checked as boolean)}
                />
                <Label htmlFor={type} className="text-sm">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <Label>Bedrooms</Label>
          <Select value={bedrooms} onValueChange={setBedrooms}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="1">1 Bedroom</SelectItem>
              <SelectItem value="2">2 Bedrooms</SelectItem>
              <SelectItem value="3">3 Bedrooms</SelectItem>
              <SelectItem value="4+">4+ Bedrooms</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amenities */}
        <div>
          <Label>Amenities</Label>
          <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
            {amenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                />
                <Label htmlFor={amenity} className="text-sm">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {(selectedAmenities.length > 0 || selectedPropertyTypes.length > 0) && (
          <div>
            <Label>Active Filters</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedPropertyTypes.map((type) => (
                <Badge key={type} variant="secondary" className="flex items-center gap-1">
                  {type}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handlePropertyTypeChange(type, false)} />
                </Badge>
              ))}
              {selectedAmenities.map((amenity) => (
                <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                  {amenity}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleAmenityChange(amenity, false)} />
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Button className="w-full">Apply Filters</Button>
      </CardContent>
    </Card>
  )
}
