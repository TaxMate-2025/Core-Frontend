// components/ui/select.tsx
'use client'

import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface SelectItem {
  value: string
  label: string
}

interface SelectProps {
  value: string
  onChange: (value: string) => void
  items: SelectItem[]
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function Select({
  value,
  onChange,
  items,
  placeholder = 'Select an option',
  className = '',
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedItem = items.find(item => item.value === value)

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between px-3 py-2 text-left border rounded-md 
          bg-background hover:border-[#1E3A8A] focus:outline-none focus:ring-2 
          focus:ring-[#1E3A8A] focus:border-transparent disabled:opacity-50 
          disabled:cursor-not-allowed ${isOpen ? 'border-[#1E3A8A] ring-2 ring-[#1E3A8A]' : 'border-input'}
        `}
      >
        <span className="truncate">
          {selectedItem?.label || placeholder}
        </span>
        <ChevronDown 
          className={`h-4 w-4 text-muted-foreground transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-input rounded-md shadow-lg">
          <div className="py-1 max-h-60 overflow-auto">
            {items.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`
                  w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground
                  ${value === item.value ? 'bg-accent text-accent-foreground' : ''}
                `}
                onClick={() => {
                  onChange(item.value)
                  setIsOpen(false)
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}