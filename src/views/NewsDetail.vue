<template>
  <ion-page>
    <ion-content class="ion-padding news-detail-content">
      <div class="detail-container">
        <div v-if="loading" class="loading-state">
          <ion-spinner name="crescent"></ion-spinner>
        </div>

        <template v-else-if="article">
          <h1 class="detail-title">{{ article.title }}</h1>
          <p class="detail-meta">{{ formatDate(article.created_at) }}</p>

          <div class="detail-body">
            <template v-for="(block, i) in article.content" :key="i">
              <div v-if="block.type === 'text'" :class="['text-block', `style-${block.style || 'normal'}`]">
                <p v-html="renderText(block.content || '')"></p>
              </div>
              <figure v-else-if="block.type === 'image' && block.url" class="image-block">
                <img :src="block.url" alt="" loading="lazy" />
                <figcaption v-if="block.commentary">{{ block.commentary }}</figcaption>
              </figure>
            </template>
          </div>
        </template>

        <div v-else class="empty-state">
          <p>Article not found.</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { IonPage, IonContent, IonSpinner, onIonViewWillEnter } from '@ionic/vue';
import { newsService, type NewsItem } from '@/services/newsService';

const route = useRoute();
const article = ref<NewsItem | null>(null);
const loading = ref(true);

onIonViewWillEnter(loadArticle);

async function loadArticle() {
  loading.value = true;
  try {
    article.value = await newsService.getOne(String(route.params.id));
  } catch (err) {
    console.error('Failed to load article:', err);
  } finally {
    loading.value = false;
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// Simple, safe markdown-lite: escape HTML, then apply **bold** / *italic* / newlines
function renderText(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}
</script>

<style scoped>
.news-detail-content { --background: #f4f5f8; }

.detail-container {
  max-width: 680px;
  margin: 0 auto;
  padding: 1rem 1rem 3rem;
  box-sizing: border-box;
}

.detail-title {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.3;
  color: #1f2937;
  margin: 0 0 8px;
  overflow-wrap: anywhere;
}

.detail-meta {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0 0 2rem;
}

.detail-body { color: #374151; line-height: 1.7; }

.text-block { margin-bottom: 1.25rem; }
.text-block.style-normal { font-size: 1rem; }
.text-block.style-h2 { font-size: 1.35rem; font-weight: 700; margin-top: 1.5rem; }
.text-block.style-h3 { font-size: 1.15rem; font-weight: 600; margin-top: 1.25rem; }

.text-block :deep(p) { margin: 0; }

.image-block {
  margin: 1.5rem 0;
  text-align: center;
}

.image-block img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
}

.image-block figcaption {
  margin-top: 8px;
  font-size: 0.85rem;
  color: #6b7280;
  font-style: italic;
  line-height: 1.5;
}

.loading-state {
  display: flex; justify-content: center; align-items: center;
  padding: 3rem 0;
}

.empty-state { text-align: center; padding: 3rem; color: #6b7280; }
</style>