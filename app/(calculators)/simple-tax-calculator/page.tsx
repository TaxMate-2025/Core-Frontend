"use client"

import { SimpleTaxCalculator } from "@/components/SimpleTaxCalculator"

export default function CalculatorPage() {
  return (
    <div>
      <main className="flex-1 py-8 md:py-12">
        <SimpleTaxCalculator />
      </main>
    </div>
  )
}
