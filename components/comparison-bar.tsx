"use client"

import { useComparison } from "@/contexts/comparison-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Scale, ChevronUp, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export function ComparisonBar() {
  const { comparisonProperties, removeFromComparison, clearComparison } = useComparison()
  const [isMinimized, setIsMinimized] = useState(false)

  if (comparisonProperties.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="flex items-center"
            >
              <Scale className="h-4 w-4 mr-2" />
              Compare ({comparisonProperties.length})
              {isMinimized ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
            </Button>
            {!isMinimized && (
              <Button variant="ghost" size="sm" onClick={clearComparison} className="text-red-600 hover:text-red-700">
                Clear All
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {!isMinimized && (
              <Button size="sm" asChild>
                <Link href="/compare">Compare Properties</Link>
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)}>
              {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <div className="pb-4">
            <div className="flex space-x-4 overflow-x-auto">
              {comparisonProperties.map((property) => (
                <Card key={property.id} className="flex-shrink-0 w-64 relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10 h-6 w-6 bg-white/80 hover:bg-white"
                    onClick={() => removeFromComparison(property.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <CardContent className="p-3">
                    <div className="flex space-x-3">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        width={60}
                        height={60}
                        className="rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-1">{property.title}</h4>
                        <p className="text-xs text-gray-600 line-clamp-1">{property.location}</p>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {property.type}
                          </Badge>
                          <span className="text-sm font-bold text-primary">${property.price}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
