<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="admin-container">
        <h2>User Management</h2>
        <p class="subtitle">Manage user roles and membership tiers</p>

        <div class="user-list">
  <div v-for="user in users" :key="user.id" class="user-card">
    
    <!-- Left / Top: Avatar & User Info -->
    <div class="user-info-section">
      <ion-avatar class="user-avatar">
        <img v-if="user.avatarUrl" :src="user.avatarUrl" alt="Avatar" />
        <div v-else class="avatar-placeholder">
          {{ (user.username || user.email || 'U').charAt(0).toUpperCase() }}
        </div>
      </ion-avatar>

      <div class="user-details">
        <h3><strong>{{ user.username || 'Unnamed User' }}</strong></h3>
        <p class="user-email">{{ user.email || 'No email provided' }}</p>
        <p class="user-meta">
          Role: <span class="badge">{{ user.role || 'user' }}</span> | 
          Tier: <span class="badge">{{ user.membership_tier || 'standard' }}</span>
        </p>
      </div>
    </div>

    <!-- Right / Bottom: Actions & Dropdown -->
    <div class="action-section">
      <ion-button 
        size="small" 
        color="medium" 
        @click="demoteToUser(user.id)" 
        v-if="user.role === 'admin'"
      >
        Demote
      </ion-button>
      <ion-button 
        size="small" 
        @click="promoteToAdmin(user.id)" 
        v-else
      >
        Make Admin
      </ion-button>

      <ion-select 
  :value="user.membership_tier || 'standard'" 
  @ionChange="updateUserTier(user, $event)"
  interface="popover"
  placeholder=""
  class="tier-select"
>
  <ion-select-option value="free">Standard</ion-select-option>
  <ion-select-option value="pro">Pro</ion-select-option>
  <ion-select-option value="enterprise">Enterprise</ion-select-option>
</ion-select>
    </div>

  </div>
</div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { apiClient } from '@/services/apiClient';
import { 
  IonPage, IonContent, IonButton, IonAvatar,
  IonSelect, IonSelectOption
} from '@ionic/vue';
import { UserDto } from '@/models/auth';

const users = ref<UserDto[]>([]);

const fetchUsers = async () => {
  try {
    const response = await apiClient.get('/api/users');
    users.value = response.data.data || response.data;
  } catch (error) {
    console.error('Failed to fetch users', error);
  }
};

const promoteToAdmin = async (id: string) => {
  try {
    await apiClient.patch(`/api/users/${id}/role`, { role: 'admin' });
    await fetchUsers();
    console.log('Role updated successfully');
  } catch (error) {
    console.error('Failed to update role', error);
  }
};

const demoteToUser = async (id: string) => {
  try {
    await apiClient.patch(`/api/users/${id}/role`, { role: 'user' });
    await fetchUsers();
    console.log('Role updated successfully');
  } catch (error) {
    console.error('Failed to demote user', error);
  }
};

const updateUserTier = async (user: UserDto, event: CustomEvent<{ value: string }>) => {
  const newTier = event.detail.value;
  try {
    await apiClient.patch(`/api/users/${user.id}/role`, {
      role: user.role,              
      membership_tier: newTier      
    });
    user.membership_tier = newTier;
    console.log('Tier updated successfully');
  } catch (error) {
    console.error('Failed to update tier', error);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.admin-container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem;
}

.subtitle {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-info-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background-color: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-radius: 50%;
}

.user-details h3 {
  margin: 0;
  font-size: 1rem;
}

.user-email {
  color: #4b5563;
  font-size: 0.85rem;
  margin: 2px 0;
}

.user-meta {
  margin: 0;
  font-size: 0.8rem;
  color: #6b7280;
}

.badge {
  font-weight: bold;
  color: #3b82f6;
  text-transform: uppercase;
}

.action-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  border-top: 1px solid #f3f4f6;
  padding-top: 0.75rem;
}

.tier-select {
  --padding-start: 12px;
  --padding-end: 12px;
  --padding-top: 6px;
  --padding-bottom: 6px;
  width: 105px !important;
  font-size: 0.85rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
}

.tier-select::part(container) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.tier-select::part(text) {
  flex-grow: 1;
  text-align: center;
  margin-right: 4px; /* Slight offset so text doesn't crowd the arrow */
}

.tier-select::part(icon) {
  opacity: 0.6;
  flex-shrink: 0;
  margin-left: auto;
}

/* DESKTOP & TABLET VIEW (Screens 768px and wider): 1 Single Row */
@media (min-width: 768px) {
  .user-card {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
  }

  .action-section {
    border-top: none;
    padding-top: 0;
    justify-content: flex-end;
  }
}
</style>