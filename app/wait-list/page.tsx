'use client';

import { WaitlistForm } from '@/components/forms/WaitlistForm';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

export default function WaitlistPage() {
  return (
    <div className={`${montserrat.className} min-h-screen bg-linear-to-b from-blue-50 to-white flex items-center justify-center p-4`}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Our Waitlist</h1>
          <p className="text-gray-600">
            Be among the first to experience our platform when we launch.
          </p>
        </div>

        <WaitlistForm />
      </div>
    </div>
  );
}
