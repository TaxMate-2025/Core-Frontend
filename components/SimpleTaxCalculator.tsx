"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

const CHART_COLORS = ["#1E3A8A", "#3B82F6", "#60A5FA"]

interface CalculatorState {
  frequency: "monthly" | "annual"
  monthlyIncome: number
  pensionContribution: number
  rentPaid: number
  nhfContribution: number
  dependents: number
}

interface Results {
  grossAnnualIncome: number
  taxableIncome: number
  totalDeductions: number
  estimatedPAYE: number
}

export function SimpleTaxCalculator() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [state, setState] = useState<CalculatorState>({
    frequency: "monthly",
    monthlyIncome: 0,
    pensionContribution: 0,
    rentPaid: 0,
    nhfContribution: 0,
    dependents: 0,
  })

  const [results, setResults] = useState<Results | null>(null)

  const handleInputChange = (field: keyof CalculatorState, value: string | number) => {
    setState((prev) => ({
      ...prev,
      [field]: typeof value === "number" ? value : Number.parseFloat(value) || 0,
    }))
  }

  const calculateTax = async () => {
    if (state.monthlyIncome <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid income amount",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Calculate gross annual income
    const grossAnnual = state.frequency === "monthly" ? state.monthlyIncome * 12 : state.monthlyIncome

    // Calculate total deductions
    const pensionDed = (state.pensionContribution / 100) * grossAnnual
    const nhfDed = state.nhfContribution
    const totalDeductions = pensionDed + nhfDed

    // Calculate taxable income
    const taxableIncome = Math.max(0, grossAnnual - state.rentPaid - totalDeductions)

    // Simplified PAYE calculation for Nigeria
    let estimatedPAYE = 0
    if (taxableIncome <= 300000) {
      estimatedPAYE = taxableIncome * 0.01
    } else if (taxableIncome <= 600000) {
      estimatedPAYE = 300000 * 0.01 + (taxableIncome - 300000) * 0.05
    } else if (taxableIncome <= 1100000) {
      estimatedPAYE = 300000 * 0.01 + 300000 * 0.05 + (taxableIncome - 600000) * 0.1
    } else {
      estimatedPAYE = 300000 * 0.01 + 300000 * 0.05 + 500000 * 0.1 + (taxableIncome - 1100000) * 0.15
    }

    setResults({
      grossAnnualIncome: grossAnnual,
      taxableIncome,
      totalDeductions,
      estimatedPAYE: Math.round(estimatedPAYE),
    })

    setIsLoading(false)
    
    toast({
      title: "Calculation Complete",
      description: "Your tax estimate is ready",
    })
  }

  const handleReset = () => {
    setState({
      frequency: "monthly",
      monthlyIncome: 0,
      pensionContribution: 0,
      rentPaid: 0,
      nhfContribution: 0,
      dependents: 0,
    })
    setResults(null)
  }

  const chartData = results
    ? [
        { name: "Annual Income", value: results.grossAnnualIncome, fill: CHART_COLORS[0] },
        { name: "Total Deductions", value: results.totalDeductions, fill: CHART_COLORS[1] },
        { name: "Annual Taxes", value: results.estimatedPAYE, fill: CHART_COLORS[2] },
      ]
    : []

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value)
  }

  // Add responsive padding and max-width
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-semibold text-[48px] leading-none text-center tracking-normal text-[#1E3A8A]">Simple Tax Calculator</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Estimate your PAYE tax quickly. Enter your income and a few common deductions — results will appear after you
          click Calculate.
        </p>
      </div>

      {/* Form Card */}
      <Card className="p-8 space-y-6">
        {/* Income Frequency */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Income Frequency</h2>
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant={state.frequency === "monthly" ? "default" : "outline"}
              className={`${state.frequency === "monthly" ? "bg-[#1E3A8A] hover:bg-[#1E3A8A]/90" : ""}`}
              onClick={() => handleInputChange("frequency", "monthly")}
            >
              Monthly
            </Button>
            <Button
              type="button"
              variant={state.frequency === "annual" ? "default" : "outline"}
              className={`${state.frequency === "annual" ? "bg-[#1E3A8A] hover:bg-[#1E3A8A]/90" : ""}`}
              onClick={() => handleInputChange("frequency", "annual")}
            >
              Annually
            </Button>
          </div>
        </div>

        {/* Income Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            {state.frequency === "monthly" ? "Monthly Income (₦)" : "Annual Income (₦)"}
          </label>
          <Input
            type="number"
            placeholder="0"
            value={state.monthlyIncome || ""}
            onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
            className="text-base"
          />
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Pension Contribution (%) <span className="text-muted-foreground">(Optional)</span>
            </label>
            <Input
              type="number"
              placeholder="0"
              value={state.pensionContribution || ""}
              onChange={(e) => handleInputChange("pensionContribution", e.target.value)}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Rent Paid (₦) <span className="text-muted-foreground">(Optional)</span>
            </label>
            <Input
              type="number"
              placeholder="0"
              value={state.rentPaid || ""}
              onChange={(e) => handleInputChange("rentPaid", e.target.value)}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              NHF Contribution (₦) <span className="text-muted-foreground">(Optional)</span>
            </label>
            <Input
              type="number"
              placeholder="0"
              value={state.nhfContribution || ""}
              onChange={(e) => handleInputChange("nhfContribution", e.target.value)}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Dependents <span className="text-muted-foreground">(Optional)</span>
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
              'Calculate'
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
            <h2 className="text-2xl font-bold text-foreground">Your Estimates</h2>
            <p className="text-muted-foreground">
              Results are shown annually. Monthly equivalents are provided for convenience.
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-6 space-y-2 border border-gray-200 hover:border-[#1E3A8A]/50 transition-colors">
              <p className="text-sm text-muted-foreground">Gross Annual Income</p>
              <p className="text-2xl font-bold text-[#1E3A8A]">{formatCurrency(results.grossAnnualIncome)}</p>
              <p className="text-xs text-muted-foreground">
                {state.frequency === 'monthly' 
                  ? `${formatCurrency(state.monthlyIncome)} per month`
                  : `${formatCurrency(results.grossAnnualIncome / 12)} per month`}
              </p>
            </Card>

            <Card className="p-6 space-y-2 border border-gray-200 hover:border-[#1E3A8A]/50 transition-colors">
              <p className="text-sm text-muted-foreground">Taxable Income</p>
              <p className="text-2xl font-bold text-[#1E3A8A]">{formatCurrency(results.taxableIncome)}</p>
              <p className="text-xs text-muted-foreground">
                After deductions and allowances
              </p>
            </Card>

            <Card className="p-6 space-y-2 border border-gray-200 hover:border-[#1E3A8A]/50 transition-colors">
              <p className="text-sm text-muted-foreground">Total Deductions</p>
              <p className="text-2xl font-bold text-[#1E3A8A]">{formatCurrency(results.totalDeductions)}</p>
              <p className="text-xs text-muted-foreground">
                Includes pension, NHF, and other allowances
              </p>
            </Card>

            <Card className="p-6 space-y-2 border border-gray-200 hover:border-[#1E3A8A]/50 transition-colors">
              <p className="text-sm text-muted-foreground">Estimated PAYE (Annual)</p>
              <p className="text-2xl font-bold text-[#1E3A8A]">{formatCurrency(results.estimatedPAYE)}</p>
              <p className="text-xs text-muted-foreground">
                ~{formatCurrency(Math.round(results.estimatedPAYE / 12))} per month
              </p>
            </Card>
          </div>

          {/* Breakdown Chart */}
          <Card className="p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Breakdown</h3>
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
  )
}
