"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const CHART_COLORS = ["#1E3A8A", "#3B82F6", "#60A5FA"];

type Frequency = "monthly" | "annual";

interface CalculatorState {
  monthlyIncome: number | null;
  frequency: Frequency;
  pensionContribution: number;
  rentPaid: number | null;
  nhfContribution: number;
  nhisContribution: number;
  dependents: number | null;
}

interface Results {
  grossAnnualIncome: number;
  taxableIncome: number;
  totalDeductions: number;
  estimatedPAYE: number;
}

export function SimpleTaxCalculator() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<CalculatorState>({
    monthlyIncome: null,
    frequency: "monthly",
    pensionContribution: 0,
    rentPaid: null,
    nhfContribution: 0,
    nhisContribution: 0,
    dependents: null,
  });

  const [results, setResults] = useState<Results | null>(null);

  // Format number with commas for display
  const formatNumber = (num: number | null): string => {
    if (num === null || isNaN(num)) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Parse formatted number string back to number
  const parseNumber = (str: string): number | null => {
    if (!str) return null;
    const num = Number(str.replace(/[^0-9.]/g, ""));
    return isNaN(num) ? null : num;
  };

  const handleInputChange = (field: keyof CalculatorState, value: string) => {
    if (field === "frequency") {
      setState((prev) => ({
        ...prev,
        frequency: value as Frequency,
      }));
      return;
    }

    // For income and rent, we'll handle the formatted display
    if (
      field === "monthlyIncome" ||
      field === "rentPaid" ||
      field === "dependents"
    ) {
      const numValue = parseNumber(value);
      setState((prev) => ({
        ...prev,
        [field]: numValue,
      }));
    } else if (
      field === "pensionContribution" ||
      field === "nhfContribution" ||
      field === "nhisContribution"
    ) {
      const numValue = value === "" ? 0 : Number(value);
      setState((prev) => ({
        ...prev,
        [field]: numValue as number,
      }));
    }
  };

  const calculateTax = async () => {
    if (!state.monthlyIncome || state.monthlyIncome <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid income amount",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Calculate gross annual income
      const grossAnnual =
        state.frequency === "monthly"
          ? state.monthlyIncome! * 12
          : state.monthlyIncome!;

      if (!grossAnnual) {
        throw new Error("Invalid income calculation");
      }

      // Calculate deductions
      const pensionDed = (state.pensionContribution / 100) * grossAnnual;
      const nhfDed = (state.nhfContribution / 100) * grossAnnual;
      const nhisDed = state.nhisContribution;
      const totalDeductions = pensionDed + nhfDed + nhisDed;

      // Calculate taxable income
      const rentDeduction = state.rentPaid || 0;
      const taxableIncome = Math.max(
        0,
        grossAnnual - rentDeduction - totalDeductions
      );

      // Calculate PAYE
      let estimatedPAYE = 0;
      if (taxableIncome <= 300000) {
        estimatedPAYE = taxableIncome * 0.01;
      } else if (taxableIncome <= 600000) {
        estimatedPAYE = 3000 + (taxableIncome - 300000) * 0.05;
      } else if (taxableIncome <= 1100000) {
        estimatedPAYE = 18000 + (taxableIncome - 600000) * 0.1;
      } else {
        estimatedPAYE = 68000 + (taxableIncome - 1100000) * 0.2;
      }

      setResults({
        grossAnnualIncome: grossAnnual,
        taxableIncome,
        totalDeductions,
        estimatedPAYE,
      });

      toast({
        title: "Calculation Complete",
        description: "Your tax estimate has been calculated",
      });
    } catch (error) {
      console.error("Tax calculation error:", error);
      toast({
        title: "Error",
        description: "Failed to calculate tax. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setState({
      monthlyIncome: null,
      frequency: "monthly",
      pensionContribution: 0,
      rentPaid: null,
      nhfContribution: 0,
      nhisContribution: 0,
      dependents: null,
    });
    setResults(null);
  };

  const chartData = results
    ? [
        {
          name: "Annual Income",
          value: results.grossAnnualIncome,
          fill: CHART_COLORS[0],
        },
        {
          name: "Total Deductions",
          value: results.totalDeductions,
          fill: CHART_COLORS[1],
        },
        {
          name: "Annual Taxes",
          value: results.estimatedPAYE,
          fill: CHART_COLORS[2],
        },
      ]
    : [];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Add responsive padding and max-width
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-semibold leading-tight text-center tracking-normal text-[#1E3A8A]">
          Simple Tax Calculator
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Estimate your PAYE tax quickly. Enter your income and a few common
          deductions — results will appear after you click Calculate.
        </p>
      </div>

      {/* Form Card */}
      <Card className="p-8 space-y-6">
        {/* Income Frequency */}
        <div className="flex items-center justify-between space-x-2 mb-6">
          <span className="text-xl md:text-2xl lg:text-[28px] font-semibold leading-tight tracking-normal text-[#1E3A8A]">
            Income Frequency:
          </span>
          <div className="flex bg-gray-100 rounded-lg p-1 gap-2">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                state.frequency === "monthly"
                  ? "bg-[#ffffff] shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() =>
                setState((prev) => ({ ...prev, frequency: "monthly" }))
              }
            >
              Monthly
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                state.frequency === "annual"
                  ? "bg-[#ffffff] shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() =>
                setState((prev) => ({ ...prev, frequency: "annual" }))
              }
            >
              Annual
            </button>
          </div>
        </div>

        {/* Income Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            {state.frequency === "monthly"
              ? "Monthly Income (₦)"
              : "Annual Income (₦)"}
          </label>
          <Input
            type="text"
            inputMode="decimal"
            placeholder="0"
            value={state.monthlyIncome ? formatNumber(state.monthlyIncome) : ""}
            onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
            className="text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Pension Contribution (%){" "}
              <span className="text-muted-foreground">(Optional)</span>
            </label>
            <Input
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={state.pensionContribution || ""}
              onChange={(e) =>
                handleInputChange("pensionContribution", e.target.value)
              }
              className="text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Rent Paid (₦){" "}
              <span className="text-muted-foreground">(Optional)</span>
            </label>
            <Input
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={state.rentPaid ? formatNumber(state.rentPaid) : ""}
              onChange={(e) => handleInputChange("rentPaid", e.target.value)}
              className="text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              NHF Contribution (%){" "}
              <span className="text-muted-foreground">(Optional)</span>
            </label>
            <Input
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={state.nhfContribution || ""}
              onChange={(e) =>
                handleInputChange("nhfContribution", e.target.value)
              }
              className="text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          {/* <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              NHIS Contribution (₦){" "}
              <span className="text-muted-foreground">(Optional)</span>
            </label>
            <Input
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={
                state.nhisContribution
                  ? formatNumber(state.nhisContribution)
                  : ""
              }
              onChange={(e) =>
                handleInputChange("nhisContribution", e.target.value)
              }
              className="text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div> */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Dependents{" "}
              <span className="text-muted-foreground">(Optional)</span>
            </label>
            <Input
              type="number"
              placeholder="0"
              value={state.dependents || ""}
              onChange={(e) => handleInputChange("dependents", e.target.value)}
              className="text-base"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={calculateTax}
            className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              "Calculate"
            )}
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="text-[#1E3A8A] border-[#1E3A8A] hover:bg-[#1E3A8A]/10"
            disabled={isLoading}
          >
            Reset
          </Button>
        </div>
      </Card>

      {/* Results Section */}
      {results && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Your Estimates
            </h2>
            <p className="text-muted-foreground">
              Results are shown annually. Monthly equivalents are provided for
              convenience.
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-6 space-y-2 border border-gray-200 hover:border-[#1E3A8A]/50 transition-colors">
              <p className="text-sm text-muted-foreground">
                Gross Annual Income
              </p>
              <p className="text-2xl font-bold text-[#1E3A8A]">
                {formatCurrency(results.grossAnnualIncome)}
              </p>
              <p className="text-xs text-muted-foreground">
                {state.frequency === "monthly"
                  ? `${formatCurrency(state.monthlyIncome || 0)} per month`
                  : `${formatCurrency(
                      results.grossAnnualIncome / 12
                    )} per month`}
              </p>
            </Card>

            <Card className="p-6 space-y-2 border border-gray-200 hover:border-[#1E3A8A]/50 transition-colors">
              <p className="text-sm text-muted-foreground">Taxable Income</p>
              <p className="text-2xl font-bold text-[#1E3A8A]">
                {formatCurrency(results.taxableIncome)}
              </p>
              <p className="text-xs text-muted-foreground">
                After deductions and allowances
              </p>
            </Card>

            <Card className="p-6 space-y-2 border border-gray-200 hover:border-[#1E3A8A]/50 transition-colors">
              <p className="text-sm text-muted-foreground">Total Deductions</p>
              <p className="text-2xl font-bold text-[#1E3A8A]">
                {formatCurrency(results.totalDeductions)}
              </p>
              <p className="text-xs text-muted-foreground">
                Includes pension, NHF, and other allowances
              </p>
            </Card>

            <Card className="p-6 space-y-2 border border-gray-200 hover:border-[#1E3A8A]/50 transition-colors">
              <p className="text-sm text-muted-foreground">
                Estimated PAYE (Annual)
              </p>
              <p className="text-2xl font-bold text-[#1E3A8A]">
                {formatCurrency(results.estimatedPAYE)}
              </p>
              <p className="text-xs text-muted-foreground">
                ~{formatCurrency(Math.round(results.estimatedPAYE / 12))} per
                month
              </p>
            </Card>
          </div>

          {/* Breakdown Chart */}
          <Card className="p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Breakdown
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(value as number)}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
            <Button
              variant="outline"
              className="text-[#1E3A8A] border-[#1E3A8A] hover:bg-[#1E3A8A]/10"
              disabled={isLoading}
            >
              Download PDF
            </Button>
            <Button
              className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 transition-colors"
              disabled={isLoading}
            >
              Save Calculation
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
