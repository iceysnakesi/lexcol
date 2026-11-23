// frontend/src/services/authService.ts
import { apiClient } from './apiClient';
export async function login(credentials) {
    const { data } = await apiClient.post('/auth/login', credentials);
    return data;
}
export async function forgotPassword(email) {
    await apiClient.post('/auth/forgot-password', { email });
}
export async function resetPassword(token, newPassword) {
    await apiClient.post('/auth/reset-password', { token, newPassword });
}
