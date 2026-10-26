<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="router.push('/')">
            <ion-icon :icon="homeOutline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="auth-wrapper">
        <div class="auth-container">
          <div class="header-section" v-if="title">
            <h2>{{ title }}</h2>
            <p class="subtitle" v-if="subtitle">{{ subtitle }}</p>
          </div>
          
          <slot></slot>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonButton, 
  IonIcon 
} from '@ionic/vue';
import { homeOutline } from 'ionicons/icons';

defineProps<{
  title: string;
  subtitle?: string;
}>();

const router = useRouter();
</script>

<style scoped>
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  padding: 1rem;
}

.auth-container {
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
</style>