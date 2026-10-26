<template>
  <ion-footer>
    <ion-toolbar class="footer-toolbar">
      <p class="footer-text">&copy; {{ currentYear }} lexcol. All rights reserved.</p>
    </ion-toolbar>
  </ion-footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonFooter, IonToolbar } from '@ionic/vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer-toolbar {
  --background: #f5f5f5;
  --color: #333;
  text-align: center;
}

.footer-text {
  width: 100%;
  margin: 0;
  font-size: 0.9rem;
}
</style>