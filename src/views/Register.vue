<template>
  <AuthLayout title="Create Account" subtitle="Sign up to get started with Lexcol">
    <form @submit.prevent="handleRegister">
      <ion-item class="custom-item">
        <ion-input
          v-model="name"
          label="Full Name"
          label-placement="stacked"
          type="text"
          required
          placeholder="Juan Pérez"
          autocomplete="name"
        ></ion-input>
      </ion-item>

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
          placeholder="Create a password"
          autocomplete="new-password"
        ></ion-input>
      </ion-item>

      <p class="error-text" v-if="errorMessage">
        {{ errorMessage }}
      </p>

      <ion-button
        expand="block"
        type="submit"
        :disabled="isLoading"
        class="submit-btn"
      >
        <span v-if="isLoading">Creating account...</span>
        <span v-else>Register</span>
      </ion-button>
    </form>

    <div class="footer-action">
      <p>Already have an account? <router-link to="/login">Sign in here</router-link></p>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createUser } from '@/services/userService';
import { IonItem, IonInput, IonButton } from '@ionic/vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

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

    await createUser({
      name: name.value.trim(),
      email: email.value.trim(),
      password: password.value,
    });

    router.push('/login');
  } catch (error: any) {
    console.error('Registration failed', error);
    errorMessage.value =
      error.response?.data?.message ||
      'Failed to create account. Please try again.';
  } finally {
    isLoading.value = false;
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