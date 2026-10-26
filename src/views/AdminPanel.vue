<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="router.push('/dashboard')">
            <ion-icon :icon="arrowBackOutline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Admin Panel</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="admin-container">
        <h2>User Management</h2>
        <p class="subtitle">Manage user roles and membership tiers</p>

        <ion-list class="custom-list">
          <ion-item v-for="user in users" :key="user.id || user._id" class="user-card">
            <!-- Optional Profile Avatar / Icon -->
            <ion-avatar slot="start" class="user-avatar">
              <img v-if="user.avatarUrl" :src="user.avatarUrl" alt="Avatar" />
              <div v-else class="avatar-placeholder">
                {{ (user.username || user.email || 'U').charAt(0).toUpperCase() }}
              </div>
            </ion-avatar>

            <ion-label>
              <h3><strong>{{ user.username || user.name || 'Unnamed User' }}</strong></h3>
              <p class="user-email">{{ user.email || 'No email provided' }}</p>
              <p class="user-meta">
                Role: <span class="badge">{{ user.role || 'user' }}</span> | 
                Tier: <span class="badge">{{ user.membership_tier || 'standard' }}</span>
              </p>
            </ion-label>
            
            <div slot="end" class="action-buttons">
            <!-- Dynamic Role Toggle -->
            <ion-button 
              size="small" 
              color="medium" 
              @click="demoteToUser(user.id || user._id)" 
              v-if="user.role === 'admin'"
            >
              Demote to User
            </ion-button>
            <ion-button 
              size="small" 
              @click="promoteToAdmin(user.id || user._id)" 
              v-else
            >
              Make Admin
            </ion-button>

            <!-- Membership Tier Dropdown -->
            <ion-select 
              :value="user.membership_tier || 'standard'" 
              @ionChange="updateUserTier(user, $event)"
              interface="popover"
              placeholder="Select Tier"
              class="tier-select"
            >
              <ion-select-option value="free">Standard</ion-select-option>
              <ion-select-option value="pro">Pro</ion-select-option>
              <ion-select-option value="enterprise">Enterprise</ion-select-option>
            </ion-select>
          </div>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiClient } from '@/services/apiClient'; // Match your service import
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButtons, IonButton, IonIcon, IonList, IonItem, IonLabel, IonAvatar,
  IonSelect, IonSelectOption
} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import { UserDto } from '@/models/auth';

const router = useRouter();
const users = ref<any[]>([]);

const fetchUsers = async () => {
  try {
    const response = await apiClient.get('/api/users');
    // Extract the 'data' array from the wrapper object
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
    user.membership_tier = newTier; // Update local state
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
.subtitle {
  color: #6b7280;
  margin-bottom: 1.5rem;
}
.user-card {
  margin-bottom: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}
.badge {
  font-weight: bold;
  color: #3b82f6;
  text-transform: uppercase;
  font-size: 0.8rem;
}
.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.admin-container {
  max-width: 90%;
  margin: 0 auto;
  padding: 1rem;
}

.subtitle {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.user-card {
  margin-bottom: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  --background: #ffffff; /* Ensures clean white background in MD mode */
}

.badge {
  font-weight: bold;
  color: #3b82f6;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  padding: 0 0.5rem;
}

.user-avatar {
  margin-right: 12px;
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
  border-radius: 10%;
}

.user-email {
  color: #4b5563;
  font-size: 0.9rem;
}

.user-meta {
  margin-top: 4px;
  font-size: 0.85rem;
}
</style>