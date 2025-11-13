"use client"

import { SimpleTaxCalculator } from "@/components/SimpleTaxCalculator"
import { MainNavbar } from "@/components/MainNavbar"
import Footer from "@/components/Footer"
import { Toaster } from "@/components/ui/toaster"

export default function CalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MainNavbar />
      <main className="flex-1 py-8 md:py-12">
        <SimpleTaxCalculator />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
