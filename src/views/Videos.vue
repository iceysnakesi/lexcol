<template>
  <ion-page>
    <ion-content class="ion-padding videos-content">
      <div class="videos-container">

        <!-- Header row -->
        <div class="videos-header">
          <h1 class="page-title">Videos</h1>
          <ion-button
            v-if="isAdmin"
            size="small"
            fill="outline"
            @click="showAddForm = !showAddForm"
          >
            <ion-icon slot="start" :icon="addOutline"></ion-icon>
            {{ showAddForm ? 'Close' : 'Add Video' }}
          </ion-button>
        </div>

        <!-- Admin add form -->
        <div v-if="isAdmin && showAddForm" class="add-video-card">
          <h3>Add a video</h3>
          <ion-item class="custom-item" lines="none">
            <ion-input
              v-model="newVideoUrl"
              label="YouTube URL (full video)"
              label-placement="stacked"
              placeholder="https://www.youtube.com/watch?v=..."
            ></ion-input>
          </ion-item>
          <ion-item class="custom-item" lines="none">
            <ion-input
              v-model="newPreviewUrl"
              label="Preview URL (optional, for free users)"
              label-placement="stacked"
              placeholder="https://www.youtube.com/watch?v=..."
            ></ion-input>
          </ion-item>
          <p v-if="addError" class="error-text">{{ addError }}</p>
          <div class="add-actions">
            <ion-button fill="clear" @click="cancelAdd">Cancel</ion-button>
            <ion-button :disabled="adding" @click="handleAddVideo">
              <ion-spinner v-if="adding" name="crescent" />
              <span v-else>Add</span>
            </ion-button>
          </div>
        </div>

        <!-- Channel filter tabs -->
        <div v-if="channels.length > 0" class="channel-tabs">
          <button
            :class="['channel-tab', { active: activeChannel === '' }]"
            @click="selectChannel('')"
          >All</button>
          <button
            v-for="ch in channels"
            :key="ch.channel_id"
            :class="['channel-tab', { active: activeChannel === ch.channel_id }]"
            @click="selectChannel(ch.channel_id)"
          >{{ ch.channel_name }}</button>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="loading-state">
          <ion-spinner name="crescent"></ion-spinner>
        </div>

        <!-- Grid -->
        <div v-else-if="videos.length > 0" class="video-grid">
          <div v-for="video in videos" :key="video.id" class="video-card">
            <div
              class="thumbnail-wrapper"
              @mouseenter="onHoverStart(video)"
              @mouseleave="onHoverEnd"
              @click="openPlayer(video)"
            >
              <img
                v-if="hoveredId !== video.id"
                :src="video.thumbnail_url || ''"
                :alt="video.title"
                loading="lazy"
              />
              <iframe
                v-else
                :src="hoverSrc(video)"
                frameborder="0"
                allow="autoplay; encrypted-media"
                referrerpolicy="strict-origin-when-cross-origin"
              ></iframe>
              <div v-if="video.duration_seconds" class="duration-badge">
                {{ formatDuration(video.duration_seconds) }}
              </div>
            </div>

            <div class="video-info">
              <h3 class="video-title">{{ video.title }}</h3>
              <p class="video-meta">
                <span class="channel-name">{{ video.channel_name }}</span>
                <span v-if="video.published_at"> · {{ formatDate(video.published_at) }}</span>
              </p>
            </div>

            <div v-if="isAdmin" class="admin-actions">
              <ion-button
                size="small"
                fill="clear"
                :color="video.is_hidden ? 'success' : 'warning'"
                @click.stop="toggleVideoVisibility(video.id)"
              >
                {{ video.is_hidden ? 'Show' : 'Hide' }}
              </ion-button>
              <ion-button
                size="small"
                fill="clear"
                color="danger"
                @click.stop="deleteVideo(video.id)"
              >
                Delete
              </ion-button>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <p>No videos yet. Check back later.</p>
        </div>

        <!-- Pagination -->
        <Pagination
          v-if="totalPages > 1"
          v-model:current-page="currentPage"
          :total-pages="totalPages"
        />
      </div>
    </ion-content>

        <!-- Player modal -->
    <ion-modal :is-open="playerOpen" @didDismiss="closePlayer">
      <ion-content>
        <div class="player-container">
          <div class="player-top-bar">
            <ion-button fill="clear" @click="closePlayer" class="close-btn">
              <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
            </ion-button>
          </div>

          <div v-if="playLoading" class="loading-state">
            <ion-spinner name="crescent"></ion-spinner>
          </div>

          <template v-else-if="playInfo">
            <!-- Genuine load failure -->
            <div v-if="playInfo.mode === 'error'" class="locked-message">
              <p>Could not load this video. Please try again.</p>
            </div>

            <!-- Locked (no preview available) -->
            <div v-else-if="playInfo.mode === 'locked'" class="locked-message">
              <template v-if="!authStore.isAuthenticated">
                <p>Log in or create an account to watch this video.</p>
                <ion-button fill="outline" @click="goToLogin">Log in</ion-button>
              </template>
              <template v-else>
                <p>This video is available to Pro members only.</p>
              </template>
            </div>

            <!-- Playing (full or preview) -->
            <div v-else class="player-content">
              <div class="player-frame">
                <iframe
                  :src="embedSrc"
                  frameborder="0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>

              <div class="player-info">
                <h2 class="player-title">{{ activeVideo?.title }}</h2>
                <p class="player-meta">
                  <span class="player-channel">{{ activeVideo?.channel_name }}</span>
                  <span v-if="activeVideo?.published_at"> · {{ formatDate(activeVideo.published_at) }}</span>
                </p>
                <p v-if="playInfo.mode === 'preview'" class="preview-note">
                  <template v-if="!authStore.isAuthenticated">
                    Preview — <router-link to="/register">sign up</router-link>
                    or <router-link to="/login">log in</router-link> to see more.
                  </template>
                  <template v-else>
                    Preview — upgrade to Pro to watch the full video.
                  </template>
                </p>
              </div>
            </div>
          </template>
        </div>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import {
  IonPage, IonContent, IonButton, IonIcon, IonSpinner,
  IonItem, IonInput, IonModal, onIonViewWillEnter,
} from '@ionic/vue';
import { addOutline, closeOutline } from 'ionicons/icons';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import Pagination from '@/components/Pagination.vue';
import { videoService, type VideoSummary, type PlayInfo } from '@/services/videoService';

const authStore = useAuthStore();
const router = useRouter();

const isAdmin = computed(() => authStore.user?.role === 'admin');

// Breakpoint-driven page size
const isDesktop = ref(window.matchMedia('(min-width: 768px)').matches);
const pageSize  = computed(() => (isDesktop.value ? 9 : 8));

const videos       = ref<VideoSummary[]>([]);
const channels     = ref<{ channel_id: string; channel_name: string }[]>([]);
const activeChannel = ref('');
const currentPage  = ref(1);
const totalPages   = ref(1);
const loading      = ref(true);

// Hover preview
const hoveredId = ref<number | null>(null);
let hoverTimer: ReturnType<typeof setTimeout> | null = null;

// Player modal
const playerOpen   = ref(false);
const activeVideo  = ref<VideoSummary | null>(null);
const playInfo     = ref<PlayInfo | null>(null);
const playLoading  = ref(false);

// Admin add form
const showAddForm      = ref(false);
const newVideoUrl      = ref('');
const newPreviewUrl    = ref('');
const adding           = ref(false);
const addError         = ref<string | null>(null);

let mql: MediaQueryList | null = null;

onMounted(() => {
  mql = window.matchMedia('(min-width: 768px)');
  mql.addEventListener('change', onBreakpointChange);
});

onUnmounted(() => {
  mql?.removeEventListener('change', onBreakpointChange);
  if (hoverTimer) clearTimeout(hoverTimer);
});

function onBreakpointChange(e: MediaQueryListEvent) {
  isDesktop.value = e.matches;
  currentPage.value = 1;
  loadVideos();
}

onIonViewWillEnter(() => {
  loadVideos();
  if (channels.value.length === 0) loadChannels();
});

async function loadVideos() {
  loading.value = true;
  try {
    const data = await videoService.getVideos(
      currentPage.value, pageSize.value, activeChannel.value
    );
    videos.value = data.videos;
    totalPages.value = data.totalPages;
  } catch (err) {
    console.error('Failed to load videos:', err);
  } finally {
    loading.value = false;
  }
}

async function loadChannels() {
  try {
    channels.value = await videoService.getChannels();
  } catch (err) {
    console.error('Failed to load channels:', err);
  }
}

function selectChannel(id: string) {
  if (activeChannel.value === id) return;
  activeChannel.value = id;
  currentPage.value = 1;
  loadVideos();
}

function onHoverStart(video: VideoSummary) {
  if (!isDesktop.value) return;
  if (!video.preview_youtube_id) return;   // nothing to preview
  if (hoverTimer) clearTimeout(hoverTimer);
  hoverTimer = setTimeout(() => {
    hoveredId.value = video.id;
  }, 400);
}

function onHoverEnd() {
  if (hoverTimer) clearTimeout(hoverTimer);
  hoveredId.value = null;
}

function hoverSrc(video: VideoSummary) {
  const id = video.preview_youtube_id;
  if (!id) return '';
  const base = `https://www.youtube.com/embed/${id}?`;
  return base + [
    'autoplay=1', 'mute=1', 'controls=0', 'loop=1',
    `playlist=${id}`, 'playsinline=1',
    'start=5', 'end=15',
  ].join('&');
}

async function openPlayer(video: VideoSummary) {
  activeVideo.value = video;
  playInfo.value = null;
  playerOpen.value = true;
  playLoading.value = true;

  try {
    playInfo.value = await videoService.getPlayInfo(video.id);
  } catch (err) {
    console.error('Failed to load play info:', err);
    playInfo.value = { mode: 'error' };
  } finally {
    playLoading.value = false;
  }
}

function goToLogin() {
  closePlayer();
  router.push('/login');
}

function closePlayer() {
  playerOpen.value = false;
  activeVideo.value = null;
  playInfo.value = null;
}

const embedSrc = computed(() => {
  if (!playInfo.value || playInfo.value.mode === 'locked' || !playInfo.value.youtube_id) {
    return '';
  }
  const id = playInfo.value.youtube_id;
  const base = `https://www.youtube.com/embed/${id}?`;

  if (playInfo.value.mode === 'preview') {
    // Preview is a separate short video — play it in full
    return base + 'autoplay=1&rel=0&modestbranding=1';
  }

  // Full playback — normal controls
  return base + 'autoplay=1&rel=0&modestbranding=1';
});

// --- Admin actions ---
async function handleAddVideo() {
  addError.value = null;
  if (!newVideoUrl.value.trim()) {
    addError.value = 'A YouTube URL is required.';
    return;
  }

  adding.value = true;
  try {
        await videoService.addVideo({
      youtube_url: newVideoUrl.value.trim(),
      preview_youtube_url: newPreviewUrl.value.trim() || undefined,
    });
    newVideoUrl.value = '';
    newPreviewUrl.value = '';
    showAddForm.value = false;
    currentPage.value = 1;
    await loadVideos();
    await loadChannels();
  } catch (err: any) {
    addError.value =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      'Failed to add video.';
  } finally {
    adding.value = false;
  }
}

function cancelAdd() {
  showAddForm.value = false;
  addError.value = null;
}

async function toggleVideoVisibility(id: number) {
  try {
    await videoService.toggleVisibility(id);
    await loadVideos();
  } catch (err) {
    console.error('Failed to toggle video:', err);
  }
}

async function deleteVideo(id: number) {
  if (!confirm('Delete this video permanently?')) return;
  try {
    await videoService.deleteVideo(id);
    await loadVideos();
  } catch (err) {
    console.error('Failed to delete video:', err);
  }
}

// --- Formatting ---
function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}
</script>

<style scoped>
.videos-content { --background: #f4f5f8; }

.videos-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1rem 2rem;
  box-sizing: border-box;
}

.videos-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.page-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

/* Grid */
.video-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 1rem;
}

@media (min-width: 768px) {
    .videos-container { padding: 2rem 2rem 3rem; }
  .page-title { font-size: 1.8rem; }
  .video-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}

/* Card */
.video-card {
  background: white;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
}

.thumbnail-wrapper {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #000;
  cursor: pointer;
  overflow: hidden;
}

.thumbnail-wrapper img,
.thumbnail-wrapper iframe {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: none;
  display: block;
}

.duration-badge {
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  pointer-events: none;
}

.video-info {
  padding: 10px 12px;
  flex: 1;
}

.video-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-meta {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
}

.channel-name { font-weight: 500; }

.admin-actions {
  display: flex;
  justify-content: flex-end;
  gap: 2px;
  padding: 0 8px 8px;
  border-top: 1px solid #f3f4f6;
}

/* Channel tabs */
.channel-tabs {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 4px;
  margin-bottom: 0.5rem;
  scrollbar-width: none;
}
.channel-tabs::-webkit-scrollbar { display: none; }

.channel-tab {
  flex-shrink: 0;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 0.8rem;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.15s;
}
.channel-tab:hover { background: #f3f4f6; }
.channel-tab.active {
  background: var(--ion-color-primary, #3880ff);
  color: white;
  border-color: var(--ion-color-primary, #3880ff);
}

/* Add form */
.add-video-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 1rem;
}
.add-video-card h3 {
  margin: 0 0 12px;
  font-size: 1rem;
  color: #1f2937;
}
.custom-item {
  margin-bottom: 10px;
  --background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 2px 8px;
}
.add-actions {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 8px;
}
.error-text {
  color: #dc2626;
  font-size: 0.85rem;
  margin: 4px 0;
}

/* Loading */
.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  width: 100%;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

/* Player modal */
.player-container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background: #0f0f0f;
}

.player-top-bar {
  display: flex;
  justify-content: flex-end;
  padding: 8px;
}

.close-btn {
  --color: white;
  --background: rgba(255, 255, 255, 0.1);
  --border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 0;
}

.player-content {
  display: flex;
  flex-direction: column;
}

.player-frame {
  padding: 8px 16px 0;
}

.player-frame iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  border: none;
  display: block;
}

.player-info {
  padding: 16px 20px 28px;
}

.player-title {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.35;
  color: white;
  margin: 0 0 8px;
  overflow-wrap: anywhere;
}

.player-meta {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 12px;
}

.player-channel {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.preview-note {
  margin: 12px 0 0;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.05);
  border-left: 3px solid #42b983;
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.85rem;
  line-height: 1.5;
}

.preview-note a {
  color: #42b983;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .player-frame {
    padding: 0;
  }
  .player-frame iframe {
    border-radius: 0;
  }
  .player-info {
    padding: 16px;
  }
}

.locked-message {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 3rem 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.75);
  font-size: 1rem;
}
</style>