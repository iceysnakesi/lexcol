
<template>
  <div class="avatar-upload">
    <div class="avatar-preview">
      <img
  v-if="previewUrl || props.currentAvatar"
  :src="previewUrl || props.currentAvatar || ''"
  alt="Profile picture preview"
/>

      <div v-else class="avatar-placeholder">
        <ion-icon :icon="personOutline" />
      </div>
    </div>

    <div class="upload-controls">
      <label for="avatar-input" class="upload-label">
        Choose picture
      </label>

      <input
        id="avatar-input"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        @change="handleFileSelection"
      />

      <p class="upload-hint">
        JPEG, PNG or WebP. Maximum size: 5 MB.
      </p>

      <p v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </p>

      <button
        v-if="selectedFile"
        type="button"
        class="remove-button"
        @click="clearSelection"
      >
        Remove selection
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import { IonIcon } from '@ionic/vue';
import { personOutline } from 'ionicons/icons';

const emit = defineEmits<{
  'file-selected': [file: File | null];
}>();

const props = defineProps<{
  currentAvatar?: string | null;
}>();

const currentAvatar = computed(() => props.currentAvatar);

const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const errorMessage = ref('');

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp'
];

const handleFileSelection = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  errorMessage.value = '';

  if (!file) return;

  if (!ALLOWED_TYPES.includes(file.type)) {
    errorMessage.value = 'Please select a JPEG, PNG or WebP image.';
    input.value = '';
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    errorMessage.value = 'The image must be smaller than 5 MB.';
    input.value = '';
    return;
  }

  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }

  selectedFile.value = file;
  previewUrl.value = URL.createObjectURL(file);

  emit('file-selected', file);
};

const clearSelection = () => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }

  selectedFile.value = null;
  previewUrl.value = null;
  errorMessage.value = '';

  const input = document.getElementById(
    'avatar-input'
  ) as HTMLInputElement | null;

  if (input) input.value = '';

  emit('file-selected', null);
};

onUnmounted(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }
});
</script>

<style scoped>
.avatar-upload {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.avatar-preview {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  overflow: hidden;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #9ca3af;
  font-size: 48px;
}

.upload-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.upload-label {
  display: inline-block;
  padding: 9px 16px;
  background: var(--ion-color-primary, #3880ff);
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
}

.upload-label:hover {
  opacity: 0.9;
}

input[type="file"] {
  display: none;
}

.upload-hint {
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0;
}

.error-message {
  font-size: 0.85rem;
  color: #dc2626;
  margin: 0;
}

.remove-button {
  border: none;
  background: transparent;
  color: #dc2626;
  cursor: pointer;
  padding: 4px 0;
  font-size: 0.85rem;
}

@media (max-width: 480px) {
  .avatar-upload {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .upload-controls {
    align-items: center;
  }
}
</style>
