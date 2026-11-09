// frontend/src/services/authService.ts
import { apiClient } from './apiClient';
import type { AuthResponse, LoginRequest } from '@/models/auth';

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return data;
}

export async function forgotPassword(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email });
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
    await apiClient.post('/auth/reset-password', { token, newPassword });
}