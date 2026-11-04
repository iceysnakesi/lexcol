<template>
  <div class="pagination-footer" v-if="totalPages > 1">
    <div class="pagination-btn-wrapper">
      <ion-button 
        fill="clear" 
        :disabled="currentPage === 1" 
        @click="changePage(currentPage - 1)"
      >
        <ion-icon slot="icon-only" :icon="chevronBackOutline"></ion-icon>
      </ion-button>
    </div>

    <div class="page-numbers">
      <button 
        v-for="page in visiblePages" 
        :key="page" 
        :class="['page-number-btn', { active: page === currentPage }]"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
    </div>

    <div class="pagination-btn-wrapper">
      <ion-button 
        fill="clear" 
        :disabled="currentPage === totalPages" 
        @click="changePage(currentPage + 1)"
      >
        <ion-icon slot="icon-only" :icon="chevronForwardOutline"></ion-icon>
      </ion-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonButton, IonIcon } from '@ionic/vue';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void;
}>();

const changePage = (page: number) => {
  if (page < 1 || page > props.totalPages) return;
  emit('update:currentPage', page);
};

const visiblePages = computed(() => {
  const range = 5;
  let start = Math.max(1, props.currentPage - Math.floor(range / 2));
  let end = Math.min(props.totalPages, start + range - 1);
  
  if (end - start + range < range) {
    start = Math.max(1, end - range + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});
</script>

<style scoped>
.pagination-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 2rem;
  padding-bottom: 1rem;
}

.pagination-btn-wrapper {
  display: flex;
  align-items: center;
}

.page-numbers {
  display: flex;
  gap: 4px;
}

.page-number-btn {
  background: white;
  border: 1px solid #d1d5db;
  color: #374151;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.page-number-btn:hover {
  background: #f3f4f6;
}

.page-number-btn.active {
  background: var(--ion-color-primary, #3880ff);
  color: white;
  border-color: var(--ion-color-primary, #3880ff);
}
</style>