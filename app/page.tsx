"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProcessCard from "@/components/ProcessCard";
import { WaitlistModal } from "@/components/WaitlistModal";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Inter, Montserrat } from "next/font/google";
import Image from "next/image";
import UNION from '../public/Union.png';
import { AnimatedSection } from "@/components/ui/animated-section";

const inter = Inter({
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const openWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWaitlistOpen(true);
  };

  return (
    <main>
      <Navbar onJoinWaitlist={openWaitlist} />
      <div className={`${montserrat.className}`}>
        <WaitlistModal
          isOpen={isWaitlistOpen}
          onClose={() => setIsWaitlistOpen(false)}
        />
        {/* Hero Section */}
        <AnimatedSection type="fade" direction="up" delay={0.2} className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 hero_gradient">
          <div className="absolute inset-0">
            <Image
              src={UNION}
              alt="background pattern"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10 px-4 mb:10 md:mb-0 sm:px-6 w-full">
            {/* Main Heading */}
            <h1 className="text-[#1e3a8a] mx-auto text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold mb-7 sm:mb-9 leading-tight">
              Master your <span className="text-[#059669]">Taxes</span> with
              ease
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-black mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Get ready for the 2026 Nigerian tax reform. Our calculator helps
              individuals, freelancers, and businesses calculate taxes
              accurately while staying compliant with the new tax model.
            </p>

            {/* CTA Buttons */}
            <AnimatedSection type="fade" direction="up" delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button 
                onClick={openWaitlist}
                className="bg-[#1e3a8a] hover:bg-[#162e5c] text-white px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base flex items-center gap-2 cursor-pointer"
              >
                Get Started Free
                <ArrowUpRight className="w-4 h-4" />
              </Button>
              <Button
                onClick={openWaitlist}
                variant="outline"
                className="bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base cursor-pointer"
              >
                Learn more
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </AnimatedSection>
          </div>
        </AnimatedSection>

        {/* How it works */}
        <AnimatedSection 
          type="fade"
          direction="up"
          delay={0.2}
          className="relative z-10 mx-auto w-full sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[70%] px-4 sm:px-6 lg:px-8 -mt-50 sm:-mt-16 md:-mt-12 lg:-mt-8 mb-5 sm:mb-10 md:mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-12 lg:p-16 mt-15 md:mt-0">
            <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 mb-12 md:mb-16">
              <div className="md:w-1/3 lg:w-1/4">
                <AnimatedSection type="fade" direction="right" delay={0.3}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#16a34a] mb-4">
                    How it works
                  </h2>
                </AnimatedSection>
              </div>
              <div className="md:w-2/3 lg:w-3/4">
                <AnimatedSection type="fade" direction="left" delay={0.4}>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    With just a few inputs, our system automates the complex
                    calculations, gives you clear breakdowns, and ensures your
                    filings match the 2026 standards.
                  </p>
                </AnimatedSection>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <AnimatedSection type="fade" direction="up" delay={0.2}>
                <ProcessCard
                  number="1"
                  title="Choose Your Category"
                  description="Select if you're an individual, freelancer, or business owner."
                />
              </AnimatedSection>
              <AnimatedSection type="fade" direction="up" delay={0.3}>
                <ProcessCard
                  number="2"
                  title="Input Your Details"
                  description="Enter your income, deductions, and any relevant tax data."
                />
              </AnimatedSection>
              <AnimatedSection type="fade" direction="up" delay={0.4}>
                <ProcessCard
                  number="3"
                  title="Get Instant Results"
                  description="View your estimated tax break-down and personalized insights."
                />
              </AnimatedSection>
            </div>
          </div>
        </AnimatedSection>

        {/* Value Proposition */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-6 sm:mb-8 leading-tight">
              TaxMate is built for Nigerians navigating the new tax era.
            </h2>

            <p className="text-base sm:text-lg text-black leading-relaxed max-w-3xl mx-auto">
              From precise computation to compliance monitoring, our system
              adapts to your needs — helping you save time, reduce errors, and
              make better financial decisions.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-[#1e3a8a] text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 sm:mb-6">
              Be Tax Ready for 2026
            </h2>

            <p className="mx-auto text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed max-w-2xl">
              Tax reforms are coming — don&apos;t be left behind. Get early access
              and exclusive tools to simplify your tax filing and management
              process.
            </p>

            <Button
              onClick={openWaitlist}
              className="bg-white hover:bg-gray-100 text-[#1e3a8a] font-semibold px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base transition-colors duration-200 cursor-pointer"
            >
              Join the Waitlist Now
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
