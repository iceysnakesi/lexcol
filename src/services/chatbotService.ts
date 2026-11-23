import { apiClient } from './apiClient';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface SavedChat {
  id: number;
  title: string;
  last_message: string;
  updated_at: string;
}

export const chatbotService = {
  async sendMessage(message: string, chatId: number | null): Promise<{ reply: string; chatId: number }> {
    const { data } = await apiClient.post('/chatbot/message', { message, chatId });
    return data;
  },

  async getChats(): Promise<SavedChat[]> {
    const { data } = await apiClient.get('/chatbot/chats');
    return data.chats;
  },

  async getChatMessages(chatId: number): Promise<ChatMessage[]> {
    const { data } = await apiClient.get(`/chatbot/chats/${chatId}`);
    return data.messages;
  }
};