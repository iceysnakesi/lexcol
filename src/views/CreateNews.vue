<template>
  <ion-page>
    <ion-content class="ion-padding news-content">
      <div class="create-container">
        <h1 class="page-title">Create News Article</h1>

        <div class="field">
          <label>Title</label>
          <ion-input v-model="title" placeholder="Article headline" />
        </div>

        <div class="field">
          <label>Cover image (card)</label>
          <input type="file" accept="image/*" @change="onCoverSelected" />
          <img v-if="coverUrl" :src="coverUrl" class="cover-preview" alt="Cover preview" />
          <p v-if="uploadingCover" class="hint">Uploading…</p>
        </div>

        <div class="field">
          <label>Content blocks</label>

          <div v-for="(block, i) in blocks" :key="i" class="block-item">
            <div class="block-header">
              <span class="block-type">{{ block.type === 'text' ? 'Text' : 'Image' }}</span>
              <div class="block-actions">
                <ion-button fill="clear" size="small" :disabled="i === 0" @click="moveBlock(i, -1)">↑</ion-button>
                <ion-button fill="clear" size="small" :disabled="i === blocks.length - 1" @click="moveBlock(i, 1)">↓</ion-button>
                <ion-button fill="clear" size="small" color="danger" @click="removeBlock(i)">×</ion-button>
              </div>
            </div>

            <template v-if="block.type === 'text'">
              <div class="style-row">
                <ion-select v-model="block.style" interface="popover" class="style-select">
                  <ion-select-option value="normal">Normal</ion-select-option>
                  <ion-select-option value="h2">Heading</ion-select-option>
                  <ion-select-option value="h3">Subheading</ion-select-option>
                </ion-select>
              </div>
              <ion-textarea
                v-model="block.content"
                :rows="4"
                placeholder="Text (supports **bold** and *italic*)"
              />
            </template>

            <template v-else-if="block.type === 'image'">
              <input type="file" accept="image/*" @change="(e) => onImageSelected(e, block)" />
              <img v-if="block.url" :src="block.url" class="block-preview" alt="" />
              <ion-input
                v-model="block.commentary"
                placeholder="Optional image caption"
                class="commentary-input"
              />
            </template>
          </div>

          <div class="add-block-buttons">
            <ion-button fill="outline" size="small" @click="addBlock('text')">
              + Text
            </ion-button>
            <ion-button fill="outline" size="small" @click="addBlock('image')">
              + Image
            </ion-button>
          </div>
        </div>

        <p v-if="error" class="error-text">{{ error }}</p>

        <div class="actions">
          <ion-button fill="clear" @click="cancel">Cancel</ion-button>
          <ion-button :disabled="saving" @click="save">
            <ion-spinner v-if="saving" name="crescent" />
            <span v-else>Publish</span>
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage, IonContent, IonButton, IonInput, IonTextarea,
  IonSpinner, IonSelect, IonSelectOption,
} from '@ionic/vue';
import { newsService, type NewsBlock } from '@/services/newsService';

const router = useRouter();

const title = ref('');
const coverUrl = ref('');
const blocks = ref<NewsBlock[]>([
  { type: 'text', content: '', style: 'normal' },
]);
const uploadingCover = ref(false);
const saving = ref(false);
const error = ref<string | null>(null);

async function onCoverSelected(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  uploadingCover.value = true;
  error.value = null;
  try {
    coverUrl.value = await newsService.uploadImage(file);
  } catch (err) {
    console.error('Cover upload failed:', err);
    error.value = 'Failed to upload cover image.';
  } finally {
    uploadingCover.value = false;
  }
}

async function onImageSelected(e: Event, block: NewsBlock) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  try {
    block.url = await newsService.uploadImage(file);
  } catch (err) {
    console.error('Block image upload failed:', err);
    error.value = 'Failed to upload block image.';
  }
}

function addBlock(type: 'text' | 'image') {
  if (type === 'text') {
    blocks.value.push({ type: 'text', content: '', style: 'normal' });
  } else {
    blocks.value.push({ type: 'image', url: '', commentary: '' });
  }
}

function removeBlock(i: number) {
  blocks.value.splice(i, 1);
}

function moveBlock(i: number, dir: -1 | 1) {
  const j = i + dir;
  if (j < 0 || j >= blocks.value.length) return;
  const [b] = blocks.value.splice(i, 1);
  blocks.value.splice(j, 0, b);
}

async function save() {
  error.value = null;
  if (!title.value.trim()) { error.value = 'Title is required.'; return; }
  if (!coverUrl.value) { error.value = 'Cover image is required.'; return; }

  // Drop empty blocks
  const clean = blocks.value.filter((b) =>
    b.type === 'text' ? (b.content || '').trim() : !!b.url
  );
  if (clean.length === 0) { error.value = 'Add at least one content block.'; return; }

  saving.value = true;
  try {
    await newsService.createNews({
      title: title.value.trim(),
      cover_image_url: coverUrl.value,
      content: clean,
    });
    router.push('/news');
  } catch (err: any) {
    error.value =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      'Failed to publish article.';
  } finally {
    saving.value = false;
  }
}

function cancel() {
  router.push('/news');
}
</script>

<style scoped>
.news-content { --background: #f4f5f8; }

.create-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 1rem 0.5rem 3rem;
}

.page-title { font-size: 1.4rem; font-weight: 700; color: #1f2937; margin: 0 0 1rem; }

.field {
  background: white;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  margin-bottom: 1rem;
}

.field > label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.cover-preview,
.block-preview {
  display: block;
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  margin-top: 8px;
  object-fit: cover;
}

.block-item {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  background: #f9fafb;
}

.block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.block-type {
  font-size: 0.75rem;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.block-actions { display: flex; gap: 0; }

.style-row { margin-bottom: 8px; }

.style-select {
  --padding-top: 6px;
  --padding-bottom: 6px;
  --padding-start: 10px;
  font-size: 0.85rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  max-width: 180px;
}

.commentary-input {
  --padding-start: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  margin-top: 8px;
}

.add-block-buttons {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.error-text { color: #dc2626; font-size: 0.9rem; margin: 8px 0; }

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 1rem;
}

.hint { font-size: 0.8rem; color: #6b7280; margin: 4px 0 0; }
</style>