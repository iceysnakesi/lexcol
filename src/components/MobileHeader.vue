<template>
  <ion-header class="mobile-header">
    <ion-toolbar>
            <ion-title class="ion-text-center">lexcol</ion-title>

            <ion-buttons slot="end">
        <ion-button @click="openProfileMenu($event)" class="avatar-button">
                    <div class="avatar-placeholder">
            <img
              v-if="authStore.user?.avatar_url"
              :src="authStore.user.avatar_url"
              alt="Profile"
              class="avatar-img"
            />
            <span v-else-if="authStore.isAuthenticated" class="avatar-initial">
              {{ initial }}
            </span>
            <ion-icon
              v-else
              :icon="personOutline"
              class="guest-icon"
            />
          </div>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { 
  IonHeader, IonToolbar, IonButtons, 
  IonButton, IonTitle, IonIcon, menuController 
} from '@ionic/vue';
import { personOutline } from 'ionicons/icons';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

const initial = computed(() => {
  const name = authStore.user?.name || authStore.user?.email || 'U';
  return name.trim().charAt(0).toUpperCase() || 'U';
});

const openProfileMenu = (event: MouseEvent) => {
  const buttonElement = event.currentTarget as HTMLElement;
  buttonElement?.blur();

  menuController.open('profile-menu');
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
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0);
  color: white;
  flex-shrink: 0;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
}

.avatar-initial {
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1;
}

.guest-icon {
  font-size: 22px;
  color: rgba(255, 255, 255, 0.85);
}

ion-toolbar {
  --background: #1a1a1a;
  --color: white;
  --box-shadow: none !important;
  --min-height: 44px !important;
  border-bottom: none !important;
  padding-top: 0;
  padding-bottom: 0;
}

ion-title {
  color: white;
  font-weight: 600;
}

ion-header {
  box-shadow: none !important;
}
</style>