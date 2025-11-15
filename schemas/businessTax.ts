import { z } from 'zod';
import { CompanyType } from '@/types/businessTax';

// Accounting period with validation
const accountingPeriodSchema = z.object({
  start: z.string().datetime({ message: 'Start date must be in ISO 8601 format' }),
  end: z.string().datetime({ message: 'End date must be in ISO 8601 format' }),
}).refine(
  (data) => new Date(data.end) > new Date(data.start),
  { message: 'End date must be after start date' }
);

// Business income - matches API exactly
const businessIncomeSchema = z.object({
  revenue: z.number().positive({ message: 'Revenue must be a positive number' }),
  dividendsReceived: z.number().nonnegative({ message: 'Dividends received must be a non-negative number' }).optional(),
  exemptDividends: z.number().nonnegative({ message: 'Exempt dividends must be a non-negative number' }).optional(),
  digitalAssets: z.number().nonnegative({ message: 'Digital assets must be a non-negative number' }).optional(),
  otherIncome: z.number().nonnegative({ message: 'Other income must be a non-negative number' }).optional(),
});

// Business deductions - matches API exactly
const businessDeductionsSchema = z.object({
  expenses: z.number().nonnegative({ message: 'Expenses must be a non-negative number' }).optional(),
  capitalExpenditure: z.number().nonnegative({ message: 'Capital expenditure must be a non-negative number' }).optional(),
  capitalAllowance: z.number().nonnegative({ message: 'Capital allowance must be a non-negative number' }).optional(),
  previousYearLosses: z.number().nonnegative({ message: 'Previous year losses must be a non-negative number' }).optional(),
  currentYearLosses: z.number().nonnegative({ message: 'Current year losses must be a non-negative number' }).optional(),
  digitalAssetLosses: z.number().nonnegative({ message: 'Digital asset losses must be a non-negative number' }).optional(),
  charitableDonations: z.number().nonnegative({ message: 'Charitable donations must be a non-negative number' }).optional(),
  employeeCosts: z.number().nonnegative({ message: 'Employee costs must be a non-negative number' }).optional(),
});

// Employees - matches API exactly
const employeesSchema = z.object({
  total: z.number().int().nonnegative({ message: 'Total employees must be a non-negative integer' }).optional(),
  lowIncomeCount: z.number().int().nonnegative({ message: 'Low income count must be a non-negative integer' }).optional(),
}).optional();

// Incentives - matches API exactly
const incentivesSchema = z.object({
  tempRelief: z.boolean().optional(),
  agriHoliday: z.boolean().optional(),
  exportExemption: z.boolean().optional(),
}).optional();

// Main business tax schema
export const businessTaxSchema = z.object({
  companyType: z.nativeEnum(CompanyType, {
    message: 'Invalid company type. Must be one of: small, large, agriculture, export, priority'
  }),
  accountingPeriod: accountingPeriodSchema,
  income: businessIncomeSchema,
  deductions: businessDeductionsSchema,
  employees: employeesSchema,
  incentives: incentivesSchema,
});

// Type inference from schema
export type BusinessTaxFormData = z.infer<typeof businessTaxSchema>;