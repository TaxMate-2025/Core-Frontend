"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface OTPInputProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
  className?: string
}

const OTPInput = React.forwardRef<HTMLDivElement, OTPInputProps>(
  ({ length = 4, value = "", onChange, className }, ref) => {
    const [otp, setOtp] = React.useState<string[]>(
      Array(length).fill("").map((_, i) => value[i] || "")
    )
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

    React.useEffect(() => {
      if (value !== otp.join("")) {
        setOtp(Array(length).fill("").map((_, i) => value[i] || ""))
      }
    }, [value, length])

    const handleChange = (index: number, val: string) => {
      // Only allow single digit
      const newVal = val.slice(-1)
      if (newVal && !/^\d$/.test(newVal)) return

      const newOtp = [...otp]
      newOtp[index] = newVal
      setOtp(newOtp)
      onChange?.(newOtp.join(""))

      // Auto-focus next input
      if (newVal && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    const handleKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Backspace") {
        if (!otp[index] && index > 0) {
          // Focus previous input on backspace if current is empty
          inputRefs.current[index - 1]?.focus()
        } else {
          // Clear current input
          const newOtp = [...otp]
          newOtp[index] = ""
          setOtp(newOtp)
          onChange?.(newOtp.join(""))
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus()
      } else if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault()
      const pastedData = e.clipboardData.getData("text/plain").slice(0, length)
      if (!/^\d+$/.test(pastedData)) return

      const newOtp = Array(length).fill("")
      pastedData.split("").forEach((char, i) => {
        if (i < length) newOtp[i] = char
      })
      setOtp(newOtp)
      onChange?.(newOtp.join(""))

      // Focus last filled input or last input
      const lastIndex = Math.min(pastedData.length, length - 1)
      inputRefs.current[lastIndex]?.focus()
    }

    return (
      <div ref={ref} className={cn("flex gap-3", className)}>
        {Array(length)
          .fill(null)
          .map((_, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={cn(
                "w-14 h-14 text-center text-xl font-semibold rounded-md border border-input bg-white",
                "focus:outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/50",
                "transition-all",
                otp[index] && "border-ring"
              )}
            />
          ))}
      </div>
    )
  }
)

OTPInput.displayName = "OTPInput"

export { OTPInput }
