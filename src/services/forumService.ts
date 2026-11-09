import { apiClient } from './apiClient';

export const forumService = {
    async getPosts(page: number, limit = 10, search = '', sort: 'newest' | 'oldest' = 'newest') {
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

    async createPost(data: { title: string; content: string }) {
        const response = await apiClient.post('/forum', data);

        return response.data;
    },

    async deletePost(id: number) {
        const response = await apiClient.delete(`/forum/${id}`);

        return response.data;
    },

    async toggleVisibility(id: number) {
        const response = await apiClient.patch(
            `/forum/${id}/visibility`,
            {}
        );

        return response.data;
    },

    async updatePost(
        id: number,
        data: { title: string; content: string }
    ) {
        const response = await apiClient.put(`/forum/${id}`, data);

        return response.data;
    },

    async getPostDetails(id: number | string) {
        const response = await apiClient.get(`/forum/${id}`);
        return response.data;
    },

    async getAdminPost(id: number | string) {
        const response = await apiClient.get(`/forum/admin/${id}`);
        return response.data;
    },

    async createReply(
        postId: number | string,
        data: { content: string; parent_reply_id: number | null }
    ) {
        const response = await apiClient.post(
            `/forum/${postId}/replies`,
            data
        );

        return response.data;
    },

    async updateReply(
        postId: number | string,
        replyId: number,
        data: { content: string }
    ) {
        const response = await apiClient.put(
            `/forum/${postId}/replies/${replyId}`,
            data
        );

        return response.data;
    },

    async deleteReply(postId: number | string, replyId: number) {
        const response = await apiClient.delete(
            `/forum/${postId}/replies/${replyId}`
        );

        return response.data;
    },
};
