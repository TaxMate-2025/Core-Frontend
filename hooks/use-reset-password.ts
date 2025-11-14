import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordSchemaType } from '@/schemas/auth';
import { authService } from '@/services/authService';
import { toast } from 'sonner';

export function useResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string>('');

  // Extract token from URL query params
  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      toast.error('Invalid reset link. Please request a new password reset.');
      router.push('/forgot-password');
    }
  }, [searchParams, router]);

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (data) => {
    if (!token) {
      toast.error('Invalid reset token. Please request a new password reset.');
      return;
    }

    try {
      setIsLoading(true);

      const response = await authService.resetPassword({
        token,
        password: data.password,
      });

      toast.success(response.message || 'Password reset successful!');

      // Redirect to login after successful password reset
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to reset password. Please try again.';

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  });

  return {
    form,
    isLoading,
    onSubmit,
    hasValidToken: !!token,
  };
}
