import { apiClient } from './apiClient';
export const videoService = {
    async getVideos(page, limit, channel = '') {
        const { data } = await apiClient.get('/videos', {
            params: { page, limit, ...(channel ? { channel } : {}) },
        });
        return data;
    },
    async getChannels() {
        const { data } = await apiClient.get('/videos/channels');
        return data.channels;
    },
    async getAdminVideos(page = 1, limit = 9) {
        const { data } = await apiClient.get('/videos/admin/all', {
            params: { page, limit },
        });
        return data;
    },
    async addVideo(payload) {
        const { data } = await apiClient.post('/videos', payload);
        return data;
    },
    async toggleVisibility(id) {
        const { data } = await apiClient.patch(`/videos/${id}/visibility`);
        return data;
    },
    async deleteVideo(id) {
        const { data } = await apiClient.delete(`/videos/${id}`);
        return data;
    },
    async getPlayInfo(id) {
        const { data } = await apiClient.get(`/videos/${id}/play`);
        return data;
    },
};
