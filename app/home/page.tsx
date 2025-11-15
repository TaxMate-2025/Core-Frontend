"use client"

import { useState } from "react"
import { Calculator, TrendingUp, Building2 } from "lucide-react"
import { CalculatorCard } from "@/components/CalculatorCard"
import { MainNavbar } from "@/components/MainNavbar"
import Footer from "@/components/Footer"
import { UpgradeModal } from "@/components/UpgradeModal"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import layout_grid from '../../public/layout_grid.svg'
import { useAuthUser } from "@/hooks/use-auth-user"

export default function HomePage() {
    const { user } = useAuthUser();
    const router = useRouter();
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [selectedCalculator, setSelectedCalculator] = useState<"advanced" | "business" | null>(null);

    // Helper function to get token from storage
    const getFromStorage = (key: string): string | null => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(key) || sessionStorage.getItem(key);
    };

    // Check if user is on BASIC tier (uppercase)
    const isBasicTier = user?.Tier === "BASIC";

    const handleCalculatorClick = (calculatorType: "simple" | "advanced" | "business") => {
        // Allow simple calculator for all users
        if (calculatorType === "simple") {
            router.push("/simple-tax-calculator");
            return;
        }

        // Check if user is BASIC tier trying to access advanced/business
        if (isBasicTier && (calculatorType === "advanced" || calculatorType === "business")) {
            setSelectedCalculator(calculatorType);
            setShowUpgradeModal(true);
            return;
        }

        // Allow access for PREMIUM users
        if (calculatorType === "advanced") {
            router.push("/advanced-tax-calculator");
        } else if (calculatorType === "business") {
            router.push("/business-tax-calculator");
        }
    };

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
                        <div className="col-span-1">
                            <CalculatorCard
                                icon={Calculator}
                                title="Simple Calculator"
                                description="Ideal for individuals and salaried employees. Enter your monthly or annual income to compute PAYE."
                                onClick={() => handleCalculatorClick("simple")}
                            />
                        </div>

                        {/* Advanced Calculator */}
                        <div className="col-span-1 relative">
                            <CalculatorCard
                                icon={TrendingUp}
                                title="Advanced Calculator"
                                description="For multiple income sources, deductions, and allowances. Get a precise tax estimate for complex profiles."
                                onClick={() => handleCalculatorClick("advanced")}
                                className={isBasicTier ? "opacity-75" : ""}
                            />
                            {isBasicTier && (
                                <div className="absolute top-4 right-4 bg-[#1E3A8A] text-white text-xs px-2 py-1 rounded-full font-medium">
                                    Premium
                                </div>
                            )}
                        </div>

                        {/* Business Calculator */}
                        <div className="col-span-1 relative">
                            <CalculatorCard
                                icon={Building2}
                                title="Business Calculator"
                                description="Tailored for SMEs and registered companies. Input revenue, expenses, and reliefs for accurate CIT results."
                                onClick={() => handleCalculatorClick("business")}
                                className={isBasicTier ? "opacity-75" : ""}
                            />
                            {isBasicTier && (
                                <div className="absolute top-4 right-4 bg-[#1E3A8A] text-white text-xs px-2 py-1 rounded-full font-medium">
                                    Premium
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            {/* Upgrade Modal */}
            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
                calculatorType={selectedCalculator}
                getToken={user ? () => getFromStorage('authToken') : () => null}
            />
        </div>
    )
}