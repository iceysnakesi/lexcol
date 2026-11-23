import { apiClient } from './apiClient';
export const newsService = {
    async getNews(page, limit, search = '') {
        const { data } = await apiClient.get('/news', {
            params: { page, limit, ...(search ? { search } : {}) },
        });
        return data;
    },
    async getOne(id) {
        const { data } = await apiClient.get(`/news/${id}`);
        return data;
    },
    async createNews(payload) {
        const { data } = await apiClient.post('/news', payload);
        return data;
    },
    async uploadImage(file) {
        const fd = new FormData();
        fd.append('image', file);
        const { data } = await apiClient.post('/news/upload-image', fd);
        return data.url;
    },
    async toggleVisibility(id) {
        const { data } = await apiClient.patch(`/news/${id}/visibility`);
        return data;
    },
    async deleteNews(id) {
        const { data } = await apiClient.delete(`/news/${id}`);
        return data;
    },
};
