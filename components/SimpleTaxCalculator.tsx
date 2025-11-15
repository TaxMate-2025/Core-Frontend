"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useTaxCalculation } from "@/hooks/useSimpleTaxCalculator";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const CHART_COLORS = ["#1E3A8A", "#3B82F6", "#60A5FA"];

interface ChartData extends Record<string, any> {
  name: string;
  value: number;
  fill: string;
}
type Frequency = "monthly" | "annual";

interface CalculatorState {
  monthlyIncome: number | null;
  frequency: Frequency;
  pensionContribution: number;
  rentPaid: number | null;
  nhfContribution: number;
  lifeInsurance: number | null;
  dependents: number | null;
}

export function SimpleTaxCalculator() {
  const { calculateTax, result, isLoading, reset } = useTaxCalculation();
  const [state, setState] = useState<CalculatorState>({
    monthlyIncome: null,
    frequency: "monthly",
    pensionContribution: 0,
    rentPaid: null,
    nhfContribution: 0,
    lifeInsurance: null,
    dependents: null,
  });

  const formatNumber = (num: number | null): string => {
    if (num === null || isNaN(num)) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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

    if (
      field === "monthlyIncome" ||
      field === "rentPaid" ||
      field === "dependents" ||
      field === "lifeInsurance"
    ) {
      const numValue = parseNumber(value);
      setState((prev) => ({
        ...prev,
        [field]: numValue,
      }));
    } else if (
      field === "pensionContribution" ||
      field === "nhfContribution"
    ) {
      const numValue = value === "" ? 0 : Number(value);
      setState((prev) => ({
        ...prev,
        [field]: numValue,
      }));
    }
  };

  const handleCalculateTax = async () => {
    if (!state.monthlyIncome || state.monthlyIncome <= 0) {
      toast.error("Please enter a valid income amount");
      return;
    }

    try {
      const annualIncome =
        state.frequency === "monthly"
          ? state.monthlyIncome * 12
          : state.monthlyIncome;

      await calculateTax({
        income: annualIncome,
        rent: state.rentPaid || undefined,
        lifeInsurance: state.lifeInsurance || undefined,
      });

      toast.success("Your tax estimate has been calculated");
    } catch (err) {
      // Error is handled in the hook
    }
  };

  const handleReset = () => {
    setState({
      monthlyIncome: null,
      frequency: "monthly",
      pensionContribution: 0,
      rentPaid: null,
      nhfContribution: 0,
      lifeInsurance: null,
      dependents: null,
    });
    reset();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const chartData: ChartData[] = result
    ? [
        {
          name: "Gross Income",
          value: result.grossIncome,
          fill: CHART_COLORS[0],
        },
        {
          name: "Tax Amount",
          value: result.taxWithRelief,
          fill: CHART_COLORS[1],
        },
        {
          name: "Deductions",
          value: result.deductions,
          fill: CHART_COLORS[2],
        },
      ]
    : [];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-semibold leading-tight text-center tracking-normal text-[#1E3A8A]">
          Income Tax Calculator for Nigerians
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Instantly calculate your income tax in Nigeria. Understand reliefs, deductions, and stay fully compliant with TaxMate.
        </p>
      </div>

      <Card className="p-8 space-y-6">
        <div className="flex items-center justify-between space-x-2 mb-6">
          <span className="text-xl md:text-2xl lg:text-[28px] font-semibold leading-tight tracking-normal text-[#1E3A8A]">
            Income Frequency:
          </span>
          <div className="flex bg-gray-100 rounded-lg p-1 gap-2">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                state.frequency === "monthly"
                  ? "bg-white shadow-md"
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
                  ? "bg-white shadow-md"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              Life Insurance (₦){" "}
              <span className="text-muted-foreground">(Optional)</span>
            </label>
            <Input
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={
                state.lifeInsurance ? formatNumber(state.lifeInsurance) : ""
              }
              onChange={(e) =>
                handleInputChange("lifeInsurance", e.target.value)
              }
              className="text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={handleCalculateTax}
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

      {/* SEO-friendly informational sections */}
      <div className="space-y-8 mt-12">
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">
            How to Calculate Your Income Tax
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Our income tax calculator uses Nigeria's current tax brackets and rates to provide accurate estimates. 
            Simply enter your monthly or annual income, along with any applicable deductions such as pension contributions, 
            rent payments, NHF contributions, life insurance, and dependent allowances. The calculator will automatically 
            compute your tax liability based on the progressive tax rates applicable in Nigeria.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">
            Income Tax Reliefs and Allowances
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Nigerian taxpayers are entitled to various reliefs and allowances that can reduce their tax liability:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-[#059669] mr-2">•</span>
              <span><strong>Pension Contributions:</strong> Contributions to approved pension schemes are tax-deductible</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#059669] mr-2">•</span>
              <span><strong>Rent Allowance:</strong> A portion of rent paid may be eligible for tax relief</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#059669] mr-2">•</span>
              <span><strong>NHF Contributions:</strong> National Housing Fund contributions qualify for tax deductions</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#059669] mr-2">•</span>
              <span><strong>Life Insurance:</strong> Premiums paid on life insurance policies are tax-deductible</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#059669] mr-2">•</span>
              <span><strong>Dependent Allowances:</strong> Additional relief for each dependent you support</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">
            Stay Compliant with TaxMate
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            TaxMate helps you stay compliant with Nigerian tax regulations by providing accurate calculations and 
            up-to-date information about tax rates and reliefs. Our platform is designed to make tax compliance easy, 
            transparent, and accessible for all Nigerians.
          </p>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#1E3A8A]">
              Common Questions About Income Tax
            </h3>
            <div className="space-y-3 text-muted-foreground">
              <p><strong>Q: What is the tax-free threshold in Nigeria?</strong></p>
              <p>A: The first ₦300,000 of annual income is tax-free. Income above this threshold is taxed at progressive rates.</p>
              <p><strong>Q: When should I file my tax returns?</strong></p>
              <p>A: Tax returns should be filed annually, typically by March 31st of the following year.</p>
              <p><strong>Q: Can I claim multiple deductions?</strong></p>
              <p>A: Yes, you can claim all applicable deductions such as pension, rent, NHF, life insurance, and dependent allowances.</p>
            </div>
            <h3 className="text-lg font-semibold text-[#1E3A8A] mt-6">
              Login to Access Your Tax Records
            </h3>
            <p className="text-muted-foreground">
              Create an account or log in to TaxMate to save your calculations, access your tax history, and get personalized 
              tax planning recommendations. Stay organized and compliant with our comprehensive tax management tools.
            </p>
          </div>
        </Card>
      </div>

      {result && (
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-6 space-y-2 border border-gray-200 hover:border-[#1E3A8A]/50 transition-colors">
              <p className="text-sm text-muted-foreground">Gross Income</p>
              <p className="text-2xl font-bold text-[#1E3A8A]">
                {formatCurrency(result.grossIncome)}
              </p>
            </Card>

            <Card className="p-6 space-y-2 border border-gray-200 hover:border-[#1E3A8A]/50 transition-colors">
              <p className="text-sm text-muted-foreground">Estimated Tax</p>
              <p className="text-2xl font-bold text-[#1E3A8A]">
                {formatCurrency(result.taxWithRelief)}
              </p>
              {result.taxWithRelief < result.tax && (
                <p className="text-xs text-muted-foreground line-through">
                  {formatCurrency(result.tax)}
                </p>
              )}
            </Card>

            <Card className="p-6 space-y-2 border border-gray-200 hover:border-[#1E3A8A]/50 transition-colors">
              <p className="text-sm text-muted-foreground">Total Deductions</p>
              <p className="text-2xl font-bold text-[#1E3A8A]">
                {formatCurrency(result.deductions)}
              </p>
            </Card>
          </div>

          {/* Tax Charts*/}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tax Breakdown</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name = "", percent = 0 }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {result.tips && result.tips.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-[#1E3A8A]">
                💡 Helpful Tax Tips
              </h3>
              <ul className="space-y-2">
                {result.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#1E3A8A] mr-2">•</span>
                    <span className="text-sm text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}