import { z } from "zod";

export const advancedTaxSchema = z.object({
    income: z.object({
        employment: z.number().min(0, "Employment income must be non-negative"),
        business: z.number().min(0).optional(),
        freelance: z.number().min(0).optional(),
        rentalIncome: z.number().min(0).optional(),
        otherIncome: z.number().min(0).optional(),
        digitalAssets: z.number().min(0).optional(),
    }),
    deductions: z
        .object({
            capitalAllowance: z.number().min(0).optional(),
            previousYearLosses: z.number().min(0).optional(),
            digitalAssetLosses: z.number().min(0).optional(),
            charitableDonations: z.number().min(0).optional(),
            educationalExpenses: z.number().min(0).optional(),
            businessLosses: z.number().min(0).optional(),
            freelancingExpenses: z.number().min(0).optional(),
        })
        .optional(),
    allowances: z
        .object({
            nhf: z.number().min(0).optional(),
            nhis: z.number().min(0).optional(),
            pension: z.number().min(0).optional(),
            mortgageInterest: z.number().min(0).optional(),
            lifeInsurance: z.number().min(0).optional(),
            rentRelief: z.number().min(0).optional(),
        })
        .optional(),
});

