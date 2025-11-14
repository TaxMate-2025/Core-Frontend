// import axios, {
//     AxiosInstance,
//     AxiosError,
//     InternalAxiosRequestConfig,
// } from 'axios';

// // Types
// export interface ApiErrorResponse {
//     message: string;
//     statusCode: number;
//     data?: any;
// }

// export class ApiError extends Error {
//     constructor(
//         public statusCode: number,
//         public message: string,
//         public data?: any
//     ) {
//         super(message);
//         this.name = 'ApiError';
//     }
// }

// // Create axios instance
// const apiClient: AxiosInstance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
//     timeout: 10000,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // Request Interceptor - Add JWT token
// apiClient.interceptors.request.use(
//     (config: InternalAxiosRequestConfig) => {
//         const token = sessionStorage.getItem('authToken');

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//     },
//     (error: AxiosError) => {
//         return Promise.reject(error);
//     }
// );

// // Response Interceptor - Handle errors
// apiClient.interceptors.response.use(
//     (response) => response,
//     (error: AxiosError) => {
//         const statusCode = error.response?.status || 500;
//         const message =
//             (error.response?.data as any)?.message ||
//             error.message ||
//             'An error occurred';
//         const data = (error.response?.data as any)?.data;

//         // Handle 401 Unauthorized - redirect to login
//         if (statusCode === 401) {
//             sessionStorage.removeItem('authToken');
//             // Redirect to login page
//             if (typeof window !== 'undefined') {
//                 window.location.href = '/login';
//             }
//         }

//         // Handle 403 Forbidden
//         if (statusCode === 403) {
//             console.error('Access forbidden');
//         }

//         // Create custom error
//         const apiError = new ApiError(statusCode, message, data);

//         return Promise.reject(apiError);
//     }
// );

// export default apiClient;


import axios, {
    AxiosInstance,
    AxiosError,
    InternalAxiosRequestConfig,
} from 'axios';

// Types
export interface ApiErrorResponse {
    message: string;
    statusCode: number;
    data?: any;
}

export class ApiError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public data?: any
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor - Add JWT token
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Check if this is a reset password request
        if (config.url?.includes('/auth/reset-password')) {
            // Extract token from request body for reset password
            const bodyToken = (config.data as any)?.token;
            if (bodyToken) {
                config.headers.Authorization = `Bearer ${bodyToken}`;
                console.log('🔐 Reset Password Request:', {
                    url: config.url,
                    body: config.data,
                    authHeader: config.headers.Authorization,
                    tokenLength: bodyToken?.length,
                    tokenPreview: bodyToken?.substring(0, 20) + '...',
                });
            }
        } else {
            // For all other requests, use the auth token from sessionStorage
            const token = sessionStorage.getItem('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response Interceptor - Handle errors
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const statusCode = error.response?.status || 500;
        const message =
            (error.response?.data as any)?.message ||
            error.message ||
            'An error occurred';
        const data = (error.response?.data as any)?.data;

        // Log reset password errors
        if (error.config?.url?.includes('/auth/reset-password')) {
            console.error('❌ Reset Password Error:', {
                statusCode,
                message,
                fullResponse: error.response?.data,
                config: {
                    url: error.config?.url,
                    method: error.config?.method,
                    authHeader: error.config?.headers?.Authorization,
                }
            });
        }

        // Handle 401 Unauthorized - redirect to login
        if (statusCode === 401) {
            sessionStorage.removeItem('authToken');
            // Redirect to login page
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }

        // Handle 403 Forbidden
        if (statusCode === 403) {
            console.error('Access forbidden');
        }

        // Create custom error
        const apiError = new ApiError(statusCode, message, data);

        return Promise.reject(apiError);
    }
);

export default apiClient;