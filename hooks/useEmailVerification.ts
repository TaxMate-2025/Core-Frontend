/**
 * Custom hook for handling email verification with OTP
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect, useCallback } from 'react';
import { verifyEmailSchema, type VerifyEmailFormInputs } from '@/schemas/auth';
import { authService } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';
import type { VerifyEmailRequest } from '@/types/auth';
import { ApiError } from '@/lib/apiClient';

const RESEND_COOLDOWN = 60; // seconds

/**
 * Hook for managing email verification form state and submission
 */
export function useEmailVerification(initialEmail: string = '') {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [canResend, setCanResend] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(RESEND_COOLDOWN);

  // Initialize React Hook Form with Zod validation
  const form = useForm<VerifyEmailFormInputs>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: initialEmail,
      otp: '',
    },
    mode: 'onChange', // Validate on change for OTP input
  });

  /**
   * Start resend countdown timer
   */
  const startResendTimer = useCallback(() => {
    setCanResend(false);
    setResendCountdown(RESEND_COOLDOWN);

    const timer = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /**
   * Start countdown on mount (user just signed up)
   */
  useEffect(() => {
    const cleanup = startResendTimer();
    return cleanup;
  }, [startResendTimer]);

  /**
   * Handle OTP change
   */
  const handleOtpChange = useCallback(
    (value: string) => {
      form.setValue('otp', value, { shouldValidate: true });
      // Clear error when user starts typing
      if (error) {
        setError(null);
      }
    },
    [form, error]
  );

  /**
   * Handle form submission - Verify OTP
   */
  const onSubmit = async (data: VerifyEmailFormInputs) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const verifyData: VerifyEmailRequest = {
        email: data.email,
        otp: data.otp,
      };

      // Call verify email API
      const response = await authService.verifyEmail(verifyData);

      // Show success message
      setSuccessMessage(
        response.message || 'Email verified successfully! Redirecting...'
      );

      toast({
        title: 'Email verified!',
        description: 'Your email has been verified successfully.',
        variant: 'default',
      });

      // Update user's emailVerified status in storage
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        user.emailVerified = true;
        sessionStorage.setItem('user', JSON.stringify(user));
      }

      // Note: Page component handles redirect after 2 seconds
    } catch (error) {
      // Handle API errors
      let errorMessage = 'Failed to verify email. Please try again.';

      if (error instanceof ApiError) {
        errorMessage = error.message;

        // Handle specific error cases
        if (errorMessage.toLowerCase().includes('invalid') ||
            errorMessage.toLowerCase().includes('incorrect')) {
          errorMessage = 'Invalid OTP. Please check the code and try again.';
        } else if (errorMessage.toLowerCase().includes('expired')) {
          errorMessage = 'OTP has expired. Please request a new code.';
          setCanResend(true);
          setResendCountdown(0);
        }
      }

      setError(errorMessage);

      toast({
        title: 'Verification failed',
        description: errorMessage,
        variant: 'destructive',
      });

      console.error('Email verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle resend OTP
   */
  const onResendOtp = async () => {
    const email = form.getValues('email');

    if (!email) {
      toast({
        title: 'Error',
        description: 'Please enter your email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsResending(true);
    setError(null);

    try {
      // Call resend verification API
      const response = await authService.resendVerification({ email });

      toast({
        title: 'OTP sent!',
        description: response.message || 'A new verification code has been sent to your email.',
        variant: 'default',
      });

      // Clear OTP field
      form.setValue('otp', '');

      // Start countdown timer
      startResendTimer();
    } catch (error) {
      const errorMessage =
        error instanceof ApiError
          ? error.message
          : 'Failed to resend OTP. Please try again.';

      toast({
        title: 'Resend failed',
        description: errorMessage,
        variant: 'destructive',
      });

      console.error('Resend OTP error:', error);
    } finally {
      setIsResending(false);
    }
  };

  return {
    form,
    isLoading,
    isResending,
    error,
    successMessage,
    canResend,
    resendCountdown,
    onSubmit: form.handleSubmit(onSubmit),
    onResendOtp,
    handleOtpChange,
  };
}
