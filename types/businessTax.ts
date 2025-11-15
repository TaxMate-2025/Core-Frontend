// Business Tax Calculator Types

export enum CompanyType {
  SMALL = 'small',
  LARGE = 'large',
  AGRICULTURE = 'agriculture',
  EXPORT = 'export',
  PRIORITY = 'priority'
}

export interface AccountingPeriod {
  start: string; // ISO 8601 datetime format
  end: string;   // ISO 8601 datetime format
}

export interface BusinessIncome {
  revenue: number;
  dividendsReceived?: number;
  exemptDividends?: number;
  digitalAssets?: number;
  otherIncome?: number;
}

export interface BusinessDeductions {
  expenses?: number;
  capitalExpenditure?: number;
  capitalAllowance?: number;
  previousYearLosses?: number;
  currentYearLosses?: number;
  digitalAssetLosses?: number;
  charitableDonations?: number;
  employeeCosts?: number;
}

export interface Employees {
  total?: number;
  lowIncomeCount?: number;
}

export interface Incentives {
  tempRelief?: boolean;
  agriHoliday?: boolean;
  exportExemption?: boolean;
}

// Request payload
export interface BusinessTaxInput {
  companyType: CompanyType;
  accountingPeriod: AccountingPeriod;
  income: BusinessIncome;
  deductions: BusinessDeductions;
  employees?: Employees;
  incentives?: Incentives;
}

// Response structures
export interface IncomeBreakdown {
  revenue: number;
  dividendsReceived: number;
  exemptDividends: number;
  digitalAssets: number;
  otherIncome: number;
  totalGrossIncome: number;
}

export interface DeductionsBreakdown {
  expenses: number;
  capitalExpenditure: number;
  capitalAllowance: number;
  previousYearLosses: number;
  currentYearLosses: number;
  digitalAssetLosses: number;
  charitableDonations: number;
  employeeCosts: number;
  capitalAllowanceUsed: number;
  totalDeductions: number;
}

export interface TaxTotals {
  taxableProfit: number;
  taxRate: number;
  taxPayable: number;
  effectiveTaxRate: number;
  carryForwardLosses: number;
}

export interface BusinessTaxResult {
  incomeBreakdown: IncomeBreakdown;
  deductionsBreakdown: DeductionsBreakdown;
  totals: TaxTotals;
  appliedIncentives: string[];
  tips: string[];
}

// Type alias for CompanyType string values
export type CompanyTypeValue = 'small' | 'large' | 'agriculture' | 'export' | 'priority';