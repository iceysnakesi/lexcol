import { apiClient } from './apiClient';
export const chatbotService = {
    async deleteChat(chatId) {
        await apiClient.delete(`/chatbot/chats/${chatId}`);
    },
    async sendMessage(message, chatId, isEdit = false) {
        const { data } = await apiClient.post('/chatbot/message', { message, chatId, isEdit });
        return data;
    },
    async regenerate(chatId) {
        const { data } = await apiClient.post('/chatbot/regenerate', { chatId });
        return data;
    },
    async getChats() {
        const { data } = await apiClient.get('/chatbot/chats');
        return data.chats;
    },
    async getChatMessages(chatId) {
        const { data } = await apiClient.get(`/chatbot/chats/${chatId}`);
        return data.messages;
    },
};
