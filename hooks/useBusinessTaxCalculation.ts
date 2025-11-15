import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useAuthUser } from "./use-auth-user";

export interface Income {
  revenue: number;
  dividendsReceived: number;
  exemptDividends: number;
  digitalAssets: number;
  otherIncome: number;
}

export interface Deductions {
  expenses: number;
  capitalExpenditure: number;
  capitalAllowance: number;
  previousYearLosses: number;
  currentYearLosses: number;
  digitalAssetLosses: number;
  charitableDonations: number;
  employeeCosts: number;
}

export interface Employees {
  total: number;
  lowIncomeCount: number;
}

export interface Incentives {
  tempRelief: boolean;
  agriHoliday: boolean;
  exportExemption: boolean;
}

export interface BusinessTaxInput {
  companyType: "small" | "large" | "agriculture" | "export" | "priority";
  accountingPeriod: {
    start: string;
    end: string;
  };
  income: Income;
  deductions: Deductions;
  employees: Employees;
  incentives: Incentives;
}

interface BusinessTaxResult {
  grossIncome: number;
  tax: number;
  taxWithRelief: number;
  deductions: number;
  tips: string[];
}

export function useBusinessTaxCalculation() {
  const { getToken } = useAuthUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<BusinessTaxResult | null>(null);

  const calculateTax = useCallback(
    async (input: BusinessTaxInput) => {
      setIsLoading(true);
      setError(null);

      try {
        const token = getToken();

        if (!token) {
          throw new Error("Authentication required. Please log in.");
        }

        const response = await fetch(
          "https://core-backend-kdkn.onrender.com/tax-calculator/business",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(input),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || "Failed to calculate business tax"
          );
        }

        const data = await response.json();
        setResult(data);
        return data;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("An unknown error occurred");
        setError(error);
        toast.error(error.message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getToken]
  ); 

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    calculateTax,
    result,
    isLoading,
    error,
    reset,
  };
}
