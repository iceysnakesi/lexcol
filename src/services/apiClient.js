import axios from 'axios';
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 60000, // 60 seconds — enough time for complex AI responses
});
// Request Interceptor: Attach Token & Correlation ID
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['x-correlation-id'] = crypto.randomUUID();
    return config;
}, (error) => Promise.reject(error));
const IDEMPOTENT_METHODS = new Set(['get', 'head', 'options']);
apiClient.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) {
        return Promise.reject(error);
    }
    const method = (originalRequest.method || 'get').toLowerCase();
    if (!IDEMPOTENT_METHODS.has(method)) {
        return Promise.reject(error);
    }
    const maxRetries = 2;
    originalRequest._retryCount = originalRequest._retryCount || 0;
    const isRetryable = error.code === 'ECONNABORTED' ||
        !error.response ||
        (error.response.status >= 500 && error.response.status < 600);
    if (isRetryable && originalRequest._retryCount < maxRetries) {
        originalRequest._retryCount++;
        return apiClient(originalRequest);
    }
    return Promise.reject(error);
});
