<template>
  <ion-page>
    <ion-content class="ion-padding forum-content">
      <div class="post-detail-container">

                <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <ion-spinner name="crescent"></ion-spinner>
        </div>

        <!-- Main Admin Post (Appears First) -->
        <template v-else-if="post">
          <div class="main-post-card">
                        <h1 class="post-title">{{ post.title }}</h1>
                        <div class="post-meta">
              <span>Posted by <span class="author">{{ post.author_name }}</span></span>
              <ion-avatar class="post-avatar">
                <img v-if="post.author_avatar_url" :src="post.author_avatar_url" alt="" />
                <div v-else class="avatar-fallback">{{ initial(post.author_name) }}</div>
              </ion-avatar>
              <span>on {{ formatDate(post.created_at) }}</span>
            </div>
            <div class="post-body">
              <p>{{ post.content }}</p>
            </div>

            <!-- Reply button for the main post -->
            <div class="card-footer-action" v-if="authStore.isAuthenticated">
              <ion-button size="small" fill="outline" @click="toggleReplyForm('main', post.id)">
                <ion-icon slot="start" :icon="chatbubbleOutline"></ion-icon>
                {{ activeReplyTarget?.type === 'main' ? 'Cancel' : 'Reply to Thread' }}
              </ion-button>
            </div>
          </div>

          <ReplyComposer
  v-if="activeReplyTarget?.type === 'main'"
  v-model="replyContent"
  :rows="3"
  placeholder="Write your reply to this thread..."
  submit-label="Post Reply"
  :submitting="submitting"
  @submit="submitReply(null)"
/>

          <!-- Replies Section -->
          <div class="replies-section">
            <h2>Discussion Replies ({{ totalReplies }})</h2>

            <div v-if="paginatedReplies.length > 0" class="replies-list">
              <div v-for="reply in paginatedReplies" :key="reply.id" class="reply-card">
                                <div class="reply-header">
                                    <div class="reply-author-info">
                    <ion-avatar class="reply-avatar">
                      <img v-if="reply.author_avatar_url" :src="reply.author_avatar_url" alt="" />
                      <div v-else class="avatar-fallback">{{ initial(reply.author_name) }}</div>
                    </ion-avatar>
                    <span class="reply-author">{{ reply.author_name }}</span>
                  </div>
                  <span class="reply-date">{{ formatDate(reply.created_at) }}</span>
                </div>
                                <template v-if="editingReplyId === reply.id">
                  <div class="inline-edit-box">
                    <ion-textarea
                      v-model="editReplyContent"
                      :rows="2"
                      placeholder="Edit your reply..."
                      auto-grow
                    />
                    <div class="edit-actions">
                      <ion-button size="small" fill="clear" @click="cancelEditReply">
                        Cancel
                      </ion-button>
                      <ion-button
                        size="small"
                        :disabled="editReplySubmitting || !editReplyContent.trim()"
                        @click="saveEditReply(reply.id)"
                      >
                        <ion-spinner v-if="editReplySubmitting" name="crescent" />
                        <span v-else>Save</span>
                      </ion-button>
                    </div>
                  </div>
                </template>
                <p v-else class="reply-content">{{ reply.content }}</p>

                                <!-- Edit / Reply / Delete actions -->
                <div class="reply-item-action" v-if="authStore.isAuthenticated">
                  <ion-button
                    v-if="canEditReply(reply) && editingReplyId !== reply.id"
                    size="small"
                    fill="clear"
                    @click="startEditReply(reply)"
                  >
                    <ion-icon slot="start" :icon="pencilOutline"></ion-icon>
                    Edit
                  </ion-button>
                                    <ion-button
                    v-if="canDeleteReply(reply) && editingReplyId !== reply.id"
                    size="small"
                    fill="clear"
                    color="danger"
                    @click="deleteReply(reply)"
                  >
                    <ion-icon slot="start" :icon="trashOutline"></ion-icon>
                    Delete
                  </ion-button>
                  <ion-button 
                    size="small" 
                    fill="clear" 
                    @click="toggleReplyForm('reply', reply.id, reply.author_name)"
                  >
                    <ion-icon slot="start" :icon="returnUpBackOutline"></ion-icon>
                    {{ activeReplyTarget?.id === reply.id ? 'Cancel' : `Reply to ${reply.author_name}` }}
                  </ion-button>
                </div>

                <ReplyComposer
  v-if="activeReplyTarget?.type === 'reply' && activeReplyTarget?.id === reply.id"
  v-model="replyContent"
  :rows="2"
  :placeholder="`Replying to ${reply.author_name}...`"
  submit-label="Send Reply"
  :submitting="submitting"
  nested
  @submit="submitReply(reply.id)"
/>

              </div>
            </div>

            <div v-else class="empty-replies">
              <p>No replies yet. Be the first to join the conversation!</p>
            </div>

            <!-- Pagination Component for Replies -->
            <div v-if="totalPages > 1" class="pagination-container-wrapper">
              <Pagination 
                v-model:current-page="currentPage" 
                :total-pages="totalPages" 
              />
            </div>

          </div>
        </template>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { IonPage, IonContent, IonButton, IonIcon, IonSpinner, IonAvatar, IonTextarea, onIonViewWillEnter } from '@ionic/vue';
import { chatbubbleOutline, returnUpBackOutline, pencilOutline, trashOutline } from 'ionicons/icons';
import { useAuthStore } from '@/stores/authStore';
import Pagination from '@/components/Pagination.vue';
import ReplyComposer from '@/components/ReplyComposer.vue';
import { forumService } from '@/services/forumService';

const route = useRoute();
const authStore = useAuthStore();

interface Post {
  id: number;
  title: string;
  content: string;
  author_name: string;
  author_avatar_url?: string | null;
  created_at: string;
}

interface Reply {
  id: number;
  post_id: number;
  author_id?: string | number;
  content: string;
  author_name: string;
  author_avatar_url?: string | null;
  created_at: string;
}

const post = ref<Post | null>(null);
const replies = ref<Reply[]>([]);
const loading = ref(true);

// Pagination state for replies
const currentPage = ref(1);
const itemsPerPage = 5;
const totalReplies = ref(0);

// Active Reply Target State (controls which post/reply has an open reply form)
const activeReplyTarget = ref<{ type: 'main' | 'reply'; id: number | null } | null>(null);
const replyContent = ref('');
const submitting = ref(false);

// Inline edit-reply state
const editingReplyId = ref<number | null>(null);
const editReplyContent = ref('');
const editReplySubmitting = ref(false);

const totalPages = computed(() => Math.ceil(totalReplies.value / itemsPerPage) || 1);

// Sorted oldest to newest replies slice for current page
const paginatedReplies = computed(() => {
  // Sort oldest to newest first based on created_at
  const sorted = [...replies.value].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  const start = (currentPage.value - 1) * itemsPerPage;
  return sorted.slice(start, start + itemsPerPage);
});

const fetchPostDetails = async () => {
  const postId = String(route.params.id);
  loading.value = true;

  try {
    const response = await forumService.getPostDetails(postId);

    post.value = response.post;

    const fetchedReplies = response.replies || [];

    replies.value = fetchedReplies.sort(
      (a: Reply, b: Reply) =>
        new Date(a.created_at).getTime() -
        new Date(b.created_at).getTime()
    );

    totalReplies.value = replies.value.length;

  } catch (err) {
    console.error('Failed to load post details:', err);
  } finally {
    loading.value = false;
  }
};

onIonViewWillEnter(() => {
  fetchPostDetails();
});

// Toggle inline reply form for main post or a specific reply item
const toggleReplyForm = (type: 'main' | 'reply', id: number | null, authorName?: string) => {
  if (activeReplyTarget.value?.type === type && activeReplyTarget.value?.id === id) {
    activeReplyTarget.value = null;
    replyContent.value = '';
  } else {
    activeReplyTarget.value = { type, id };
    replyContent.value = authorName ? `@${authorName} ` : '';
  }
};

const submitReply = async (parentReplyId: number | null) => {
  if (!replyContent.value.trim()) return;

  submitting.value = true;

  try {
    const postId = String(route.params.id);

    const response = await forumService.createReply(postId, {
      content: replyContent.value.trim(),
      parent_reply_id: parentReplyId
    });

    replies.value.push(response);
    totalReplies.value = replies.value.length;

    // Move to the last page after submitting.
    currentPage.value = totalPages.value;

    // Reset the reply form.
    replyContent.value = '';
    activeReplyTarget.value = null;

  } catch (err: unknown) {
    console.error('Failed to submit reply:', err);
  } finally {
    submitting.value = false;
  }
};

const canEditReply = (reply: Reply) => {
  if (!authStore.user) return false;
  return String(reply.author_id) === String(authStore.user.id);
};

const canDeleteReply = (reply: Reply) => {
  if (!authStore.user) return false;
  if (authStore.user.role === 'admin') return true;
  return String(reply.author_id) === String(authStore.user.id);
};

const startEditReply = (reply: Reply) => {
  editingReplyId.value = reply.id;
  editReplyContent.value = reply.content;
  // Close any open reply composer
  activeReplyTarget.value = null;
  replyContent.value = '';
};

const cancelEditReply = () => {
  editingReplyId.value = null;
  editReplyContent.value = '';
};

const saveEditReply = async (replyId: number) => {
  if (!editReplyContent.value.trim()) return;

  editReplySubmitting.value = true;
  try {
    const postId = String(route.params.id);
    const updated = await forumService.updateReply(
      postId,
      replyId,
      { content: editReplyContent.value.trim() }
    );
    const idx = replies.value.findIndex(r => r.id === replyId);
    if (idx !== -1) {
      replies.value[idx] = { ...replies.value[idx], ...updated };
    }
    cancelEditReply();
  } catch (err) {
    console.error('Failed to edit reply:', err);
  } finally {
    editReplySubmitting.value = false;
  }
};

const deleteReply = async (reply: Reply) => {
  if (!confirm('Are you sure you want to delete this reply? This cannot be undone.')) {
    return;
  }

  try {
    const postId = String(route.params.id);
    await forumService.deleteReply(postId, reply.id);
  } catch (err: any) {
    // 404 means it was already deleted (e.g. by a moderator in another tab) — treat as success
    if (err?.response?.status !== 404) {
      console.error('Failed to delete reply:', err);
      return;
    }
  }

  replies.value = replies.value.filter((r) => r.id !== reply.id);
  totalReplies.value = replies.value.length;

  // If we deleted the last item on the last page, step back a page
  if (currentPage.value > totalPages.value) {
    currentPage.value = Math.max(1, totalPages.value);
  }
};

const initial = (name: string | null | undefined) =>
  (name || 'U').trim().charAt(0).toUpperCase() || 'U';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<style scoped>
.forum-content {
  --background: #f4f5f8;
}

.post-detail-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem 0.5rem 3rem;
  box-sizing: border-box;
  gap: 16px;
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  width: 100%;
}

.nav-bar {
  margin-bottom: 1rem;
}

.back-btn {
  --color: #4b5563;
  font-weight: 500;
  padding: 0;
}

.main-post-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.post-title {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  color: #1f2937;
  margin: 0 0 10px;
  overflow-wrap: anywhere;
}

.post-meta {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0 0 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.post-avatar {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
}

.author {
  font-weight: 600;
  color: #4b5563;
}

.post-body {
  font-size: 1rem;
  color: #374151;
  line-height: 1.7;
  overflow-wrap: anywhere;
}

.post-body p {
  margin: 0;
  white-space: pre-wrap;
}

.card-footer-action {
  margin-top: 24px;
  border-top: 1px solid #f3f4f6;
  padding-top: 16px;
}

.inline-reply-box {
  background: white;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  margin-bottom: 1.5rem;
}

.nested-reply {
  margin-top: 10px;
  margin-bottom: 10px;
  background: #f9fafb;
}

.reply-form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.replies-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 8px;
}

.replies-section h2 {
  font-size: 1.2rem;
  font-weight: 650;
  color: #1f2937;
  margin: 0;
}

.replies-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.reply-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
}

.reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.reply-author {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.9rem;
}

.reply-date {
  color: #9ca3af;
  font-size: 0.8rem;
}

.reply-author-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.reply-avatar {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.post-avatar img,
.reply-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-fallback {
  width: 100%;
  height: 100%;
  background-color: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.75rem;
  border-radius: 50%;
  line-height: 1;
}

.reply-content {
  font-size: 0.95rem;
  color: #4b5563;
  margin: 0 0 12px;
  line-height: 1.6;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}

.reply-item-action {
  display: flex;
  justify-content: flex-end;
}

.empty-replies {
  background: white;
  padding: 32px 20px;
  border-radius: 10px;
  text-align: center;
  color: #6b7280;
  border: 1px solid #e5e7eb;
}

.inline-edit-box {
  background: #f9fafb;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  margin-bottom: 12px;
}

.edit-actions {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 8px;
}

.reply-item-action {
  display: flex;
  justify-content: flex-end;
  gap: 4px;
}

.pagination-container-wrapper {
  margin-top: 8px;
  width: 100%;
}

@media (min-width: 768px) {
    .post-detail-container {
    max-width: 900px;
    padding: 2rem 1rem 4rem;
    gap: 20px;
  }

  .main-post-card {
    padding: 32px;
  }

  .post-title {
    font-size: 1.8rem;
  }

  .post-body {
    font-size: 1.05rem;
  }

  .reply-card {
    padding: 24px;
  }

  .replies-section h2 {
    font-size: 1.35rem;
  }
}

@media (max-width: 480px) {
  .main-post-card {
    padding: 18px;
  }

  .post-title {
    font-size: 1.3rem;
  }

  .reply-card {
    padding: 16px;
  }

  .reply-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>