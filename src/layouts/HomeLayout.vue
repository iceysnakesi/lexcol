<template>
  <ion-page class="main-layout">
    <!-- Modular Side Menu Component -->
    <SlideMenu />

    <!-- Main App Content (Must have id="main-content") -->
    <div id="main-content" class="ion-page main-layout-wrapper">
      <PageHeader />
      <MobileHeader />
      
      <div class="outlet-container">
        <ion-router-outlet />
      </div>
      <PageFooter />
      <MobileNavBar />
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonRouterOutlet } from '@ionic/vue';
import PageHeader from '@/components/PageHeader.vue';
import MobileHeader from '@/components/MobileHeader.vue';
import MobileNavBar from '@/components/MobileNavBar.vue';
import SlideMenu from '@/components/SlideMenu.vue';
import PageFooter from '@/components/PageFooter.vue';
</script>

<style scoped>
.main-layout :deep(ion-content){
  --background: #f4f5f8;
}

.main-layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.outlet-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>