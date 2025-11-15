export function TaxChart() {
    return (
        <div className="bg-white rounded-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-[#1E3A8A] mb-1">Tax</h2>
                    <p className="text-sm text-[#475569]">(Last 6 months)</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-[#475569] mb-1">Amount (₦)</p>
                    <p className="text-2xl font-bold text-[#1E3A8A]">30000</p>
                    <p className="text-xs text-[#475569]">March</p>
                </div>
            </div>
            {/* Chart Placeholder - Would use recharts or similar library */}
            <div className="h-64">
                <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                    <path
                        d="M 0 150 Q 50 100 100 120 T 200 80 T 300 100 T 400 60 T 500 90"
                        fill="none"
                        stroke="#1E3A8A"
                        strokeWidth="2"
                    />
                    <line x1="200" y1="0" x2="200" y2="80" stroke="#999" strokeWidth="1" strokeDasharray="5,5" />
                    <circle cx="200" cy="80" r="4" fill="#1E3A8A" />
                </svg>
                <div className="flex justify-between text-xs text-[#475569] mt-2 px-4">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                </div>
            </div>
        </div>
    )
}
