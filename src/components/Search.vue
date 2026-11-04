<template>
  <div class="forum-header-controls">
    <div class="search-wrapper">
      <ion-searchbar 
        :model-value="modelValue"
        @ionInput="handleInput"
        placeholder="Search discussions..." 
        :debounce="400"
      ></ion-searchbar>
    </div>
    
    <!-- Filter Button -->
    <div class="filter-btn-wrapper">
      <ion-button
        fill="clear"
        id="filter-trigger"
        class="filter-btn"
        :class="{ 'filter-active': isFilterOpen }"
      >
        <ion-icon slot="icon-only" :icon="optionsOutline" />
      </ion-button>
    </div>
  </div>

  <!-- Filter Popover Wrapper -->
  <div class="filter-popover-wrapper">
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
          <ion-item button @click="selectFilter('popular')">
            <ion-label>Most Popular</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-popover>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  IonSearchbar, IonButton, IonIcon, IonPopover, 
  IonContent, IonList, IonListHeader, IonItem, IonLabel 
} from '@ionic/vue';
import { optionsOutline } from 'ionicons/icons';

defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'filter', filterType: string): void;
}>();

const isFilterOpen = ref(false);

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
  margin-right: 8px;
}

.filter-btn {
  --color: #4b5563;
  --border-radius: 8px;
  height: 42px;
  width: 42px;
  margin: 0;
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