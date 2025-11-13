"use client"

import Link from "next/link"
import Image from "next/image"
import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { SocialLoginButton } from "@/components/ui/social-login-button"
import { useSignUp } from "@/hooks/use-sign-up"
import { UserType } from "@/types/auth"

export default function SignUpPage() {
  const { form, isLoading, onSubmit } = useSignUp()
  const {
    register,
    formState: { errors },
  } = form

  return (
    <div className="min-h-screen flex">
      {/* Left side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-[400px] space-y-8">
          {/* Logo */}
          <div className="flex justify-start mb-10">
            <Logo />
          </div>

          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-[32px] font-bold text-foreground leading-tight">
              Get Started
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Enter your details to create a new account
            </p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            {/* First Name */}
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="text-sm md:text-base font-medium text-foreground"
              >
                First name
              </label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                {...register("firstName")}
                className="h-11"
                aria-invalid={errors.firstName ? "true" : "false"}
              />
              {errors.firstName && (
                <p className="text-sm md:text-base text-destructive">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="text-sm md:text-base font-medium text-foreground"
              >
                Last name
              </label>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                {...register("lastName")}
                className="h-11"
                aria-invalid={errors.lastName ? "true" : "false"}
              />
              {errors.lastName && (
                <p className="text-sm md:text-base text-destructive">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* User Type */}
            <div className="space-y-2">
              <label
                htmlFor="userType"
                className="text-sm md:text-base font-medium text-foreground"
              >
                User Type
              </label>
              <select
                id="userType"
                {...register("userType")}
                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm md:text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-invalid={errors.userType ? "true" : "false"}
              >
                <option value="">Select your user type</option>
                <option value={UserType.FREELANCER}>Freelancer</option>
                <option value={UserType.CONTENT_CREATOR}>Content Creator</option>
                <option value={UserType.SMALL_BUSINESS_OWNER}>Small Business Owner</option>
                <option value={UserType.STUDENT}>Student</option>
                <option value={UserType.OTHER}>Other</option>
              </select>
              {errors.userType && (
                <p className="text-sm md:text-base text-destructive">
                  {errors.userType.message}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm md:text-base font-medium text-foreground"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="h-11"
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="text-sm md:text-base text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Create Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm md:text-base font-medium text-foreground"
              >
                Create Password
              </label>
              <PasswordInput
                id="password"
                placeholder="Create strong password"
                {...register("password")}
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <p className="text-sm md:text-base text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Terms & Privacy Agreement */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  {...register("agreedToTerms")}
                  className="w-4 h-4 mt-0.5 rounded border-input text-primary focus:ring-2 focus:ring-ring/50 cursor-pointer transition-colors checked:bg-[#1E3A8A] checked:border-[#1E3A8A]"
                />
                <label
                  htmlFor="terms"
                  className="text-sm md:text-base text-muted-foreground cursor-pointer select-none"
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
                <p className="text-sm md:text-base text-destructive">
                  {errors.agreedToTerms.message}
                </p>
              )}
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-medium cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-input"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <SocialLoginButton
                provider="google"
                icon={<Image src="/google.svg" alt="" width={18} height={18} />}
              >
                Google
              </SocialLoginButton>
              <SocialLoginButton
                provider="apple"
                icon={<Image src="/apple.svg" alt="" width={18} height={18} />}
              >
                Apple
              </SocialLoginButton>
            </div>
          </form>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-sm md:text-base text-muted-foreground">
              Already have an account?{" "}
            </span>
            <Link
              href="/login"
              className="text-sm md:text-base text-[#1E3A8A] hover:underline font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-linear-to-b from-[#4C6EBF] to-[#1E3A8A] items-center justify-center p-12 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0">
          {/* Top rectangle */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#3B5BA5] opacity-40 rounded-[20px]"></div>
          {/* Bottom left shape */}
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#3B5BA5] opacity-40 rounded-tr-[100px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-md text-center">
          <h2 className="text-white text-3xl font-bold mb-12 leading-tight px-8">
            Get Ready for Nigeria's 2026
            <br />
            Tax Reforms
          </h2>

          {/* Illustration - Person with phone */}
          <div className="relative flex justify-center items-end h-[400px]">
            {/* Purple circle background */}
            <div className="absolute bottom-0 w-72 h-72 bg-[#B8A3D8] rounded-full opacity-70"></div>

            {/* Placeholder for illustration */}
            <div className="relative z-10 flex items-end justify-center h-full">
              {/* You can replace this with an actual illustration image */}
              <div className="text-white text-sm md:text-base opacity-75 mb-8">
                [Person with Phone Illustration]
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
