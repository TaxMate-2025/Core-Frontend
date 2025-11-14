import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalculatorCardProps {
  icon: LucideIcon
  title: string
  description: string
  onClick?: () => void
  className?: string
}

export function CalculatorCard({
  icon: Icon,
  title,
  description,
  onClick,
  className,
}: CalculatorCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-xl w-full px-6 py-20 shadow-sm hover:shadow-md transition-all cursor-pointer group",
        "border border-gray-100 hover:border-[#1E3A8A]/20",
        className
      )}
    >
      {/* Icon Container */}
      <div className="flex justify-center mb-5">
        <div className="w-16 h-16 rounded-full bg-[#E8EAF6] flex items-center justify-center group-hover:bg-[#1E3A8A]/10 transition-colors">
          <Icon className="w-7 h-7 text-[#1E3A8A]" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-[#1E3A8A] font-semibold text-lg text-center mb-5">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-black text-center leading-relaxed">
        {description}
      </p>
    </div>
  )
}
