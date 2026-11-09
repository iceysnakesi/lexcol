<template>
  <div class="web-menu-trigger">
    <ion-button
      class="menu-trigger-btn"
      @click="openMenu"
      aria-label="Chat options"
    >
      <ion-icon slot="icon-only" :icon="menuOutline" />
    </ion-button>
  </div>

  <ion-menu
    content-id="chat-main-content"
    menu-id="chat-web-menu"
    side="start"
  >
    <ion-header>
      <ion-toolbar class="menu-toolbar">
        <ion-title>Chat</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list lines="none">
        <ion-list-header>
          <ion-label>Conversations</ion-label>
        </ion-list-header>

        <div v-if="savedChats.length === 0" class="menu-empty">
          <p>No conversations yet</p>
        </div>

        <ion-item
          v-for="chat in savedChats"
          :key="chat.id"
          button
          @click="handleSelect(chat.id)"
        >
          <ion-icon slot="start" :icon="chatbubblesOutline" />
          <ion-label>
            <h3>{{ chat.title }}</h3>
            <p>{{ chat.lastMessage }}</p>
          </ion-label>
        </ion-item>

        <ion-item-divider />

        <ion-item button @click="handleNew">
          <ion-icon slot="start" :icon="addOutline" />
          <ion-label>New chat</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script setup lang="ts">
import {
  IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonListHeader, IonItem, IonItemDivider, IonLabel, IonIcon, IonButton,
  menuController,
} from '@ionic/vue';
import { menuOutline, addOutline, chatbubblesOutline } from 'ionicons/icons';

interface SavedChat {
  id: string;
  title: string;
  lastMessage: string;
}

defineProps<{ savedChats: SavedChat[] }>();

const emit = defineEmits<{
  (e: 'new'): void;
  (e: 'select', id: string): void;
}>();

const MENU_ID = 'chat-web-menu';

function openMenu() {
  menuController.open(MENU_ID);
}

function handleNew() {
  menuController.close(MENU_ID);
  emit('new');
}

function handleSelect(id: string) {
  menuController.close(MENU_ID);
  emit('select', id);
}
</script>

<style scoped>
/* Trigger — fixed pill at top-left, desktop only */
.web-menu-trigger {
  display: none;
}

@media (min-width: 768px) {
  .web-menu-trigger {
    display: block;
    position: fixed;
    top: 68px;   /* PageHeader 56px + 12px gap */
    left: 16px;
    z-index: 100;
  }
}

.menu-trigger-btn {
  --background: transparent;
  --background-hover: transparent;
  --background-focused: transparent;
  --background-activated: transparent;
  --color: white;
  --border-radius: 50%;
  --padding-start: 0;
  --padding-end: 0;
  width: 44px;
  height: 44px;
  margin: 0;
  background: transparent;
}

/* Force the native button to be the dark circle and kill all outlines/squares */
.menu-trigger-btn::part(native) {
  background: #1a1a1a !important;
  border-radius: 50% !important;
  outline: none !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.menu-trigger-btn::part(native):hover {
  background: #2b2b2b !important;
}

.menu-trigger-btn ion-icon {
  font-size: 22px;
}

/* Menu chrome */
.menu-toolbar {
  --background: #1a1a1a;
  --color: white;
  --min-height: 56px;
  --box-shadow: none;
}

.menu-toolbar ion-title {
  color: white;
  font-weight: 600;
}

.menu-empty {
  padding: 16px;
  text-align: center;
  color: #9ca3af;
  font-size: 0.85rem;
}

.menu-empty p {
  margin: 0;
}
</style>