import { apiClient } from './apiClient';
import type { UserDto } from '@/models/auth';

export interface ProfileResponse {
    success: boolean;
    message: string;
    user: UserDto;
}

export interface UserListResponse {
    success: boolean;
    data: UserDto[];
}

export interface UserDetailResponse {
    success: boolean;
    data: UserDto;
}

export interface RoleUpdateResponse {
    success: boolean;
    message: string;
    user: UserDto;
}

export interface DeleteUserResponse {
    success: boolean;
    message: string;
}

export interface CreateUserPayload {
    name: string;
    email: string;
    password: string;
}

export interface UpdateUserPayload {
    name: string;
    email: string;
}

export interface UpdateRolePayload {
    role?: string;
    membership_tier?: string;
}

// --- Profile (self) ---
export async function updateProfile(name: string): Promise<ProfileResponse> {
    const { data } = await apiClient.put<ProfileResponse>('/users/profile', { name });
    return data;
}

export async function uploadAvatar(file: File): Promise<ProfileResponse> {
    const formData = new FormData();
    formData.append('avatar', file);
    const { data } = await apiClient.post<ProfileResponse>('/users/profile/avatar', formData);
    return data;
}

// --- Users (admin) ---
export async function getAllUsers(): Promise<UserListResponse> {
    const { data } = await apiClient.get<UserListResponse>('/users');
    return data;
}

export async function getUserById(id: string): Promise<UserDetailResponse> {
    const { data } = await apiClient.get<UserDetailResponse>(`/users/${id}`);
    return data;
}

export async function createUser(payload: CreateUserPayload): Promise<UserDetailResponse> {
    const { data } = await apiClient.post<UserDetailResponse>('/users', payload);
    return data;
}

export async function updateUser(id: string, payload: UpdateUserPayload): Promise<UserDetailResponse> {
    const { data } = await apiClient.put<UserDetailResponse>(`/users/${id}`, payload);
    return data;
}

export async function deleteUser(id: string): Promise<DeleteUserResponse> {
    const { data } = await apiClient.delete<DeleteUserResponse>(`/users/${id}`);
    return data;
}

export async function updateUserRole(id: string, payload: UpdateRolePayload): Promise<RoleUpdateResponse> {
    const { data } = await apiClient.patch<RoleUpdateResponse>(`/users/${id}/role`, payload);
    return data;
}

export async function changeMembership(
    membership_tier: 'free' | 'pro' | 'enterprise'
): Promise<{ success: boolean; user: UserDto; accessToken: string }> {
    const { data } = await apiClient.patch('/users/membership', { membership_tier });
    return data;
}