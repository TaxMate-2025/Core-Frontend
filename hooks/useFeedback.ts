// hooks/useFeedback.ts
import { useState } from 'react';
import { toast } from 'sonner';

type FeedbackCategory = 
  | 'GENERAL'
  | 'BUG_REPORT'
  | 'FEATURE_REQUEST'
  | 'COMPLAINT'
  | 'COMPLIMENT'
  | 'OTHER';

interface FeedbackFormData {
  name: string;
  email: string;
  phoneNumber: string;
  category: FeedbackCategory;
  message: string;
}

export const useFeedback = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitFeedback = async (formData: FeedbackFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://core-backend-kdkn.onrender.com/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      const data = await response.json();
      toast.success('Thank you for your feedback!');
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
      toast.error('Failed to submit feedback');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitFeedback, isLoading, error };
};