"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Calendar, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export function SearchSection() {
  const router = useRouter()
  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would pass search parameters to the search page
    router.push("/search")
  }

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Search Furnished Rentals</h2>
            <p className="text-gray-600">Find your ideal temporary home with our advanced search</p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <form onSubmit={handleSearch}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      placeholder="City, State"
                      value={searchData.location}
                      onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="checkin" className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Check-in
                    </Label>
                    <Input
                      id="checkin"
                      type="date"
                      value={searchData.checkIn}
                      onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="checkout" className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Check-out
                    </Label>
                    <Input
                      id="checkout"
                      type="date"
                      value={searchData.checkOut}
                      onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Guests
                    </Label>
                    <Select
                      value={searchData.guests}
                      onValueChange={(value) => setSearchData({ ...searchData, guests: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
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
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto">
                  <Search className="h-5 w-5 mr-2" />
                  Search Properties
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Quick Filters */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Chicago", "New York", "San Francisco", "Austin", "Miami", "Denver"].map((city) => (
                <Button key={city} variant="outline" size="sm" className="bg-white">
                  {city}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
