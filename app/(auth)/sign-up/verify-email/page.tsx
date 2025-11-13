'use client';

import { useEffect, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEmailVerification } from '@/hooks/useEmailVerification';
import { Logo } from '@/components/Logo';

function VerifyEmailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialEmail = searchParams.get('email') || '';
    const [showEmailInput, setShowEmailInput] = useState(false);

    const {
        form,
        isLoading,
        isResending,
        error,
        successMessage,
        canResend,
        resendCountdown,
        onSubmit,
        onResendOtp,
    } = useEmailVerification(initialEmail);

    const {
        register,
        formState: { errors },
        watch,
    } = form;
    const otpValue = watch('otp');

    /**
     * Redirect on successful verification
     */
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                router.push('/login');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, router]);

    return (
        <div className="min-h-screen flex">
            {/* Left side - Verification Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-[400px] space-y-8">
                    {/* Logo */}
                    <div className="flex justify-start mb-10">
                        <Logo />
                    </div>

                    {/* Header */}
                    <div className="space-y-2 text-center">
                        <h1 className="text-[32px] font-bold text-foreground leading-tight">
                            Verify Your Email
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            We've sent a verification code to your email address
                        </p>
                    </div>

                    {/* Success Message */}
                    {successMessage && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-green-800 font-medium">{successMessage}</p>
                                <p className="text-green-700 text-sm mt-1">
                                    Redirecting to home...
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-800 font-medium">Verification Failed</p>
                            <p className="text-red-700 text-sm mt-1">{error}</p>
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-6">
                        {/* OTP Input */}
                        <div className="space-y-2">
                            <label
                                htmlFor="otp"
                                className="text-sm font-medium text-foreground"
                            >
                                Enter 6-Digit Code
                            </label>
                            <Input
                                id="otp"
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                placeholder="000000"
                                disabled={isLoading}
                                {...register('otp')}
                                className={`h-11 text-center text-2xl font-semibold tracking-widest ${errors.otp ? 'border-red-500' : ''
                                    }`}
                            />
                            {errors.otp && (
                                <p className="text-sm text-destructive">{errors.otp.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading || (otpValue?.length || 0) !== 6}
                            className="w-full h-11 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-medium cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                'Verify Email'
                            )}
                        </Button>
                    </form>

                    {/* Resend OTP Section */}
                    <div className="pt-6 border-t border-gray-200 space-y-3">
                        <button
                            type="button"
                            onClick={() => setShowEmailInput(true)}
                            className="text-sm md:text-base cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Didn't receive the code?
                        </button>

                        {/* Email Input - Only shown when user clicks "Didn't receive code?" */}
                        {showEmailInput && (
                            <div className="space-y-2">
                                <label
                                    htmlFor="resend-email"
                                    className="text-sm font-medium text-foreground"
                                >
                                    Email Address
                                </label>
                                <Input
                                    id="resend-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    disabled={isLoading || isResending}
                                    {...register('email')}
                                    className={`h-11 ${errors.email ? 'border-red-500' : ''}`}
                                />
                                {errors.email && (
                                    <p className="text-sm text-destructive">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                        )}

                        <Button
                            type="button"
                            onClick={onResendOtp}
                            disabled={!canResend || isResending || isLoading || (showEmailInput && !form.watch('email'))}
                            variant="outline"
                            className="w-full h-11 cursor-pointer"
                        >
                            {isResending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : canResend ? (
                                <>
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Resend Code
                                </>
                            ) : (
                                `Resend in ${resendCountdown}s`
                            )}
                        </Button>
                    </div>

                    {/* Help Text */}
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-700">
                            =� <span className="font-medium">Tip:</span> Check your spam
                            folder if you don't see the email.
                        </p>
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

                <div className="relative z-10 max-w-md text-center">
                    <h2 className="text-white text-3xl font-bold mb-12 leading-tight px-8">
                        Secure Your Account
                        <br />
                        with Email Verification
                    </h2>

                    <div className="relative flex justify-center items-center h-[400px]">
                        {/* Purple circle background */}
                        <div className="absolute w-72 h-72 bg-[#B8A3D8] rounded-full opacity-70"></div>

                        <div className="relative z-10 flex items-center justify-center">
                            <div className="text-white text-6xl">
                                =�
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default function VerifyEmailPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-white flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
            }
        >
            <VerifyEmailContent />
        </Suspense>
    );
}
