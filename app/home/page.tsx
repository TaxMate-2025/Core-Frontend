"use client"

import { Calculator, TrendingUp, Building2 } from "lucide-react"
import { CalculatorCard } from "@/components/CalculatorCard"
import { MainNavbar } from "@/components/MainNavbar"
import Footer from "@/components/Footer"
import Link from "next/link"
import Image from "next/image"
import layout_grid from '../../public/layout_grid.svg'
import { useAuthUser } from "@/hooks/use-auth-user"

export default function HomePage() {
    const { user } = useAuthUser();

    return (
        <div>
            <MainNavbar />

            <main className="hero_gradient h-screen">
                <div className="absolute inset-0">
                    <Image
                        src={layout_grid}
                        alt="background_layout_grid"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                </div>

                {/* Content Container */}
                <div className="relative z-10 max-w-6xl mx-auto py-20">
                    <div className="text-center mb-15">
                        <h1 className="text-4xl md:text-5xl font-semibold text-[#1E3A8A] mb-4 flex items-center justify-center gap-3">
                            Welcome back, {user?.firstName}
                            <span className="text-4xl">👋</span>
                        </h1>
                        <p className="text-black text-base md:text-lg max-w-2xl mx-auto mt-2">
                            Select a calculator mode below to begin computing your tax under the
                            <br className="hidden md:block" />
                            2026 Nigerian tax reforms.
                        </p>
                    </div>

                    {/* Calculator Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {/* Simple Calculator */}
                        <Link
                            href="/simple-tax-calculator"
                            className="col-span-1"
                        >
                            <CalculatorCard
                                icon={Calculator}
                                title="Simple Calculator"
                                description="Ideal for individuals and salaried employees. Enter your monthly or annual income to compute PAYE."
                            />
                        </Link>

                        {/* Advanced Calculator */}
                        <Link
                            href="/advanced-tax-calculator"
                            className="col-span-1"
                        >
                            <CalculatorCard
                                icon={TrendingUp}
                                title="Advanced Calculator"
                                description="For multiple income sources, deductions, and allowances. Get a precise tax estimate for complex profiles."
                            />
                        </Link>

                        {/* Business Calculator */}
                        <Link
                            href="/business-tax-calculator"
                            className="col-span-1"
                        >
                            <CalculatorCard
                                icon={Building2}
                                title="Business Calculator"
                                description="Tailored for SMEs and registered companies. Input revenue, expenses, and reliefs for accurate CIT results."
                            />
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
