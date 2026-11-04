import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const forumService = {
    async getPosts(page: number, limit = 10, search = '') {
        const response = await axios.get(`${API_URL}/forum?page=${page}&limit=${limit}&search=${search}`);
        return response.data; // Returns { totalItems, totalPages, currentPage, posts }
    },

    async toggleVisibility(id: number, token: string | null) {
        const response = await axios.patch(`${API_URL}/forum/${id}/visibility`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    async updatePost(id: number, data: { title: string; content: string }, token: string) {
        const response = await axios.put(`${API_URL}/forum/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
};