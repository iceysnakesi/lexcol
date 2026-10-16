import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { AuthStatus, LoginRequest, UserDto, AuthResponse } from '@/models/auth';
import { apiClient } from '@/services/apiClient';
import type { AxiosResponse } from 'axios';

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<UserDto | null>(null);
  const accessToken = ref<string | null>(localStorage.getItem('access_token'));
  const status = ref<AuthStatus>(AuthStatus.IDLE);
  const errorMessage = ref<string | null>(null);
  const lastFetchedAt = ref<number | null>(null);

  // Getters / Computed
  const isAuthenticated = computed(() => status.value === AuthStatus.AUTHENTICATED && !!accessToken.value);
  const isLoading = computed(() => status.value === AuthStatus.LOADING);
  const isCached = computed(() => {
    if (!lastFetchedAt.value) return false;
    return Date.now() - lastFetchedAt.value < 300000; // 5 min cache
  });

  // Actions
  async function login(credentials: LoginRequest): Promise<void> {
    status.value = AuthStatus.LOADING;
    errorMessage.value = null;

    try {
      const response: AxiosResponse<AuthResponse> = await apiClient.post('/api/auth/login', credentials);

      accessToken.value = response.data.accessToken;
      user.value = response.data.user;
      status.value = AuthStatus.AUTHENTICATED;
      lastFetchedAt.value = Date.now();

      localStorage.setItem('access_token', response.data.accessToken);
    } catch (error: unknown) {
      status.value = AuthStatus.ERROR;
      if (error instanceof Error) {
        errorMessage.value = error.message;
      } else {
        errorMessage.value = 'An unexpected authentication error occurred.';
      }
      throw error;
    }
  }
  
  function logout(): void {
    user.value = null;
    accessToken.value = null;
    status.value = AuthStatus.IDLE;
    errorMessage.value = null;
    lastFetchedAt.value = null;
    localStorage.removeItem('access_token');
  }

  return {
    user,
    accessToken,
    status,
    errorMessage,
    isAuthenticated,
    isLoading,
    isCached,
    login,
    logout,
  };
}, {
  // Selective persistence: keeps the token and user state safe on reload
  persist: {
    paths: ['accessToken', 'user'],
  },
});