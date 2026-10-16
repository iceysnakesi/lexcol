<template>
  <div class="register-page">
    <div class="register-container">
      <div class="header-section">
        <h2>Create Account</h2>
        <p class="subtitle">Sign up to get started with Lexcol</p>
      </div>
      
      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <label for="name">Full Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            required
            placeholder="Juan Pérez"
            autocomplete="name"
          />
        </div>

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
            placeholder="Create a password"
            autocomplete="new-password"
          />
        </div>

        <p class="error-text" v-if="errorMessage">
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          class="submit-btn"
          :disabled="isLoading"
        >
          <span v-if="isLoading">Creating account...</span>
          <span v-else>Register</span>
        </button>
      </form>

      <div class="footer-action">
        <p>Already have an account? <router-link to="/login">Sign in here</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/plugins/axios'; // Or wherever your configured Axios instance lives

const router = useRouter();

const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const isLoading = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const handleRegister = async (): Promise<void> => {
  try {
    isLoading.value = true;
    errorMessage.value = null;

    // Calls your backend route: POST /api/users
    await apiClient.post('/api/users', {
      name: name.value.trim(),
      email: email.value.trim(),
      password: password.value,
    });

    // On success, redirect to login page
    router.push('/login');
  } catch (error: any) {
    console.error('Registration failed', error);
    errorMessage.value = error.response?.data?.message || 'Failed to create account. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 1rem;
}

.register-container {
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  background: #1e1e1e;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  color: #fff;
}

.header-section {
  margin-bottom: 2rem;
  text-align: center;
}

.header-section h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #aaa;
  font-size: 0.95rem;
}

.input-group {
  margin-bottom: 1.25rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #ccc;
}

.input-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #333;
  border-radius: 6px;
  background-color: #121212;
  color: #fff;
  font-size: 1rem;
  box-sizing: border-box;
}

.input-group input:focus {
  border-color: #42b983;
  outline: none;
}

.error-text {
  color: #ff4d4d;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  text-align: center;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #3aa876;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.footer-action {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: #aaa;
}

.footer-action a {
  color: #42b983;
  text-decoration: none;
}

.footer-action a:hover {
  text-decoration: underline;
}
</style>