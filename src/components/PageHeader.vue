<template>
  <header class="page-header">
    <div class="logo">lexcol</div>
    <nav>
      <!-- Dashboard only shows when authenticated -->
      <router-link v-if="authStore.isAuthenticated" to="/dashboard">Dashboard</router-link>
      <router-link to="/about">About</router-link>
      
      <!-- Dynamically swap Login/Logout based on auth state -->
      <router-link v-if="!authStore.isAuthenticated" to="/login">Login</router-link>
      <button v-else @click="handleLogout" class="logout-btn">Logout</button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = (): void => {
  authStore.logout();
  router.push('/About');
};
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1a1a1a;
  color: white;
}

nav {
  display: flex;
  align-items: center;
  gap: 15px;
}

nav a {
  color: #42b983;
  text-decoration: none;
}

nav a.router-link-active {
  font-weight: bold;
  text-decoration: underline;
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
  text-decoration: underline;
}
</style>