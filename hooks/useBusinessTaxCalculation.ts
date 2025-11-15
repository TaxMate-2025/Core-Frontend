import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useAuthUser } from "./use-auth-user";
import { BusinessTaxInput, BusinessTaxResult } from "@/types/businessTax";
import { businessTaxSchema } from "@/schemas/businessTax";
import { ZodError } from "zod";

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
        // Validate input using Zod schema
        const validatedInput = businessTaxSchema.parse(input);

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
            body: JSON.stringify(validatedInput),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || "Failed to calculate business tax"
          );
        }

        const data: BusinessTaxResult = await response.json();
        setResult(data);
        toast.success("Tax calculation completed successfully");
        return data;
      } catch (err) {
        if (err instanceof ZodError) {
          // Handle validation errors
          const firstError = err.issues[0];
          const error = new Error(firstError.message || "Invalid input data");
          setError(error);
          toast.error(error.message);
          throw error;
        }

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
