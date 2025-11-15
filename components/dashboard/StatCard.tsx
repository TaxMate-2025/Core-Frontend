interface StatCardProps {
    label: string
    value: string
}

export function StatCard({ label, value }: StatCardProps) {
    return (
        <div className="bg-white rounded-lg p-6 border border-gray-100">
            <p className="text-sm md:text-base font-medium text-[#475569] mb-2">{label}</p>
            <p className="text-3xl font-semibold text-[#1E3A8A]">{value}</p>
        </div>
    )
}
