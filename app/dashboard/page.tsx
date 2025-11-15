"use client"

import { Button } from "@/components/ui/button"
import { FileDown, Plus } from "lucide-react"
import { StatCard } from "@/components/dashboard/StatCard"
import { TaxChart } from "@/components/dashboard/TaxChart"
import { BreakdownChart } from "@/components/dashboard/BreakdownChart"
import { RecentCalculationsTable } from "@/components/dashboard/RecentCalculationsTable"
import { ActionableInsights } from "@/components/dashboard/ActionableInsights"
import { useAuthUser } from "@/hooks/use-auth-user"

export default function Dashboard() {
    const { user } = useAuthUser()

    return (
        <div className="max-w-7xl mx-auto pb-20">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-semibold text-[#1E3A8A] mb-2">
                        Good morning, {user?.firstName}
                    </h1>
                    <p className="text-sm md:text-base text-black">
                        Here's your financial snapshot and analytics to help you plan.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-semibold h-11 px-6 cursor-pointer">
                        <FileDown className="w-4 h-4 mr-2" />
                        Export PDF
                    </Button>
                    <Button
                        variant="outline"
                        className="border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 h-11 px-6 cursor-pointer"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        New Calculation
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard label="Total Tax Paid (YTD)" value="₦1,002,000" />
                <StatCard label="Average Monthly Income" value="₦293,333" />
                <StatCard label="Potential Tax Savings" value="₦44,500" />
                <StatCard label="Effective Tax Rate" value="13.6%" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <TaxChart />
                <BreakdownChart />
            </div>

            {/* Recent Calculations Table */}
            <div className="mb-8">
                <RecentCalculationsTable />
            </div>

            {/* Actionable Insights */}
            <ActionableInsights />
        </div>
    )
}
