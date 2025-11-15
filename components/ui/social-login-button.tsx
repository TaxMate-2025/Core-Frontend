import * as React from "react"
import { cn } from "@/lib/utils"

export interface SocialLoginButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: "google" | "apple"
  icon?: React.ReactNode
}

const SocialLoginButton = React.forwardRef<
  HTMLButtonElement,
  SocialLoginButtonProps
>(({ className, provider, icon, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 h-11 px-4 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] cursor-pointer",
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children || provider}</span>
    </button>
  )
})

SocialLoginButton.displayName = "SocialLoginButton"

export { SocialLoginButton }
