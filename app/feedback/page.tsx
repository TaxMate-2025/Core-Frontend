// app/feedback/page.tsx
'use client';

import { useState } from 'react';
import { User, Mail, Phone, MessageSquare, Paperclip, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';
import { useFeedback } from '@/hooks/useFeedback';
import Footer from '@/components/Footer';
import { MainNavbar } from '@/components/MainNavbar';

const CATEGORIES = [
  { value: 'GENERAL', label: 'General Feedback' },
  { value: 'BUG_REPORT', label: 'Bug Report' },
  { value: 'FEATURE_REQUEST', label: 'Feature Request' },
  { value: 'COMPLAINT', label: 'Complaint' },
  { value: 'COMPLIMENT', label: 'Compliment' },
  { value: 'OTHER', label: 'Other' },
] as const;

interface FAQItem {
  question: string;
  answer: string;
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
];

export default function FeedbackPage() {
  const { submitFeedback, isLoading } = useFeedback();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    category: 'GENERAL' as const,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitFeedback(formData);
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        category: 'GENERAL',
        message: ''
      });
    } catch (error) {
      // Error is already handled in the hook
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">We'd Love to Hear From You</h1>
            <p className="mt-3 text-xl text-gray-500">
              Your feedback helps us improve our service
            </p>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                      Phone Number (Optional)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      {CATEGORIES.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Your Message
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute top-3 left-3">
                        <MessageSquare className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        minLength={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Share your thoughts with us..."
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Minimum 5 characters</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white shadow overflow-hidden rounded-lg">
                  <button
                    type="button"
                    className="w-full px-4 py-5 sm:px-6 text-left focus:outline-none"
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                      <span className="ml-6 h-7 flex items-center">
                        {expandedFaq === index ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </span>
                    </div>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-5 sm:px-6">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}