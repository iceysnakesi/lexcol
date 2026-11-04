<template>
  <ion-menu side="end" content-id="main-content" menu-id="profile-menu">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list lines="none">
        <ion-menu-toggle :auto-hide="false">
          <!-- Go to Dashboard -->
          <ion-item router-link="/dashboard" @click="closeMenu">
            <ion-icon slot="start" :icon="speedometerOutline"></ion-icon>
            <ion-label>Dashboard</ion-label>
          </ion-item>

          <!-- Conditional Auth Options -->
          <template v-if="authStore.isAuthenticated">
            <ion-item @click="handleLogout" button class="logout-item">
              <ion-icon slot="start" :icon="logOutOutline"></ion-icon>
              <ion-label>Log Out</ion-label>
            </ion-item>
          </template>
          <template v-else>
            <ion-item router-link="/login" @click="closeMenu">
              <ion-icon slot="start" :icon="logInOutline"></ion-icon>
              <ion-label>Login</ion-label>
            </ion-item>
          </template>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { 
  IonMenu, IonHeader, IonToolbar, IonTitle, 
  IonContent, IonList, IonItem, IonLabel, IonIcon, 
  IonMenuToggle, menuController 
} from '@ionic/vue';
import { speedometerOutline, logOutOutline, logInOutline } from 'ionicons/icons';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const closeMenu = () => {
  menuController.close('profile-menu');
};

const handleLogout = () => {
  closeMenu();
  authStore.logout();
  router.push('/about');
};
</script>

<style scoped>
.logout-item {
  color: var(--ion-color-danger, #eb445a);
}

ion-toolbar {
  --box-shadow: none !important;
  border-bottom: none !important;
  
}

ion-header {
  box-shadow: none !important;
}
</style>