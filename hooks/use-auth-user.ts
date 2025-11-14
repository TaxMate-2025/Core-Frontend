"use client"

import { useEffect, useState } from "react"
import type { User } from "@/types/auth"

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      // Get user data from sessionStorage
      const userJson = sessionStorage.getItem("user")

      if (userJson) {
        const userData = JSON.parse(userJson) as User
        setUser(userData)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { user, isLoading }
}
