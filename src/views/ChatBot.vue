<template>
  <ion-page class="chat-page">
    <!-- Desktop header (auto-hides below 768px) -->
    <PageHeader />

    <!-- Web-only chat menu (top-left, below header) -->
    <ChatbotWebMenu
      :saved-chats="savedChats"
      @new="newChat"
      @select="selectChat"
    />

    <!-- Mobile slide menu -->
        <ion-menu content-id="chat-main-content" side="start" menu-id="chat-menu">
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
            @click="selectChat(chat.id)"
          >
            <ion-icon slot="start" :icon="chatbubblesOutline"></ion-icon>
            <ion-label>
              <h3>{{ chat.title }}</h3>
              <p>{{ chat.lastMessage }}</p>
            </ion-label>
          </ion-item>

          <ion-item-divider></ion-item-divider>

          <ion-item button @click="newChat">
            <ion-icon slot="start" :icon="addOutline"></ion-icon>
            <ion-label>New chat</ion-label>
          </ion-item>

          <ion-item button @click="returnToLexcol">
            <ion-icon slot="start" :icon="arrowBackOutline"></ion-icon>
            <ion-label>Return to Lexcol</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <!-- Chat layout -->
    <div id="chat-main-content" class="ion-page chat-layout">
      <!-- Mobile-only chat header -->
      <ion-header class="mobile-chat-header">
        <ion-toolbar class="chat-toolbar">
          <ion-buttons slot="start">
            <ion-menu-button menu="chat-menu"></ion-menu-button>
          </ion-buttons>
          <ion-title>Lexcol Assistant</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content ref="contentRef" class="chat-content">
        <div class="messages-container">
          <div v-if="messages.length === 0" class="empty-state">
            <ion-icon :icon="chatbubblesOutline" class="empty-icon" />
            <h2>How can I help you?</h2>
            <p>Ask me anything about Lexcol.</p>
          </div>

          <div v-else class="message-list">
            <div
              v-for="msg in messages"
              :key="msg.id"
              :class="['message-row', msg.role]"
            >
              <div class="message-bubble">{{ msg.content }}</div>
            </div>

            <div v-if="sending" class="message-row assistant">
              <div class="message-bubble typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        </div>
      </ion-content>

      <!-- Compact input bar -->
      <div class="input-bar">
        <div class="input-wrapper">
          <ion-textarea
            v-model="input"
            :rows="1"
            :auto-grow="true"
            placeholder="Message Lexcol Assistant..."
            class="chat-input"
            @keydown.enter.exact.prevent="sendMessage"
          />
          <ion-button
            class="send-btn"
            :disabled="!input.trim() || sending"
            @click="sendMessage"
          >
            <ion-icon :icon="sendOutline" />
          </ion-button>
        </div>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonListHeader, IonItem, IonItemDivider, IonLabel, IonIcon,
  IonButtons, IonMenuButton, IonTextarea, IonButton, menuController,
} from '@ionic/vue';
import {
  chatbubblesOutline, addOutline, arrowBackOutline, sendOutline,
} from 'ionicons/icons';
import PageHeader from '@/components/PageHeader.vue';
import ChatbotWebMenu from '@/components/ChatbotWebMenu.vue';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface SavedChat {
  id: string;
  title: string;
  lastMessage: string;
}

const router = useRouter();

const messages = ref<ChatMessage[]>([]);
const input = ref('');
const sending = ref(false);
const contentRef = ref<HTMLIonContentElement>();

// Placeholder for future chat history from backend
const savedChats = ref<SavedChat[]>([]);

let msgCounter = 0;
function nextId(): string {
  return `msg-${++msgCounter}-${Date.now()}`;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text || sending.value) return;

  messages.value.push({ id: nextId(), role: 'user', content: text });
  input.value = '';
  sending.value = true;
  await scrollToBottom();

  // TODO: replace with actual chatbot API call
  await new Promise((r) => setTimeout(r, 700));

  messages.value.push({
    id: nextId(),
    role: 'assistant',
    content: 'The chatbot API is not connected yet. This is a placeholder response.',
  });
  sending.value = false;
  await scrollToBottom();
}

async function scrollToBottom() {
  await nextTick();
  await contentRef.value?.scrollToBottom(250);
}

function newChat() {
  messages.value = [];
  input.value = '';
  menuController.close('chat-menu');
}

function selectChat(_id: string) {
  // TODO: load this conversation's messages from the backend
  menuController.close('chat-menu');
}

function returnToLexcol() {
  menuController.close('chat-menu');
  router.push('/news');
}
</script>

<style scoped>
/* ---- Page layout ---- */
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-layout {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: #f4f5f8;
}

.chat-content {
  flex: 1;
  min-height: 0;
}

/* ---- Mobile chat header ---- */
.mobile-chat-header {
  display: block;
}

@media (min-width: 768px) {
  .mobile-chat-header {
    display: none;
  }
}

/* ---- Toolbars ---- */
.chat-toolbar,
.menu-toolbar {
  --background: #1a1a1a;
  --color: white;
  --min-height: 56px;
  --box-shadow: none;
}

.chat-toolbar ion-title,
.menu-toolbar ion-title {
  font-weight: 600;
}

.chat-toolbar ion-menu-button {
  --color: white;
}

/* ---- Messages container ---- */
.messages-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

/* ---- Empty state ---- */
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1rem;
}

.empty-icon {
  font-size: 3.5rem;
  color: #9ca3af;
  margin-bottom: 1rem;
}

.empty-state h2 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px;
}

.empty-state p {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

/* ---- Messages ---- */
.message-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message-row { display: flex; }
.message-row.user { justify-content: flex-end; }
.message-row.assistant { justify-content: flex-start; }

.message-bubble {
  max-width: 75%;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 0.95rem;
  line-height: 1.5;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.message-row.user .message-bubble {
  background: #1a1a1a;
  color: white;
  border-bottom-right-radius: 4px;
}

.message-row.assistant .message-bubble {
  background: white;
  color: #1f2937;
  border: 1px solid #e5e7eb;
  border-bottom-left-radius: 4px;
}

/* ---- Typing indicator ---- */
.typing {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 12px 14px;
}

.typing span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #9ca3af;
  animation: typingBounce 1.2s infinite;
}

.typing span:nth-child(2) { animation-delay: 0.15s; }
.typing span:nth-child(3) { animation-delay: 0.3s; }

@keyframes typingBounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30%           { transform: translateY(-4px); opacity: 1; }
}

/* ---- Compact input bar ---- */
.input-bar {
  padding: 8px 16px;
  padding-bottom: max(8px, env(safe-area-inset-bottom));
  background: white;
  border-top: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.input-wrapper {
  display: flex;
  align-items: center;             /* ← centers the button */
  gap: 6px;
  max-width: 720px;
  margin: 0 auto;
  padding: 4px 4px 4px 14px;
  border: 1px solid #d1d5db;
  border-radius: 22px;
  background: #f9fafb;
  min-height: 44px;                /* ← bar slightly taller than the button */
}

.chat-input {
  flex: 1;
  /* Let Ionic handle the internal padding. 8px top and bottom keeps the bar compact. */
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 8px;
  --padding-bottom: 8px;
  --background: transparent;
  --color: #1f2937;
  
  font-size: 0.95rem;
  min-height: 20px;
  max-height: 100px;
}

.chat-toolbar ion-menu-button::part(native) {
  outline: none;
}

.send-btn {
  --background: #1a1a1a;
  --background-hover: #2b2b2b;
  --color: white;
  --border-radius: 50%;
  --padding-start: 0;
  --padding-end: 0;
  width: 34px;
  height: 34px;
  margin: 0;
  flex-shrink: 0;
}

.send-btn ion-icon {
  font-size: 20px;                 /* ← larger, clearly visible icon */
}

/* ---- Menu (mobile) ---- */
.menu-empty {
  padding: 16px;
  text-align: center;
  color: #9ca3af;
  font-size: 0.85rem;
}

.menu-empty p { margin: 0; }

/* ---- Mobile tweaks ---- */
@media (max-width: 480px) {
  .messages-container { padding: 1rem 0.75rem; }
  .message-bubble { max-width: 85%; }

  .input-bar {
    padding: 6px 12px;
    padding-bottom: max(6px, env(safe-area-inset-bottom));
  }

  .input-wrapper {
    padding: 4px 4px 4px 12px;
  }
}
</style>