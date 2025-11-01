import { Card } from "@/components/ui/card"

interface ProcessCardProps {
    number: string
    title: string
    description: string
}

export default function ProcessCard({ number, title, description }: ProcessCardProps) {
    return (
        <Card className="group h-full bg-white border border-gray-100 p-8 text-center hover:shadow-lg transition-all duration-200 flex flex-col">
      <div className="flex-1 flex flex-col">
        {/* Number Badge */}
        <div className="text-6xl font-bold text-blue-200 mb-4 group-hover:text-[#1e3a8a] transition-colors duration-200">
          {number}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-[#1e3a8a] mb-3">{title}</h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </Card>
    )
}
