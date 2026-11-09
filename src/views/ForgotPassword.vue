<template>
  <AuthLayout title="Forgot Password" subtitle="Enter your email to receive a reset link">
    <form @submit.prevent="handleSubmit">
      <ion-item class="custom-item">
        <ion-input
          v-model="email"
          label="Email Address"
          label-placement="stacked"
          type="email"
          required
          placeholder="user@example.com"
        ></ion-input>
      </ion-item>

      <p class="success-text" v-if="successMessage">{{ successMessage }}</p>
      <p class="error-text" v-if="errorMessage">{{ errorMessage }}</p>

      <ion-button expand="block" type="submit" :disabled="isLoading || !!successMessage" class="submit-btn">
        <span v-if="isLoading">Sending...</span>
        <span v-else>Send Reset Link</span>
      </ion-button>
    </form>

    <div class="footer-action">
      <p>Remembered it? <router-link to="/login">Back to login</router-link></p>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonItem, IonInput, IonButton } from '@ionic/vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { forgotPassword } from '@/services/authService';

const email = ref('');
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);

const handleSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = null;
  successMessage.value = null;

  try {
    await forgotPassword(email.value.trim());
    successMessage.value = 'If that email exists, a reset link has been sent. Check your inbox.';
  } catch (err: any) {
    errorMessage.value = err.response?.data?.message || 'Failed to send reset link.';
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
  margin-top: 1rem;
  --border-radius: 8px;
  font-weight: 600;
}
.error-text {
  color: #dc2626;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  text-align: center;
}
.success-text {
  color: #059669;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  text-align: center;
  background: #ecfdf5;
  padding: 10px;
  border-radius: 6px;
}
.footer-action {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
}
.footer-action a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
}
</style>