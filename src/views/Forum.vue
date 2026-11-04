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
          <div v-if="loading" class="ion-text-center ion-padding">
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

              <!-- Admin Controls Overlay -->
              <div v-if="isAdmin" class="admin-actions-wrapper" @click.stop>
                <ion-button size="small" fill="clear" color="primary" @click="editPost(post.id)">
                  <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
                </ion-button>
                <ion-button size="small" fill="clear" :color="post.is_hidden ? 'success' : 'warning'" @click="handleToggleVisibility(post.id)">
                  <ion-icon slot="icon-only" :icon="post.is_hidden ? eyeOutline : eyeOffOutline"></ion-icon>
                </ion-button>
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
  IonPage, IonContent, IonButton, IonIcon, IonSpinner 
} from '@ionic/vue';
import { 
  createOutline, eyeOutline, eyeOffOutline 
} from 'ionicons/icons';
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
const currentPage = ref(1);
const itemsPerPage = 10;
const totalPages = ref(1);
const loading = ref(false);
const posts = ref<Post[]>([]);

// Check if user has admin role
const isAdmin = computed(() => {
  const roles = authStore.user?.role || [];
  return roles.includes('admin');
});

// Fetch data from Express API on mount
onMounted(() => {
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
    const data = await forumService.getPosts(currentPage.value, itemsPerPage, searchQuery.value);
    posts.value = data.posts;
    totalPages.value = data.totalPages;
  } catch (err) {
    console.error('Failed to load forum posts:', err);
  } finally {
    loading.value = false;
  }
};

const applyFilter = (filterType: string) => {
  console.log('Applied filter:', filterType);
};

const viewPost = (id: number) => {
  router.push(`/forum/${id}`);
};

const editPost = (id: number) => {
  router.push(`/forum/edit/${id}`);
};

const handleToggleVisibility = async (id: number) => {
  try {
    const token = authStore.accessToken;
    if (!token) return;
    await forumService.toggleVisibility(id, token);
    loadPosts(); 
  } catch (err) {
    console.error('Failed to toggle post visibility:', err);
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};
</script>

<style scoped>
.forum-scroll-container {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 2rem;
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
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.post-body-click {
  cursor: pointer;
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