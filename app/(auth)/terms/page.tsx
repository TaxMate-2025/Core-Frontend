
'use client';

import { MainNavbar } from '@/components/MainNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';
import { useState } from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-600">Privacy Policy</h2>
      <p className="text-gray-600">
        This Privacy Policy explains how TaxMate ("we", "our", or "the platform") collects, uses, and protects your 
        information. We are committed to transparency and respecting your privacy.
      </p>

      <div className="space-y-4">
        <Section title="1. Information We Collect">
          <p>
            TaxMate does not store or collect tax data entered into our calculators. All tax inputs remain on your device. 
            However, we may collect limited voluntary information through the following:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">Feedback Form Submissions:</span> If you choose to submit feedback, 
              we collect your name, email, and message.
            </li>
            <li>
              <span className="font-medium">Basic Device/Session Logs:</span> Standard logs automatically provided by 
              your browser (e.g., device type, browser version, approximate region). These do not include personal or 
              identifiable tax data.
            </li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use the information above strictly for the following:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Improving the accuracy and usefulness of our tools</li>
            <li>Fixing bugs and enhancing performance</li>
            <li>Responding to feedback or support requests</li>
          </ul>
        </Section>

        <Section title="3. How We Protect Your Data">
          <p>
            We do not process or store tax calculation inputs. Feedback data is securely handled and never shared with 
            third parties without your consent.
          </p>
        </Section>

        <Section title="4. Cookies & Tracking">
          <p>
            TaxMate does not use cookies to track personal data or calculation history. We may use minimal analytics 
            tools to understand app performance, but none collect sensitive user information.
          </p>
        </Section>

        <Section title="5. Third-Party Services">
          <p>
            We do not sell or share your personal data. Any third-party tools used (such as analytics or hosting) 
            follow strict privacy standards.
          </p>
        </Section>

        <Section title="6. Changes to This Policy">
          <p>
            We may update this Policy as we introduce new features. Any significant changes will be highlighted on 
            this page.
          </p>
        </Section>
      </div>
    </div>
  );
};

const TermsAndConditions = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-600">Terms & Conditions</h2>
      <p className="text-gray-600">
        These Terms govern your use of the TaxMate platform. By accessing TaxMate, you agree to the following conditions.
      </p>

      <div className="space-y-4">
        <Section title="1. Use of the Service">
          <p>
            TaxMate provides tax calculation tools for informational and educational purposes. You agree not to misuse 
            the platform or attempt to disrupt its functionality.
          </p>
        </Section>

        <Section title="2. Accuracy of Information">
          <p>
            While we strive for accuracy based on current Nigerian tax regulations, TaxMate does not guarantee 100% 
            accuracy and should not be considered a replacement for certified tax advice in complex cases.
          </p>
        </Section>

        <Section title="3. User Responsibility">
          <p>
            You are responsible for verifying your tax information before submission to FIRS or other authorities.
          </p>
        </Section>

        <Section title="4. Restrictions">
          <p>You may not:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Reverse-engineer or copy the platform's code.</li>
            <li>Use the platform for illegal activities.</li>
            <li>Attempt to scrape or harvest information from the site.</li>
          </ul>
        </Section>

        <Section title="5. Limitation of Liability">
          <p>
            TaxMate is provided "as-is" without warranties. We are not liable for any losses or damages resulting 
            from the use of the platform.
          </p>
        </Section>

        <Section title="6. Updates to These Terms">
          <p>
            We may revise these Terms as we expand the platform. Continued use of TaxMate constitutes acceptance of 
            any updates.
          </p>
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <div className="text-gray-600">{children}</div>
  </div>
);

export default function TermsPage() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Privacy Policy & <span className="text-blue-600">Terms of Use</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Your privacy and trust are important to us. Below is a clear breakdown of how TaxMate handles your 
              information and the terms for using our platform.
            </p>
          </div>

          <div className="space-y-16">
            <PrivacyPolicy />
            <TermsAndConditions />
          </div>
        </div>
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}