<template>
  <ion-header>
    <ion-toolbar class="custom-toolbar">
      <div slot="start" class="logo">lexcol</div>
      
      <nav slot="end" class="nav-links">
        <router-link v-if="authStore.isAuthenticated" to="/dashboard">Dashboard</router-link>
        
        <!-- Only show Admin link if user has the admin role -->
        <router-link v-if="isAdmin" to="/admin" class="admin-link">Admin Panel</router-link>
        
        <router-link to="/about">About</router-link>
        
        <router-link v-if="!authStore.isAuthenticated" to="/login">Login</router-link>
        <button v-else @click="handleLogout" class="logout-btn">Logout</button>
      </nav>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { IonHeader, IonToolbar } from '@ionic/vue';

const router = useRouter();
const authStore = useAuthStore();

// Check if the authenticated user has the 'admin' role
const isAdmin = computed(() => {
  if (!authStore.isAuthenticated) return false;
  const userRoles = authStore.user?.role || [];
  return userRoles.includes('admin');
});

const handleLogout = (): void => {
  authStore.logout();
  router.push('/about');
};
</script>

<style scoped>
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
  gap: 15px;
  padding-right: 0.5rem;
}

.nav-links a {
  color: #42b983;
  text-decoration: none;
}

.nav-links a.router-link-active {
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