import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AnimatedSection } from "@/components/ui/animated-section";

export const metadata: Metadata = {
  title: 'About TaxMate | Tax Awareness & Education',
  description: 'Learn about TaxMate\'s mission to make Nigerian tax compliance easy, transparent, and accessible. Building a more informed Nigeria.',
  keywords: ['tax awareness', 'Nigerian tax system', 'tax education', 'tax compliance', 'TaxMate mission', 'Nigerian tax rights'],
  openGraph: {
    title: 'About TaxMate | Tax Awareness & Education',
    description: 'Learn about TaxMate\'s mission to make Nigerian tax compliance easy, transparent, and accessible. Building a more informed Nigeria.',
    url: 'https://taxmate.ng/about',
  },
  twitter: {
    title: 'About TaxMate | Tax Awareness & Education',
    description: 'Learn about TaxMate\'s mission to make Nigerian tax compliance easy, transparent, and accessible. Building a more informed Nigeria.',
  },
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen">
        {/* Hero Section */}
        <AnimatedSection 
          type="fade" 
          direction="up" 
          delay={0.2} 
          className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 hero_gradient"
        >
          <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
            <h1 className="text-[#1e3a8a] mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-7 sm:mb-9 leading-tight">
              About <span className="text-[#059669]">TaxMate</span>
            </h1>
            <p className="text-base sm:text-lg text-black mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Making tax compliance easy, transparent, and accessible for all Nigerians.
            </p>
          </div>
        </AnimatedSection>

        {/* Mission Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-6 sm:mb-8">
              Our Mission
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
              TaxMate is a Nigerian tax awareness and calculation platform designed to simplify the country's evolving tax system for both individuals and businesses. We help users understand their tax rights, obligations, deductions, and benefits through clear education and digital tools.
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
              Our mission is to make tax compliance easy, transparent, and accessible — building a more informed Nigeria where everyone can make smarter financial decisions.
            </p>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-6 sm:mb-8">
              What We Do
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#059669] mb-3">
                  For Individuals
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Individuals can instantly calculate their income tax, understand reliefs, and stay compliant. Our tools help you navigate the Nigerian tax system with confidence.
                </p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#059669] mb-3">
                  For Businesses
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Businesses can analyze revenue, expenses, and allowances to see real-time tax liabilities and plan better. We help you stay compliant with Nigeria's new tax regime.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-6 sm:mb-8">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div>
                <h3 className="text-xl font-semibold text-[#059669] mb-3">
                  Transparency
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  We believe in clear, honest communication about taxes and compliance.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#059669] mb-3">
                  Accessibility
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Making tax information and tools available to everyone, regardless of background.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#059669] mb-3">
                  Education
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Empowering Nigerians with knowledge to make informed financial decisions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}

