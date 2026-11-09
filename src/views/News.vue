<template>
  <ion-page>
            <ion-content class="news-content">
      <!-- Message of the Day — full-bleed banner, sits above the title -->
      <MessageOfTheDay v-if="authStore.isAuthenticated" />

      <div class="news-container">

        <!-- Header -->
        <div class="news-header">
          <h1 class="page-title">News</h1>
        </div>

        <!-- Search -->
        <Search
          v-model="searchQuery"
          placeholder="Search news..."
          hide-filter
          admin-button-label="Create News"
          admin-button-route="/news/create"
        />

        <!-- Loading -->
        <div v-if="loading" class="loading-state">
          <ion-spinner name="crescent"></ion-spinner>
        </div>

        <!-- Feed -->
        <div v-else-if="articles.length > 0" class="news-feed">
          <NewsCard
            v-for="article in articles"
            :key="article.id"
            :news="article"
            :is-admin="isAdmin"
            @open="openArticle"
            @toggle="handleToggle"
            @delete="handleDelete"
          />
        </div>

        <div v-else class="empty-state">
          <p>No news yet. Check back later.</p>
        </div>

        <!-- Pagination -->
        <Pagination
          v-if="totalPages > 1"
          v-model:current-page="currentPage"
          :total-pages="totalPages"
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonSpinner, onIonViewWillEnter } from '@ionic/vue';
import { useAuthStore } from '@/stores/authStore';
import Search from '@/components/Search.vue';
import Pagination from '@/components/Pagination.vue';
import NewsCard from '@/components/NewsCard.vue';
import MessageOfTheDay from '@/components/MessageOfTheDay.vue';
import { newsService, type NewsItem } from '@/services/newsService';

const router = useRouter();
const authStore = useAuthStore();

const isAdmin = computed(() => authStore.user?.role === 'admin');

const articles = ref<NewsItem[]>([]);
const searchQuery = ref('');
const currentPage = ref(1);
const totalPages = ref(1);
const loading = ref(true);
const itemsPerPage = 6;

// Watch search changes
import { watch } from 'vue';
watch(searchQuery, () => {
  currentPage.value = 1;
  loadNews();
});
watch(currentPage, () => loadNews());

onIonViewWillEnter(() => {
  loadNews();
});

async function loadNews() {
  loading.value = true;
  try {
    const data = await newsService.getNews(
      currentPage.value, itemsPerPage, searchQuery.value
    );
    articles.value = data.news;
    totalPages.value = data.totalPages;
  } catch (err) {
    console.error('Failed to load news:', err);
  } finally {
    loading.value = false;
  }
}

function openArticle(id: number) {
  router.push(`/news/${id}`);
}

async function handleToggle(id: number) {
  try {
    await newsService.toggleVisibility(id);
    await loadNews();
  } catch (err) {
    console.error('Failed to toggle article:', err);
  }
}

async function handleDelete(id: number) {
  if (!confirm('Delete this article permanently?')) return;
  try {
    await newsService.deleteNews(id);
    await loadNews();
  } catch (err) {
    console.error('Failed to delete article:', err);
  }
}

</script>

<style scoped>
.news-content { --background: #f4f5f8; }

.news-container {
  max-width: 680px;
  margin: 0 auto;
  padding: 1.5rem 1rem 2rem;
  box-sizing: border-box;
}

.news-header { margin-bottom: 1rem; }

.page-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

@media (min-width: 768px) {
  .news-container { padding: 2rem 1rem 3rem; }
  .page-title { font-size: 1.8rem; }
}

.news-feed {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 1rem;
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  width: 100%;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}
</style>