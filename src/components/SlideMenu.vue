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

          <!-- Guest header — only when logged out -->
          <div v-if="!authStore.isAuthenticated" class="guest-header">
            <div class="guest-greeting">
              <p class="guest-title">Welcome, guest</p>
              <p class="guest-subtitle">Sign in to access your profile and more</p>
            </div>
          </div>

          <!-- Edit Profile — authenticated only -->
          <ion-item
            v-if="authStore.isAuthenticated"
            router-link="/your_profile"
            @click="closeMenu"
          >
            <ion-icon slot="start" :icon="personOutline"></ion-icon>
            <ion-label>Edit Profile</ion-label>
          </ion-item>

                    <!-- Admin Only: Admin Panel + Post Management + Create News -->
          <template v-if="isAdmin">
            <ion-item router-link="/admin" @click="closeMenu">
              <ion-icon slot="start" :icon="shieldCheckmarkOutline"></ion-icon>
              <ion-label>Admin Panel</ion-label>
            </ion-item>
            <ion-item router-link="/postmanagement" @click="closeMenu">
              <ion-icon slot="start" :icon="createOutline"></ion-icon>
              <ion-label>Post Management</ion-label>
            </ion-item>
            <ion-item router-link="/news/create" @click="closeMenu">
              <ion-icon slot="start" :icon="newspaperOutline"></ion-icon>
              <ion-label>Create News</ion-label>
            </ion-item>
          </template>

          <!-- Authenticated: Log Out -->
          <ion-item
            v-if="authStore.isAuthenticated"
            @click="handleLogout"
            button
            class="logout-item"
          >
            <ion-icon slot="start" :icon="logOutOutline"></ion-icon>
            <ion-label>Log Out</ion-label>
          </ion-item>

          <!-- Guest: Sign In + Create Account -->
          <template v-else>
            <ion-item router-link="/login" @click="closeMenu">
              <ion-icon slot="start" :icon="logInOutline"></ion-icon>
              <ion-label>Sign In</ion-label>
            </ion-item>
            <ion-item router-link="/register" @click="closeMenu">
  <ion-icon slot="start" :icon="personAddOutline" color="primary"></ion-icon>
  <ion-label color="primary">Create Account</ion-label>
</ion-item>
          </template>

        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  IonMenu, IonHeader, IonToolbar, IonTitle,
  IonContent, IonList, IonItem, IonLabel, IonIcon,
  IonMenuToggle, menuController
} from '@ionic/vue';
import {
  personOutline, logOutOutline, logInOutline, createOutline,
  shieldCheckmarkOutline, personCircleOutline, personAddOutline,
  newspaperOutline
} from 'ionicons/icons';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
const router = useRouter();

const authStore = useAuthStore();

const isAdmin = computed(() => authStore.user?.role === 'admin');

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
/* Guest section */
.guest-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 8px;
}

.guest-avatar-icon {
  font-size: 40px;
  color: #9ca3af;
  flex-shrink: 0;
}

.guest-greeting {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.guest-title {
  margin: 0;
  font-weight: 600;
  font-size: 0.95rem;
  color: #1f2937;
}

.guest-subtitle {
  margin: 2px 0 0;
  font-size: 0.8rem;
  color: #6b7280;
  line-height: 1.3;
}

.logout-item {
  --color: #ff4d4d;
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