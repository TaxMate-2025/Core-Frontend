import { Receipt } from "lucide-react"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-[#1E3A8A] p-1.5 rounded">
        <Receipt className="w-5 h-5 text-white" />
      </div>
      <span className="text-xl font-semibold">
        <span className="text-[#1E3A8A]">Tax</span>
        <span className="text-[#10B981]">Mate</span>
      </span>
    </div>
  )
}
