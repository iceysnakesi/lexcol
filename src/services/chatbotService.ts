import { apiClient } from './apiClient';

export interface SavedChat {
  id: number;
  title: string;
  last_message: string;
  updated_at: string;
}

export interface ChatMessageResponse {
  role: 'user' | 'assistant';
  content: string;
}

export const chatbotService = {
  async deleteChat(chatId: number): Promise<void> {
    await apiClient.delete(`/chatbot/chats/${chatId}`);
  },

  async sendMessage(message: string, chatId: number | null, isEdit = false) {
    const { data } = await apiClient.post('/chatbot/message', { message, chatId, isEdit });
    return data;
  },

  async regenerate(chatId: number) {
    const { data } = await apiClient.post('/chatbot/regenerate', { chatId });
    return data;
  },

  async getChats(): Promise<SavedChat[]> {
    const { data } = await apiClient.get('/chatbot/chats');
    return data.chats;
  },

  async getChatMessages(chatId: number): Promise<ChatMessageResponse[]> {
    const { data } = await apiClient.get(`/chatbot/chats/${chatId}`);
    return data.messages;
  },
};