import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ComparisonProvider } from "@/contexts/comparison-context"
import { ComparisonBar } from "@/components/comparison-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Compete with Furnished - Premium Furnished Rentals",
  description:
    "Find and book premium furnished apartments and homes for extended stays. Perfect for business travelers, relocations, and temporary housing needs.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ComparisonProvider>
          {children}
          <ComparisonBar />
        </ComparisonProvider>
      </body>
    </html>
  )
}
