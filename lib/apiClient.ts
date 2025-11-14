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
        const token = sessionStorage.getItem('authToken');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
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