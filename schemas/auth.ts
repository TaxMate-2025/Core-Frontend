// Zod validation schemas for authentication forms
import { z } from 'zod';
import { UserType } from '@/types/auth';


const passwordValidation = z
  .string()
  .min(8, 'Password must be at least 8 characters')

// Sign-up form validation schema
export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .trim(),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .trim(),
  userType: z
    .nativeEnum(UserType, {
      message: 'Please select your user type',
    }),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  password: passwordValidation,
  agreedToTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must agree to the Terms & Conditions and Privacy Policy',
    }),
});

//  Login form validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export const verifyEmailSchema = z.object({
  email: z.string().email('Invalid email'),
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must contain only numbers'),
});

// Forgot Password schema - email only
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
});

// Reset Password schema - password + confirmPassword
export const resetPasswordSchema = z.object({
  password: passwordValidation,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Type inference from schemas
export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type VerifyEmailFormInputs = z.infer<typeof verifyEmailSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
