// Authentication related TypeScript types and interfaces

/**
 * User type enum
 */
export enum UserType {
  FREELANCER = 'FREELANCER',
  CONTENT_CREATOR = 'CONTENT_CREATOR',
  SMALL_BUSINESS_OWNER = 'SMALL_BUSINESS_OWNER',
  STUDENT = 'STUDENT',
  OTHER = 'OTHER',
}

/**
 * User object returned from authentication endpoints
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  otpExpiry: string | null;
  createdAt: string;
  updatedAt: string;
  oauthProvider: string | null;
  oauthId: string | null;
  resetToken: string | null;
  resetTokenExpiry: string | null;
  googleRefreshToken: string | null;
}

/**
 * Sign-up form data (includes UI-only fields like agreedToTerms)
 */
export interface SignUpFormData {
  firstName: string;
  lastName: string;
  userType: UserType | '';
  email: string;
  password: string;
  agreedToTerms: boolean;
}

/**
 * Sign-up request payload (sent to API)
 */
export interface SignUpRequest {
  firstName: string;
  lastName: string;
  userType: UserType;
  email: string;
  password: string;
}

/**
 * Sign-up API response
 */
export interface SignUpResponse {
  user: User;
  message: string;
}

/**
 * Login form data (includes UI-only fields like rememberMe)
 */
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Login request payload (sent to API)
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Login API response
 */
export interface LoginResponse {
  user: User;
  message: string;
  token?: string;
}

/**
 * Generic authentication response
 */
export interface AuthResponse {
  user: User;
  message: string;
  token?: string;
}

export interface VerifyEmailRequest {
  email: string;
  otp: string;
}

export interface VerifyEmailResponse {
  message: string;
  emailVerified?: boolean;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface ResendVerificationResponse {
  message: string;
}
