"use client"

import Link from "next/link"
import Image from "next/image"
import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SocialLoginButton } from "@/components/ui/social-login-button"
import { useForgotPassword } from "@/hooks/use-forgot-password"
import { Loader2, CheckCircle } from "lucide-react"
import IllustrationPanel from "@/components/IllustrationPanel"

export default function ForgotPasswordPage() {
  const { form, isLoading, successMessage, onSubmit } = useForgotPassword();

  const {
    register,
    formState: { errors },
  } = form;
  return (
    <div className="min-h-screen flex">
      {/* Left side - Forgot Password Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-[400px] space-y-8">
          <div className="flex justify-start mb-10">
            <Logo />
          </div>

          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-[32px] font-bold text-foreground leading-tight">
              Forgot Password?
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Input your email address to receive a one-time code
              <br />
              to reset your password
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-green-800 font-medium">{successMessage}</p>
                <p className="text-green-700 text-sm mt-1">
                  Please check your email for the reset link.
                </p>
              </div>
            </div>
          )}

          {/* Forgot Password Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm md:text-base font-medium text-foreground"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="lamfarukdeyemi@gmail.com"
                className="h-11"
                disabled={isLoading}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Continue Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-medium cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Continue"
              )}
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

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="text-sm md:text-base text-muted-foreground">
              Don't have an account?{" "}
            </span>
            <Link
              href="/sign-up"
              className="text-sm md:text-base text-[#1E3A8A] hover:underline font-medium"
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
