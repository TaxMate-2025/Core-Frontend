"use client"

import Link from "next/link"
import { Calculator, TrendingUp, Building2, User } from "lucide-react"
import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { CalculatorCard } from "@/components/CalculatorCard"

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation Bar */}
            <nav className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Logo />

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/home"
                            className="text-[#1E3A8A] font-medium text-sm hover:text-[#1E3A8A]/80 transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/calculator"
                            className="text-foreground font-medium text-sm hover:text-[#1E3A8A] transition-colors"
                        >
                            Calculator
                        </Link>
                        <Link
                            href="/payment"
                            className="text-foreground font-medium text-sm hover:text-[#1E3A8A] transition-colors"
                        >
                            Payment
                        </Link>
                        <Link
                            href="/feedback"
                            className="text-foreground font-medium text-sm hover:text-[#1E3A8A] transition-colors"
                        >
                            Feedback
                        </Link>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3">
                        <Button
                            className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white h-9 px-6"
                        >
                            Log Out
                        </Button>
                        <button className="w-9 h-9 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white hover:bg-[#1E3A8A]/90 transition-colors">
                            <User className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content Area with Grid Background */}
            <main className="flex-1 relative overflow-hidden">
                {/*
          BACKGROUND IMPLEMENTATION EXPLANATION:

          This creates the gradient grid effect you see in the design:

          1. Base Layer: Linear gradient from light purple to light blue
          2. Grid Pattern: Created using CSS background-image with linear gradients
             - Vertical lines using repeating-linear-gradient
             - Horizontal lines using repeating-linear-gradient
             - Both combined to create a grid
          3. Grid size: 80px x 80px squares
          4. Grid color: Semi-transparent white/gray lines

          The effect is achieved by:
          - background: base gradient color
          - background-image: overlaying grid pattern on top
          - background-size: controlling grid square size
        */}
                <div className="absolute inset-0 grid-gradient-bg" />

                {/* Content Container */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
                    {/* Welcome Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4 flex items-center justify-center gap-3">
                            Welcome back, Faruk
                            <span className="text-4xl">👋</span>
                        </h1>
                        <p className="text-foreground text-base md:text-lg max-w-2xl mx-auto">
                            Select a calculator mode below to begin computing your tax under the
                            <br className="hidden md:block" />
                            2026 Nigerian tax reforms.
                        </p>
                    </div>

                    {/* Calculator Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {/* Simple Calculator */}
                        <CalculatorCard
                            icon={Calculator}
                            title="Simple Calculator"
                            description="Ideal for individuals and salaried employees. Enter your monthly or annual income to compute PAYE."
                        />

                        {/* Advanced Calculator */}
                        <CalculatorCard
                            icon={TrendingUp}
                            title="Advanced Calculator"
                            description="For multiple income sources, deductions, and allowances. Get a precise tax estimate for complex profiles."
                        />

                        {/* Business Calculator */}
                        <CalculatorCard
                            icon={Building2}
                            title="Business Calculator"
                            description="Tailored for SMEs and registered companies. Input revenue, expenses, and reliefs for accurate CIT results."
                        />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-6">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        Built for Nigerians. © 2025 TaxMate — All Rights Reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}
