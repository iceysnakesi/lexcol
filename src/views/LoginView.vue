<template>
  <div class="login-page">
    <div class="login-container">
      <div class="header-section">
        <h2>Welcome Back</h2>
        <p class="subtitle">Sign in to continue to your dashboard</p>
      </div>
      
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">Email Address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="user@example.com"
            autocomplete="email"
          />
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="Enter your password"
            autocomplete="current-password"
          />
        </div>

        <p class="error-text" v-if="authStore.errorMessage">
          {{ authStore.errorMessage }}
        </p>

        <button
          type="submit"
          class="submit-btn"
          :disabled="authStore.isLoading"
        >
          <span v-if="authStore.isLoading">Loading...</span>
          <span v-else>Sign In</span>
        </button>
      </form>

      <div class="footer-action">
        <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const email = ref<string>('');
const password = ref<string>('');

const handleLogin = async (): Promise<void> => {
  try {
    authStore.errorMessage = null;

    await authStore.login({
      email: email.value.trim(),
      passwordHash: password.value,
    });

    const redirectPath = (route.query.redirect as string) || '/dashboard';
    router.push(redirectPath);
  } catch (error) {
    // Error is already captured in the Pinia store state
    console.error('Login failed', error);
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f6f8;
  padding: 1rem;
}

.login-container {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

.header-section h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #6b7280;
  font-size: 0.95rem;
}

.input-group {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.input-group input {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.input-group input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background-color: #2563eb;
}

.submit-btn:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.error-text {
  color: #dc2626;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  text-align: center;
}
</style>