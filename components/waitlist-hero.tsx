"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "./ui/button"
import { Inter } from "next/font/google"

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ['latin']
})

export function WaitlistHero() {
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your full name",
        variant: "destructive",
      })
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      // TODO: send POST request to backend API: /api/waitlist
      // await fetch("/api/waitlist", {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })

      toast({
        title: "Success!",
        description: "You have been added to the waitlist. Check your email for updates.",
      })

      setFormData({ name: "", email: "" })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={`${inter.className} relative min-h-[80vh] flex items-center justify-center bg-white py-16 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1e3a8a] mb-6">
            Join Our Waitlist
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Be among the first to experience Nigeria's smartest tax calculator when we launch in 2026. 
            Get updates, insights, and early access.
          </p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="max-w-2xl mx-auto space-y-4 md:space-y-0 md:flex md:gap-4"
        >
          <div className="flex-1 space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all"
              disabled={loading}
            />
          </div>

          <div className="flex-1 space-y-2">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all"
              disabled={loading}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full md:w-auto px-8 py-3 bg-[#1e3a8a] hover:bg-[#162e6c] text-base"
            disabled={loading}
          >
            {loading ? "Joining..." : "Join Waitlist"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </section>
  )
}
