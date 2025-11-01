import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'TaskMate - Smart Tax Solutions',
    template: '%s | TaskMate'
  },
  description: 'Simplify your tax calculations and financial planning with TaskMate. Know your taxes, secure your finances, and make informed financial decisions.',
  keywords: ['tax calculator', 'financial planning', 'tax management', 'personal finance', 'tax returns', 'tax savings'],
  authors: [{ name: 'TaskMate Team' }],
  creator: 'TaskMate',
  publisher: 'TaskMate',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://taskmate.com.ng'),
  openGraph: {
    title: 'TaskMate - Smart Tax Solutions',
    description: 'Know your taxes, secure your finances with our intelligent tax calculation tools.',
    url: 'https://taskmate.com.ng',
    siteName: 'TaskMate',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // Add a proper OG image to your public folder
        width: 1200,
        height: 630,
        alt: 'TaskMate - Smart Tax Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaskMate - Smart Tax Solutions',
    description: 'Know your taxes, secure your finances with our intelligent tax calculation tools.',
    images: ['/twitter-image.jpg'],
    creator: '@TaskmateNG',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
