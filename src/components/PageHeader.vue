<template>
  <ion-header class="desktop-header">
    <ion-toolbar class="custom-toolbar">
      <div slot="start" class="logo">lexcol</div>

      <nav slot="end" class="nav-links">
        <router-link to="/forum">Forum</router-link>
        <router-link to="/chatbot">Chat</router-link>
        <router-link to="/videos">Videos</router-link>
        <router-link to="/news">News</router-link>
        <router-link to="/about">About</router-link>

        <router-link v-if="isAdmin" to="/admin" class="admin-link">
          Admin Panel
        </router-link>

        <router-link
          v-if="authStore.isAuthenticated"
          to="/your_profile"
        >My Profile</router-link>

        <router-link v-if="!authStore.isAuthenticated" to="/login">
          Login
        </router-link>
        <button v-else @click="handleLogout" class="logout-btn">
          Logout
        </button>
      </nav>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { IonHeader, IonToolbar } from '@ionic/vue';

const authStore = useAuthStore();

const isAdmin = computed(() => authStore.user?.role === 'admin');

const handleLogout = (): void => {
  authStore.logout();
  window.location.href = '/about';
};
</script>

<style scoped>
.desktop-header {
  display: block;
}

@media (max-width: 767px) {
  .desktop-header {
    display: none;
  }
}

.custom-toolbar {
  --background: #1a1a1a;
  --color: white;
  padding: 0 1rem;
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
  color: white;
  padding-left: 0.5rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-right: 0.5rem;
}

.nav-links a {
  color: #42b983;
  text-decoration: none;
}

.nav-links a.router-link-active {
  font-weight: bold;
}

.logout-btn {
  background: none;
  border: none;
  color: #ff4d4d;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  font-family: inherit;
}

.logout-btn:hover {
  color: #ff7070;
}
</style>