import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400",],
});

export const metadata: Metadata = {
  title: {
    default: 'TaxMate | Nigeria\'s Tax Awareness & Calculation Platform',
    template: '%s | TaxMate'
  },
  description: 'Simplify Nigerian taxes with TaxMate. Calculate, plan, and stay compliant with our easy-to-use tax tools.',
  keywords: ['TaxMate', 'Nigerian tax platform', 'tax awareness', 'tax calculation', 'income tax calculator', 'business tax', 'new tax regime', 'tax compliance', 'Nigerian tax system', 'tax education'],
  authors: [{ name: 'TaxMate Team' }],
  creator: 'TaxMate',
  publisher: 'TaxMate',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.taxmate.com.ng'),
  openGraph: {
    title: 'TaxMate | Nigeria\'s Tax Awareness & Calculation Platform',
    description: 'Simplify Nigerian taxes with TaxMate. Calculate, plan, and stay compliant with our easy-to-use tax tools.',
    url: 'https://www.taxmate.com.ng',
    siteName: 'TaxMate',
    locale: 'en_NG',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TaxMate - Nigeria\'s Tax Awareness & Calculation Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaxMate | Nigeria\'s Tax Awareness & Calculation Platform',
    description: 'Simplify Nigerian taxes with TaxMate. Calculate, plan, and stay compliant with our easy-to-use tax tools.',
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
        className={`${montserrat.className} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
