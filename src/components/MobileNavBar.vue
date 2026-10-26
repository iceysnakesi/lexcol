<template>
  <ion-tab-bar slot="bottom" class="mobile-bottom-bar">
    <ion-tab-button tab="forum" href="/forum">
      <ion-icon :icon="chatbubblesOutline"></ion-icon>
      <ion-label>Forum</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="chat" href="/chat">
      <ion-icon :icon="chatboxEllipsesOutline"></ion-icon>
      <ion-label>Chat</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="videos" href="/videos">
      <ion-icon :icon="logoYoutube"></ion-icon>
      <ion-label>Videos</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="news" href="/news">
      <ion-icon :icon="newspaperOutline"></ion-icon>
      <ion-label>News</ion-label>
    </ion-tab-button>
  </ion-tab-bar>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/vue';
import { 
  chatbubblesOutline, chatboxEllipsesOutline, 
  logoYoutube, newspaperOutline 
} from 'ionicons/icons';
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