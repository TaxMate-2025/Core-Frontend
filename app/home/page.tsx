"use client";

import { useState, useEffect } from "react";
import {
  Calculator,
  TrendingUp,
  Building2,
  ArrowRight,
  Zap,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CalculatorCard } from "@/components/CalculatorCard";
import { MainNavbar } from "@/components/MainNavbar";
import Footer from "@/components/Footer";
import { UpgradeModal } from "@/components/UpgradeModal";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import layout_grid from "../../public/layout_grid.svg";
import { useAuthUser } from "@/hooks/use-auth-user";
import { cn } from "@/lib/utils";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeatureBadge = ({ children }: { children: React.ReactNode }) => (
  <motion.span
    className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full"
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.3 }}
  >
    <Zap className="w-3 h-3" />
    {children}
  </motion.span>
);

const PremiumBadge = () => (
  <motion.div
    className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 shadow-lg shadow-blue-500/20"
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    Premium
  </motion.div>
);

export default function HomePage() {
  const { user } = useAuthUser();
  const router = useRouter();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedCalculator, setSelectedCalculator] = useState<
    "advanced" | "business" | null
  >(null);
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if user is on BASIC tier (uppercase)
  const isBasicTier = user?.Tier === "BASIC";

  const handleCalculatorClick = (
    calculatorType: "simple" | "advanced" | "business"
  ) => {
    if (calculatorType === "simple") {
      router.push("/simple-tax-calculator");
      return;
    }

    if (isBasicTier) {
      setSelectedCalculator(calculatorType);
      setShowUpgradeModal(true);
      return;
    }

    router.push(`/${calculatorType}-tax-calculator`);
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar />

      <AnimatePresence>
        {showUpgradeModal && (
          <UpgradeModal
            isOpen={showUpgradeModal}
            onClose={() => setShowUpgradeModal(false)}
            calculatorType={selectedCalculator}
            getToken={
              user
                ? () =>
                  localStorage.getItem("authToken") ||
                  sessionStorage.getItem("authToken")
                : () => null
            }
          />
        )}
      </AnimatePresence>

      <main className="relative flex-1">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <Image
            src={layout_grid}
            alt="background_layout_grid"
            fill
            className="object-cover opacity-[0.03]"
            priority
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
          <motion.div
            className="text-center max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Smart Tax <span className="text-blue-600">Calculations</span>
              <br />
              <span className="text-xl md:text-2xl font-normal text-gray-600 mt-2 block">
                How is it going today {user?.firstName || "You"} 👋
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the right calculator for your needs and get accurate tax
              estimates in seconds.
            </p>
          </motion.div>

          {/* Calculator Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Simple Calculator */}
            <motion.div variants={item}>
              <CalculatorCard
                icon={Calculator}
                title="Simple Calculator"
                description="Ideal for individuals and salaried employees. Get quick PAYE estimates with minimal inputs."
                onClick={() => handleCalculatorClick("simple")}
                className="h-full hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                iconClassName="bg-blue-50 text-blue-600"
                buttonVariant="default"
              />
            </motion.div>

            {/* Advanced Calculator */}
            <motion.div variants={item}>
              <Link href={'/advanced-tax-calculator'} className="relative h-full">
                <CalculatorCard
                  icon={TrendingUp}
                  title="Advanced Calculator"
                  description="For multiple income sources, deductions, and allowances. Get precise tax estimates."
                  onClick={() => handleCalculatorClick("advanced")}
                  className={cn(
                    "h-full border-2 border-transparent hover:border-blue-100 hover:shadow-lg transition-all duration-300",
                    isBasicTier && "opacity-100"
                  )}
                  iconClassName="bg-purple-50 text-purple-600"
                  buttonVariant={isBasicTier ? "outline" : "default"}
                  buttonText={isBasicTier ? "Upgrade to Unlock" : "Get Started"}
                />
                {isBasicTier && <PremiumBadge />}
              </Link>
            </motion.div>

            {/* Business Calculator */}
            <motion.div variants={item} className="md:col-span-2 lg:col-span-1">
              <Link href={'/business-tax-calculator'} className="relative h-full">
                <CalculatorCard
                  icon={Building2}
                  title="Business Calculator"
                  description="Tailored for SMEs and companies. Calculate CIT with revenue, expenses, and reliefs."
                  onClick={() => handleCalculatorClick("business")}
                  className={cn(
                    "h-full border-2 border-transparent hover:border-blue-100 hover:shadow-lg transition-all duration-300",
                    isBasicTier && "opacity-100"
                  )}
                  iconClassName="bg-amber-50 text-amber-600"
                  buttonVariant={isBasicTier ? "outline" : "default"}
                  buttonText={isBasicTier ? "Upgrade to Unlock" : "Get Started"}
                />
                {isBasicTier && <PremiumBadge />}
              </Link>
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">
                  Need help with complex tax scenarios?
                </h3>
                <p className="text-sm text-gray-600">
                  Our tax experts are here to help you optimize your tax
                  strategy.
                </p>
              </div>
              <a
                href="mailto:info@taxmate.com.ng?subject=TaxMate%20Support%20Request&body=Hello%20TaxMate%20Team,%0D%0A%0D%0AI%20need%20assistance%20with:%0D%0A%0D%0A%0D%0ABest%20regards,"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm whitespace-nowrap transition-colors"
                onClick={(e) => {
                  // Optional: Add analytics tracking here
                  // trackEvent('contact_support_clicked');
                }}
              >
                Contact Support
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
