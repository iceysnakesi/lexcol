<template>
  <ion-header class="mobile-header">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button v-if="authStore.isAuthenticated && isAdmin" @click="navigateTo('/admin', $event)">
          <ion-icon slot="icon-only" :icon="shieldCheckmarkOutline"></ion-icon>
        </ion-button>
      </ion-buttons>

      <ion-title class="ion-text-center">lexcol</ion-title>

      <ion-buttons slot="end">
        <ion-button @click="openProfileMenu($event)" class="avatar-button">
          <div class="avatar-placeholder">
            <ion-icon :icon="personCircleOutline"></ion-icon>
          </div>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { 
  IonHeader, IonToolbar, IonButtons, 
  IonButton, IonTitle, IonIcon, menuController 
} from '@ionic/vue';
import { shieldCheckmarkOutline, personCircleOutline } from 'ionicons/icons';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const isAdmin = computed(() => {
  const userRoles = authStore.user?.role || [];
  return userRoles.includes('admin');
});

const openProfileMenu = (event: MouseEvent) => {
  const buttonElement = event.currentTarget as HTMLElement;
  buttonElement?.blur();

  menuController.open('profile-menu');
};

const navigateTo = (path: string, event: MouseEvent) => {
  const buttonElement = event.currentTarget as HTMLElement;
  buttonElement?.blur();
  router.push(path);
};
</script>

<style scoped>
.mobile-header {
  display: none;
}

@media (max-width: 767px) {
  .mobile-header {
    display: block;
  }
}

.avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--ion-color-step-150, #e0e0e0);
  color: var(--ion-color-step-600, #666);
}

ion-toolbar {
  --box-shadow: none !important;
  --min-height: 34px !important;
border-bottom: none !important;
  padding-top: 0;
  padding-bottom: 0;
}

ion-header {
  box-shadow: none !important;
}
</style>