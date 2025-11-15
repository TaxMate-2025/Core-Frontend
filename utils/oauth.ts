// OAuth utility functions for social authentication

// Get backend API URL from environment
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://core-backend-kdkn.onrender.com';

// Initiate Google OAuth flow by redirecting to backend
export const initiateGoogleOAuth = () => {
  if (typeof window !== 'undefined') {
    window.location.href = `${BACKEND_URL}/auth/google`;
  }
};

// Initiate Apple OAuth flow by redirecting to backend
export const initiateAppleOAuth = () => {
  if (typeof window !== 'undefined') {
    window.location.href = `${BACKEND_URL}/auth/apple`;
  }
};
