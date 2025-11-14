/**
 * Custom hook for handling user login with React Hook Form and Zod validation
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loginSchema, type LoginSchemaType } from '@/schemas/auth';
import { authService } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';
import type { LoginRequest } from '@/types/auth';
import { ApiError } from '@/lib/apiClient';


export function useLogin() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onBlur',
  });


  const onSubmit = async (data: LoginSchemaType) => {
    setIsLoading(true);

    try {
      const loginData: LoginRequest = {
        email: data.email,
        password: data.password,
      };

      const response = await authService.login(loginData);

      const storage = data.rememberMe ? localStorage : sessionStorage;

      if (response.token) {
        storage.setItem('authToken', response.token);
      }

      if (response.user) {
        storage.setItem('user', JSON.stringify(response.user));
      }

      toast({
        title: 'Login successful!',
        description: `Welcome back, ${response.user.firstName}!`,
        variant: 'default',
      });

      // Check if email is verified
      if (!response.user.emailVerified) {
        // Redirect to email verification page
        router.push('/verify-email');
      } else {
        // Redirect to home page
        router.push('/home');
      }
    } catch (error) {
      // Handle API errors
      if (error instanceof ApiError) {
        // Check for specific error messages
        const errorMessage = error.message.toLowerCase();

        if (errorMessage.includes('invalid') || errorMessage.includes('incorrect')) {
          toast({
            title: 'Invalid credentials',
            description: 'The email or password you entered is incorrect.',
            variant: 'destructive',
          });
        } else if (errorMessage.includes('not found') || errorMessage.includes('does not exist')) {
          toast({
            title: 'Account not found',
            description: 'No account exists with this email address.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Login failed',
            description: error.message || 'Failed to log in. Please try again.',
            variant: 'destructive',
          });
        }
      } else {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
      }
      console.error('Login error:', error);
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
