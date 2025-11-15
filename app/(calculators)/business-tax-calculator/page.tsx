import type { Metadata } from "next";
import BusinessTaxCalculator from "@/components/BusinessTaxCalculator"

export const metadata: Metadata = {
  title: 'Business Tax Planning & New Tax Regime | TaxMate',
  description: 'Plan and analyze your business taxes under Nigeria\'s new tax regime. TaxMate helps businesses stay compliant and save time.',
  keywords: ['business tax', 'new tax regime', 'tax planning for businesses', 'tax compliance', 'business tax calculator', 'Nigerian business tax'],
  openGraph: {
    title: 'Business Tax Planning & New Tax Regime | TaxMate',
    description: 'Plan and analyze your business taxes under Nigeria\'s new tax regime. TaxMate helps businesses stay compliant and save time.',
    url: 'https://taxmate.ng/business-tax',
  },
  twitter: {
    title: 'Business Tax Planning & New Tax Regime | TaxMate',
    description: 'Plan and analyze your business taxes under Nigeria\'s new tax regime. TaxMate helps businesses stay compliant and save time.',
  },
};

export default function CalculatorPage() {
  return (
    <div>
      <main className="flex-1 py-8 md:py-12">
        <BusinessTaxCalculator />
      </main>
    </div>
  )
}
