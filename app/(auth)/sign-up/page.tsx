"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { SocialLoginButton } from "@/components/ui/social-login-button";
import { useSignUp } from "@/hooks/use-sign-up";
import { UserType } from "@/types/auth";
import { initiateGoogleOAuth } from "@/utils/oauth";

// Animation variants
import { Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1], // cubic-bezier for easeOut
    },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.65, 0, 0.35, 1], // cubic-bezier for easeInOut
    },
  },
};

export default function SignUpPage() {
  const { form, isLoading, onSubmit } = useSignUp();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <motion.div
      className="min-h-screen flex flex-col sm:flex-row"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* Left side - Sign Up Form */}
      <motion.div
        className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white overflow-y-auto"
        variants={fadeIn}
      >
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <motion.div
            className="flex justify-center sm:justify-start mb-6"
            variants={item}
          >
            <Logo />
          </motion.div>

          {/* Header */}
          <motion.div
            className="text-center sm:text-left space-y-1"
            variants={item}
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Get Started
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details to create a new account
            </p>
          </motion.div>

          {/* Sign Up Form */}
          <motion.form
            onSubmit={onSubmit}
            className="space-y-4"
            variants={container}
          >
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={container}
            >
              {/* First Name */}
              <motion.div className="space-y-1.5" variants={item}>
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-foreground"
                >
                  First name
                </label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  {...register("firstName")}
                  className="h-10 text-sm"
                  aria-invalid={!!errors.firstName}
                />
                {errors.firstName && (
                  <motion.p
                    className="text-xs text-destructive"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {errors.firstName.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Last Name */}
              <motion.div className="space-y-1.5" variants={item}>
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-foreground"
                >
                  Last name
                </label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  {...register("lastName")}
                  className="h-10 text-sm"
                  aria-invalid={!!errors.lastName}
                />
                {errors.lastName && (
                  <motion.p
                    className="text-xs text-destructive"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {errors.lastName.message}
                  </motion.p>
                )}
              </motion.div>
            </motion.div>

            {/* User Type */}
            <motion.div className="space-y-1.5" variants={item}>
              <label
                htmlFor="userType"
                className="text-sm font-medium text-foreground"
              >
                User Type
              </label>
              <select
                id="userType"
                {...register("userType")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-invalid={!!errors.userType}
              >
                <option value="">Select your user type</option>
                <option value={UserType.FREELANCER}>Freelancer</option>
                <option value={UserType.CONTENT_CREATOR}>
                  Content Creator
                </option>
                <option value={UserType.SMALL_BUSINESS_OWNER}>
                  Small Business
                </option>
                <option value={UserType.STUDENT}>Student</option>
                <option value={UserType.OTHER}>Other</option>
              </select>
              {errors.userType && (
                <motion.p
                  className="text-xs text-destructive"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {errors.userType.message}
                </motion.p>
              )}
            </motion.div>

            {/* Email Address */}
            <motion.div className="space-y-1.5" variants={item}>
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email")}
                className="h-10 text-sm"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <motion.p
                  className="text-xs text-destructive"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {errors.email.message}
                </motion.p>
              )}
            </motion.div>

            {/* Create Password */}
            <motion.div className="space-y-1.5" variants={item}>
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Create Password
              </label>
              <PasswordInput
                id="password"
                placeholder="••••••••"
                {...register("password")}
                className="h-10 text-sm"
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <motion.p
                  className="text-xs text-destructive"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {errors.password.message}
                </motion.p>
              )}
            </motion.div>

            {/* Terms & Privacy Agreement */}
            <motion.div className="space-y-1.5 pt-2" variants={item}>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  {...register("agreedToTerms")}
                  className="w-4 h-4 mt-1 rounded border-input text-primary focus:ring-2 focus:ring-ring/50 cursor-pointer transition-colors checked:bg-[#1E3A8A] checked:border-[#1E3A8A]"
                />
                <label
                  htmlFor="terms"
                  className="text-xs sm:text-sm text-muted-foreground cursor-pointer"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-[#1E3A8A] hover:underline font-medium"
                  >
                    Terms & Privacy
                  </Link>
                </label>
              </div>
              {errors.agreedToTerms && (
                <motion.p
                  className="text-xs text-destructive"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {errors.agreedToTerms.message}
                </motion.p>
              )}
            </motion.div>

            {/* Sign Up Button */}
            <motion.div
              variants={item}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button
                type="submit"
                className="w-full h-10 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-sm font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Sign up"}
              </Button>
            </motion.div>

            {/* Divider */}
            <motion.div className="relative my-4" variants={item}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-input"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-xs text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </motion.div>

            {/* Google Sign In */}
            
              <Button
              as={motion.button}
                type="button"
                variant="outline"
                className="w-full h-10 text-sm flex items-center justify-center gap-2"
                onClick={initiateGoogleOAuth}
                disabled={isLoading}
              >
                <Image src="/google.svg" alt="" width={16} height={16} />
                <span>Continue with Google</span>
              </Button>
          
          </motion.form>

          {/* Login Link */}
          <motion.div className="text-center pt-2" variants={item}>
            <span className="text-sm text-muted-foreground">
              Already have an account?{" "}
            </span>
            <Link
              href="/login"
              className="text-sm text-[#1E3A8A] hover:underline font-medium"
            >
              Login
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Right side - Illustration (hidden on mobile) */}
      <motion.div
        className="hidden sm:flex flex-1 items-center justify-center bg-gradient-to-br from-blue-50 to-white p-8"
        variants={fadeIn}
      >
        <motion.div
          className="max-w-md text-center space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="relative w-full aspect-square max-w-sm mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ width: "100%", maxWidth: "500px" }}
          >
            <Image
              src="/illustration_two.svg"
              alt="Sign up illustration"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-gray-900">
              Get Ready for Nigeria's 2026 Tax Reforms
            </h2>
            <p className="text-gray-600">
              Stay ahead with our comprehensive tax solutions
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
