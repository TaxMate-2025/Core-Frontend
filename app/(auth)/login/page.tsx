"use client"

import Link from "next/link"
import Image from "next/image"
import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { SocialLoginButton } from "@/components/ui/social-login-button"
import { useLogin } from "@/hooks/use-login"
import IllustrationPanel from "@/components/IllustrationPanel"
import { initiateGoogleOAuth, initiateAppleOAuth } from "@/utils/oauth"

export default function LoginPage() {
  const { form, isLoading, onSubmit } = useLogin()
  const {
    register,
    formState: { errors },
  } = form

  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-[400px] space-y-6 sm:space-y-8">
          {/* Logo */}
          <div className="flex justify-center sm:justify-start mb-6 sm:mb-10">
            <Logo />
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#041E21] leading-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password to access your account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="h-10 text-sm"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </label>
              <PasswordInput
                id="password"
                placeholder="Input your password"
                {...register("password")}
                className="h-10 text-sm"
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 pt-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  {...register("rememberMe")}
                  className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring/50 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="text-xs sm:text-sm text-muted-foreground cursor-pointer select-none"
                >
                  Remember Me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-xs sm:text-sm text-[#1E3A8A] hover:underline font-medium"
              >
                Forgot Your Password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-10 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white text-sm font-medium cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </Button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-input"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-xs text-muted-foreground">
                  Or Sign in with
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex flex-1 items-center justify-center">
              <SocialLoginButton
                provider="google"
                icon={<Image src="/google.svg" alt="" width={18} height={18} />}
                onClick={initiateGoogleOAuth}
                className="text-sm"
              >
                Continue with Google
              </SocialLoginButton>
              {/* <SocialLoginButton
                provider="apple"
                icon={<Image src="/apple.svg" alt="" width={18} height={18} />}
                onClick={initiateAppleOAuth}
                className="text-sm"
              >
                Continue with Apple
              </SocialLoginButton> */}
              
                
              </div>
          </form>

          {/* Sign Up Link */}
          <div className="text-center pt-2">
            <span className="text-sm text-muted-foreground">
              Don't have an account?{" "}
            </span>
            <Link
              href="/sign-up"
              className="text-sm text-[#1E3A8A] hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <IllustrationPanel
        imageSrc="/illustration_one.svg"
        imageAlt="Login illustration"
        title="The simplest way to manage"
        subtitle="your Taxes"
      />
    </div>
  )
}
