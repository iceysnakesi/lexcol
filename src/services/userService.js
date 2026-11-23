import { apiClient } from './apiClient';
// --- Profile (self) ---
export async function updateProfile(name) {
    const { data } = await apiClient.put('/users/profile', { name });
    return data;
}
export async function uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);
    const { data } = await apiClient.post('/users/profile/avatar', formData);
    return data;
}
// --- Users (admin) ---
export async function getAllUsers() {
    const { data } = await apiClient.get('/users');
    return data;
}
export async function getUserById(id) {
    const { data } = await apiClient.get(`/users/${id}`);
    return data;
}
export async function createUser(payload) {
    const { data } = await apiClient.post('/users', payload);
    return data;
}
export async function updateUser(id, payload) {
    const { data } = await apiClient.put(`/users/${id}`, payload);
    return data;
}
export async function deleteUser(id) {
    const { data } = await apiClient.delete(`/users/${id}`);
    return data;
}
export async function updateUserRole(id, payload) {
    const { data } = await apiClient.patch(`/users/${id}/role`, payload);
    return data;
}
export async function changeMembership(membership_tier) {
    const { data } = await apiClient.patch('/users/membership', { membership_tier });
    return data;
}
