<template>
  <article class="news-card" @click="$emit('open', news.id)">
    <div class="card-image-wrapper">
      <img :src="news.cover_image_url" :alt="news.title" loading="lazy" />
    </div>
    <div class="card-body">
      <h3 class="card-title">{{ news.title }}</h3>
      <p class="card-meta">
        <span v-if="news.is_hidden" class="badge-hidden">Hidden</span>
        {{ formatDate(news.created_at) }}
      </p>
    </div>

    <div v-if="isAdmin" class="card-admin" @click.stop>
      <ion-button
        size="small"
        fill="clear"
        :color="news.is_hidden ? 'success' : 'warning'"
        @click="$emit('toggle', news.id)"
      >
        {{ news.is_hidden ? 'Show' : 'Hide' }}
      </ion-button>
      <ion-button size="small" fill="clear" color="danger" @click="$emit('delete', news.id)">
        Delete
      </ion-button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import type { NewsItem } from '@/services/newsService';

defineProps<{
  news: NewsItem;
  isAdmin: boolean;
}>();

defineEmits<{
  (e: 'open', id: number): void;
  (e: 'toggle', id: number): void;
  (e: 'delete', id: number): void;
}>();

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}
</script>

<style scoped>
.news-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}

.news-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card-image-wrapper {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #f3f4f6;
}

.card-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-body {
  padding: 14px 16px;
}

.card-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 6px;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.card-meta {
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0;
}

.badge-hidden {
  display: inline-block;
  background: #fef3c7;
  color: #92400e;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  margin-right: 6px;
  text-transform: uppercase;
}

.card-admin {
  display: flex;
  justify-content: flex-end;
  gap: 2px;
  padding: 0 8px 8px;
  border-top: 1px solid #f3f4f6;
}
</style>