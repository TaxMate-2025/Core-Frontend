"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useBusinessTaxCalculation } from "@/hooks/useBusinessTaxCalculation";
import type {
  BusinessTaxInput,
  CompanyType
} from "@/types/businessTax";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

type Frequency = "monthly" | "annual";

const CHART_COLORS = ["#1E3A8A", "#3B82F6", "#60A5FA"];

interface ChartData extends Record<string, any> {
  name: string;
  value: number;
  fill: string;
}

interface BusinessTaxFormData {
  companyType: "small" | "large" | "agriculture" | "export" | "priority";
  frequency: "monthly" | "annual";
  accountingPeriod: {
    start: string;
    end: string;
  };
  income: {
    revenue: number;
    dividendsReceived: number;
    exemptDividends: number;
    digitalAssets: number;
    otherIncome: number;
  };
  deductions: {
    expenses: number;
    capitalExpenditure: number;
    capitalAllowance: number;
    previousYearLosses: number;
    currentYearLosses: number;
    digitalAssetLosses: number;
    charitableDonations: number;
    employeeCosts: number;
  };
  employees: {
    total: number;
    lowIncomeCount: number;
  };
  incentives: {
    tempRelief: boolean;
    agriHoliday: boolean;
    exportExemption: boolean;
  };
}

export default function BusinessTaxCalculator() {
  const { calculateTax, result, isLoading, reset } = useBusinessTaxCalculation();
  const [activeTab, setActiveTab] = useState<'income' | 'deductions' | 'allowances'>('income');

  const [formData, setFormData] = useState<BusinessTaxFormData>({
    companyType: "small",
    frequency: "annual",
    accountingPeriod: {
      start: "",
      end: "",
    },
    income: {
      revenue: 0,
      dividendsReceived: 0,
      exemptDividends: 0,
      digitalAssets: 0,
      otherIncome: 0,
    },
    deductions: {
      expenses: 0,
      capitalExpenditure: 0,
      capitalAllowance: 0,
      previousYearLosses: 0,
      currentYearLosses: 0,
      digitalAssetLosses: 0,
      charitableDonations: 0,
      employeeCosts: 0,
    },
    employees: {
      total: 0,
      lowIncomeCount: 0,
    },
    incentives: {
      tempRelief: false,
      agriHoliday: false,
      exportExemption: false,
    },
  });

  const handleDateChange = (path: string, value: string) => {
    handleInputChange(path, value);
  };

  const formatNumber = (num: number | null): string => {
    if (num === null || isNaN(num)) return "0";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parseNumber = (str: string): number => {
    if (!str) return 0;
    const num = Number(str.replace(/[^0-9.]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const handleInputChange = (
    path: string,
    value: string | number | boolean
  ) => {
    setFormData((prev) => {
      const newData = { ...prev };
      const keys = path.split(".");
      let current: any = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        if (current[keys[i]] === undefined) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      const lastKey = keys[keys.length - 1];

      if (path === "frequency" || path === "companyType") {
        current[lastKey] = value;
      } else if (path.startsWith("accountingPeriod")) {
        current[lastKey] = value;
      } else if (typeof value === "string") {
        const numValue = parseNumber(value);
        current[lastKey] = isNaN(numValue) ? 0 : numValue;
      } else {
        current[lastKey] = value;
      }

      return newData;
    });
  };

  const handleCalculate = async () => {
    try {
      const incomeMultiplier = formData.frequency === "monthly" ? 12 : 1;

      const startDate = formData.accountingPeriod.start
        ? new Date(formData.accountingPeriod.start).toISOString()
        : "";
      const endDate = formData.accountingPeriod.end
        ? new Date(formData.accountingPeriod.end).toISOString()
        : "";

      const dataToSend: BusinessTaxInput = {
        companyType: formData.companyType as CompanyType,
        accountingPeriod: {
          start: startDate,
          end: endDate,
        },
        income: {
          revenue: formData.income.revenue * incomeMultiplier,
          dividendsReceived: formData.income.dividendsReceived * incomeMultiplier,
          exemptDividends: formData.income.exemptDividends * incomeMultiplier,
          digitalAssets: formData.income.digitalAssets * incomeMultiplier,
          otherIncome: formData.income.otherIncome * incomeMultiplier,
        },
        deductions: {
          expenses: formData.deductions.expenses,
          capitalExpenditure: formData.deductions.capitalExpenditure,
          capitalAllowance: formData.deductions.capitalAllowance,
          previousYearLosses: formData.deductions.previousYearLosses,
          currentYearLosses: formData.deductions.currentYearLosses,
          digitalAssetLosses: formData.deductions.digitalAssetLosses,
          charitableDonations: formData.deductions.charitableDonations,
          employeeCosts: formData.deductions.employeeCosts,
        },
        employees: {
          total: formData.employees.total,
          lowIncomeCount: formData.employees.lowIncomeCount,
        },
        incentives: {
          tempRelief: formData.incentives.tempRelief,
          agriHoliday: formData.incentives.agriHoliday,
          exportExemption: formData.incentives.exportExemption,
        },
      };

      await calculateTax(dataToSend);
    } catch (err) {
      console.error("Error calculating tax:", err);
      // Error is already handled by the hook with toast
    }
  };

  const handleReset = () => {
    reset();
    setFormData({
      companyType: "small",
      frequency: "annual",
      accountingPeriod: {
        start: "",
        end: "",
      },
      income: {
        revenue: 0,
        dividendsReceived: 0,
        exemptDividends: 0,
        digitalAssets: 0,
        otherIncome: 0,
      },
      deductions: {
        expenses: 0,
        capitalExpenditure: 0,
        capitalAllowance: 0,
        previousYearLosses: 0,
        currentYearLosses: 0,
        digitalAssetLosses: 0,
        charitableDonations: 0,
        employeeCosts: 0,
      },
      employees: {
        total: 0,
        lowIncomeCount: 0,
      },
      incentives: {
        tempRelief: false,
        agriHoliday: false,
        exportExemption: false,
      },
    });
  };

  const chartData: ChartData[] = result
    ? [
      {
        name: "Gross Income",
        value: result.incomeBreakdown?.totalGrossIncome || 0,
        fill: CHART_COLORS[0],
      },
      {
        name: "Tax Payable",
        value: result.totals?.taxPayable || 0,
        fill: CHART_COLORS[1],
      },
      {
        name: "Total Deductions",
        value: result.deductionsBreakdown?.totalDeductions || 0,
        fill: CHART_COLORS[2],
      },
    ]
    : [];

  const formatCurrency = (value: number | undefined) => {
    if (value === undefined || value === null || isNaN(value)) {
      return "₦0.00";
    }
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-semibold leading-tight text-center tracking-normal text-[#1E3A8A]">
          Business Tax Calculator
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Estimate your business tax liability. Enter your financial details and
          deductions — results will appear after you click Calculate.
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
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${formData.frequency === "monthly"
                ? "bg-white shadow-md"
                : "text-gray-600 hover:bg-gray-200"
                }`}
              onClick={() => handleInputChange("frequency", "monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${formData.frequency === "annual"
                ? "bg-white shadow-md"
                : "text-gray-600 hover:bg-gray-200"
                }`}
              onClick={() => handleInputChange("frequency", "annual")}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Company Type
            </label>
            <Select
              value={formData.companyType}
              onChange={(value) => handleInputChange("companyType", value)}
              items={[
                { value: "small", label: "Small Company" },
                { value: "large", label: "Large Company" },
                { value: "agriculture", label: "Agriculture" },
                { value: "export", label: "Export" },
                { value: "priority", label: "Priority" },
              ]}
              placeholder="Select company type"
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Start Date
            </label>
            <Input
              type="date"
              value={formData.accountingPeriod.start || ""}
              onChange={(e) =>
                handleDateChange("accountingPeriod.start", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              End Date
            </label>
            <Input
              type="date"
              value={formData.accountingPeriod.end || ""}
              onChange={(e) =>
                handleDateChange("accountingPeriod.end", e.target.value)
              }
            />
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-foreground">Income</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(formData.income).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {key.split(/(?=[A-Z])/).join(" ")}
                </label>
                <Input
                  type="text"
                  inputMode="decimal"
                  placeholder="0"
                  value={
                    value === null || isNaN(value as number)
                      ? ""
                      : formatNumber(value as number)
                  }
                  onChange={(e) =>
                    handleInputChange(
                      `income.${key}`,
                      parseNumber(e.target.value) || 0
                    )
                  }
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-foreground">Deductions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(formData.deductions).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {key.split(/(?=[A-Z])/).join(" ")}
                </label>
                <Input
                  type="text"
                  inputMode="decimal"
                  placeholder="0"
                  value={
                    value === null || isNaN(value as number)
                      ? ""
                      : formatNumber(value as number)
                  }
                  onChange={(e) =>
                    handleInputChange(
                      `deductions.${key}`,
                      parseNumber(e.target.value) || 0
                    )
                  }
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-foreground">Employees</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.employees &&
              Object.entries(formData.employees).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {key.split(/(?=[A-Z])/).join(" ")}
                  </label>
                  <Input
                    type="number"
                    value={value as number}
                    onChange={(e) =>
                      handleInputChange(
                        `employees.${key}`,
                        parseInt(e.target.value) || 0
                      )
                    }
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-foreground">Incentives</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formData.incentives &&
              Object.entries(formData.incentives).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={key}
                    checked={value as boolean}
                    onChange={(e) =>
                      handleInputChange(`incentives.${key}`, e.target.checked)
                    }
                    className="h-4 w-4 rounded border-gray-300 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                  />
                  <label
                    htmlFor={key}
                    className="text-sm font-medium text-foreground"
                  >
                    {key.split(/(?=[A-Z])/).join(" ")}
                  </label>
                </div>
              ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={handleCalculate}
            className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 transition-colors cursor-pointer"
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
            className="text-[#1E3A8A] border-[#1E3A8A] hover:bg-[#1E3A8A]/10 cursor-pointer"
            disabled={isLoading}
          >
            Reset
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6 space-y-2 bg-white border border-gray-100 rounded-xl shadow-sm">
              <p className="text-sm text-gray-600 font-medium">Tax Payable</p>
              <p className="text-2xl lg:text-[32px] font-bold text-[#1E3A8A]">
                ₦{formatNumber(result.totals?.taxPayable || 0)}
              </p>
            </Card>

            <Card className="p-6 space-y-2 bg-white border border-gray-100 rounded-xl shadow-sm">
              <p className="text-sm text-gray-600 font-medium">Tax With Relief</p>
              <p className="text-2xl lg:text-[32px] font-bold text-[#1E3A8A]">
                ₦{formatNumber(result.totals?.taxPayable || 0)}
              </p>
            </Card>

            <Card className="p-6 space-y-2 bg-white border border-gray-100 rounded-xl shadow-sm">
              <p className="text-sm text-gray-600 font-medium">Total Relief & Savings</p>
              <p className="text-2xl lg:text-[32px] font-bold text-[#1E3A8A]">
                ₦0
              </p>
            </Card>

            <Card className="p-6 space-y-2 bg-white border border-gray-100 rounded-xl shadow-sm">
              <p className="text-sm text-gray-600 font-medium">Effective Tax Rate</p>
              <p className="text-2xl lg:text-[32px] font-bold text-[#1E3A8A]">
                {result.totals?.effectiveTaxRate?.toFixed(2) || 0}%
              </p>
            </Card>
          </div>

          {/* Gross Income Chart and Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Gross Income Chart */}
            <Card className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Gross Income</h3>
                    <p className="text-xs text-gray-500">(Last 6 months)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Amount (₦)</p>
                    <p className="text-lg font-bold text-gray-900">30000</p>
                    <p className="text-xs text-gray-400">March</p>
                  </div>
                </div>

                {/* Chart */}
                <div className="h-48 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#E0E7FF" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#E0E7FF" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                      {/* Area fill */}
                      <path
                        d="M 0 80 Q 15 60, 20 50 Q 30 35, 40 30 Q 50 25, 60 40 Q 70 55, 80 45 Q 90 35, 100 50 L 100 100 L 0 100 Z"
                        fill="url(#areaGradient)"
                      />
                      {/* Line */}
                      <path
                        d="M 0 80 Q 15 60, 20 50 Q 30 35, 40 30 Q 50 25, 60 40 Q 70 55, 80 45 Q 90 35, 100 50"
                        fill="none"
                        stroke="#4F46E5"
                        strokeWidth="0.5"
                      />
                      {/* Dot at March */}
                      <circle cx="40" cy="30" r="1.5" fill="#1E3A8A" />
                    </svg>
                  </ResponsiveContainer>

                  {/* Month labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-[10px] text-gray-400">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Breakdown Donut Chart */}
            <Card className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
              <h3 className="text-base font-semibold text-gray-900 mb-6">Breakdown</h3>
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Annual Income (blue) - 60% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#1E3A8A"
                      strokeWidth="15"
                      strokeDasharray="131.95 219.91"
                      strokeDashoffset="0"
                    />
                    {/* Total Deductions (green) - 20% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="15"
                      strokeDasharray="43.98 219.91"
                      strokeDashoffset="-131.95"
                    />
                    {/* Annual Taxes (gray) - 20% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="15"
                      strokeDasharray="43.98 219.91"
                      strokeDashoffset="-175.93"
                    />
                  </svg>

                  {/* Center values */}
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="text-lg font-bold text-gray-900">₦1950K</p>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#1E3A8A]"></div>
                    <span className="text-sm text-gray-600">Annual Income</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">₦1800</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                    <span className="text-sm text-gray-600">Total Deductions</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">₦150,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#E5E7EB]"></div>
                    <span className="text-sm text-gray-600">Annual Taxes</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">₦0</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Detailed Breakdown */}
          <Card className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Detailed Breakdown</h3>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-200 mb-6">
              <button className="pb-3 text-sm font-medium text-[#1E3A8A] border-b-2 border-[#1E3A8A]">
                Income
              </button>
              <button className="pb-3 text-sm font-medium text-gray-500 hover:text-gray-700">
                Deductions & Reliefs
              </button>
              <button className="pb-3 text-sm font-medium text-gray-500 hover:text-gray-700">
                Allowances
              </button>
            </div>

            {/* Table */}
            <div className="space-y-0 divide-y divide-gray-100">
              <div className="flex justify-between py-4">
                <span className="text-sm text-gray-600">Capital Allowance</span>
                <span className="text-sm font-semibold text-gray-900">₦300,000</span>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-sm text-gray-600">Previous Year Losses</span>
                <span className="text-sm font-semibold text-gray-900">₦120,000</span>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-sm text-gray-600">Digital Asset Losses</span>
                <span className="text-sm font-semibold text-gray-900">₦50,000</span>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-sm text-gray-600">Charitable Donations</span>
                <span className="text-sm font-semibold text-gray-900">₦80,000</span>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-sm text-gray-600">Educational Expenses</span>
                <span className="text-sm font-semibold text-gray-900">₦100,000</span>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-sm text-gray-600">Business Losses</span>
                <span className="text-sm font-semibold text-gray-900">₦90,000</span>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-sm text-gray-600">Freelancing Expenses</span>
                <span className="text-sm font-semibold text-gray-900">₦40,000</span>
              </div>
              <div className="flex justify-between py-4 bg-gray-50">
                <span className="text-sm font-semibold text-gray-900">Total Deductions</span>
                <span className="text-sm font-bold text-[#1E3A8A]">₦1,180,000</span>
              </div>
            </div>
          </Card>

          {/* Applied Incentives */}
          {result.appliedIncentives && result.appliedIncentives.length > 0 && (
            <Card className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-[#1E3A8A]">
                ✅ Applied Incentives
              </h3>
              <ul className="space-y-2">
                {result.appliedIncentives.map((incentive, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#1E3A8A] mr-2">•</span>
                    <span className="text-sm text-muted-foreground">{incentive}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Tax Tips */}
          {result.tips && result.tips.length > 0 && (
            <Card className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-[#1E3A8A]">
                💡 Tax Tips & Recommendations
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