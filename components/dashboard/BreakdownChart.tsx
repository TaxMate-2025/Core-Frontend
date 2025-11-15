"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const data = [
    { name: 'Annual Income', value: 1800000, color: '#1E3A8A' },
    { name: 'Total Deductions', value: 150000, color: '#10B981' },
    { name: 'Annual Taxes', value: 1800, color: '#E5E7EB' }
]

export function BreakdownChart() {
    return (
        <div className="bg-white rounded-lg p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-[#1E3A8A] mb-6">Breakdown</h2>

            <div className="flex flex-col items-center gap-6">
                {/* Donut Chart */}
                <div className="w-full max-w-[200px] h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={2}
                                dataKey="value"
                                startAngle={90}
                                endAngle={450}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend with Values */}
                <div className="w-full space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-[#1E3A8A] rounded-sm"></div>
                            <span className="text-sm font-medium text-gray-700">Annual Income</span>
                        </div>
                        <span className="text-sm font-semibold text-[#1E3A8A]">₦1800,000</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-[#10B981] rounded-sm"></div>
                            <span className="text-sm font-medium text-gray-700">Total Deductions</span>
                        </div>
                        <span className="text-sm font-semibold text-[#1E3A8A]">₦150,000</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-[#E5E7EB] rounded-sm"></div>
                            <span className="text-sm font-medium text-gray-700">Annual Taxes</span>
                        </div>
                        <span className="text-sm font-semibold text-[#1E3A8A]">₦1800</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
