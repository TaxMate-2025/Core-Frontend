/**
 * Authentication service for handling sign-up and login API calls
 */

import apiClient from '@/lib/apiClient';
import type {
  SignUpRequest,
  SignUpResponse,
  LoginRequest,
  LoginResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  ResendVerificationRequest,
  ResendVerificationResponse,
} from '@/types/auth';

const AUTH_ENDPOINTS = {
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  VERIFY_EMAIL: '/auth/verify-email',
  RESEND_VERIFICATION: '/auth/resend-verification',
} as const;

export const authService = {
  signUp: async (data: SignUpRequest): Promise<SignUpResponse> => {
    const response = await apiClient.post<SignUpResponse>(
      AUTH_ENDPOINTS.SIGNUP,
      data
    );
    return response.data;
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      AUTH_ENDPOINTS.LOGIN,
      data
    );
    return response.data;
  },
  verifyEmail: async (data: VerifyEmailRequest): Promise<VerifyEmailResponse> => {
    const response = await apiClient.post<VerifyEmailResponse>(
      AUTH_ENDPOINTS.VERIFY_EMAIL,
      data
    );
    return response.data;
  },
  resendVerification: async (data: ResendVerificationRequest): Promise<ResendVerificationResponse> => {
    const response = await apiClient.post<ResendVerificationResponse>(
      AUTH_ENDPOINTS.RESEND_VERIFICATION,
      data
    );
    return response.data;
  },
};
