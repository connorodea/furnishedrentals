"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Property {
  id: number
  title: string
  location: string
  price: string
  beds: number
  baths: number
  maxGuests: number
  image: string
  amenities: string[]
  type: string
  rating: number
  reviews: number
}

interface ComparisonContextType {
  comparisonProperties: Property[]
  addToComparison: (property: Property) => void
  removeFromComparison: (propertyId: number) => void
  clearComparison: () => void
  isInComparison: (propertyId: number) => boolean
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparisonProperties, setComparisonProperties] = useState<Property[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("propertyComparison")
    if (saved) {
      setComparisonProperties(JSON.parse(saved))
    }
  }, [])

  // Save to localStorage whenever comparison changes
  useEffect(() => {
    localStorage.setItem("propertyComparison", JSON.stringify(comparisonProperties))
  }, [comparisonProperties])

  const addToComparison = (property: Property) => {
    setComparisonProperties((prev) => {
      // Limit to 4 properties for comparison
      if (prev.length >= 4) {
        return prev
      }
      // Don't add if already exists
      if (prev.some((p) => p.id === property.id)) {
        return prev
      }
      return [...prev, property]
    })
  }

  const removeFromComparison = (propertyId: number) => {
    setComparisonProperties((prev) => prev.filter((p) => p.id !== propertyId))
  }

  const clearComparison = () => {
    setComparisonProperties([])
  }

  const isInComparison = (propertyId: number) => {
    return comparisonProperties.some((p) => p.id === propertyId)
  }

  return (
    <ComparisonContext.Provider
      value={{
        comparisonProperties,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider")
  }
  return context
}
