// Advanced Tax Calculator Types

export interface AdvancedIncome {
    employment: number;
    business?: number;
    freelance?: number;
    rentalIncome?: number;
    otherIncome?: number;
    digitalAssets?: number;
}

export interface AdvancedDeductions {
    capitalAllowance?: number;
    previousYearLosses?: number;
    digitalAssetLosses?: number;
    charitableDonations?: number;
    educationalExpenses?: number;
    businessLosses?: number;
    freelancingExpenses?: number;
}

export interface AdvancedAllowances {
    nhf?: number;
    nhis?: number;
    pension?: number;
    mortgageInterest?: number;
    lifeInsurance?: number;
    rentRelief?: number;
}

// Request payload
export interface AdvancedTaxInput {
    income: AdvancedIncome;
    deductions?: AdvancedDeductions;
    allowances?: AdvancedAllowances;
}

// Response structures
export interface AdvancedIncomeBreakdown {
    employment: number;
    business: number;
    freelance: number;
    rentalIncome: number;
    otherIncome: number;
    digitalAssets: number;
    totalGrossIncome: number;
}

export interface AdvancedDeductionsBreakdown {
    capitalAllowance: number;
    previousYearLosses: number;
    digitalAssetLosses: number;
    charitableDonations: number;
    educationalExpenses: number;
    businessLosses: number;
    freelancingExpenses: number;
    totalDeductions: number;
}

export interface AdvancedAllowancesBreakdown {
    nhf: number;
    nhis: number;
    pension: number;
    mortgageInterest: number;
    lifeInsurance: number;
    rentRelief: number;
    totalAllowances: number;
}

export interface AdvancedTaxTotals {
    grossIncome: number;
    totalDeductions: number;
    totalAllowances: number;
    totalReliefs: number;
    taxableIncome: number;
}

export interface AdvancedTaxResults {
    taxPayable: number;
    taxWithRelief: number;
    effectiveTaxRate: number;
    takeHomeBeforeRelief: number;
    takeHomeAfterRelief: number;
    savingsFromRent: number;
}

export interface AdvancedTaxResult {
    incomeBreakdown: AdvancedIncomeBreakdown;
    deductionsBreakdown: AdvancedDeductionsBreakdown;
    allowancesBreakdown: AdvancedAllowancesBreakdown;
    totals: AdvancedTaxTotals;
    results: AdvancedTaxResults;
    tips: string[];
}

