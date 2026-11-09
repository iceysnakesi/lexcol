import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { AuthStatus, type LoginRequest, type UserDto } from '@/models/auth';
import { login as loginRequest } from '@/services/authService';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserDto | null>(null);
  const accessToken = ref<string | null>(localStorage.getItem('access_token'));
  const status = ref<AuthStatus>(AuthStatus.IDLE);
  const errorMessage = ref<string | null>(null);
  const lastFetchedAt = ref<number | null>(null);

  const isAuthenticated = computed(
    () => status.value === AuthStatus.AUTHENTICATED && !!accessToken.value
  );
  const isLoading = computed(() => status.value === AuthStatus.LOADING);
  const isCached = computed(() => {
    if (!lastFetchedAt.value) return false;
    return Date.now() - lastFetchedAt.value < 300000;
  });

  async function login(credentials: LoginRequest): Promise<void> {
    status.value = AuthStatus.LOADING;
    errorMessage.value = null;

    try {
      const response = await loginRequest(credentials);

      accessToken.value = response.accessToken;
      user.value = response.user;
      status.value = AuthStatus.AUTHENTICATED;
      lastFetchedAt.value = Date.now();

      localStorage.setItem('access_token', response.accessToken);
    } catch (error: unknown) {
      status.value = AuthStatus.ERROR;
      errorMessage.value =
        error instanceof Error
          ? error.message
          : 'An unexpected authentication error occurred.';
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

  function updateUser(updatedData: Partial<UserDto>): void {
    if (!user.value) return;
    user.value = { ...user.value, ...updatedData };
  }

  function refreshSession(newToken: string, updatedUser: UserDto): void {
    accessToken.value = newToken;
    user.value = updatedUser;
    status.value = AuthStatus.AUTHENTICATED;
    lastFetchedAt.value = Date.now();
    localStorage.setItem('access_token', newToken);
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
    updateUser,
    refreshSession
  };
}, {
  persist: { pick: ['accessToken', 'user', 'status'] },
});