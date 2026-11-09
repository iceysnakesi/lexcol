<template>
  <ion-page>
    <ion-content class="ion-padding profile-content">
      <div class="profile-container">

        <div class="profile-card">
          <h2 class="section-title">Edit Profile</h2>

          <!-- Avatar Preview Section -->
          <div class="profile-picture-section">
  <h3>Profile Picture</h3>

  <AvatarUpload
  :current-avatar="form.avatar_url"
  @file-selected="selectedAvatar = $event"
/>
</div>

          <!-- Profile Form -->
          <form @submit.prevent="updateProfile">
            
            <div class="input-group">
              <label>Display Name</label>
              <ion-item class="custom-input-item" lines="none">
                <ion-input 
                  v-model="form.name" 
                  placeholder="Enter your name" 
                  required
                ></ion-input>
              </ion-item>
            </div>

            <div class="input-group">
              <label>Email Address <span class="readonly-badge">Read-only</span></label>
              <ion-item class="custom-input-item readonly" lines="none">
                <ion-input :value="form.email" readonly></ion-input>
              </ion-item>
            </div>

            <p class="error-msg" v-if="errorMessage">{{ errorMessage }}</p>
            <p class="success-msg" v-if="successMessage">{{ successMessage }}</p>

                        <ion-button expand="block" type="submit" :disabled="submitting" class="save-btn">
              <ion-spinner v-if="submitting" name="crescent"></ion-spinner>
              <span v-else>Save Changes</span>
            </ion-button>
          </form>
        </div>

        <!-- Membership card -->
        <div class="profile-card membership-card">
          <h2 class="section-title">Membership</h2>

          <div class="membership-status">
            <span :class="['tier-badge', tierClass]">{{ tierLabel }}</span>
            <p class="membership-message">{{ membershipMessage }}</p>
          </div>

          <p v-if="membershipError" class="error-msg">{{ membershipError }}</p>
          <p v-if="membershipSuccess" class="success-msg">{{ membershipSuccess }}</p>

          <!-- Free user: single upgrade path -->
          <div v-if="currentTier === 'free'" class="membership-actions">
            <ion-button
              expand="block"
              class="save-btn"
              :disabled="changingTier"
              @click="upgradeToPro"
            >
              <ion-spinner v-if="changingTier" name="crescent"></ion-spinner>
              <span v-else>Upgrade to Pro</span>
            </ion-button>
          </div>

          <!-- Pro / Enterprise: change plan + cancel -->
          <div v-else class="membership-actions">
            <div class="plan-selector">
              <label>Change plan</label>
              <ion-item class="custom-input-item" lines="none">
                <ion-select
                  v-model="newTier"
                  interface="popover"
                  placeholder="Select plan"
                >
                  <ion-select-option value="pro">Pro</ion-select-option>
                </ion-select>
              </ion-item>
            </div>

            <ion-button
              expand="block"
              class="save-btn"
              :disabled="changingTier || newTier === currentTier"
              @click="applyTierChange"
            >
              <ion-spinner v-if="changingTier" name="crescent"></ion-spinner>
              <span v-else>Update Plan</span>
            </ion-button>

            <ion-button
              expand="block"
              fill="outline"
              color="danger"
              :disabled="changingTier"
              @click="cancelSubscription"
            >
              Cancel Subscription
            </ion-button>
          </div>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue';
import {
  IonPage,
  IonContent,
  IonButton,
  IonSpinner,
  IonInput,
  IonItem,
  onIonViewWillEnter,
  IonSelect,
  IonSelectOption,
} from '@ionic/vue';

import { useAuthStore } from '@/stores/authStore';
import AvatarUpload from '@/components/AvatarUpload.vue';

import {
  updateProfile as updateProfileRequest,
  uploadAvatar,
  changeMembership
} from '@/services/userService';

const authStore = useAuthStore();

const selectedAvatar = ref<File | null>(null);

const form = reactive({
  name: '',
  email: '',
  avatar_url: ''
});

const submitting = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

// --- Membership ---
const currentTier = computed(() => authStore.user?.membership_tier || 'free');
const newTier = ref<string>(currentTier.value);
const changingTier = ref(false);
const membershipError = ref('');
const membershipSuccess = ref('');

const tierLabel = computed(() => {
  const t = currentTier.value;
  if (t === 'pro') return 'Pro';
  return 'Free';
});

const tierClass = computed(() => `tier-${currentTier.value}`);

const membershipMessage = computed(() => {
  const t = currentTier.value;
  if (t === 'pro') {
    return 'You have full access to all videos and Pro-only features.';
  }
  return 'You are on the Free plan. Upgrade to Pro to unlock full videos and premium features.';
});

watch(currentTier, (val) => {
  // Keep the select in sync after a successful change
  newTier.value = val;
});

// Initialize the form with the authenticated user's information.
function syncFormFromUser() {
  if (!authStore.user) return;
  form.name = authStore.user.name || '';
  form.email = authStore.user.email || '';
  form.avatar_url = authStore.user.avatar_url || '';
}

// Re-sync every time the view becomes active (Ionic caches pages)
onIonViewWillEnter(() => {
  syncFormFromUser();
});

// Also re-sync if the user object changes while the view is open
// (e.g. after a profile update or a fresh login)
watch(
  () => authStore.user,
  () => { syncFormFromUser(); },
  { immediate: true }
);

const updateProfile = async () => {
  submitting.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  let nameUpdated = false;

  try {
    const newName = form.name.trim();

    if (!newName) {
      errorMessage.value = 'Display name cannot be empty.';
      return;
    }

    const nameChanged = newName !== authStore.user?.name;
    const avatarChanged = selectedAvatar.value !== null;

    // Nothing to update.
    if (!nameChanged && !avatarChanged) {
      successMessage.value = 'No changes to save.';
      return;
    }

    // 1. Update the display name if it changed.
    if (nameChanged) {
      const response = await updateProfileRequest(newName);

      authStore.updateUser(response.user);
      form.name = response.user.name;
      nameUpdated = true;
    }

    // 2. Upload the new avatar if one was selected.
    if (selectedAvatar.value) {
      const response = await uploadAvatar(selectedAvatar.value);

      authStore.updateUser(response.user);
      form.avatar_url = response.user.avatar_url || '';

      selectedAvatar.value = null;
    }

    successMessage.value = 'Profile updated successfully!';

  } catch (error: unknown) {
    console.error('Failed to update profile:', error);

    if (nameUpdated) {
      errorMessage.value =
        'Your name was updated, but the avatar upload failed. You can try uploading it again.';
    } else {
      errorMessage.value =
        error instanceof Error
          ? error.message
          : 'Failed to update profile.';
    }

  } finally {
    submitting.value = false;
  }
};

async function upgradeToPro() {
  await performTierChange('pro');
}

async function applyTierChange() {
  if (newTier.value === currentTier.value) return;
  await performTierChange(newTier.value as 'pro');
}

async function cancelSubscription() {
  if (!confirm('Cancel your subscription? You will be moved to the Free plan and lose Pro features immediately.')) {
    return;
  }
  await performTierChange('free');
}

async function performTierChange(tier: 'free' | 'pro') {
  changingTier.value = true;
  membershipError.value = '';
  membershipSuccess.value = '';

  try {
    const response = await changeMembership(tier);

    // Swap the JWT so server-side tier checks reflect the new plan immediately
    authStore.refreshSession(response.accessToken, response.user);

    membershipSuccess.value =
      tier === 'free'
        ? 'Subscription cancelled. You are now on the Free plan.'
        : `Plan updated to ${tier === 'pro' ? 'Pro' : 'Enterprise'}.`;

    // Clear success after 3s
    setTimeout(() => { membershipSuccess.value = ''; }, 3000);
  } catch (err: any) {
    console.error('Failed to change membership:', err);
    membershipError.value =
      err?.response?.data?.message || 'Failed to update your plan. Please try again.';
  } finally {
    changingTier.value = false;
  }
}
</script>

<style scoped>
.profile-content {
  --background: #f4f5f8;
}

.profile-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem 0.5rem 2rem;
  box-sizing: border-box;
  width: 100%;
}

.nav-bar {
  margin-bottom: 1rem;
}

.back-btn {
  --color: #4b5563;
  font-weight: 500;
  padding: 0;
}

.profile-card {
  margin-block: auto;
  background: white;
  padding: 28px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  width: 100%;
  box-sizing: border-box;
}

.membership-card {
  margin-top: 0; /* second card hugs the first, container gap handles spacing */
}

.section-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1f2937;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.profile-picture-section {
  margin-bottom: 2rem;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.user-avatar-large {
  width: 90px;
  height: 90px;
  border: 2px solid #e5e7eb;
}

.avatar-hint {
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 8px;
  margin-bottom: 0;
}

.input-group {
  margin-bottom: 1.25rem;
}

.input-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
}

.readonly-badge {
  font-size: 0.7rem;
  font-weight: normal;
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  color: #9ca3af;
  margin-left: 6px;
}

.custom-input-item {
  --background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 2px 8px;
}

.custom-input-item.readonly {
  background: #f3f4f6;
  opacity: 0.8;
}

.field-hint {
  font-size: 0.75rem;
  color: #9ca3af;
  margin: 4px 0 0 4px;
}

.save-btn {
  --border-radius: 8px;
  font-weight: 600;
  height: 44px;
  margin-top: 1.5rem;
}

.error-msg {
  color: #dc2626;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.success-msg {
  color: #059669;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.membership-status {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 1rem;
}

.tier-badge {
  display: inline-block;
  align-self: flex-start;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.tier-badge.tier-free {
  background: #f3f4f6;
  color: #4b5563;
}

.tier-badge.tier-pro {
  background: rgba(66, 185, 131, 0.15);
  color: #059669;
}

.membership-message {
  margin: 0;
  font-size: 0.9rem;
  color: #4b5563;
  line-height: 1.5;
}

.membership-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.plan-selector {
  margin-bottom: 4px;
}

.plan-selector label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
}

.membership-actions ion-button {
  --border-radius: 8px;
  font-weight: 600;
  height: 44px;
  margin: 0;
}
</style>