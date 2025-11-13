"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, onCheckedChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked)
      props.onChange?.(e)
    }

    return (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            "w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring/50 cursor-pointer transition-colors",
            "checked:bg-[#1E3A8A] checked:border-[#1E3A8A]",
            className
          )}
          onChange={handleChange}
          {...props}
        />
        {label && (
          <label
            htmlFor={props.id}
            className="text-sm text-muted-foreground cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"

export { Checkbox }
