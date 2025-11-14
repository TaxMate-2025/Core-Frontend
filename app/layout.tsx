import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600",],
});

export const metadata: Metadata = {
  title: {
    default: 'TaxMate - Smart Tax Solutions',
    template: '%s | TaxMate'
  },
  description: 'Simplify your tax calculations and financial planning with TaxMate. Know your taxes, secure your finances, and make informed financial decisions.',
  keywords: ['tax calculator', 'financial planning', 'tax management', 'personal finance', 'tax returns', 'tax savings'],
  authors: [{ name: 'TaxMate Team' }],
  creator: 'TaxMate',
  publisher: 'TaxMate',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://Taxmate.com.ng'),
  openGraph: {
    title: 'TaxMate - Smart Tax Solutions',
    description: 'Know your taxes, secure your finances with our intelligent tax calculation tools.',
    url: 'https://taxmate.com.ng',
    siteName: 'TaxMate',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // Add a proper OG image to your public folder
        width: 1200,
        height: 630,
        alt: 'TaxMate - Smart Tax Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaxMate - Smart Tax Solutions',
    description: 'Know your taxes, secure your finances with our intelligent tax calculation tools.',
    images: ['/twitter-image.jpg'],
    creator: '@TaxmateNG',
  },
  icons: {
    icon: '/main_logo.svg',
    apple: '/main_logo.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
