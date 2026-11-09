<template>
  <div class="forum-header-controls">
    <div class="search-wrapper">
          <ion-searchbar 
        :model-value="modelValue"
        @ionInput="handleInput"
        :placeholder="placeholder"
        :debounce="400"
      ></ion-searchbar>
    </div>
    
        <!-- Filter Button -->
    <div v-if="!hideFilter" class="filter-btn-wrapper">
      <ion-button
        fill="clear"
        id="filter-trigger"
        class="filter-btn"
        :class="{ 'filter-active': isFilterOpen }"
      >
        <ion-icon slot="icon-only" :icon="optionsOutline" />
      </ion-button>
    </div>

    <!-- Desktop-Only Post Management Button -->
<div v-if="isAdmin" class="desktop-admin-action">
      <ion-button 
      fill="clear" 
      @click="goToAdminRoute" 
      class="desktop-manage-btn"
    >
      <ion-icon slot="start" :icon="createOutline"></ion-icon>
      {{ adminButtonLabel }}
    </ion-button>
</div>
  </div>

    <!-- Filter Popover Wrapper -->
  <div v-if="!hideFilter" class="filter-popover-wrapper">
    <ion-popover
      trigger="filter-trigger"
      trigger-action="click"
      @ionPopoverWillPresent="isFilterOpen = true"
      @ionPopoverDidDismiss="isFilterOpen = false"
    >
      <ion-content class="ion-padding">
        <ion-list lines="none">
          <ion-list-header>Sort By</ion-list-header>
          <ion-item button @click="selectFilter('newest')">
            <ion-label>Newest First</ion-label>
          </ion-item>
          <ion-item button @click="selectFilter('oldest')">
            <ion-label>Oldest First</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-popover>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { 
  IonSearchbar, IonButton, IonIcon, IonPopover, 
  IonContent, IonList, IonListHeader, IonItem, IonLabel 
} from '@ionic/vue';
import { optionsOutline, createOutline } from 'ionicons/icons';
import { useAuthStore } from '@/stores/authStore';

const props = withDefaults(defineProps<{
  modelValue: string;
  placeholder?: string;
  hideFilter?: boolean;
  adminButtonLabel?: string;
  adminButtonRoute?: string;
}>(), {
  placeholder: 'Search discussions...',
  hideFilter: false,
  adminButtonLabel: 'Post Management',
  adminButtonRoute: '/postmanagement',
});

const router = useRouter();

const goToAdminRoute = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement;
  if (target) {
    target.blur();
  }
  router.push(props.adminButtonRoute);
};

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'filter', filterType: string): void;
}>();

const authStore = useAuthStore();
const isFilterOpen = ref(false);

const isAdmin = computed(() => authStore.user?.role === 'admin');

const handleInput = (event: CustomEvent) => {
  const value = (event.detail.value as string) || '';
  emit('update:modelValue', value);
};

const selectFilter = (filterType: string) => {
  emit('filter', filterType);
};
</script>

<style scoped>
.forum-header-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 1rem;
}

.search-wrapper {
  flex: 1;
}

.search-wrapper ion-searchbar {
  --box-shadow: none;
  --background: #ffffff;
  --border-radius: 8px;
  padding: 0;
}

.filter-btn-wrapper {
  display: flex;
  align-items: center;
}

.filter-btn {
  --color: #4b5563;
  --border-radius: 8px;
  height: 42px;
  width: 42px;
  margin: 0;
}

/* Hidden by default on mobile */
.desktop-admin-action {
  display: none;
}

@media (min-width: 768px) {
  .desktop-admin-action {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  /* Clean borderless button matching the filter aesthetic */
  .desktop-manage-btn {
    --background: #ffffff;
    --color: #4b5563;
    --border-radius: 8px;
    height: 42px;
    font-weight: 500;
    text-transform: none;
    margin: 0;
    padding: 0 14px;
    box-shadow: none;
  }

  @media (hover: hover) and (pointer: fine) {
    .desktop-manage-btn:hover {
      --background: rgba(0, 0, 0, 0.04);
      --color: #1f2937;
    }
  }
}

@media (hover: hover) and (pointer: fine) {
  .filter-btn:hover {
    --background: rgba(0, 0, 0, 0.04);
    --color: #1f2937;
  }
}

.filter-btn.filter-active {
  --background: rgba(56, 128, 255, 0.1);
  --color: var(--ion-color-primary, #3880ff);
}

.filter-btn:focus:not(:focus-visible) {
  --background: transparent;
  --color: #4b5563;
}
</style>