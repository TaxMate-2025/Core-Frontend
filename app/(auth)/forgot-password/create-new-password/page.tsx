"use client"

import { Suspense } from "react"
import Link from "next/link"
import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/ui/password-input"
import { useResetPassword } from "@/hooks/use-reset-password"
import { Loader2 } from "lucide-react"
import IllustrationPanel from "@/components/IllustrationPanel"

function CreateNewPasswordContent() {
    const { form, isLoading, onSubmit, hasValidToken } = useResetPassword();

    const {
        register,
        formState: { errors },
    } = form;

    // If no valid token, show error message
    if (!hasValidToken) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-[400px] space-y-4 text-center">
                    <h1 className="text-2xl font-bold text-destructive">Invalid Reset Link</h1>
                    <p className="text-muted-foreground">
                        This password reset link is invalid or has expired.
                    </p>
                    <Link
                        href="/forgot-password"
                        className="inline-block text-[#1E3A8A] hover:underline font-medium"
                    >
                        Request a new password reset
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex">
            {/* Left side - Create New Password Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-[400px] space-y-8">
                    {/* Logo */}
                    <div className="flex justify-start mb-10">
                        <Logo />
                    </div>

                    {/* Header */}
                    <div className="space-y-2 text-center">
                        <h1 className="text-[32px] font-bold text-foreground leading-tight">
                            Create new password
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground">
                            Select a strong password to keep your account
                            <br />
                            secure and safe
                        </p>
                    </div>

                    {/* Create Password Form */}
                    <form onSubmit={onSubmit} className="space-y-5">
                        {/* Create Password */}
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-sm md:text-base font-medium text-foreground"
                            >
                                Create password
                            </label>
                            <PasswordInput
                                id="password"
                                placeholder="Create password"
                                disabled={isLoading}
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label
                                htmlFor="confirmPassword"
                                className="text-sm md:text-base font-medium text-foreground"
                            >
                                Confirm password
                            </label>
                            <PasswordInput
                                id="confirmPassword"
                                placeholder="Confirm password"
                                disabled={isLoading}
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
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
                                    Resetting...
                                </>
                            ) : (
                                "Continue"
                            )}
                        </Button>
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
    );
}

export default function CreateNewPasswordPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-white flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
            }
        >
            <CreateNewPasswordContent />
        </Suspense>
    );
}
