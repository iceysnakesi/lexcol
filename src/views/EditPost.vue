<template>
  <ion-page>
    <ion-content class="ion-padding forum-content">
      <div class="edit-post-container">
        <div v-if="loading" class="ion-text-center ion-padding">
          <ion-spinner name="crescent"></ion-spinner>
        </div>

        <template v-else-if="post">
          <div class="edit-post-card">
            <h2 class="section-title">Edit Post</h2>

            <form @submit.prevent="handleSave">
              <ion-item class="custom-item" lines="none">
                <ion-input
                  v-model="title"
                  label="Post Title"
                  label-placement="stacked"
                  type="text"
                  required
                ></ion-input>
              </ion-item>

              <ion-item class="custom-item textarea-item" lines="none">
                <ion-textarea
                  v-model="content"
                  label="Content"
                  label-placement="stacked"
                  :rows="8"
                  required
                ></ion-textarea>
              </ion-item>

              <p class="error-text" v-if="errorMessage">{{ errorMessage }}</p>

              <div class="actions-row">
                <ion-button fill="clear" type="button" @click="cancel">
                  Cancel
                </ion-button>
                <ion-button type="submit" :disabled="saving">
                  <ion-spinner v-if="saving" name="crescent"></ion-spinner>
                  <span v-else>Save Changes</span>
                </ion-button>
              </div>
            </form>
          </div>
        </template>

        <div v-else class="empty-state">
          <p>{{ errorMessage || 'Post not found.' }}</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  IonPage, IonContent, IonItem, IonInput, IonTextarea,
  IonButton, IonSpinner
} from '@ionic/vue';
import { forumService } from '@/services/forumService';

const route = useRoute();
const router = useRouter();

const post = ref<{ id: number; title: string; content: string } | null>(null);
const title = ref('');
const content = ref('');
const loading = ref(true);
const saving = ref(false);
const errorMessage = ref<string | null>(null);

const fetchPost = async () => {
  loading.value = true;
  try {
    const id = String(route.params.id);
    const data = await forumService.getAdminPost(id);
    post.value = data;
    title.value = data.title;
    content.value = data.content;
  } catch (err) {
    console.error('Failed to load post:', err);
    errorMessage.value = 'Failed to load post.';
  } finally {
    loading.value = false;
  }
};

const handleSave = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    errorMessage.value = 'Title and content are required.';
    return;
  }

  saving.value = true;
  errorMessage.value = null;

  try {
    const id = Number(route.params.id);
    await forumService.updatePost(id, {
      title: title.value.trim(),
      content: content.value.trim(),
    });
    router.push('/postmanagement');
  } catch (err) {
    console.error('Failed to update post:', err);
    errorMessage.value = 'Failed to save changes.';
  } finally {
    saving.value = false;
  }
};

const cancel = () => {
  router.push('/postmanagement');
};

onMounted(fetchPost);
</script>

<style scoped>
.forum-content { --background: #f4f5f8; }

.edit-post-container {
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 2rem;
}

.edit-post-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.section-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1.5rem;
}

.custom-item {
  margin-bottom: 1.25rem;
  --background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 4px 8px;
}

.textarea-item { align-items: flex-start; }

.error-text {
  color: #dc2626;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.actions-row {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 1.5rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}
</style>