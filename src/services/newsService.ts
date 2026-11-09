import { apiClient } from './apiClient';

export interface NewsBlock {
    type: 'text' | 'image';
    content?: string;      // text blocks
    style?: 'normal' | 'h2' | 'h3';
    url?: string;          // image blocks
    commentary?: string;   // image blocks
}

export interface NewsItem {
    id: number;
    title: string;
    cover_image_url: string;
    content: NewsBlock[];
    is_hidden?: boolean;
    created_at: string;
}

export interface NewsListResponse {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    news: NewsItem[];
}

export interface MotdMessage {
    id: number;
    message: string;
    created_at: string;
}

export const newsService = {
    async getNews(page: number, limit: number, search = ''): Promise<NewsListResponse> {
        const { data } = await apiClient.get<NewsListResponse>('/news', {
            params: { page, limit, ...(search ? { search } : {}) },
        });
        return data;
    },

    async getOne(id: number | string): Promise<NewsItem> {
        const { data } = await apiClient.get<NewsItem>(`/news/${id}`);
        return data;
    },

    async createNews(payload: {
        title: string;
        cover_image_url: string;
        content: NewsBlock[];
    }): Promise<NewsItem> {
        const { data } = await apiClient.post<NewsItem>('/news', payload);
        return data;
    },

    async uploadImage(file: File): Promise<string> {
        const fd = new FormData();
        fd.append('image', file);
        const { data } = await apiClient.post<{ url: string }>('/news/upload-image', fd);
        return data.url;
    },

    async toggleVisibility(id: number) {
        const { data } = await apiClient.patch(`/news/${id}/visibility`);
        return data;
    },

    async deleteNews(id: number) {
        const { data } = await apiClient.delete(`/news/${id}`);
        return data;
    },

    async getMotd(): Promise<MotdMessage | null> {
        const { data } = await apiClient.get<MotdMessage | null>('/news/motd');
        return data;
    },

    async setMotd(message: string): Promise<MotdMessage> {
        const { data } = await apiClient.post<MotdMessage>('/news/motd', { message });
        return data;
    },
};