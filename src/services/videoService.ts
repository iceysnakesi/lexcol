import { apiClient } from './apiClient';

export interface VideoSummary {
    id: number;
    channel_id: string | null;
    channel_name: string;
    title: string;
    thumbnail_url: string | null;
    duration_seconds: number | null;
    published_at: string | null;
    preview_youtube_id: string | null;
    is_hidden?: boolean;
    created_at: string;
}

export interface VideoListResponse {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    videos: VideoSummary[];
}

export interface ChannelSummary {
    channel_id: string;
    channel_name: string;
}

export interface PlayInfo {
    mode: 'full' | 'preview' | 'locked' | 'error';
    youtube_id?: string;
}

export const videoService = {
    async getVideos(page: number, limit: number, channel = '') {
        const { data } = await apiClient.get<VideoListResponse>('/videos', {
            params: { page, limit, ...(channel ? { channel } : {}) },
        });
        return data;
    },

    async getChannels() {
        const { data } = await apiClient.get<{ channels: ChannelSummary[] }>('/videos/channels');
        return data.channels;
    },

    async getAdminVideos(page = 1, limit = 9) {
        const { data } = await apiClient.get<VideoListResponse>('/videos/admin/all', {
            params: { page, limit },
        });
        return data;
    },

    async addVideo(payload: {
        youtube_url: string;
        preview_youtube_url?: string;
    }) {
        const { data } = await apiClient.post('/videos', payload);
        return data;
    },

    async toggleVisibility(id: number) {
        const { data } = await apiClient.patch(`/videos/${id}/visibility`);
        return data;
    },

    async deleteVideo(id: number) {
        const { data } = await apiClient.delete(`/videos/${id}`);
        return data;
    },

    async getPlayInfo(id: number) {
        const { data } = await apiClient.get<PlayInfo>(`/videos/${id}/play`);
        return data;
    },
};