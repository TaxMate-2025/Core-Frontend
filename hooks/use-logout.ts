"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuthUser } from "./use-auth-user"

export function useLogout() {
  const router = useRouter()
  const { clearAuth } = useAuthUser()

  const logout = () => {
    try {
      clearAuth()
      // Clear auth data from sessionStorage
      sessionStorage.removeItem("authToken")
      sessionStorage.removeItem("user")

      // Show success message
      toast.success("Logged out successfully", {
        description: "You have been logged out of your account.",
      })

      // Redirect to root page
      router.push("/")
    } catch (error) {
      toast.error("Logout failed", {
        description: "An error occurred while logging out. Please try again.",
      })
    }
  }

  return { logout }
}
