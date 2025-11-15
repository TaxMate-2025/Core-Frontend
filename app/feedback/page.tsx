'use client'

import { useState } from 'react'
import { User, Mail, Phone, MessageSquare, Paperclip, ChevronDown, ChevronUp } from 'lucide-react'
import { toast } from 'sonner'
import Footer from '@/components/Footer'
import { MainNavbar } from '@/components/MainNavbar'

interface FAQItem {
    question: string
    answer: string
}

const faqs: FAQItem[] = [
    {
        question: 'Is my data stored, saved, or accessible to anyone when I use TaxMate?',
        answer: 'No — TaxMate does not collect, store, or transmit any tax information you enter. All calculations stay inside your browser and are never sent to external servers.'
    },
    {
        question: 'Are my tax inputs, calculations, and results completely private?',
        answer: 'Yes. Your tax data is processed locally on your device. We do not fetch, log, or monitor your data in any way.'
    },
    {
        question: 'How accurate are the tax results provided by TaxMate?',
        answer: 'TaxMate uses the latest Nigerian tax guidelines from FIRS. It is accurate for most income but it not meant to replace expert review. We may compute tax ahead of time.'
    },
    {
        question: 'Is TaxMate meant to replace a certified tax professional?',
        answer: 'No — TaxMate simplifies calculations and helps you understand your taxes, but please consult a CPA or tax lawyer for legal or complex tax filings.'
    }
]

export default function FeedbackPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        category: '',
        feedback: ''
    })
    const [openFAQ, setOpenFAQ] = useState<number | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Add your API call here
            await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
            toast.success('Feedback submitted successfully!', {
                description: 'Thank you for helping us improve TaxMate.'
            })
            setFormData({
                name: '',
                email: '',
                phone: '',
                category: '',
                feedback: ''
            })
        } catch (error) {
            toast.error('Failed to submit feedback', {
                description: 'Please try again later.'
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const toggleFAQ = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index)
    }

    return (
        <main>
            <MainNavbar />
            <div className="min-h-screen hero-gradient py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Feedback Form Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                Share Your Thoughts with Us!
                            </h1>
                            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
                                Since this is the early version of TaxMate, your ideas, suggestions, and issues help us shape a better and more reliable tax tool for everyone.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name and Phone Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your name"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Enter your phone number"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email and Category Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                                        required
                                    >
                                        <option value="">Select feedback category</option>
                                        <option value="bug">Bug Report</option>
                                        <option value="feature">Feature Request</option>
                                        <option value="improvement">Improvement</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Feedback Textarea */}
                            <div className="relative">
                                <MessageSquare className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                                <textarea
                                    name="feedback"
                                    value={formData.feedback}
                                    onChange={handleInputChange}
                                    placeholder="Write your feedback or insights here"
                                    rows={6}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                    required
                                />
                            </div>

                            {/* Add Attachment */}
                            <div className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-blue-600 transition-colors">
                                <Paperclip className="w-4 h-4" />
                                <span>Add attachment</span>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-medium py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : 'Send'}
                            </button>
                        </form>
                    </div>

                    {/* FAQs Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">FAQs</h2>
                        <p className="text-gray-600 text-sm mb-6">
                            Here are answers to common questions people ask about TaxMate.
                        </p>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-lg overflow-hidden transition-all"
                                >
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex items-start justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="font-medium text-gray-900 pr-4 flex-1">
                                            {faq.question}
                                        </span>
                                        <div className="shrink-0 w-6 h-6 bg-[#1E3A8A] rounded-full flex items-center justify-center">
                                            {openFAQ === index ? (
                                                <ChevronUp className="w-4 h-4 text-white" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4 text-white" />
                                            )}
                                        </div>
                                    </button>

                                    {openFAQ === index && (
                                        <div className="px-4 pb-4 pt-0">
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}