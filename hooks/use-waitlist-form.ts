import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ApiError } from '@/lib/apiClient';
import { waitlistService } from '@/services/waitlistService';
import { WaitlistFormData } from '@/types/waitlist';
import { validateWaitlistForm } from '@/utils/validation';

const WAITLIST_SOURCE = 'DEV_FEST';

export function useWaitlistForm() {
  const [formData, setFormData] = useState<WaitlistFormData>({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ name: '', email: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationError = validateWaitlistForm(formData);
    if (validationError) {
      toast({
        title: 'Error',
        description: validationError.message,
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      await waitlistService.submitToWaitlist({
        ...formData,
        source: WAITLIST_SOURCE,
      });

      toast({
        title: 'Success!',
        description:
          'You have been added to the waitlist. Check your email for updates.',
      });

      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);

      let errorMessage = 'Something went wrong. Please try again.';

      if (error instanceof ApiError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
