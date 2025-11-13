// Custom hook for handling user sign-up with React Hook Form and Zod validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signUpSchema, type SignUpSchemaType } from '@/schemas/auth';
import { authService } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';
import type { SignUpRequest } from '@/types/auth';
import { ApiError } from '@/lib/apiClient';

/**
 * Hook for managing sign-up form state and submission
 */
export function useSignUp() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize React Hook Form with Zod validation
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      userType: '' as any,
      email: '',
      password: '',
      agreedToTerms: false,
    },
    mode: 'onBlur', // Validate on blur for better UX
  });

  /**
   * Handle form submission
   */
  const onSubmit = async (data: SignUpSchemaType) => {
    setIsLoading(true);

    try {
      // Prepare API request (exclude agreedToTerms as it's UI-only)
      const signUpData: SignUpRequest = {
        firstName: data.firstName,
        lastName: data.lastName,
        userType: data.userType,
        email: data.email,
        password: data.password,
      };

      // Call sign-up API
      const response = await authService.signUp(signUpData);

      // Show success message
      toast({
        title: 'Account created successfully!',
        description: response.message || 'Please check your email for the verification OTP.',
        variant: 'default',
      });

      // Store token if provided in response or headers
      // Note: Based on API docs, token might be in headers or response body


      // Store user data (optional)
      if (response.user) {
        sessionStorage.setItem('user', JSON.stringify(response.user));
      }

      // Redirect to email verification page if email is not verified
      if (response.user && !response.user.emailVerified) {
        // Pass email as query parameter to pre-fill the verification form
        router.push(`/sign-up/verify-email?email=${encodeURIComponent(data.email)}`);
      } else {
        // Otherwise redirect to home
        router.push('/login');
      }
    } catch (error) {
      // Handle API errors
      if (error instanceof ApiError) {
        toast({
          title: 'Sign-up failed',
          description: error.message || 'Failed to create account. Please try again.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
      }
      console.error('Sign-up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
