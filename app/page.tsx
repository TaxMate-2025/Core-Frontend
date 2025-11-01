import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProcessCard from "@/components/ProcessCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Inter, Montserrat } from "next/font/google";
import Image from "next/image";
import UNION from '../public/Union.png'


const inter = Inter({
  subsets: ['latin']
})

const montserrat = Montserrat({
  weight: "400",
  subsets: ['latin']
})

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className={`${montserrat.className}`}>
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 h-[100vh] hero_gradient">
          <Image src={UNION} alt="union" className="absolute inset-0 mx-auto opacity-20" />

          <div className="max-w-4xl mx-auto text-center">
            {/* Main Heading */}
            <h1 className=" text-[#1e3a8a] mx-auto text-5xl sm:text-6xl md:text-8xl font-semibold mb-6 w-[100%]">
              Master your <span className="text-[#059669]">Taxes</span> with ease
            </h1>

            {/* Description */}
            <p className="text-lg text-black mb-8 leading-relaxed">
              Get ready for the 2026 Nigerian tax reform. Our calculator helps individuals, freelancers, and businesses
              calculate taxes accurately while staying compliant with the new tax model.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-[#1e3a8a] hover:bg-[#162e5c] text-white px-8 py-6 text-base flex items-center gap-2">
                Get Started Free
                <ArrowUpRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="bg-white shadow-[box-shadow: 0px 4px 12px 0px #0000001F] px-8 py-6 text-base">
                Learn more
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="absolute top-[70%] left-0 right-0 z-10 mx-auto max-w-[70%] px-4 sm:px-6 lg:px-8 py-20 rounded-xl bg-white shadow-custom">
          <div>
            <div className="mb-16 flex justify-around">
              {/* Left Section */}
              <div className="flex-shrink-0">
                <h2 className="text-3xl font-bold text-[#16a34a]">How it works</h2>
              </div>

              {/* Right Section */}
              <div className="w-[45%]">
                <p className="text-lg text-gray-600 leading-relaxed">
                  With just a few inputs, our system automates the complex calculations, gives you clear breakdowns, and
                  ensures your filings match the 2026 standards.
                </p>
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ProcessCard
                number="1"
                title="Choose Your Category"
                description="Select if you're an individual, freelancer, or business owner."
              />
              <ProcessCard
                number="2"
                title="Input Your Details"
                description="Enter your income, deductions, and any relevant tax data."
              />
              <ProcessCard
                number="3"
                title="Get Instant Results"
                description="View your estimated tax break-down and personalized insights."
              />
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="px-4 sm:px-6 lg:px-8 mt-60 py-20 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#1e3a8a] mb-8 leading-tight">
              TaxMate is built for Nigerians navigating the new tax era.
            </h2>

            <p className="text-lg text-black leading-relaxed">
              From precise computation to compliance monitoring, our system adapts to your needs — helping you save time,
              reduce errors, and make better financial decisions.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-[#1e3a8a] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-4">Be Tax Ready for 2026</h2>

            <p className="mx-auto text-lg mb-8 tracking-normal leading-[32px] w-[70%]">
              Tax reforms are coming — don't be left behind. Get early access and exclusive tools to simplify your tax
              filing and management process.
            </p>

            <Button className="bg-white cursor-pointer hover:bg-gray-100 text-[#1e3a8a] font-semibold px-8 py-6 text-base">
              Join the Waitlist Now
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
