<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="dashboard">
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard!</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
</script>

<style scoped>
.dashboard {
  padding: 1rem;
}
</style>