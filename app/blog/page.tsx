import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AnimatedSection } from "@/components/ui/animated-section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: 'Tax Blog & Guides | TaxMate Nigeria',
  description: 'Stay updated with the latest Nigerian tax news, tips, and guides. Learn about the new tax regime, income tax updates, and tax compliance strategies.',
  keywords: ['new tax regime', 'income tax updates', 'tax tips', 'Nigerian tax laws', 'tax guides', 'tax blog Nigeria', 'tax compliance'],
  openGraph: {
    title: 'Tax Blog & Guides | TaxMate Nigeria',
    description: 'Stay updated with the latest Nigerian tax news, tips, and guides. Learn about the new tax regime, income tax updates, and tax compliance strategies.',
    url: 'https://taxmate.ng/blog',
  },
  twitter: {
    title: 'Tax Blog & Guides | TaxMate Nigeria',
    description: 'Stay updated with the latest Nigerian tax news, tips, and guides. Learn about the new tax regime, income tax updates, and tax compliance strategies.',
  },
};

export default function BlogPage() {
  // This is a placeholder structure. You can add actual blog posts later
  const blogPosts = [
    {
      id: 1,
      title: "Understanding the New Tax Regime in Nigeria",
      excerpt: "Learn about the latest changes to Nigeria's tax system and how they affect individuals and businesses.",
      date: "2024-01-15",
      slug: "understanding-new-tax-regime-nigeria",
    },
    {
      id: 2,
      title: "Income Tax Reliefs and Allowances: A Complete Guide",
      excerpt: "Discover all the tax reliefs and allowances available to Nigerian taxpayers and how to claim them.",
      date: "2024-01-10",
      slug: "income-tax-reliefs-allowances-guide",
    },
    {
      id: 3,
      title: "Business Tax Planning Under the New Tax Regime",
      excerpt: "Essential strategies for businesses to optimize their tax planning and stay compliant with new regulations.",
      date: "2024-01-05",
      slug: "business-tax-planning-new-regime",
    },
  ];

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
              Tax <span className="text-[#059669]">Blog</span> & Guides
            </h1>
            <p className="text-base sm:text-lg text-black mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Stay informed about Nigerian tax laws, updates, and best practices for tax compliance.
            </p>
          </div>
        </AnimatedSection>

        {/* Blog Posts Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-6 sm:mb-8">
              Latest Articles
            </h2>
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <article 
                  key={post.id}
                  className="border-b border-gray-200 pb-8 last:border-b-0"
                >
                  <h3 className="text-2xl sm:text-3xl font-semibold text-[#1e3a8a] mb-3 hover:text-[#059669] transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {new Date(post.date).toLocaleDateString('en-NG', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-[#059669] hover:text-[#047857] font-semibold transition-colors"
                  >
                    Read more
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-6 sm:mb-8">
              Browse by Topic
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-[#059669] mb-2">
                  New Tax Regime
                </h3>
                <p className="text-sm text-gray-600">
                  Latest updates on Nigeria's tax reforms
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-[#059669] mb-2">
                  Income Tax Tips
                </h3>
                <p className="text-sm text-gray-600">
                  Practical advice for individual taxpayers
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-[#059669] mb-2">
                  Business Tax
                </h3>
                <p className="text-sm text-gray-600">
                  Guides for business tax compliance
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

