<template>
  <ion-page>
    <ion-content class="ion-padding forum-content">
      <div class="management-container">
        
        <div class="hub-header">
          <h1 class="hub-title">Post Management Hub</h1>
          <p class="hub-subtitle">Choose an administrative action below</p>
        </div>

        <!-- Admin Guard Check -->
        <div v-if="!isAdmin" class="unauthorized-state">
          <p>Access denied. Only administrators have access to post management.</p>
        </div>

        <!-- Action Cards Hub -->
        <div v-else class="hub-cards-grid">
          
          <div class="hub-card" @click="currentView = 'create'">
            <div class="card-icon create-icon">
              <ion-icon :icon="createOutline"></ion-icon>
            </div>
            <div class="card-info">
              <h3>Create Post</h3>
              <p>Write and publish a new discussion thread to the forum.</p>
            </div>
          </div>

          <div class="hub-card" @click="currentView = 'manage'">
            <div class="card-icon manage-icon">
              <ion-icon :icon="listOutline"></ion-icon>
            </div>
            <div class="card-info">
              <h3>Manage Posts</h3>
              <p>Edit existing discussions, toggle visibility, or delete posts.</p>
            </div>
          </div>

        </div>

        <!-- Dynamic Sub-Component View Area -->
        <div v-if="isAdmin && currentView" class="sub-component-wrapper">
          <div class="sub-header-bar">
            <ion-button size="small" fill="outline" @click="currentView = null">
              <ion-icon slot="start" :icon="arrowBackOutline"></ion-icon>
              Close Tab
            </ion-button>
          </div>

          <!-- Load Create or Manage component dynamically -->
          <CreatePost v-if="currentView === 'create'" />
          <ManagePost v-if="currentView === 'manage'" />
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue';
import { arrowBackOutline, createOutline, listOutline } from 'ionicons/icons';
import { useAuthStore } from '@/stores/authStore';

// Import sub-components
import CreatePost from '@/components/CreatePost.vue';
import ManagePost from '@/components/ManagePost.vue';

const router = useRouter();
const authStore = useAuthStore();

const currentView = ref<'create' | 'manage' | null>(null);

const isAdmin = computed(() => authStore.user?.role === 'admin');
</script>

<style scoped>

@media (min-width: 768px) {
  .management-container {
    max-width: 900px;
    padding: 2rem 1rem;
  }

  .hub-header {
    margin-bottom: 2rem;
  }

  .hub-title {
    font-size: 1.8rem;
  }

  .hub-subtitle {
    font-size: 1rem;
  }

  .hub-cards-grid {
    gap: 16px;
  }

  .hub-card {
    padding: 24px;
    align-items: center;
    min-height: 100px;
  }

  .card-icon {
    width: 48px;
    height: 48px;
    font-size: 24px;
  }

  .card-info h3 {
    font-size: 1.1rem;
  }

  .card-info p {
    font-size: 0.9rem;
  }

  .sub-component-wrapper {
    padding: 28px;
  }
}

.forum-content {
  --background: #f4f5f8;
}

.management-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 0.5rem 2rem 0.5rem;
  box-sizing: border-box;
}

.hub-header {
  margin-bottom: 1.5rem;
}

.hub-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.hub-subtitle {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

.hub-cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  margin-bottom: 1.5rem;
  width: 100%;
}

.hub-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #e5e7eb;
  width: 100%;
  box-sizing: border-box;
}

.hub-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  border-color: var(--ion-color-primary, #3880ff);
}

/*.hub-card:active {
  transform: scale(0.99);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}
*/

.card-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.create-icon {
  background: rgba(56, 128, 255, 0.1);
  color: var(--ion-color-primary, #3880ff);
}

.manage-icon {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.card-info h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.card-info p {
  font-size: 0.82rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

.sub-component-wrapper {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  margin-top: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}

.sub-header-bar {
  margin-bottom: 1.25rem;
}

.unauthorized-state {
  text-align: center;
  padding: 2.5rem;
  color: #dc2626;
  font-weight: 500;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
</style>