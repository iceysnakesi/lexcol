<template>
  <ion-page>
    <PageHeader />
    
    <ion-content class="main-content">
      <ion-router-outlet />
    </ion-content>
    
    <PageFooter />

    <!-- Modular Mobile Navigation Bar -->
    <MobileNavBar />
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonRouterOutlet } from '@ionic/vue';
import PageHeader from '@/components/PageHeader.vue';
import PageFooter from '@/components/PageFooter.vue';
import MobileNavBar from '@/components/MobileNavBar.vue';
</script>

<style scoped>
.main-content {
  --background: #f4f6f8;
}
</style>