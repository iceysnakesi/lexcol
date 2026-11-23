<template>
  <ion-page class="chat-page">
    <!-- Desktop header (auto-hides below 768px) -->
    <PageHeader />

    <!-- Web-only chat menu (top-left, below header) -->
        <ChatbotWebMenu
      :saved-chats="savedChats"
      @new="newChat"
      @select="selectChat"
      @delete="deleteChat"
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
              <!-- Change this line -->
              <p>{{ chat.last_message || 'No messages yet' }}</p>
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
    <div id="chat-main-content" class="chat-layout">
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
              v-for="(msg, index) in messages"
              :key="msg.id"
              :class="['message-row', msg.role]"
            >
              <!-- INLINE EDIT MODE (Only shows for the message being edited) -->
              <template v-if="editingMessageId === msg.id">
                <div class="inline-edit-wrapper">
                  <ion-textarea
  v-model="editDraftContent"
  :auto-grow="false"
  :rows="1"
  class="inline-edit-textarea"
/>
                  <div class="inline-edit-actions">
                    <ion-button size="small" fill="clear" @click="cancelEdit">Cancel</ion-button>
                    <ion-button size="small" color="dark" @click="saveEdit(index)">Save</ion-button>
                  </div>
                </div>
              </template>

              <!-- NORMAL MODE -->
              <template v-else>
                <!-- Edit Button (Only on the last user message) -->
                <ion-button
                  v-if="msg.role === 'user' && index === messages.map(m => m.role).lastIndexOf('user') && !sending"
                  fill="clear"
                  size="small"
                  class="msg-action-btn"
                  @click="startEdit(msg)"
                >
                  <ion-icon :icon="pencilOutline" />
                </ion-button>

                <div class="message-bubble">{{ msg.content }}</div>

                <!-- Regenerate Button -->
                <ion-button
                  v-if="msg.role === 'assistant' && index === messages.length - 1 && !sending"
                  fill="clear"
                  size="small"
                  class="msg-action-btn"
                  @click="regenerateAnswer"
                >
                  <ion-icon :icon="refreshOutline" />
                </ion-button>
              </template>
            </div>

            <!-- Typing Indicator -->
            <div v-if="sending && editingMessageId === null" class="message-row assistant">
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
import { chatbubblesOutline, addOutline, arrowBackOutline, sendOutline, pencilOutline, refreshOutline, trashOutline } from 'ionicons/icons';
import PageHeader from '@/components/PageHeader.vue';
import ChatbotWebMenu from '@/components/ChatbotWebMenu.vue';
import { chatbotService, type SavedChat, type ChatMessageResponse } from '@/services/chatbotService';import { onIonViewWillEnter } from '@ionic/vue';


interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const router = useRouter();

const messages = ref<ChatMessage[]>([]);
const input = ref('');
const sending = ref(false);
const contentRef = ref<HTMLIonContentElement>();
const savedChats = ref<SavedChat[]>([]);
const currentChatId = ref<number | null>(null);
  const editingMessageId = ref<string | null>(null);
const editDraftContent = ref('');

let msgCounter = 0;
function nextId(): string {
  return `msg-${++msgCounter}-${Date.now()}`;
}

onIonViewWillEnter(async () => {
  try {
    savedChats.value = await chatbotService.getChats();
  } catch (err) {
    console.error('Failed to load chats:', err);
  }
});

function startEdit(msg: any) {
  if (sending.value) return;
  editingMessageId.value = msg.id;
  editDraftContent.value = msg.content;
}

function cancelEdit() {
  editingMessageId.value = null;
  editDraftContent.value = '';
}

async function saveEdit(index: number) {
  const text = editDraftContent.value.trim();
  if (!text) return;

  // Update the text in the UI immediately
  const msgToEdit = messages.value[index];
  if (msgToEdit) {
    msgToEdit.content = text;
  }
  
  // Remove any AI responses that came after this message (since the context changed)
  messages.value = messages.value.slice(0, index + 1);
  
  cancelEdit();
  sending.value = true;
  await scrollToBottom();

  try {
    // Send to backend with isEdit: true
    const response = await chatbotService.sendMessage(text, currentChatId.value, true);
    messages.value.push({ id: nextId(), role: 'assistant', content: response.reply });
  } catch (error: any) {
    messages.value.push({
      id: nextId(),
      role: 'assistant',
      content: error.response?.data?.error || 'Sorry, an error occurred.',
    });
  } finally {
    sending.value = false;
    await scrollToBottom();
  }
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text || sending.value) return;

  // Add the new (or edited) message to the UI
  messages.value.push({ id: nextId(), role: 'user', content: text });
  input.value = '';
  sending.value = true;
  await scrollToBottom();

  try {
    const response = await chatbotService.sendMessage(text, currentChatId.value);
    
    if (!currentChatId.value) {
      currentChatId.value = response.chatId;
      savedChats.value = await chatbotService.getChats();
    }

    messages.value.push({ id: nextId(), role: 'assistant', content: response.reply });
  } catch (error: any) {
    console.error('Chat error:', error);
    messages.value.push({
      id: nextId(),
      role: 'assistant',
      content: error.response?.data?.error || 'Sorry, I encountered an error. Please try again.',
    });
  } finally {
    sending.value = false;
    await scrollToBottom();
  }
}

async function regenerateAnswer() {
  if (sending.value || !currentChatId.value) return;

  // Remove the last AI message from the UI so we can show the typing indicator
  if (messages.value[messages.value.length - 1]?.role === 'assistant') {
    messages.value.pop();
  }

  sending.value = true;
  await scrollToBottom();

  try {
    const response = await chatbotService.regenerate(currentChatId.value);
    messages.value.push({ id: nextId(), role: 'assistant', content: response.reply });
  } catch (error: any) {
    messages.value.push({
      id: nextId(),
      role: 'assistant',
      content: error.response?.data?.error || 'Failed to regenerate answer.',
    });
  } finally {
    sending.value = false;
    await scrollToBottom();
  }
}

async function selectChat(id: number) {
  if (sending.value) return;
  menuController.close('chat-menu');
  
  try {
    // Fetch messages for this chat
    const history = await chatbotService.getChatMessages(id);
    
    // Clear current UI and load the historical messages
    messages.value = history.map((msg: ChatMessageResponse) => ({
      id: nextId(),
      role: msg.role,
      content: msg.content
    }));
    
    currentChatId.value = id;
    await scrollToBottom();
  } catch (err) {
    console.error('Failed to load chat messages:', err);
  }
}

function newChat() {
  messages.value = [];
  currentChatId.value = null; // Reset the ID so the next message creates a new chat
  input.value = '';
  menuController.close('chat-menu');
}

async function deleteChat(id: number) {
  if (!confirm('Are you sure you want to delete this conversation? This cannot be undone.')) {
    return;
  }

  try {
    await chatbotService.deleteChat(id);
    
    // Remove from list
    savedChats.value = savedChats.value.filter(c => c.id !== id);
    
    // If the deleted chat was the one currently open, reset the view
    if (currentChatId.value === id) {
      newChat();
    }
  } catch (err) {
    console.error('Failed to delete chat:', err);
  }
}

async function scrollToBottom() {
  await nextTick();
  const el = (contentRef.value as any)?.$el || contentRef.value; 
  if (el && typeof el.scrollToBottom === 'function') {
    await el.scrollToBottom(250);
  }
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

.chat-toolbar ion-menu-button::part(native) {
  outline: none;
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

.message-row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

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

/* ---- Action Buttons (Edit / Regenerate) ---- */
.msg-action-btn {
  --padding-start: 6px;
  --padding-end: 6px;
  height: 32px;
  margin: 0;
  opacity: 0.4;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
}

.msg-action-btn:hover {
  opacity: 1;
}

.msg-action-btn ion-icon {
  font-size: 18px;
  color: #6b7280;
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
  align-items: center;
  gap: 6px;
  max-width: 720px;
  margin: 0 auto;
  padding: 4px 4px 4px 14px;
  border: 1px solid #d1d5db;
  border-radius: 22px;
  background: #f9fafb;
  min-height: 44px;
}

.chat-input {
  flex: 1;
  min-width: 0;

  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 8px;
  --padding-bottom: 8px;

  --background: transparent;
  --color: #1f2937;

  --highlight-color-focused: transparent;
  --highlight-color: transparent;

  font-size: 0.95rem;
  min-height: 20px;
  max-height: 100px;
}

.chat-input::part(native) {
  border: none;
  outline: none;
  box-shadow: none;

  background: transparent;
  caret-color: #1f2937;
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
  font-size: 20px;
}

/* ---- Inline Edit Mode ---- */
.inline-edit-wrapper {
  width: fit-content;
  max-width: 75%;
  min-width: 0;

  display: flex;
  flex-direction: column;

  background: #1a1a1a;
  border-radius: 16px;
  border-bottom-right-radius: 4px;

  padding: 10px 14px;
  box-sizing: border-box;
}

.inline-edit-textarea {
  width: 100%;
  min-width: 0;
  margin: 0;

  --background: transparent;
  --color: white;
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0px;
  --min-height: 24px;

  font-size: 0.95rem;
  line-height: 1.5;
  --highlight-color-focused: transparent;
--highlight-color: transparent;
}

/* Force inner parts of the textarea to shrink and hide borders */
.inline-edit-textarea::part(container) {
  background: transparent !important;
  border: none !important;
}

ion-textarea.inline-edit-textarea::part(native) {
  height: 24px !important;
  min-height: 24px !important;
  max-height: 24px !important;
  box-sizing: border-box !important;
}

.inline-edit-textarea::part(native):focus {
  outline: none;
  box-shadow: none;
  caret-color: white;
}

.inline-edit-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
}

.inline-edit-actions ion-button {
  --padding-start: 8px;
  --padding-end: 8px;
  height: 26px;
  margin: 0;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.inline-edit-actions ion-button[fill="clear"] {
  --color: #9ca3af;
}

.inline-edit-actions ion-button[color="dark"] {
  --background: #374151;
  --color: white;
  --border-radius: 4px;
}

/* ---- Menu (mobile) ---- */
.menu-empty {
  padding: 16px;
  text-align: center;
  color: #9ca3af;
  font-size: 0.85rem;
}

.menu-empty p { 
  margin: 0; 
}

/* ---- Mobile tweaks ---- */
@media (max-width: 768px) {
  /* Make action buttons slightly more visible on touch devices */
  .msg-action-btn {
    opacity: 0.8; 
  }
}

@media (max-width: 480px) {
  .messages-container { 
    padding: 1rem 0.75rem; 
  }
  
  .message-bubble { 
    max-width: 85%; 
  }

  .input-bar {
    padding: 6px 12px;
    padding-bottom: max(6px, env(safe-area-inset-bottom));
  }

  .input-wrapper {
    padding: 4px 4px 4px 12px;
  }
}
</style>