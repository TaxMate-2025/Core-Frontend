"use client"

import { useRouter } from "next/navigation"
import { useToast } from "./use-toast"

export function useLogout() {
  const router = useRouter()
  const { toast } = useToast()

  const logout = () => {
    try {
      // Clear auth data from sessionStorage
      sessionStorage.removeItem("authToken")
      sessionStorage.removeItem("user")

      // Show success message
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      })

      // Redirect to root page
      router.push("/")
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out. Please try again.",
        variant: "destructive",
      })
    }
  }

  return { logout }
}
