import { useState } from 'react';
import { toast } from 'sonner';

interface TaxCalculationInput {
  income: number;
  rent?: number;
  lifeInsurance?: number;
}

interface TaxCalculationResult {
  grossIncome: number;
  tax: number;
  taxWithRelief: number;
  deductions: number;
  tips: string[];
}

export function useTaxCalculation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<TaxCalculationResult | null>(null);

  const calculateTax = async (input: TaxCalculationInput) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://core-backend-kdkn.onrender.com/tax-calculator/simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to calculate tax');
      }

      const data = await response.json();
      setResult(data);
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return {
    calculateTax,
    result,
    isLoading,
    error,
    reset,
  };
}