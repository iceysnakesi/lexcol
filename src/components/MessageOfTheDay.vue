<template>
  <div class="motd-banner">
    <div class="motd-inner">
      <ion-icon :icon="greetingIcon" class="motd-icon" />
      <div class="motd-content">
        <p class="motd-greeting">{{ greetingText }}</p>
        <p class="motd-datetime">{{ formattedDateTime }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { IonIcon } from '@ionic/vue';
import { sunnyOutline, partlySunnyOutline, moonOutline } from 'ionicons/icons';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

// Recompute every minute so a stale greeting doesn't survive 11:59 → 12:01
const now = ref(new Date());
let ticker: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  ticker = setInterval(() => { now.value = new Date(); }, 60_000);
});

onUnmounted(() => {
  if (ticker) clearInterval(ticker);
});

const hour = computed(() => now.value.getHours());

const greetingWord = computed(() => {
  const h = hour.value;
  if (h >= 5 && h < 12) return 'Good morning';
  if (h >= 12 && h < 18) return 'Good afternoon';
  return 'Good evening';
});

const greetingIcon = computed(() => {
  const h = hour.value;
  if (h >= 5 && h < 12) return sunnyOutline;
  if (h >= 12 && h < 18) return partlySunnyOutline;
  return moonOutline;
});

const firstName = computed(() => {
  const n = authStore.user?.name?.trim();
  if (!n) return null;
  return n.split(/\s+/)[0];   // "Juan Pérez" → "Juan"
});

const greetingText = computed(() =>
  firstName.value
    ? `${greetingWord.value}, ${firstName.value}!`
    : `${greetingWord.value}!`
);

const formattedDateTime = computed(() => {
  const d = now.value;
  const date = d.toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const time = d.toLocaleTimeString(undefined, {
    hour: 'numeric', minute: '2-digit',
  });
  return `${date} · ${time}`;
});
</script>

<style scoped>
/* Outer — stretches edge-to-edge, no radius, no shadow */
.motd-banner {
  width: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2b2b2b 100%);
  color: white;
  border-radius: 0;
  margin: 0;
  box-shadow: none;
}

/* Inner — content stays aligned with the news column below */
.motd-inner {
  display: flex;
  align-items: center;
  gap: 14px;
  max-width: 680px;
  margin: 0 auto;
  padding: 16px 1rem;
}

.motd-icon {
  font-size: 2rem;
  color: #42b983;
  flex-shrink: 0;
}

.motd-content {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.motd-greeting {
  margin: 0 0 4px;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  line-height: 1.3;
  overflow-wrap: anywhere;
}

.motd-datetime {
  margin: 0;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.4;
}

@media (max-width: 480px) {
  .motd-inner { padding: 14px 1rem; gap: 12px; }
  .motd-icon { font-size: 1.7rem; }
  .motd-greeting { font-size: 1rem; }
  .motd-datetime { font-size: 0.75rem; }
}
</style>