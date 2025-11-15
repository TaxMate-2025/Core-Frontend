export function ActionableInsights() {
    return (
        <div className="bg-white rounded-lg p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-[#1E3A8A] mb-4">Actionable Insights</h2>
            <p className="text-sm md:text-base font-medium text-[#475569] mb-4 leading-relaxed">
                Your effective tax rate over the last 6 months is 13.6%. Based on your declared expenses and available reliefs, you could reduce your monthly tax by ₦8,500 by maximizing housing and pension contributions.
            </p>
            <ul className="space-y-2 text-sm md:text-base font-medium text-[#475569]">
                <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Review eligible deductible expenses and upload receipts for record-keeping.</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Consider increasing pension contributions to take advantage of tax relief.</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Use the Advanced Calculator to itemize multiple income sources for a precise estimate.</span>
                </li>
            </ul>
        </div>
    )
}
