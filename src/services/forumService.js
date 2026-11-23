import { apiClient } from './apiClient';
export const forumService = {
    async getPosts(page, limit = 10, search = '', sort = 'newest') {
        const response = await apiClient.get('/forum', {
            params: { page, limit, search, sort }
        });
        return response.data;
    },
    async getAdminPosts(page = 1, limit = 50) {
        const response = await apiClient.get('/forum/admin/all', {
            params: { page, limit }
        });
        return response.data;
    },
    async createPost(data) {
        const response = await apiClient.post('/forum', data);
        return response.data;
    },
    async deletePost(id) {
        const response = await apiClient.delete(`/forum/${id}`);
        return response.data;
    },
    async toggleVisibility(id) {
        const response = await apiClient.patch(`/forum/${id}/visibility`, {});
        return response.data;
    },
    async updatePost(id, data) {
        const response = await apiClient.put(`/forum/${id}`, data);
        return response.data;
    },
    async getPostDetails(id) {
        const response = await apiClient.get(`/forum/${id}`);
        return response.data;
    },
    async getAdminPost(id) {
        const response = await apiClient.get(`/forum/admin/${id}`);
        return response.data;
    },
    async createReply(postId, data) {
        const response = await apiClient.post(`/forum/${postId}/replies`, data);
        return response.data;
    },
    async updateReply(postId, replyId, data) {
        const response = await apiClient.put(`/forum/${postId}/replies/${replyId}`, data);
        return response.data;
    },
    async deleteReply(postId, replyId) {
        const response = await apiClient.delete(`/forum/${postId}/replies/${replyId}`);
        return response.data;
    },
};
