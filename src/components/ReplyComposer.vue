
<template>
  <div class="inline-reply-box" :class="{ 'nested-reply': nested }">
    <form @submit.prevent="$emit('submit')">
      <ion-textarea
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
        :rows="rows"
        :placeholder="placeholder"
        required
      />

      <div class="reply-form-actions">
        <ion-button
          size="small"
          type="submit"
          :disabled="submitting"
        >
          <ion-spinner v-if="submitting" name="crescent" />
          <span v-else>{{ submitLabel }}</span>
        </ion-button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {
  IonTextarea,
  IonButton,
  IonSpinner
} from '@ionic/vue';

defineProps<{
  modelValue: string;
  rows: number;
  placeholder: string;
  submitLabel: string;
  submitting: boolean;
  nested?: boolean;
}>();

defineEmits<{
  'update:modelValue': [value: string];
  submit: [];
}>();
</script>

<style scoped>
.inline-reply-box {
  background: white;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
}

.nested-reply {
  margin-top: 12px;
  background: #f9fafb;
}

.reply-form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}
</style>
