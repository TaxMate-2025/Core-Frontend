"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useAdvancedTaxCalculation } from "@/hooks/useAdvancedTaxCalculation";
import type { AdvancedTaxInput } from "@/types/advancedTax";
import { motion, AnimatePresence } from "framer-motion";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

type Frequency = "monthly" | "annual";
type TabType = "income" | "deductions" | "allowances";

const INCOME_COLORS = [
  "#1E3A8A",
  "#3B82F6",
  "#60A5FA",
  "#93C5FD",
  "#DBEAFE",
  "#E0E7FF",
];

interface AdvancedTaxFormData {
  frequency: "monthly" | "annual";
  income: {
    employment: number;
    business: number;
    freelance: number;
    rentalIncome: number;
    otherIncome: number;
    digitalAssets: number;
  };
  deductions: {
    capitalAllowance: number;
    previousYearLosses: number;
    digitalAssetLosses: number;
    charitableDonations: number;
    educationalExpenses: number;
    businessLosses: number;
    freelancingExpenses: number;
  };
  allowances: {
    nhf: number;
    nhis: number;
    pension: number;
    mortgageInterest: number;
    lifeInsurance: number;
    rentRelief: number;
  };
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function AdvancedTaxCalculator() {
  const { calculateTax, result, isLoading, reset } =
    useAdvancedTaxCalculation();
  const [activeTab, setActiveTab] = useState<TabType>("income");
  const [expandedTips, setExpandedTips] = useState<Record<number, boolean>>({});
  const pdfRef = useRef<HTMLDivElement>(null);


  const [formData, setFormData] = useState<AdvancedTaxFormData>({
    frequency: "annual",
    income: {
      employment: 0,
      business: 0,
      freelance: 0,
      rentalIncome: 0,
      otherIncome: 0,
      digitalAssets: 0,
    },
    deductions: {
      capitalAllowance: 0,
      previousYearLosses: 0,
      digitalAssetLosses: 0,
      charitableDonations: 0,
      educationalExpenses: 0,
      businessLosses: 0,
      freelancingExpenses: 0,
    },
    allowances: {
      nhf: 0,
      nhis: 0,
      pension: 0,
      mortgageInterest: 0,
      lifeInsurance: 0,
      rentRelief: 0,
    },
  });

  const formatNumber = (num: number | null): string => {
    if (num === null || isNaN(num)) return "0";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parseNumber = (str: string): number => {
    if (!str) return 0;
    const num = Number(str.replace(/[^0-9.]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const handleInputChange = (path: string, value: string | number) => {
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

      if (path === "frequency") {
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

      const dataToSend: AdvancedTaxInput = {
        income: {
          employment: formData.income.employment * incomeMultiplier,
          business: formData.income.business * incomeMultiplier || undefined,
          freelance: formData.income.freelance * incomeMultiplier || undefined,
          rentalIncome:
            formData.income.rentalIncome * incomeMultiplier || undefined,
          otherIncome:
            formData.income.otherIncome * incomeMultiplier || undefined,
          digitalAssets:
            formData.income.digitalAssets * incomeMultiplier || undefined,
        },
        deductions: {
          capitalAllowance: formData.deductions.capitalAllowance || undefined,
          previousYearLosses:
            formData.deductions.previousYearLosses || undefined,
          digitalAssetLosses:
            formData.deductions.digitalAssetLosses || undefined,
          charitableDonations:
            formData.deductions.charitableDonations || undefined,
          educationalExpenses:
            formData.deductions.educationalExpenses || undefined,
          businessLosses: formData.deductions.businessLosses || undefined,
          freelancingExpenses:
            formData.deductions.freelancingExpenses || undefined,
        },
        allowances: {
          nhf: formData.allowances.nhf || undefined,
          nhis: formData.allowances.nhis || undefined,
          pension: formData.allowances.pension || undefined,
          mortgageInterest: formData.allowances.mortgageInterest || undefined,
          lifeInsurance: formData.allowances.lifeInsurance || undefined,
          rentRelief: formData.allowances.rentRelief || undefined,
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
      frequency: "annual",
      income: {
        employment: 0,
        business: 0,
        freelance: 0,
        rentalIncome: 0,
        otherIncome: 0,
        digitalAssets: 0,
      },
      deductions: {
        capitalAllowance: 0,
        previousYearLosses: 0,
        digitalAssetLosses: 0,
        charitableDonations: 0,
        educationalExpenses: 0,
        businessLosses: 0,
        freelancingExpenses: 0,
      },
      allowances: {
        nhf: 0,
        nhis: 0,
        pension: 0,
        mortgageInterest: 0,
        lifeInsurance: 0,
        rentRelief: 0,
      },
    });
  };

  const toggleTip = (index: number) => {
    setExpandedTips((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Income breakdown chart data
  const incomeChartData = result
    ? [
        {
          name: "Employment",
          value: result.incomeBreakdown?.employment || 0,
          fill: INCOME_COLORS[0],
        },
        {
          name: "Business",
          value: result.incomeBreakdown?.business || 0,
          fill: INCOME_COLORS[1],
        },
        {
          name: "Freelance",
          value: result.incomeBreakdown?.freelance || 0,
          fill: INCOME_COLORS[2],
        },
        {
          name: "Rental",
          value: result.incomeBreakdown?.rentalIncome || 0,
          fill: INCOME_COLORS[3],
        },
        {
          name: "Other",
          value: result.incomeBreakdown?.otherIncome || 0,
          fill: INCOME_COLORS[4],
        },
        {
          name: "Digital Assets",
          value: result.incomeBreakdown?.digitalAssets || 0,
          fill: INCOME_COLORS[5],
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
          value: result.results?.taxPayable || 0,
          fill: "#EF4444",
        },
      ].filter((item) => item.value > 0)
    : [];

  // Calculate donut chart total
  const totalForDonut = donutChartData.reduce(
    (sum, item) => sum + item.value,
    0
  );

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
          Advanced Tax Calculator
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Advanced calculator for freelancers, contractors, or mixed-income
          earners with multiple sources of income. Understand reliefs,
          deductions, and stay fully compliant.
        </p>
      </div>

      <Card className="p-8 space-y-6">
        {/* <div className="flex items-center justify-between space-x-2 mb-6">
          <span className="text-xl md:text-2xl lg:text-[28px] font-semibold leading-tight tracking-normal text-[#1E3A8A]">
            Income Frequency:
          </span>
          <div className="flex bg-gray-100 rounded-lg p-1 gap-2">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                formData.frequency === "monthly"
                  ? "bg-white shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => handleInputChange("frequency", "monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                formData.frequency === "annual"
                  ? "bg-white shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => handleInputChange("frequency", "annual")}
            >
              Annual
            </button>
          </div>
        </div> */}

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-foreground">
            Income Sources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(formData.income).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {key.split(/(?=[A-Z])/).join(" ")}
                  {key !== "employment" && (
                    <span className="text-muted-foreground ml-1">
                      (Optional)
                    </span>
                  )}
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
                  <span className="text-muted-foreground ml-1">(Optional)</span>
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
          <h3 className="text-lg font-semibold text-foreground">Allowances</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(formData.allowances).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {key === "nhf"
                    ? "NHF"
                    : key === "nhis"
                    ? "NHIS"
                    : key.split(/(?=[A-Z])/).join(" ")}
                  <span className="text-muted-foreground ml-1">(Optional)</span>
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
                      `allowances.${key}`,
                      parseNumber(e.target.value) || 0
                    )
                  }
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
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
        <div id="results-section" className="space-y-4 animate-fade-in">
          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6 space-y-2 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm text-muted-foreground font-medium">
                Tax Payable
              </p>
              <p className="text-xl lg:text-2xl font-bold text-[#1E3A8A] break-all">
                {formatCurrency(result.results?.taxPayable || 0)}
              </p>
              <p className="text-xs text-muted-foreground">With all reliefs</p>
            </Card>

            <Card className="p-6 space-y-2 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm text-muted-foreground font-medium">
                Taxable Income
              </p>
              <p className="text-xl lg:text-2xl font-bold text-[#1E3A8A] break-all">
                {formatCurrency(result.totals?.taxableIncome || 0)}
              </p>
              <p className="text-xs text-muted-foreground">
                After deductions & allowances
              </p>
            </Card>

            <Card className="p-6 space-y-2 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm text-muted-foreground font-medium">
                Take Home (After Tax)
              </p>
              <p className="text-xl lg:text-2xl font-bold text-[#1E3A8A] break-all">
                {formatCurrency(result.results?.takeHomeAfterRelief || 0)}
              </p>
              <p className="text-xs text-muted-foreground">Net income</p>
            </Card>

            <Card className="p-6 space-y-2 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm text-muted-foreground font-medium">
                Effective Tax Rate
              </p>
              <p className="text-xl lg:text-2xl font-bold text-[#1E3A8A] break-all">
                {result.results?.effectiveTaxRate?.toFixed(2) || 0}%
              </p>
              <p className="text-xs text-muted-foreground">After all reliefs</p>
            </Card>
          </div>

          {/* Income Breakdown Chart and Donut Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Income Breakdown Bar Chart */}
            <Card className="p-6 bg-card border border-border rounded-xl shadow-sm">
              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      Income Breakdown
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      By income source
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">
                      Total Gross Income
                    </p>
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
                            if (value >= 1000000)
                              return `₦${(value / 1000000).toFixed(1)}M`;
                            if (value >= 1000)
                              return `₦${(value / 1000).toFixed(0)}K`;
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
              <h3 className="text-base font-semibold text-foreground mb-6">
                Financial Overview
              </h3>
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
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      ></div>
                      <span className="text-sm text-muted-foreground">
                        {item.name}
                      </span>
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
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Detailed Breakdown
            </h3>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-border mb-6">
              <button
                onClick={() => setActiveTab("income")}
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeTab === "income"
                    ? "text-[#1E3A8A] border-b-2 border-[#1E3A8A]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Income
              </button>
              <button
                onClick={() => setActiveTab("deductions")}
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeTab === "deductions"
                    ? "text-[#1E3A8A] border-b-2 border-[#1E3A8A]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Deductions
              </button>
              <button
                onClick={() => setActiveTab("allowances")}
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeTab === "allowances"
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
                    <span className="text-sm text-muted-foreground">
                      Employment
                    </span>
                    <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                      {formatCurrency(result.incomeBreakdown.employment)}
                    </span>
                  </div>
                  {result.incomeBreakdown.business > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">
                        Business
                      </span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.incomeBreakdown.business)}
                      </span>
                    </div>
                  )}
                  {result.incomeBreakdown.freelance > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">
                        Freelance
                      </span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.incomeBreakdown.freelance)}
                      </span>
                    </div>
                  )}
                  {result.incomeBreakdown.rentalIncome > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">
                        Rental Income
                      </span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.incomeBreakdown.rentalIncome)}
                      </span>
                    </div>
                  )}
                  {result.incomeBreakdown.otherIncome > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">
                        Other Income
                      </span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.incomeBreakdown.otherIncome)}
                      </span>
                    </div>
                  )}
                  {result.incomeBreakdown.digitalAssets > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">
                        Digital Assets
                      </span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.incomeBreakdown.digitalAssets)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-4 bg-muted/30 border-t-2 border-[#1E3A8A]">
                    <span className="text-sm font-semibold text-foreground">
                      Total Gross Income
                    </span>
                    <span className="text-sm font-bold text-[#1E3A8A] break-all text-right ml-4">
                      {formatCurrency(result.incomeBreakdown.totalGrossIncome)}
                    </span>
                  </div>
                </>
              )}

              {activeTab === "deductions" && result.deductionsBreakdown && (
                <>
                  {result.deductionsBreakdown.capitalAllowance > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">
                        Capital Allowance
                      </span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(
                          result.deductionsBreakdown.capitalAllowance
                        )}
                      </span>
                    </div>
                  )}
                  {result.deductionsBreakdown.previousYearLosses > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">
                        Previous Year Losses
                      </span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(
                          result.deductionsBreakdown.previousYearLosses
                        )}
                      </span>
                    </div>
                  )}
                  {result.deductionsBreakdown.digitalAssetLosses > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">
                        Digital Asset Losses
                      </span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(
                          result.deductionsBreakdown.digitalAssetLosses
                        )}
                      </span>
                    </div>
                  )}
                  {result.deductionsBreakdown.charitableDonations > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">
                        Charitable Donations
                      </span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(
                          result.deductionsBreakdown.charitableDonations
                        )}
                      </span>
                    </div>
                  )}
                  {result.deductionsBreakdown.educationalExpenses > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">
                        Educational Expenses
                      </span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(
                          result.deductionsBreakdown.educationalExpenses
                        )}
                      </span>
                    </div>
                  )}
                  {result.deductionsBreakdown.businessLosses > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">
                        Business Losses
                      </span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(
                          result.deductionsBreakdown.businessLosses
                        )}
                      </span>
                    </div>
                  )}
                  {result.deductionsBreakdown.freelancingExpenses > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">
                        Freelancing Expenses
                      </span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(
                          result.deductionsBreakdown.freelancingExpenses
                        )}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-4 bg-muted/30 border-t-2 border-[#1E3A8A]">
                    <span className="text-sm font-semibold text-foreground">
                      Total Deductions
                    </span>
                    <span className="text-sm font-bold text-[#1E3A8A] break-all text-right ml-4">
                      {formatCurrency(
                        result.deductionsBreakdown.totalDeductions
                      )}
                    </span>
                  </div>
                </>
              )}

              {activeTab === "allowances" && result.allowancesBreakdown && (
                <>
                  {result.allowancesBreakdown.nhf > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">NHF</span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.allowancesBreakdown.nhf)}
                      </span>
                    </div>
                  )}
                  {result.allowancesBreakdown.nhis > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">
                        NHIS
                      </span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.allowancesBreakdown.nhis)}
                      </span>
                    </div>
                  )}
                  {result.allowancesBreakdown.pension > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">
                        Pension
                      </span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.allowancesBreakdown.pension)}
                      </span>
                    </div>
                  )}
                  {result.allowancesBreakdown.mortgageInterest > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">
                        Mortgage Interest
                      </span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(
                          result.allowancesBreakdown.mortgageInterest
                        )}
                      </span>
                    </div>
                  )}
                  {result.allowancesBreakdown.lifeInsurance > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">
                        Life Insurance
                      </span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(
                          result.allowancesBreakdown.lifeInsurance
                        )}
                      </span>
                    </div>
                  )}
                  {result.allowancesBreakdown.rentRelief > 0 && (
                    <div className="flex justify-between py-4 hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">
                        Rent Relief
                      </span>
                      <span className="text-sm font-semibold text-foreground break-all text-right ml-4">
                        {formatCurrency(result.allowancesBreakdown.rentRelief)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-4 bg-muted/30 border-t-2 border-[#1E3A8A]">
                    <span className="text-sm font-semibold text-foreground">
                      Total Allowances
                    </span>
                    <span className="text-sm font-bold text-[#1E3A8A] break-all text-right ml-4">
                      {formatCurrency(
                        result.allowancesBreakdown.totalAllowances
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Hidden PDF Content */}
          {result && (
            <div style={{ display: 'none' }}>
              <PdfContent ref={pdfRef} result={result} />
            </div>
          )}

          {/* Tax Tips */}
          {result.tips && result.tips.length > 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-[#1E3A8A] text-lg">💡</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1E3A8A]">
                    Tax Tips & Recommendations
                  </h3>
                </div>
                {/* <Button
                  variant="outline"
                  size="sm"
                  className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Export as PDF
                </Button> */}
              </div>

              <motion.ul
                className="space-y-3"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {result.tips.map((tip, index) => {
                  const isExpanded = expandedTips[index] || false;
                  const shouldTruncate = tip.length > 120 && !isExpanded;

                  return (
                    <motion.li
                      key={index}
                      variants={slideUp}
                      className="bg-muted/30 rounded-lg border border-border hover:border-[#1E3A8A]/20 transition-colors overflow-hidden"
                    >
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <span className="text-[#1E3A8A] font-bold mt-0.5">
                            •
                          </span>
                          <div>
                            <p
                              className={`text-sm text-foreground leading-relaxed ${
                                shouldTruncate ? "line-clamp-2" : ""
                              }`}
                            >
                              {tip}
                            </p>
                            {tip.length > 120 && (
                              <button
                                onClick={() => toggleTip(index)}
                                className="text-xs font-medium text-[#1E3A8A] hover:underline mt-1"
                              >
                                {isExpanded ? "Show less" : "Read more"}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
