<template>
  <AuthLayout title="Sign In" subtitle="Sign in to continue to your dashboard">
    <form @submit.prevent="handleLogin">
      <ion-item class="custom-item">
        <ion-input
          v-model="email"
          label="Email Address"
          label-placement="stacked"
          type="email"
          required
          placeholder="user@example.com"
          autocomplete="email"
        ></ion-input>
      </ion-item>

      <ion-item class="custom-item">
        <ion-input
          v-model="password"
          label="Password"
          label-placement="stacked"
          type="password"
          required
          placeholder="Enter your password"
          autocomplete="current-password"
        ></ion-input>
      </ion-item>

      <p class="error-text" v-if="authStore.errorMessage">
        {{ authStore.errorMessage }}
      </p>

      <ion-button
        expand="block"
        type="submit"
        :disabled="authStore.isLoading"
        class="submit-btn"
      >
        <span v-if="authStore.isLoading">Loading...</span>
        <span v-else>Sign In</span>
      </ion-button>
    </form>

    <div class="footer-action">
      <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { IonItem, IonInput, IonButton } from '@ionic/vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

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
      password: password.value,
    });
    const redirectPath = (route.query.redirect as string) || '/news';
    router.push(redirectPath);
  } catch (error) {
    console.error('Login failed', error);
  }
};
</script>

<style scoped>
.custom-item {
  margin-bottom: 1.25rem;
  --background: transparent;
  --border-color: #d1d5db;
  border-radius: 8px;
  border: 1px solid #d1d5db;
}

.submit-btn {
  margin-top: 1.5rem;
  --border-radius: 8px;
  font-weight: 600;
}

.error-text {
  color: #dc2626;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.footer-action {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: #6b7280;
}

.footer-action a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
}

.footer-action a:hover {
  text-decoration: underline;
}
</style>