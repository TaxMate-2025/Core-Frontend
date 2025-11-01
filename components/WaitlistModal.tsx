"use client"

import { useState, useEffect, useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import { Inter } from "next/font/google"
import Image from "next/image"
import { AnimatePresence, motion, Variants } from "framer-motion"
import WAIT from '../public/waitlist-bg.png'

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ['latin']
})

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
      await new Promise(resolve => setTimeout(resolve, 1500));

      const response = await fetch("/api/waiting-list/join", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'DEV_FEST'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      toast({
        title: "Success!",
        description: "You have been added to the waitlist. Check your email for updates.",
      })

      setFormData({ name: "", email: "" })
      onClose()
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close modal
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const modalVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      // narrow the 'type' literal or cast the transition to avoid the TS incompatibility
      transition: {
        // 'as const' keeps this a literal instead of widening to string
        type: 'spring' as const,
        damping: 25,
        stiffness: 500,
      } as any,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            ref={modalRef}
            className="relative rounded-xl max-w-2xl w-full mx-4 overflow-hidden max-h-[90vh] shadow-2xl"
            variants={modalVariants}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={WAIT}
                alt="Background pattern"
                fill
                className="object-cover opacity-20"
                priority
              />
            </div>

            {/* Content Container with Glass Effect */}
            <div className="relative bg-white/95 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
                aria-label="Close modal"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-6 w-6" />
              </motion.button>

              <div className="relative p-6 sm:p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-4">
                    Join Our Waitlist
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Be among the first to experience Nigeria&apos;s smartest tax calculator when we launch in 2026.
                    Get updates, insights, and early access.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-0 md:flex md:gap-4 max-w-2xl mx-auto"
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
                    className="w-full md:w-auto px-8 h-[52px] flex items-center justify-center bg-[#1e3a8a] hover:bg-[#162e6c] text-base cursor-pointer"
                    disabled={loading}
                  >
                    {loading ? "Joining..." : "Join Waitlist"}
                  </Button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                  We respect your privacy. No spam, ever.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}