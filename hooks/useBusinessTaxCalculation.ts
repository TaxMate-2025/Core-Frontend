
import { useState } from 'react';
import { toast } from 'sonner';

interface AccountingPeriod {
  start: string;
  end: string;
}

interface Income {
  revenue: number | null;
  dividendsReceived: number | null;
  exemptDividends: number | null;
  digitalAssets: number | null;
  otherIncome: number | null;
}

interface Deductions {
  expenses: number | null;
  capitalExpenditure: number | null;
  capitalAllowance: number | null;
  previousYearLosses: number | null;
  currentYearLosses: number | null;
  digitalAssetLosses: number | null;
  charitableDonations: number | null;
  employeeCosts: number | null;
}

interface Employees {
  total: number;
  lowIncomeCount: number;
}

interface Incentives {
  tempRelief: boolean;
  agriHoliday: boolean;
  exportExemption: boolean;
}

export interface BusinessTaxInput {
  companyType: 'small' | 'large' | 'agriculture' | 'export' | 'priority';
  accountingPeriod: AccountingPeriod;
  income: Income;
  deductions: Deductions;
  employees?: Employees;
  incentives?: Incentives;
}

interface BusinessTaxResult {
  grossIncome: number;
  tax: number;
  taxWithRelief: number;
  deductions: number;
  tips: string[];
}

export function useBusinessTaxCalculation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<BusinessTaxResult | null>(null);

  const calculateTax = async (input: BusinessTaxInput) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://core-backend-kdkn.onrender.com/tax-calculator/business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to calculate business tax');
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