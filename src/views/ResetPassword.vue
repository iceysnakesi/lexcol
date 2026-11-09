<template>
  <AuthLayout title="Reset Password" subtitle="Enter a new password for your account">
    <form @submit.prevent="handleSubmit" v-if="!isSuccess">
      <ion-item class="custom-item">
        <ion-input
          v-model="newPassword"
          label="New Password"
          label-placement="stacked"
          type="password"
          required
          placeholder="Min. 6 characters"
        ></ion-input>
      </ion-item>

      <p class="error-text" v-if="errorMessage">{{ errorMessage }}</p>

      <ion-button expand="block" type="submit" :disabled="isLoading" class="submit-btn">
        <span v-if="isLoading">Resetting...</span>
        <span v-else>Reset Password</span>
      </ion-button>
    </form>

    <div v-else class="success-state">
      <p class="success-text">Your password has been reset successfully.</p>
      <ion-button expand="block" router-link="/login" class="submit-btn">
        Go to Login
      </ion-button>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IonItem, IonInput, IonButton } from '@ionic/vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { resetPassword } from '@/services/authService';

const route = useRoute();
const router = useRouter();

const newPassword = ref('');
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const isSuccess = ref(false);
const token = ref<string | null>(null);

onMounted(() => {
  token.value = route.query.token as string;
  if (!token.value) {
    errorMessage.value = 'Invalid or missing reset token.';
  }
});

const handleSubmit = async () => {
  if (!token.value) return;
  
  isLoading.value = true;
  errorMessage.value = null;

  try {
    await resetPassword(token.value, newPassword.value);
    isSuccess.value = true;
  } catch (err: any) {
    errorMessage.value = err.response?.data?.message || 'Failed to reset password.';
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
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  text-align: center;
  background: #ecfdf5;
  padding: 16px;
  border-radius: 8px;
}
.success-state {
  text-align: center;
}
</style>