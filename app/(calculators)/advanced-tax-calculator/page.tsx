import type { Metadata } from "next";
import AdvancedTaxCalculator from "@/components/AdvancedTaxCalculator";

export const metadata: Metadata = {
  title: 'Advanced Income Tax Calculator | TaxMate Nigeria',
  description: 'Calculate your income tax with advanced options. Understand reliefs, deductions, and stay fully compliant with TaxMate.',
  keywords: ['income tax', 'income tax relief', 'income tax calculator', 'advanced tax calculator', 'Nigerian income tax', 'tax deductions'],
  openGraph: {
    title: 'Advanced Income Tax Calculator | TaxMate Nigeria',
    description: 'Calculate your income tax with advanced options. Understand reliefs, deductions, and stay fully compliant with TaxMate.',
    url: 'https://taxmate.ng/advanced-tax-calculator',
  },
  twitter: {
    title: 'Advanced Income Tax Calculator | TaxMate Nigeria',
    description: 'Calculate your income tax with advanced options. Understand reliefs, deductions, and stay fully compliant with TaxMate.',
  },
};

export default function AdvancedTaxCalculatorPage() {
    return <AdvancedTaxCalculator />;
}
