import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Request Interceptor: Attach Token & Correlation ID
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['x-correlation-id'] = crypto.randomUUID();
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
);

// Response Interceptor: Automatic Retries on idempotent requests only
interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _retryCount?: number;
}

const IDEMPOTENT_METHODS = new Set(['get', 'head', 'options']);

apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<AxiosResponse | void> => {
    const originalRequest = error.config as CustomRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const method = (originalRequest.method || 'get').toLowerCase();
    if (!IDEMPOTENT_METHODS.has(method)) {
      return Promise.reject(error);
    }

    const maxRetries = 2;
    originalRequest._retryCount = originalRequest._retryCount || 0;

    const isRetryable =
      error.code === 'ECONNABORTED' ||
      !error.response ||
      (error.response.status >= 500 && error.response.status < 600);

    if (isRetryable && originalRequest._retryCount < maxRetries) {
      originalRequest._retryCount++;
      return apiClient(originalRequest);
    }

    return Promise.reject(error);
  }
);