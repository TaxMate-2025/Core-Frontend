"use client"

import { SimpleTaxCalculator } from "@/components/SimpleTaxCalculator"
import { Toaster } from "@/components/ui/toaster"

export default function CalculatorPage() {
  return (
    <div>
      <main className="flex-1 py-8 md:py-12">
        <SimpleTaxCalculator />
      </main>
      <Toaster />
    </div>
  )
}
