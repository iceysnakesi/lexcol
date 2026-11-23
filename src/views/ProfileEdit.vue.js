import { ref, reactive, computed, watch } from 'vue';
import { onIonViewWillEnter, } from '@ionic/vue';
import { useAuthStore } from '@/stores/authStore';
import AvatarUpload from '@/components/AvatarUpload.vue';
import { updateProfile as updateProfileRequest, uploadAvatar, changeMembership } from '@/services/userService';
const authStore = useAuthStore();
const selectedAvatar = ref(null);
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
const newTier = ref(currentTier.value);
const changingTier = ref(false);
const membershipError = ref('');
const membershipSuccess = ref('');
const tierLabel = computed(() => {
    const t = currentTier.value;
    if (t === 'pro')
        return 'Pro';
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
    if (!authStore.user)
        return;
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
watch(() => authStore.user, () => { syncFormFromUser(); }, { immediate: true });
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
    }
    catch (error) {
        console.error('Failed to update profile:', error);
        if (nameUpdated) {
            errorMessage.value =
                'Your name was updated, but the avatar upload failed. You can try uploading it again.';
        }
        else {
            errorMessage.value =
                error instanceof Error
                    ? error.message
                    : 'Failed to update profile.';
        }
    }
    finally {
        submitting.value = false;
    }
};
async function upgradeToPro() {
    await performTierChange('pro');
}
async function applyTierChange() {
    if (newTier.value === currentTier.value)
        return;
    await performTierChange(newTier.value);
}
async function cancelSubscription() {
    if (!confirm('Cancel your subscription? You will be moved to the Free plan and lose Pro features immediately.')) {
        return;
    }
    await performTierChange('free');
}
async function performTierChange(tier) {
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
    }
    catch (err) {
        console.error('Failed to change membership:', err);
        membershipError.value =
            err?.response?.data?.message || 'Failed to update your plan. Please try again.';
    }
    finally {
        changingTier.value = false;
    }
}
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
// @ts-ignore
__VLS_withDotValue(form, {});
// @ts-ignore
__VLS_withDotValue(selectedAvatar, {});
// @ts-ignore
__VLS_withDotValue(errorMessage, {});
// @ts-ignore
__VLS_withDotValue(successMessage, {});
// @ts-ignore
__VLS_withDotValue(submitting, {});
// @ts-ignore
__VLS_withDotValue(membershipError, {});
// @ts-ignore
__VLS_withDotValue(membershipSuccess, {});
// @ts-ignore
__VLS_withDotValue(currentTier, {});
// @ts-ignore
__VLS_withDotValue(changingTier, {});
// @ts-ignore
__VLS_withDotValue(newTier, {});
void {};
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-input-item']} */ ;
/** @type {__VLS_StyleScopedClasses['tier-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['tier-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['plan-selector']} */ ;
/** @type {__VLS_StyleScopedClasses['membership-actions']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.ionPage | typeof __VLS_components.IonPage | typeof __VLS_components['ion-page'] | typeof __VLS_components.ionPage | typeof __VLS_components.IonPage | typeof __VLS_components['ion-page']} */
ionPage;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
// @ts-ignore
}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content'] | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content']} */
ionContent;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    // @ts-ignore
    ...{ class: "ion-padding profile-content" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "ion-padding profile-content" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['ion-padding']} */ ;
/** @type {__VLS_StyleScopedClasses['profile-content']} */ ;
const { default: __VLS_11 } = __VLS_nonNull(__VLS_9.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "profile-container" },
});
/** @type {__VLS_StyleScopedClasses['profile-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "profile-card" },
});
/** @type {__VLS_StyleScopedClasses['profile-card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "profile-picture-section" },
});
/** @type {__VLS_StyleScopedClasses['profile-picture-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
const __VLS_12 = AvatarUpload;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    // @ts-ignore
    ...{ 'onFileSelected': {} }, currentAvatar: (form.value.avatar_url),
}));
const __VLS_14 = __VLS_13({
    ...{ 'onFileSelected': {} },
    currentAvatar: (form.value.avatar_url),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_17;
const __VLS_18 = {
    /** @type {typeof __VLS_17.fileSelected} */
    onFileSelected: // @ts-ignore
    (...[$event]) => {
        void $event;
        return (selectedAvatar.value = $event);
        // @ts-ignore
        [form, selectedAvatar,];
    },
};
void __VLS_18;
var __VLS_15;
var __VLS_16;
__VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
    ...{ onSubmit: (__VLS_unwrap(updateProfile, {})) },
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "input-group" },
});
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
ionItem;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    // @ts-ignore
    ...{ class: "custom-input-item" }, lines: "none",
}));
const __VLS_21 = __VLS_20({
    ...{ class: "custom-input-item" },
    lines: "none",
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
/** @type {__VLS_StyleScopedClasses['custom-input-item']} */ ;
const { default: __VLS_24 } = __VLS_nonNull(__VLS_22.slots);
let __VLS_25;
/** @ts-ignore @type { | typeof __VLS_components.ionInput | typeof __VLS_components.IonInput | typeof __VLS_components['ion-input'] | typeof __VLS_components.ionInput | typeof __VLS_components.IonInput | typeof __VLS_components['ion-input']} */
ionInput;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    // @ts-ignore
    modelValue: (form.value.name), placeholder: "Enter your name", required: true,
}));
const __VLS_27 = __VLS_26({
    modelValue: (form.value.name),
    placeholder: "Enter your name",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
// @ts-ignore
[form, updateProfile,];
var __VLS_22;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "input-group" },
});
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "readonly-badge" },
});
/** @type {__VLS_StyleScopedClasses['readonly-badge']} */ ;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
ionItem;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    // @ts-ignore
    ...{ class: "custom-input-item readonly" }, lines: "none",
}));
const __VLS_32 = __VLS_31({
    ...{ class: "custom-input-item readonly" },
    lines: "none",
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
/** @type {__VLS_StyleScopedClasses['custom-input-item']} */ ;
/** @type {__VLS_StyleScopedClasses['readonly']} */ ;
const { default: __VLS_35 } = __VLS_nonNull(__VLS_33.slots);
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.ionInput | typeof __VLS_components.IonInput | typeof __VLS_components['ion-input'] | typeof __VLS_components.ionInput | typeof __VLS_components.IonInput | typeof __VLS_components['ion-input']} */
ionInput;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    // @ts-ignore
    value: (form.value.email), readonly: true,
}));
const __VLS_38 = __VLS_37({
    value: (form.value.email),
    readonly: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
// @ts-ignore
[form,];
var __VLS_33;
if (errorMessage.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "error-msg" },
    });
    /** @type {__VLS_StyleScopedClasses['error-msg']} */ ;
    (errorMessage.value);
}
if (successMessage.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "success-msg" },
    });
    /** @type {__VLS_StyleScopedClasses['success-msg']} */ ;
    (successMessage.value);
}
let __VLS_41;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
    // @ts-ignore
    expand: "block", type: "submit", disabled: (submitting.value), ...{ class: "save-btn" },
}));
const __VLS_43 = __VLS_42({
    expand: "block",
    type: "submit",
    disabled: (submitting.value),
    ...{ class: "save-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
/** @type {__VLS_StyleScopedClasses['save-btn']} */ ;
const { default: __VLS_46 } = __VLS_nonNull(__VLS_44.slots);
if (submitting.value) {
    let __VLS_47;
    /** @ts-ignore @type { | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner'] | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner']} */
    ionSpinner;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
        // @ts-ignore
        name: "crescent",
    }));
    const __VLS_49 = __VLS_48({
        name: "crescent",
    }, ...__VLS_functionalComponentArgsRest(__VLS_48));
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
// @ts-ignore
[errorMessage, errorMessage, successMessage, successMessage, submitting, submitting,];
var __VLS_44;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "profile-card membership-card" },
});
/** @type {__VLS_StyleScopedClasses['profile-card']} */ ;
/** @type {__VLS_StyleScopedClasses['membership-card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "membership-status" },
});
/** @type {__VLS_StyleScopedClasses['membership-status']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: (['tier-badge', __VLS_unwrap(tierClass, {})]) },
});
/** @type {__VLS_StyleScopedClasses['tier-badge']} */ ;
(__VLS_unwrap(tierLabel, {}));
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "membership-message" },
});
/** @type {__VLS_StyleScopedClasses['membership-message']} */ ;
(__VLS_unwrap(membershipMessage, {}));
if (membershipError.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "error-msg" },
    });
    /** @type {__VLS_StyleScopedClasses['error-msg']} */ ;
    (membershipError.value);
}
if (membershipSuccess.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "success-msg" },
    });
    /** @type {__VLS_StyleScopedClasses['success-msg']} */ ;
    (membershipSuccess.value);
}
if (currentTier.value === 'free') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "membership-actions" },
    });
    /** @type {__VLS_StyleScopedClasses['membership-actions']} */ ;
    let __VLS_52;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
        // @ts-ignore
        ...{ 'onClick': {} }, expand: "block", ...{ class: "save-btn" }, disabled: (changingTier.value),
    }));
    const __VLS_54 = __VLS_53({
        ...{ 'onClick': {} },
        expand: "block",
        ...{ class: "save-btn" },
        disabled: (changingTier.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    let __VLS_57;
    const __VLS_58 = {
        /** @type {typeof __VLS_57.click} */
        onClick: (upgradeToPro),
    };
    void __VLS_58;
    /** @type {__VLS_StyleScopedClasses['save-btn']} */ ;
    const { default: __VLS_59 } = __VLS_nonNull(__VLS_55.slots);
    if (changingTier.value) {
        let __VLS_60;
        /** @ts-ignore @type { | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner'] | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner']} */
        ionSpinner;
        // @ts-ignore
        const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
            // @ts-ignore
            name: "crescent",
        }));
        const __VLS_62 = __VLS_61({
            name: "crescent",
        }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    }
    // @ts-ignore
    [tierClass, tierLabel, membershipMessage, membershipError, membershipError, membershipSuccess, membershipSuccess, currentTier, changingTier, changingTier,];
    var __VLS_55;
    var __VLS_56;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "membership-actions" },
    });
    /** @type {__VLS_StyleScopedClasses['membership-actions']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "plan-selector" },
    });
    /** @type {__VLS_StyleScopedClasses['plan-selector']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
    let __VLS_65;
    /** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
    ionItem;
    // @ts-ignore
    const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
        // @ts-ignore
        ...{ class: "custom-input-item" }, lines: "none",
    }));
    const __VLS_67 = __VLS_66({
        ...{ class: "custom-input-item" },
        lines: "none",
    }, ...__VLS_functionalComponentArgsRest(__VLS_66));
    /** @type {__VLS_StyleScopedClasses['custom-input-item']} */ ;
    const { default: __VLS_70 } = __VLS_nonNull(__VLS_68.slots);
    let __VLS_71;
    /** @ts-ignore @type { | typeof __VLS_components.ionSelect | typeof __VLS_components.IonSelect | typeof __VLS_components['ion-select'] | typeof __VLS_components.ionSelect | typeof __VLS_components.IonSelect | typeof __VLS_components['ion-select']} */
    ionSelect;
    // @ts-ignore
    const __VLS_72 = __VLS_asFunctionalComponent1(__VLS_71, new __VLS_71({
        // @ts-ignore
        modelValue: (newTier.value), interface: "popover", placeholder: "Select plan",
    }));
    const __VLS_73 = __VLS_72({
        modelValue: (newTier.value),
        interface: "popover",
        placeholder: "Select plan",
    }, ...__VLS_functionalComponentArgsRest(__VLS_72));
    const { default: __VLS_76 } = __VLS_nonNull(__VLS_74.slots);
    let __VLS_77;
    /** @ts-ignore @type { | typeof __VLS_components.ionSelectOption | typeof __VLS_components.IonSelectOption | typeof __VLS_components['ion-select-option'] | typeof __VLS_components.ionSelectOption | typeof __VLS_components.IonSelectOption | typeof __VLS_components['ion-select-option']} */
    ionSelectOption;
    // @ts-ignore
    const __VLS_78 = __VLS_asFunctionalComponent1(__VLS_77, new __VLS_77({
        // @ts-ignore
        value: "pro",
    }));
    const __VLS_79 = __VLS_78({
        value: "pro",
    }, ...__VLS_functionalComponentArgsRest(__VLS_78));
    const { default: __VLS_82 } = __VLS_nonNull(__VLS_80.slots);
    // @ts-ignore
    [newTier,];
    var __VLS_80;
    // @ts-ignore
    [];
    var __VLS_74;
    // @ts-ignore
    [];
    var __VLS_68;
    let __VLS_83;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_84 = __VLS_asFunctionalComponent1(__VLS_83, new __VLS_83({
        // @ts-ignore
        ...{ 'onClick': {} }, expand: "block", ...{ class: "save-btn" }, disabled: (changingTier.value || newTier.value === currentTier.value),
    }));
    const __VLS_85 = __VLS_84({
        ...{ 'onClick': {} },
        expand: "block",
        ...{ class: "save-btn" },
        disabled: (changingTier.value || newTier.value === currentTier.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_84));
    let __VLS_88;
    const __VLS_89 = {
        /** @type {typeof __VLS_88.click} */
        onClick: (applyTierChange),
    };
    void __VLS_89;
    /** @type {__VLS_StyleScopedClasses['save-btn']} */ ;
    const { default: __VLS_90 } = __VLS_nonNull(__VLS_86.slots);
    if (changingTier.value) {
        let __VLS_91;
        /** @ts-ignore @type { | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner'] | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner']} */
        ionSpinner;
        // @ts-ignore
        const __VLS_92 = __VLS_asFunctionalComponent1(__VLS_91, new __VLS_91({
            // @ts-ignore
            name: "crescent",
        }));
        const __VLS_93 = __VLS_92({
            name: "crescent",
        }, ...__VLS_functionalComponentArgsRest(__VLS_92));
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    }
    // @ts-ignore
    [currentTier, changingTier, changingTier, newTier,];
    var __VLS_86;
    var __VLS_87;
    let __VLS_96;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_97 = __VLS_asFunctionalComponent1(__VLS_96, new __VLS_96({
        // @ts-ignore
        ...{ 'onClick': {} }, expand: "block", fill: "outline", color: "danger", disabled: (changingTier.value),
    }));
    const __VLS_98 = __VLS_97({
        ...{ 'onClick': {} },
        expand: "block",
        fill: "outline",
        color: "danger",
        disabled: (changingTier.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_97));
    let __VLS_101;
    const __VLS_102 = {
        /** @type {typeof __VLS_101.click} */
        onClick: (cancelSubscription),
    };
    void __VLS_102;
    const { default: __VLS_103 } = __VLS_nonNull(__VLS_99.slots);
    // @ts-ignore
    [changingTier,];
    var __VLS_99;
    var __VLS_100;
}
// @ts-ignore
[];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
