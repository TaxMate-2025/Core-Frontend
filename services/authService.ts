/**
 * Authentication service for handling sign-up and login API calls
 */

import apiClient from '@/lib/apiClient';
import type {
  SignUpRequest,
  SignUpResponse,
  LoginRequest,
  LoginResponse,
} from '@/types/auth';

const AUTH_ENDPOINTS = {
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
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
};
