<template>
  <div class="create-post-component">
    <h2 class="section-title">Create New Discussion</h2>

    <form @submit.prevent="handleCreatePost">
      <ion-item class="custom-item" lines="none">
        <ion-input
          v-model="title"
          label="Post Title"
          label-placement="stacked"
          type="text"
          required
          placeholder="Enter discussion title..."
        ></ion-input>
      </ion-item>

      <ion-item class="custom-item textarea-item" lines="none">
        <ion-textarea
          v-model="content"
          label="Content"
          label-placement="stacked"
          :rows="6"
          required
          placeholder="Write your discussion content here..."
        ></ion-textarea>
      </ion-item>

      <p class="error-text" v-if="errorMessage">
        {{ errorMessage }}
      </p>

      <div class="submit-btn-wrapper">
        <ion-button
          expand="block"
          type="submit"
          :disabled="loading"
          class="submit-btn"
        >
          <ion-spinner v-if="loading" name="crescent"></ion-spinner>
          <span v-else>Publish Post</span>
        </ion-button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonButton, IonItem, IonInput, IonTextarea, IonSpinner } from '@ionic/vue';
import { forumService } from '@/services/forumService';

const router = useRouter();

const title = ref('');
const content = ref('');
const loading = ref(false);
const errorMessage = ref<string | null>(null);

const handleCreatePost = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    errorMessage.value = 'Please fill out all required fields.';
    return;
  }

  loading.value = true;
  errorMessage.value = null;

  try {
    await forumService.createPost({
      title: title.value.trim(),
      content: content.value.trim(),
    });

    router.push('/forum');

  } catch (err: unknown) {
    console.error('Failed to create post:', err);

    errorMessage.value = err instanceof Error
      ? err.message
      : 'Failed to create post.';

  } finally {
    loading.value = false;
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

.custom-item {
  margin-bottom: 1.25rem;
  --background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 4px 8px;
}

.textarea-item {
  align-items: flex-start;
}

.error-text {
  color: #dc2626;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  text-align: center;
}

.submit-btn-wrapper {
  margin-top: 1.5rem;
}

.submit-btn {
  --border-radius: 8px;
  font-weight: 600;
  height: 44px;
}
</style>