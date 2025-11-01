import { Button } from "@/components/ui/button"
import Image from "next/image"
import LOGO from '../public/main_logo.svg'
import { Inter } from "next/font/google"
import Link from "next/link"

interface NavbarProps {
  onJoinWaitlist: (e: React.MouseEvent) => void;
}

const inter = Inter({
    weight: "500",
    subsets: ['latin']
})

const Navbar = ({ onJoinWaitlist }: NavbarProps) => {
    return (
        <header className={`${inter.className} sticky top-0 z-50 bg-transparent backdrop-blur-xl`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href={''} className="cursor-pointer">
                    <Image src={LOGO} alt="TaxMate_Logo" width={140} height={140} />
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#" className="text-gray-700 hover:text-[#1e3a8a] font-medium text-base md:text-lg">
                        Home
                    </a>
                    <a href="#" className="text-gray-700 hover:text-[#1e3a8a] font-medium text-base md:text-lg">
                        Features
                    </a>
                    <a href="#" className="text-gray-700 hover:text-[#1e3a8a] font-medium text-base md:text-lg">
                        How It Works
                    </a>
                    <button 
                      onClick={onJoinWaitlist}
                      className="text-gray-700 hover:text-[#1e3a8a] font-medium text-base md:text-lg bg-transparent border-none p-0 cursor-pointer"
                    >
                      Waitlist
                    </button>
                </div>

                {/* Join Waitlist Button */}
                <Button 
                  onClick={onJoinWaitlist}
                  className="bg-[#1e3a8a] hover:bg-[#162e5c] cursor-pointer text-white"
                >
                  Join Waitlist
                </Button>
            </nav>
        </header>
    )
}


export default Navbar