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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

type Frequency = "monthly" | "annual";
type TabType = "income" | "deductions" | "allowances";

const CHART_COLORS = ["#1E3A8A", "#3B82F6", "#60A5FA", "#10B981", "#F59E0B", "#EF4444"];
const INCOME_COLORS = ["#1E3A8A", "#3B82F6", "#60A5FA", "#93C5FD", "#DBEAFE"];
const DEDUCTION_COLORS = ["#10B981", "#34D399", "#6EE7B7", "#A7F3D0"];

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
  const [activeTab, setActiveTab] = useState<TabType>("income");

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

  // Income breakdown chart data
  const incomeChartData = result
    ? [
      {
        name: "Revenue",
        value: result.incomeBreakdown?.revenue || 0,
        fill: INCOME_COLORS[0],
      },
      {
        name: "Dividends",
        value: result.incomeBreakdown?.dividendsReceived || 0,
        fill: INCOME_COLORS[1],
      },
      {
        name: "Digital Assets",
        value: result.incomeBreakdown?.digitalAssets || 0,
        fill: INCOME_COLORS[2],
      },
      {
        name: "Other Income",
        value: result.incomeBreakdown?.otherIncome || 0,
        fill: INCOME_COLORS[3],
      },
    ].filter((item) => item.value > 0)
    : [];

  // Donut chart data for breakdown
  const donutChartData = result
    ? [
      {
        name: "Gross Income",
        value: result.incomeBreakdown?.totalGrossIncome || 0,
        fill: "#1E3A8A",
      },
      {
        name: "Total Deductions",
        value: result.deductionsBreakdown?.totalDeductions || 0,
        fill: "#10B981",
      },
      {
        name: "Tax Payable",
        value: result.totals?.taxPayable || 0,
        fill: "#EF4444",
      },
    ].filter((item) => item.value > 0)
    : [];

  // Calculate donut chart percentages
  const totalForDonut = donutChartData.reduce((sum, item) => sum + item.value, 0);
  const donutPercentages = donutChartData.map((item) => ({
    ...item,
    percentage: totalForDonut > 0 ? (item.value / totalForDonut) * 100 : 0,
  }));

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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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
            <Card className="p-6 space-y-2 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm text-muted-foreground font-medium">Tax Payable</p>
              <p className="text-xl lg:text-2xl font-bold text-[#1E3A8A] break-all">
                {formatCurrency(result.totals?.taxPayable || 0)}
              </p>
              <p className="text-xs text-muted-foreground">
                Tax Rate: {(result.totals?.taxRate || 0) * 100}%
              </p>
            </Card>

            <Card className="p-6 space-y-2 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm text-muted-foreground font-medium">Taxable Profit</p>
              <p className="text-xl lg:text-2xl font-bold text-[#1E3A8A] break-all">
                {formatCurrency(result.totals?.taxableProfit || 0)}
              </p>
              <p className="text-xs text-muted-foreground">
                After deductions
              </p>
            </Card>

            <Card className="p-6 space-y-2 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm text-muted-foreground font-medium">Total Deductions</p>
              <p className="text-xl lg:text-2xl font-bold text-[#1E3A8A] break-all">
                {formatCurrency(result.deductionsBreakdown?.totalDeductions || 0)}
              </p>
              <p className="text-xs text-muted-foreground">
                All reliefs applied
              </p>
            </Card>

            <Card className="p-6 space-y-2 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm text-muted-foreground font-medium">Effective Tax Rate</p>
              <p className="text-xl lg:text-2xl font-bold text-[#1E3A8A] break-all">
                {result.totals?.effectiveTaxRate?.toFixed(2) || 0}%
              </p>
              <p className="text-xs text-muted-foreground">
                After all incentives
              </p>
            </Card>
          </div>

          {/* Income Breakdown Chart and Donut Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Income Breakdown Bar Chart */}
            <Card className="p-6 bg-card border border-border rounded-xl shadow-sm">
              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-1">Income Breakdown</h3>
                    <p className="text-xs text-muted-foreground">By income source</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Total Gross Income</p>
                    <p className="text-lg font-bold text-[#1E3A8A] break-all">
                      {formatCurrency(result.incomeBreakdown?.totalGrossIncome)}
                    </p>
                  </div>
                </div>

                {/* Chart */}
                <div className="h-64">
                  {incomeChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={incomeChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 12, fill: "#6B7280" }}
                          stroke="#D1D5DB"
                        />
                        <YAxis
                          tick={{ fontSize: 12, fill: "#6B7280" }}
                          stroke="#D1D5DB"
                          tickFormatter={(value) => {
                            if (value >= 1000000) return `₦${(value / 1000000).toFixed(1)}M`;
                            if (value >= 1000) return `₦${(value / 1000).toFixed(0)}K`;
                            return `₦${value}`;
                          }}
                        />
                        <Tooltip
                          formatter={(value: number) => formatCurrency(value)}
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #E5E7EB",
                            borderRadius: "8px",
                            padding: "8px 12px",
                          }}
                        />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                          {incomeChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      <p className="text-sm">No income data available</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Breakdown Donut Chart */}
            <Card className="p-6 bg-card border border-border rounded-xl shadow-sm">
              <h3 className="text-base font-semibold text-foreground mb-6">Financial Overview</h3>
              <div className="flex items-center justify-center">
                {donutChartData.length > 0 ? (
                  <div className="relative w-48 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={donutChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {donutChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => formatCurrency(value)}
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #E5E7EB",
                            borderRadius: "8px",
                            padding: "8px 12px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>

                    {/* Center values */}
                    <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="text-lg font-bold text-gray-900">
                        {formatCurrency(totalForDonut)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center text-gray-400">
                    <p className="text-sm">No data available</p>
                  </div>
                )}
              </div>

              {/* Legend */}
              <div className="mt-6 space-y-3">
                {donutChartData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      ></div>
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground break-all">
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Detailed Breakdown */}
          <Card className="p-6 bg-card border border-border rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-6">Detailed Breakdown</h3>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-border mb-6">
              <button
                onClick={() => setActiveTab("income")}
                className={`pb-3 text-sm font-medium transition-colors ${activeTab === "income"
                  ? "text-[#1E3A8A] border-b-2 border-[#1E3A8A]"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                Income
              </button>
              <button
                onClick={() => setActiveTab("deductions")}
                className={`pb-3 text-sm font-medium transition-colors ${activeTab === "deductions"
                  ? "text-[#1E3A8A] border-b-2 border-[#1E3A8A]"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                Deductions & Reliefs
              </button>
              <button
                onClick={() => setActiveTab("allowances")}
                className={`pb-3 text-sm font-medium transition-colors ${activeTab === "allowances"
                  ? "text-[#1E3A8A] border-b-2 border-[#1E3A8A]"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                Allowances
              </button>
            </div>

            {/* Table Content */}
            <div className="space-y-0 divide-y divide-border">
              {activeTab === "income" && result.incomeBreakdown && (
                <>
                  <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                    <span className="text-sm text-muted-foreground">Revenue</span>
                    <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                      {formatCurrency(result.incomeBreakdown.revenue)}
                    </span>
                  </div>
                  {result.incomeBreakdown.dividendsReceived > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">Dividends Received</span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.incomeBreakdown.dividendsReceived)}
                      </span>
                    </div>
                  )}
                  {result.incomeBreakdown.exemptDividends > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">Exempt Dividends</span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.incomeBreakdown.exemptDividends)}
                      </span>
                    </div>
                  )}
                  {result.incomeBreakdown.digitalAssets > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">Digital Assets</span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.incomeBreakdown.digitalAssets)}
                      </span>
                    </div>
                  )}
                  {result.incomeBreakdown.otherIncome > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">Other Income</span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.incomeBreakdown.otherIncome)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-4 bg-muted/30 border-t-2 border-[#1E3A8A]">
                    <span className="text-sm font-semibold text-foreground">Total Gross Income</span>
                    <span className="text-sm font-bold text-[#1E3A8A] break-all text-right ml-4">
                      {formatCurrency(result.incomeBreakdown.totalGrossIncome)}
                    </span>
                  </div>
                </>
              )}

              {activeTab === "deductions" && result.deductionsBreakdown && (
                <>
                  {result.deductionsBreakdown.expenses > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">Expenses</span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.deductionsBreakdown.expenses)}
                      </span>
                    </div>
                  )}
                  {result.deductionsBreakdown.capitalExpenditure > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">Capital Expenditure</span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.deductionsBreakdown.capitalExpenditure)}
                      </span>
                    </div>
                  )}
                  {result.deductionsBreakdown.previousYearLosses > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">Previous Year Losses</span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.deductionsBreakdown.previousYearLosses)}
                      </span>
                    </div>
                  )}
                  {result.deductionsBreakdown.currentYearLosses > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">Current Year Losses</span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.deductionsBreakdown.currentYearLosses)}
                      </span>
                    </div>
                  )}
                  {result.deductionsBreakdown.digitalAssetLosses > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">Digital Asset Losses</span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.deductionsBreakdown.digitalAssetLosses)}
                      </span>
                    </div>
                  )}
                  {result.deductionsBreakdown.charitableDonations > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">Charitable Donations</span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.deductionsBreakdown.charitableDonations)}
                      </span>
                    </div>
                  )}
                  {result.deductionsBreakdown.employeeCosts > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">Employee Costs</span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.deductionsBreakdown.employeeCosts)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-4 bg-muted/30 border-t-2 border-[#1E3A8A]">
                    <span className="text-sm font-semibold text-foreground">Total Deductions</span>
                    <span className="text-sm font-bold text-[#1E3A8A] break-all text-right ml-4">
                      {formatCurrency(result.deductionsBreakdown.totalDeductions)}
                    </span>
                  </div>
                </>
              )}

              {activeTab === "allowances" && result.deductionsBreakdown && (
                <>
                  {result.deductionsBreakdown.capitalAllowance > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">Capital Allowance</span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.deductionsBreakdown.capitalAllowance)}
                      </span>
                    </div>
                  )}
                  {result.deductionsBreakdown.capitalAllowanceUsed > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">Capital Allowance Used</span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.deductionsBreakdown.capitalAllowanceUsed)}
                      </span>
                    </div>
                  )}
                  {result.totals.carryForwardLosses > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">Carry Forward Losses</span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.totals.carryForwardLosses)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-4 bg-muted/30 border-t-2 border-[#1E3A8A]">
                    <span className="text-sm font-semibold text-foreground">Total Allowances</span>
                    <span className="text-sm font-bold text-[#1E3A8A] break-all text-right ml-4">
                      {formatCurrency(
                        (result.deductionsBreakdown.capitalAllowanceUsed || 0) +
                        (result.totals.carryForwardLosses || 0)
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Applied Incentives */}
          {result.appliedIncentives && result.appliedIncentives.length > 0 && (
            <Card className="p-6 bg-card border border-border rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-[#1E3A8A] text-lg">✅</span>
                </div>
                <h3 className="text-lg font-semibold text-[#1E3A8A]">
                  Applied Incentives
                </h3>
              </div>
              <ul className="space-y-3">
                {result.appliedIncentives.map((incentive, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border hover:border-[#1E3A8A]/20 transition-colors"
                  >
                    <span className="text-[#1E3A8A] mt-0.5 font-bold">•</span>
                    <span className="text-sm text-foreground leading-relaxed">{incentive}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Tax Tips */}
          {result.tips && result.tips.length > 0 && (
            <Card className="p-6 bg-card border border-border rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-[#1E3A8A] text-lg">💡</span>
                </div>
                <h3 className="text-lg font-semibold text-[#1E3A8A]">
                  Tax Tips & Recommendations
                </h3>
              </div>
              <ul className="space-y-3">
                {result.tips.map((tip, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border hover:border-[#1E3A8A]/20 transition-colors"
                  >
                    <span className="text-[#1E3A8A] mt-0.5 font-bold">•</span>
                    <span className="text-sm text-foreground leading-relaxed">{tip}</span>
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