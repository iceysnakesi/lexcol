
<template>
  <ion-tab-bar slot="bottom" class="mobile-bottom-bar">
    <ion-tab-button
      :selected="isActive('/forum')"
      @click="navigateTo('/forum')"
    >
      <ion-icon :icon="chatbubblesOutline" />
      <ion-label>Forum</ion-label>
    </ion-tab-button>

    <ion-tab-button
      :selected="isActive('/chatbot')"
      @click="navigateTo('/chatbot')"
    >
      <ion-icon :icon="chatboxEllipsesOutline" />
      <ion-label>Chat</ion-label>
    </ion-tab-button>

    <ion-tab-button
      :selected="isActive('/videos')"
      @click="navigateTo('/videos')"
    >
      <ion-icon :icon="logoYoutube" />
      <ion-label>Videos</ion-label>
    </ion-tab-button>

    <ion-tab-button
      :selected="isActive('/news')"
      @click="navigateTo('/news')"
    >
      <ion-icon :icon="newspaperOutline" />
      <ion-label>News</ion-label>
    </ion-tab-button>
  </ion-tab-bar>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import {
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/vue';

import {
  chatbubblesOutline,
  chatboxEllipsesOutline,
  logoYoutube,
  newspaperOutline
} from 'ionicons/icons';

const router = useRouter();
const route = useRoute();

const navigateTo = (path: string) => {
  if (route.path !== path) {
    router.push(path);
  }
};

const isActive = (path: string) => route.path === path;
</script>

<style scoped>
.mobile-bottom-bar {
  display: none;
}

@media (max-width: 767px) {
  .mobile-bottom-bar {
    display: flex;
  }
}
</style>
