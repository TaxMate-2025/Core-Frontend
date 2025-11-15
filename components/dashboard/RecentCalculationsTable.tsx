interface Calculation {
    date: string
    type: string
    gross: string
    tax: string
    net: string
    status: string
}

const calculations: Calculation[] = [
    {
        date: "2025-06-15",
        type: "Personal",
        gross: "₦300,000",
        tax: "₦40,000",
        net: "₦260,000",
        status: "Completed"
    },
    {
        date: "2025-07-15",
        type: "Personal",
        gross: "₦300,000",
        tax: "₦40,000",
        net: "₦260,000",
        status: "Completed"
    },
    {
        date: "2025-08-15",
        type: "Personal",
        gross: "₦300,000",
        tax: "₦40,000",
        net: "₦260,000",
        status: "Completed"
    }
]

export function RecentCalculationsTable() {
    return (
        <div className="bg-white rounded-lg p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-[#1E3A8A] mb-4">Recent Calculations</h2>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-[#100A37]">Date</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-[#100A37]">Type</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-[#100A37]">Gross</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-[#100A37]">Tax</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-[#100A37]">Net</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-[#100A37]">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calculations.map((calc, index) => (
                            <tr key={index} className="border-b border-gray-100 last:border-0">
                                <td className="py-4 px-4 text-sm text-[#100A37]">{calc.date}</td>
                                <td className="py-4 px-4 text-sm text-[#100A37]">{calc.type}</td>
                                <td className="py-4 px-4 text-sm text-[#100A37]">{calc.gross}</td>
                                <td className="py-4 px-4 text-sm text-[#100A37]">{calc.tax}</td>
                                <td className="py-4 px-4 text-sm text-[#100A37]">{calc.net}</td>
                                <td className="py-4 px-4">
                                    <span className="text-sm text-[#10B981] font-medium">{calc.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
