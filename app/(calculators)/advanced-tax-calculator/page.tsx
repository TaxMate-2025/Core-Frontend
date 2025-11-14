"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"

export default function AdvancedTaxCalculator() {
    const [frequency, setFrequency] = useState<"monthly" | "annually">("monthly")

    return (
        <div className="px-4">
            <div className="max-w-5xl mx-auto pb-72">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-4xl font-bold text-[#1E3A8A] mb-2">
                        Advanced Tax Calculator
                    </h1>
                    <p className="text-sm md:text-base text-black">
                        For freelancers, contractors, or mixed-income earners with multiple sources of income.
                    </p>
                </div>

                {/* Income Frequency Toggle */}
                <div className="bg-white rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-[#1E3A8A]">
                            Income Frequency
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setFrequency("monthly")}
                                className={`px-6 py-2 rounded-md text-sm font-semibold trans[#414545]lors ${frequency === "monthly"
                                    ? "bg-[#1E3A8A] text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setFrequency("annually")}
                                className={`px-6 py-2 rounded-md text-sm font-semibold trans[#414545]lors ${frequency === "annually"
                                    ? "bg-[#1E3A8A] text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                Annually
                            </button>
                        </div>
                    </div>
                </div>

                {/* Income Sources */}
                <div className="bg-white rounded-lg p-6 mb-6">
                    <h2 className="text-base font-semibold text-[#1E3A8A] mb-4">
                        Income Sources
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-[#414545] mb-2">
                                Employment (₦)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    #
                                </span>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#414545] mb-2">
                                Business (₦) <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    #
                                </span>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#414545] mb-2">
                                Freelance (₦) <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    #
                                </span>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#414545] mb-2">
                                Other Income (₦) <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    #
                                </span>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#414545] mb-2">
                                Rental Income (₦) <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    #
                                </span>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#414545] mb-2">
                                Digital Assets (₦) <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    #
                                </span>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Deductions - First Section */}
                <div className="bg-white rounded-lg p-6 mb-6">
                    <h2 className="text-base font-semibold text-[#1E3A8A] mb-4">
                        Deductions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-[#414545] mb-2">
                                Capital Allowance (₦) <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    #
                                </span>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#414545] mb-2">
                                Final Tax Income (₦) <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    #
                                </span>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#414545] mb-2">
                                Previous Year Losses (₦) <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    #
                                </span>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#414545] mb-2">
                                Digital Asset Losses (₦) <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    #
                                </span>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#414545] mb-2">
                                Charitable Donations (₦) <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    #
                                </span>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#414545] mb-2">
                                Educational Expenses (₦) <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    #
                                </span>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#414545] mb-2">
                                Business Losses (₦) <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    #
                                </span>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#414545] mb-2">
                                Freelancing Expenses (₦) <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    #
                                </span>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Deductions - Second Section */}
                <div className="bg-white rounded-lg p-6 mb-6">
                    <h2 className="text-base font-semibold text-[#1E3A8A] mb-4">
                        Deductions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-[#414545] mb-2">
                                NHF Contribution (₦) <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    #
                                </span>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#414545] mb-2">
                                NHIS Contribution (₦) <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    #
                                </span>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#414545] mb-2">
                                Pension Contribution (₦) <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    #
                                </span>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#414545] mb-2">
                                Mortgage Interest Payment (₦) <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    #
                                </span>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#414545] mb-2">
                                Life Insurance Premium (₦) <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    #
                                </span>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#414545] mb-2">
                                Rent Relief Allowance (₦) <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    #
                                </span>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-10">
                        <Button
                            type="button"
                            className="flex h-11 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-semibold cursor-pointer"
                        >
                            Calculate
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="flex h-11 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 cursor-pointer"
                        >
                            Reset
                        </Button>
                    </div>
                </div>

            </div>
        </div >
    )
}
