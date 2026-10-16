import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.yourdomain.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Token & Correlation ID
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Inject x-correlation-id for backend traceability
    config.headers['x-correlation-id'] = crypto.randomUUID();
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
);

// Response Interceptor: Automatic Retries on network / 5xx errors
interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _retryCount?: number;
}

apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<AxiosResponse | void> => {
    const originalRequest = error.config as CustomRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const maxRetries = 2;
    originalRequest._retryCount = originalRequest._retryCount || 0;

    if (
      (error.code === 'ECONNABORTED' || !error.response || (error.response.status >= 500 && error.response.status < 600)) &&
      originalRequest._retryCount < maxRetries
    ) {
      originalRequest._retryCount++;
      return apiClient(originalRequest);
    }

    return Promise.reject(error);
  }
);