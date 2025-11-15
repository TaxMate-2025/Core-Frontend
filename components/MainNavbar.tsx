"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { useLogout } from "@/hooks/use-logout";
import { useAuthUser } from "@/hooks/use-auth-user";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: "500",
  subsets: ['latin']
})

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const NavLink = ({
  href,
  children,
  isActive,
  onClick,
  className = "",
}: NavLinkProps & { className?: string }) => (
  <Link
    href={href}
    onClick={onClick}
    className={`${isActive ? "text-[#1E3A8A]" : "text-foreground"
      } font-medium text-sm md:text-base hover:text-[#1E3A8A]/80 transition-colors ${className}`}
  >
    {children}
  </Link>
);

export function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePath, setActivePath] = useState("");
  const { logout } = useLogout();
  const { user } = useAuthUser();

  // Set initial active path on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setActivePath(window.location.pathname);
    }, 0);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { href: "/home", label: "Calculator" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/payment", label: "Payment" },
    { href: "/feedback", label: "Feedback" },
  ];

  return (
    <header
      className={`${inter.className} sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 shadow-sm" : "bg-white"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                isActive={activePath === item.href}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={logout}
              className="bg-[#1e3a8a] hover:bg-[#162e5c] hover:text-white cursor-pointer text-white"
            >
              Log Out
            </Button>
            <button className="w-9 h-9 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white hover:bg-[#1E3A8A]/90 transition-colors">
              <User className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#1E3A8A] focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                isActive={activePath === item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-4 pb-2 border-t border-gray-200 mt-2 space-y-2">
              {user && (
                <div className="px-3 py-2 text-sm font-medium text-foreground">
                  Welcome Back, {user.firstName}
                </div>
              )}
              <Button
                onClick={logout}
                className="w-full bg-[#1e3a8a] hover:bg-[#162e5c] cursor-pointer text-white"
              >
                Log Out
              </Button>
              <button className="w-full h-11 rounded-md bg-[#1E3A8A] flex items-center justify-center text-white hover:bg-[#1E3A8A]/90 transition-colors">
                <User className="w-4 h-4 mr-2" />
                My Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
