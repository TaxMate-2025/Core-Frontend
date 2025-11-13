"use client"

import Link from "next/link"
import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { SocialLoginButton } from "@/components/ui/social-login-button"
import { useLogin } from "@/hooks/use-login"

export default function LoginPage() {
  const { form, isLoading, onSubmit } = useLogin()
  const {
    register,
    formState: { errors },
  } = form

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-[400px] space-y-8">
          {/* Logo */}
          <div className="flex justify-start">
            <Logo />
          </div>

          {/* Welcome Text */}
          <div className="space-y-2">
            <h1 className="text-[32px] font-bold text-foreground leading-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password to access your account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
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
                className="h-11"
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
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
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  {...register("rememberMe")}
                  className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring/50 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-muted-foreground cursor-pointer select-none"
                >
                  Remember Me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-[#1E3A8A] hover:underline font-medium"
              >
                Forgot Your Password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-input"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-muted-foreground">
                  Or Sign in with
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <SocialLoginButton
                provider="google"
                icon={
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M17.64 9.20443C17.64 8.56625 17.5827 7.95262 17.4764 7.36353H9V10.8449H13.8436C13.635 11.9699 13.0009 12.9231 12.0477 13.5613V15.8194H14.9564C16.6582 14.2526 17.64 11.9453 17.64 9.20443Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z"
                      fill="#34A853"
                    />
                    <path
                      d="M3.96409 10.7098C3.78409 10.1698 3.68182 9.59301 3.68182 8.99983C3.68182 8.40664 3.78409 7.82983 3.96409 7.28983V4.95801H0.957273C0.347727 6.17301 0 7.54755 0 8.99983C0 10.4521 0.347727 11.8266 0.957273 13.0416L3.96409 10.7098Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z"
                      fill="#EA4335"
                    />
                  </svg>
                }
              >
                Google
              </SocialLoginButton>
              <SocialLoginButton
                provider="apple"
                icon={
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M14.4581 9.32812C14.4462 7.61719 15.3056 6.23438 17.0481 5.15625C16.1412 3.89062 14.7581 3.20312 12.9337 3.09375C11.1987 2.98438 9.33687 4.17188 8.62312 4.17188C7.87687 4.17188 6.21937 3.13125 4.88062 3.13125C2.11312 3.17812 -0.234375 5.22188 -0.234375 9.36562C-0.234375 10.5531 0.00187483 11.7769 0.471875 13.0369C1.09937 14.6944 3.27562 18.2813 5.53312 18.2081C6.79312 18.1725 7.71687 17.2419 9.34687 17.2419C10.9294 17.2419 11.7844 18.2081 13.1644 18.2081C15.4456 18.1731 17.4244 15.0094 18.0281 13.3481C14.8406 11.8369 14.4581 9.40312 14.4581 9.32812ZM11.9344 1.5975C13.2137 0.084375 13.1056 -1.36875 13.0706 -1.875C11.8931 -1.79531 10.5281 -1.04906 9.75562 -0.140625C8.90812 0.840625 8.37562 1.99687 8.49687 3.29063C9.78687 3.38438 10.9087 2.76562 11.9344 1.5975Z"
                      fill="black"
                    />
                  </svg>
                }
              >
                Apple
              </SocialLoginButton>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="text-center">
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
          <h2 className="text-white text-3xl font-bold mb-8 leading-tight">
            The simplest way to manage
            <br />
            your Taxes
          </h2>

          {/* Illustration - Person with phone */}
          <div className="relative flex justify-center">
            {/* Purple circle background */}
            <div className="w-64 h-64 bg-[#B8A3D8] rounded-full opacity-70"></div>

            {/* Placeholder for illustration */}
            <div className="absolute inset-0 flex items-end justify-center">
              {/* You can replace this with an actual illustration image */}
              <div className="text-white text-sm opacity-75">
                [Person Illustration]
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
