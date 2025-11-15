import { Button } from "@/components/ui/button"
import { Inter } from "next/font/google"
import { Logo } from "./Logo"
import Link from "next/link";
import { CircleUserRound } from "lucide-react";

const inter = Inter({
  weight: "500",
  subsets: ['latin']
})

const Navbar = () => {
  return (
    <header className={`${inter.className} sticky top-0 z-50 bg-transparent backdrop-blur-xl`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Logo />

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 hover:text-[#1e3a8a] font-medium text-base md:text-lg">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-[#1e3a8a] font-medium text-base md:text-lg">
            About
          </Link>
        </div>

        {/* Log in Button */}
        <div className="flex space-x-5">
          <Button
            className="bg-[#1e3a8a] hover:bg-[#162e5c] cursor-pointer text-white"
          >
            <Link href="/login" className="flex items-center gap-1">
              <CircleUserRound />
              Sign In
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}


export default Navbar