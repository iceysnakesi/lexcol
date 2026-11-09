<template>
  <div class="manage-post-component">
    <h2 class="section-title">Manage Existing Posts</h2>

    <div v-if="loading" class="ion-text-center ion-padding">
      <ion-spinner name="crescent"></ion-spinner>
    </div>

    <div v-else-if="posts.length > 0" class="manage-list">
      <div v-for="post in posts" :key="post.id" class="manage-item-card">
        <div class="post-info">
          <h4>{{ post.title }}</h4>
          <p>By {{ post.author_name }} — Status: <span :class="post.is_hidden ? 'text-hidden' : 'text-active'">{{ post.is_hidden ? 'Hidden' : 'Visible' }}</span></p>
        </div>
        <div class="manage-actions">
          <ion-button size="small" fill="clear" color="primary" @click="editPost(post.id)" title="Edit Post">
            <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
          </ion-button>
          <ion-button size="small" fill="clear" :color="post.is_hidden ? 'success' : 'warning'" @click="toggleVisibility(post.id)" :title="post.is_hidden ? 'Show Post' : 'Hide Post'">
            <ion-icon slot="icon-only" :icon="post.is_hidden ? eyeOutline : eyeOffOutline"></ion-icon>
          </ion-button>
          <!-- NEW: Delete Post Button -->
          <ion-button size="small" fill="clear" color="danger" @click="deletePost(post.id)" title="Delete Post">
            <ion-icon slot="icon-only" :icon="trashOutline"></ion-icon>
          </ion-button>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>No posts available to manage.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IonButton, IonIcon, IonSpinner } from '@ionic/vue';
import { createOutline, eyeOutline, eyeOffOutline, trashOutline } from 'ionicons/icons';
import { forumService } from '@/services/forumService';

const router = useRouter();
const posts = ref<any[]>([]);
const loading = ref(false);

const loadPosts = async () => {
  loading.value = true;

  try {
    const data = await forumService.getAdminPosts(1, 50);
    posts.value = data.posts;
  } catch (err) {
    console.error('Failed to load posts for management:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadPosts();
});

const editPost = (id: number) => {
  router.push(`/forum/edit/${id}`);
};

const toggleVisibility = async (id: number) => {
  try {
    await forumService.toggleVisibility(id);
    await loadPosts();
  } catch (err) {
    console.error('Failed to toggle visibility:', err);
  }
};

const deletePost = async (id: number) => {
  if (!confirm('Are you sure you want to permanently delete this post? This action cannot be undone.')) {
    return;
  }

  try {
    await forumService.deletePost(id);
    await loadPosts();
  } catch (err) {
    console.error('Failed to delete post:', err);
  }
};
</script>

<style scoped>
.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.manage-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.manage-item-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 12px 16px;
  border-radius: 8px;
}

.post-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.post-info p {
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0;
}

.text-hidden {
  color: #d97706;
  font-weight: 500;
}

.text-active {
  color: #059669;
  font-weight: 500;
}

.manage-actions {
  display: flex;
  gap: 4px;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}
</style>