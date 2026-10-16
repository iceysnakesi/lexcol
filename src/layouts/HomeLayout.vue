<template>
  <div id="home">
    <PageHeader />
    
    <main class="main-content">
      <router-view />
    </main>
    
    <PageFooter />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
</script>

<style scoped>
#home {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
}
.main-content {
  flex: 1; 
  padding: 2rem;
}
</style>
