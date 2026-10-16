<template>
  <footer class="page-footer">
    <p>&copy; {{ currentYear }} lexcol. All rights reserved.</p>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.page-footer {
  text-align: center;
  padding: 1.5rem;
  background-color: #f5f5f5;
  color: #333;
  margin-top: auto;
}
</style>
