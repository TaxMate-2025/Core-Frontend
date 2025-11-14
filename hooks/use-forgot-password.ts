import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordSchemaType } from '@/schemas/auth';
import { authService } from '@/services/authService';
import { toast } from 'sonner';

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      setSuccessMessage('');

      const response = await authService.forgotPassword(data);

      setSuccessMessage(response.message || 'Password reset email sent! Please check your inbox.');
      toast.success('Email sent successfully!');

      // Reset form after successful submission
      form.reset();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to send reset email. Please try again.';

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  });

  return {
    form,
    isLoading,
    successMessage,
    onSubmit,
  };
}
