<template>
  <ion-page>
    <ion-content class="ion-padding forum-content">
      <div class="forum-scroll-container">
        
        <!-- Search & Filter Component Wrapper -->
        <div class="search-container-wrapper">
          <Search v-model="searchQuery" @filter="applyFilter" />
        </div>

        <!-- Scrollable Forum Posts Feed -->
        <div class="posts-container">
                    <div v-if="loading" class="loading-state">
            <ion-spinner name="crescent"></ion-spinner>
          </div>

          <template v-else-if="posts.length > 0">
            <div 
              v-for="post in posts" 
              :key="post.id" 
              class="post-card"
            >
              <div @click="viewPost(post.id)" class="post-body-click">
                <h3 class="post-title">{{ post.title }}</h3>
                <p class="post-meta">
                  Posted by <span class="author">{{ post.author_name }}</span> on {{ formatDate(post.created_at) }}
                </p>
                <p class="post-snippet">{{ post.content }}</p>
              </div>

            </div>
          </template>

          <div v-else class="empty-state">
            <p>No forum discussions found.</p>
          </div>
        </div>

        <!-- Pagination Component Wrapper -->
        <div class="pagination-container-wrapper">
          <Pagination 
            v-model:current-page="currentPage" 
            :total-pages="totalPages" 
          />
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { 
  IonPage, IonContent, IonSpinner, 
  onIonViewWillEnter // <--- 1. Import this from @ionic/vue
} from '@ionic/vue';

import { useAuthStore } from '@/stores/authStore';
import { forumService } from '@/services/forumService';
import Search from '@/components/Search.vue';
import Pagination from '@/components/Pagination.vue';

const router = useRouter();
const authStore = useAuthStore();

interface Post {
  id: number;
  title: string;
  content: string;
  author_name: string;
  is_hidden?: boolean;
  created_at: string;
}

const searchQuery = ref('');
const sortQuery = ref<'newest' | 'oldest'>('newest');
const currentPage = ref(1);
const itemsPerPage = 10;
const totalPages = ref(1);
const loading = ref(false);
const posts = ref<Post[]>([]);

// 2. Replace onMounted (or keep it alongside) with onIonViewWillEnter
onIonViewWillEnter(() => {
  loadPosts();
});

// Watch search query changes to reset page and fetch
watch(searchQuery, () => {
  currentPage.value = 1;
  loadPosts();
});

// Watch pagination changes to fetch new page data
watch(currentPage, () => {
  loadPosts();
});

const loadPosts = async () => {
  loading.value = true;
  try {
    const data = await forumService.getPosts(
      currentPage.value,
      itemsPerPage,
      searchQuery.value,
      sortQuery.value
    );
    posts.value = data.posts;
    totalPages.value = data.totalPages;
  } catch (err) {
    console.error('Failed to load forum posts:', err);
  } finally {
    loading.value = false;
  }
};

const applyFilter = (filterType: string) => {
  sortQuery.value = filterType === 'oldest' ? 'oldest' : 'newest';
  currentPage.value = 1;
  loadPosts();
};

const viewPost = (id: number) => {
  router.push(`/forum/${id}`);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};
</script>

<style scoped>
@media (min-width: 768px) {

  .forum-scroll-container {
    max-width: 1000px;
    padding: 2rem 1rem;
  }

  .search-container-wrapper {
    margin: 0 0 1.5rem 0;
  }

  .posts-container {
    gap: 16px;
  }

  .post-card {
    padding: 24px 28px;
    border-radius: 12px;
  }

  .post-title {
    font-size: 1.25rem;
    margin-bottom: 8px;
  }

  .post-meta {
    font-size: 0.9rem;
    margin-bottom: 12px;
  }

  .post-snippet {
    font-size: 0.95rem;
    line-height: 1.6;
    -webkit-line-clamp: 3;
    line-clamp: 3;
  }

  .post-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 14px rgba(0, 0, 0, 0.08);
    border-color: #d1d5db;
  }

  .pagination-container-wrapper {
    margin: 1.5rem 0 0;
  }
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  width: 100%;
}

.forum-scroll-container {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem 0.5rem 2rem;
  box-sizing: border-box;
}

.search-container-wrapper {
  width: 100%;
  margin: 10px 6px;
}

.pagination-container-wrapper {
  width: 100%;
  margin: 10px 6px;
}

.posts-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.post-card {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;
  width: 100%;
}

.post-body-click {
  cursor: pointer;
  width: 100%;
}

.post-body-click:focus-visible {
  outline: 2px solid var(--ion-color-primary);
  outline-offset: 4px;
  border-radius: 4px;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.post-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.post-meta {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0 0 8px 0;
}

.author {
  font-weight: 500;
  color: #4b5563;
}

.post-snippet {
  font-size: 0.9rem;
  color: #4b5563;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.admin-actions-wrapper {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 4px;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}
</style>