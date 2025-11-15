import type { Metadata } from "next";
import { SimpleTaxCalculator } from "@/components/SimpleTaxCalculator"

export const metadata: Metadata = {
  title: 'Income Tax Calculator | TaxMate Nigeria',
  description: 'Instantly calculate your income tax in Nigeria. Understand reliefs, deductions, and stay fully compliant with TaxMate.',
  keywords: ['income tax', 'income tax relief', 'income tax calculator', 'income tax login', 'Nigerian income tax', 'tax calculator Nigeria'],
  openGraph: {
    title: 'Income Tax Calculator | TaxMate Nigeria',
    description: 'Instantly calculate your income tax in Nigeria. Understand reliefs, deductions, and stay fully compliant with TaxMate.',
    url: 'https://taxmate.ng/income-tax',
  },
  twitter: {
    title: 'Income Tax Calculator | TaxMate Nigeria',
    description: 'Instantly calculate your income tax in Nigeria. Understand reliefs, deductions, and stay fully compliant with TaxMate.',
  },
};

export default function CalculatorPage() {
  return (
    <div>
      <main className="flex-1 py-8 md:py-12">
        <SimpleTaxCalculator />
      </main>
    </div>
  )
}
