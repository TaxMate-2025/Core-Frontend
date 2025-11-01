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

import { useRouter } from 'next/navigation';

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const router = useRouter();

  // Redirect to the waitlist page and close the modal
  const handleJoinWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    router.push('/wait-list');
  };

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
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 500,
      } as const,
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
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                    Be among the first to experience Nigeria&apos;s smartest tax calculator when we launch in 2026.
                    Get updates, insights, and early access.
                  </p>
                  <Button 
                    onClick={handleJoinWaitlist}
                    className="px-8 py-6 text-lg bg-[#1e3a8a] hover:bg-[#162e6c]"
                    size="lg"
                  >
                    Join the Waitlist
                  </Button>
                </div>

                <p className="text-center text-sm text-gray-500">
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