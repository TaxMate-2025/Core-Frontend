"use client"

import { useEffect, useState, useCallback } from "react"
import type { User } from "@/types/auth"

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Helper function to get from both storages
  const getFromStorage = (key: string): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(key) || sessionStorage.getItem(key)
  }

  useEffect(() => {
    try {
      if (typeof window === 'undefined') {
        setIsLoading(false)
        return
      }

      // Get user data from either storage
      const userJson = getFromStorage("user")
      const token = getFromStorage("authToken")

      if (userJson && token) {
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

  // Gets the authentication token from either storage
  const getToken = useCallback((): string | null => {
    return getFromStorage('authToken')
  }, [])

  // Function to set both user and token
  const setAuth = useCallback((userData: User, token: string, rememberMe = false) => {
    const storage = rememberMe ? localStorage : sessionStorage
    storage.setItem('user', JSON.stringify(userData))
    storage.setItem('authToken', token)
    setUser(userData)
  }, [])

  // Function to clear auth from both storages
  const clearAuth = useCallback(() => {
  (['localStorage', 'sessionStorage'] as const).forEach((storageType) => {
    try {
      const storage = window[storageType];
      storage.removeItem('user');
      storage.removeItem('authToken');
    } catch (e) {
      console.error(`Error clearing ${storageType}:`, e);
    }
  });
  setUser(null);
}, []);

  return { 
    user, 
    isLoading, 
    getToken,
    setAuth,
    clearAuth
  }
}