"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  useBusinessTaxCalculation,
  type BusinessTaxInput,
} from "@/hooks/useBusinessTaxCalculation";
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

export default function BusinessTaxCalculator() {
  const { calculateTax, result, isLoading, reset } =
    useBusinessTaxCalculation();
  const [formData, setFormData] = useState<BusinessTaxInput>({
    companyType: "small",
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
      tempRelief: true,
      agriHoliday: false,
      exportExemption: false,
    },
  });

  const formatDateForInput = (
    dateString: string | undefined | null
  ): string => {
    if (!dateString) return "";
    // Convert from YYYYMMDD to YYYY-MM-DD
    const str = String(dateString); // Ensure it's a string
    if (str.includes("-")) return str; // Already in YYYY-MM-DD format
    return str.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
  };

  const handleDateChange = (path: string, value: string) => {
    // Convert from YYYY-MM-DD to YYYYMMDD for storage
    const formattedValue = value.replace(/-/g, "");
    handleInputChange(path, formattedValue);
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
        current = current[keys[i]];
      }

      const lastKey = keys[keys.length - 1];
      current[lastKey] = typeof value === "string" ? parseNumber(value) : value;

      return newData;
    });
  };

  const handleCalculate = async () => {
    try {
      const dataToSend = {
        ...formData,
        accountingPeriod: {
          start: formData.accountingPeriod.start,
          end: formData.accountingPeriod.end,
        },
      };

      await calculateTax(dataToSend);
      toast.success("Tax calculation completed successfully");
    } catch (err) {
      // Error handling
    }
  };

  const handleReset = () => {
    reset();
    setFormData({
      companyType: "small",
      accountingPeriod: {
        start: formatDateForInput(""),
        end: formatDateForInput(""),
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

  const formatCurrency = (value: number) => {
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
        {/* Company Type */}
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

        {/* Accounting Period */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Start Date
            </label>
            <Input
              type="date"
              value={
                formData.accountingPeriod.start
                  ? formatDateForInput(formData.accountingPeriod.start)
                  : ""
              }
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
              value={
                formData.accountingPeriod.end
                  ? formatDateForInput(formData.accountingPeriod.end)
                  : ""
              }
              onChange={(e) =>
                handleDateChange("accountingPeriod.end", e.target.value)
              }
            />
          </div>
        </div>

        {/* Income Section */}
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
                  value={formatNumber(value as number)}
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

        {/* Deductions Section */}
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
                  value={formatNumber(value as number)}
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

        {/* Employees Section */}
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

        {/* Incentives Section */}
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

      {result && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Your Estimates
            </h2>
            <p className="text-muted-foreground">
              Results are shown for the selected accounting period.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

          {/* Tax Breakdown Chart */}
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
