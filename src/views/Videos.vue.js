import { ref, computed, onMounted, onUnmounted } from 'vue';
import { onIonViewWillEnter, } from '@ionic/vue';
import { addOutline, closeOutline } from 'ionicons/icons';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import Pagination from '@/components/Pagination.vue';
import { videoService } from '@/services/videoService';
const authStore = useAuthStore();
const router = useRouter();
const isAdmin = computed(() => authStore.user?.role === 'admin');
// Breakpoint-driven page size
const isDesktop = ref(window.matchMedia('(min-width: 768px)').matches);
const pageSize = computed(() => (isDesktop.value ? 9 : 8));
const videos = ref([]);
const channels = ref([]);
const activeChannel = ref('');
const currentPage = ref(1);
const totalPages = ref(1);
const loading = ref(true);
// Hover preview
const hoveredId = ref(null);
let hoverTimer = null;
// Player modal
const playerOpen = ref(false);
const activeVideo = ref(null);
const playInfo = ref(null);
const playLoading = ref(false);
// Admin add form
const showAddForm = ref(false);
const newVideoUrl = ref('');
const newPreviewUrl = ref('');
const adding = ref(false);
const addError = ref(null);
let mql = null;
onMounted(() => {
    mql = window.matchMedia('(min-width: 768px)');
    mql.addEventListener('change', onBreakpointChange);
});
onUnmounted(() => {
    mql?.removeEventListener('change', onBreakpointChange);
    if (hoverTimer)
        clearTimeout(hoverTimer);
});
function onBreakpointChange(e) {
    isDesktop.value = e.matches;
    currentPage.value = 1;
    loadVideos();
}
onIonViewWillEnter(() => {
    loadVideos();
    if (channels.value.length === 0)
        loadChannels();
});
async function loadVideos() {
    loading.value = true;
    try {
        const data = await videoService.getVideos(currentPage.value, pageSize.value, activeChannel.value);
        videos.value = data.videos;
        totalPages.value = data.totalPages;
    }
    catch (err) {
        console.error('Failed to load videos:', err);
    }
    finally {
        loading.value = false;
    }
}
async function loadChannels() {
    try {
        channels.value = await videoService.getChannels();
    }
    catch (err) {
        console.error('Failed to load channels:', err);
    }
}
function selectChannel(id) {
    if (activeChannel.value === id)
        return;
    activeChannel.value = id;
    currentPage.value = 1;
    loadVideos();
}
function onHoverStart(video) {
    if (!isDesktop.value)
        return;
    if (!video.preview_youtube_id)
        return; // nothing to preview
    if (hoverTimer)
        clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => {
        hoveredId.value = video.id;
    }, 400);
}
function onHoverEnd() {
    if (hoverTimer)
        clearTimeout(hoverTimer);
    hoveredId.value = null;
}
function hoverSrc(video) {
    const id = video.preview_youtube_id;
    if (!id)
        return '';
    const base = `https://www.youtube.com/embed/${id}?`;
    return base + [
        'autoplay=1', 'mute=1', 'controls=0', 'loop=1',
        `playlist=${id}`, 'playsinline=1',
        'start=5', 'end=15',
    ].join('&');
}
async function openPlayer(video) {
    activeVideo.value = video;
    playInfo.value = null;
    playerOpen.value = true;
    playLoading.value = true;
    try {
        playInfo.value = await videoService.getPlayInfo(video.id);
    }
    catch (err) {
        console.error('Failed to load play info:', err);
        playInfo.value = { mode: 'error' };
    }
    finally {
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
    }
    catch (err) {
        addError.value =
            err?.response?.data?.error ||
                err?.response?.data?.message ||
                'Failed to add video.';
    }
    finally {
        adding.value = false;
    }
}
function cancelAdd() {
    showAddForm.value = false;
    addError.value = null;
}
async function toggleVideoVisibility(id) {
    try {
        await videoService.toggleVisibility(id);
        await loadVideos();
    }
    catch (err) {
        console.error('Failed to toggle video:', err);
    }
}
async function deleteVideo(id) {
    if (!confirm('Delete this video permanently?'))
        return;
    try {
        await videoService.deleteVideo(id);
        await loadVideos();
    }
    catch (err) {
        console.error('Failed to delete video:', err);
    }
}
// --- Formatting ---
function formatDuration(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0)
        return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${m}:${String(s).padStart(2, '0')}`;
}
function formatDate(iso) {
    return new Date(iso).toLocaleDateString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric',
    });
}
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
// @ts-ignore
__VLS_withDotValue(isAdmin, {});
// @ts-ignore
__VLS_withDotValue(showAddForm, {});
// @ts-ignore
__VLS_withDotValue(addError, {});
// @ts-ignore
__VLS_withDotValue(adding, {});
// @ts-ignore
__VLS_withDotValue(channels, {});
// @ts-ignore
__VLS_withDotValue(activeChannel, {});
// @ts-ignore
__VLS_withDotValue(loading, {});
// @ts-ignore
__VLS_withDotValue(videos, {});
// @ts-ignore
__VLS_withDotValue(hoveredId, {});
// @ts-ignore
__VLS_withDotValue(playLoading, {});
// @ts-ignore
__VLS_withDotValue(playInfo, {});
// @ts-ignore
__VLS_withDotValue(authStore, {});
// @ts-ignore
__VLS_withDotValue(activeVideo, {});
void {};
/** @type {__VLS_StyleScopedClasses['videos-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['video-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['thumbnail-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['thumbnail-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['channel-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['channel-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['channel-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['add-video-card']} */ ;
/** @type {__VLS_StyleScopedClasses['player-frame']} */ ;
/** @type {__VLS_StyleScopedClasses['preview-note']} */ ;
/** @type {__VLS_StyleScopedClasses['player-frame']} */ ;
/** @type {__VLS_StyleScopedClasses['player-frame']} */ ;
/** @type {__VLS_StyleScopedClasses['player-info']} */ ;
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
    ...{ class: "ion-padding videos-content" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "ion-padding videos-content" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['ion-padding']} */ ;
/** @type {__VLS_StyleScopedClasses['videos-content']} */ ;
const { default: __VLS_11 } = __VLS_nonNull(__VLS_9.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "videos-container" },
});
/** @type {__VLS_StyleScopedClasses['videos-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "videos-header" },
});
/** @type {__VLS_StyleScopedClasses['videos-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "page-title" },
});
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
if (isAdmin.value) {
    let __VLS_12;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        // @ts-ignore
        ...{ 'onClick': {} }, size: "small", fill: "outline",
    }));
    const __VLS_14 = __VLS_13({
        ...{ 'onClick': {} },
        size: "small",
        fill: "outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    let __VLS_17;
    const __VLS_18 = {
        /** @type {typeof __VLS_17.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            if (!(isAdmin.value))
                throw 0;
            return (showAddForm.value = !showAddForm.value);
            // @ts-ignore
            [isAdmin, showAddForm, showAddForm,];
        },
    };
    void __VLS_18;
    const { default: __VLS_19 } = __VLS_nonNull(__VLS_15.slots);
    let __VLS_20;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
        // @ts-ignore
        slot: "start", icon: (__VLS_unwrap(addOutline, {})),
    }));
    const __VLS_22 = __VLS_21({
        slot: "start",
        icon: (__VLS_unwrap(addOutline, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    (showAddForm.value ? 'Close' : 'Add Video');
    // @ts-ignore
    [showAddForm, addOutline,];
    var __VLS_15;
    var __VLS_16;
}
if (isAdmin.value && showAddForm.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "add-video-card" },
    });
    /** @type {__VLS_StyleScopedClasses['add-video-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    let __VLS_25;
    /** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
    ionItem;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
        // @ts-ignore
        ...{ class: "custom-item" }, lines: "none",
    }));
    const __VLS_27 = __VLS_26({
        ...{ class: "custom-item" },
        lines: "none",
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    /** @type {__VLS_StyleScopedClasses['custom-item']} */ ;
    const { default: __VLS_30 } = __VLS_nonNull(__VLS_28.slots);
    let __VLS_31;
    /** @ts-ignore @type { | typeof __VLS_components.ionInput | typeof __VLS_components.IonInput | typeof __VLS_components['ion-input'] | typeof __VLS_components.ionInput | typeof __VLS_components.IonInput | typeof __VLS_components['ion-input']} */
    ionInput;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
        // @ts-ignore
        modelValue: (__VLS_unwrap(newVideoUrl, {})), label: "YouTube URL (full video)", labelPlacement: "stacked", placeholder: "https:/*www.youtube.com/watch?v=...", *() { }
    } / ));
}
;
const __VLS_33 = __VLS_32({
    modelValue: (__VLS_unwrap(newVideoUrl, {})),
    label: "YouTube URL (full video)",
    labelPlacement: "stacked",
    placeholder: "https://www.youtube.com/watch?v=...",
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
// @ts-ignore
[isAdmin, showAddForm, newVideoUrl,];
var __VLS_28;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
ionItem;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    // @ts-ignore
    ...{ class: "custom-item" }, lines: "none",
}));
const __VLS_38 = __VLS_37({
    ...{ class: "custom-item" },
    lines: "none",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
/** @type {__VLS_StyleScopedClasses['custom-item']} */ ;
const { default: __VLS_41 } = __VLS_nonNull(__VLS_39.slots);
let __VLS_42;
/** @ts-ignore @type { | typeof __VLS_components.ionInput | typeof __VLS_components.IonInput | typeof __VLS_components['ion-input'] | typeof __VLS_components.ionInput | typeof __VLS_components.IonInput | typeof __VLS_components['ion-input']} */
ionInput;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    // @ts-ignore
    modelValue: (__VLS_unwrap(newPreviewUrl, {})), label: "Preview URL (optional, for free users)", labelPlacement: "stacked", placeholder: "https:/*www.youtube.com/watch?v=...", *() { }
} / ));
;
const __VLS_44 = __VLS_43({
    modelValue: (__VLS_unwrap(newPreviewUrl, {})),
    label: "Preview URL (optional, for free users)",
    labelPlacement: "stacked",
    placeholder: "https://www.youtube.com/watch?v=...",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
// @ts-ignore
[newPreviewUrl,];
var __VLS_39;
if (addError.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "error-text" },
    });
    /** @type {__VLS_StyleScopedClasses['error-text']} */ ;
    (addError.value);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "add-actions" },
});
/** @type {__VLS_StyleScopedClasses['add-actions']} */ ;
let __VLS_47;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
    // @ts-ignore
    ...{ 'onClick': {} }, fill: "clear",
}));
const __VLS_49 = __VLS_48({
    ...{ 'onClick': {} },
    fill: "clear",
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
let __VLS_52;
const __VLS_53 = {
    /** @type {typeof __VLS_52.click} */
    onClick: (cancelAdd),
};
void __VLS_53;
const { default: __VLS_54 } = __VLS_nonNull(__VLS_50.slots);
// @ts-ignore
[addError, addError,];
var __VLS_50;
var __VLS_51;
let __VLS_55;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
    // @ts-ignore
    ...{ 'onClick': {} }, disabled: (adding.value),
}));
const __VLS_57 = __VLS_56({
    ...{ 'onClick': {} },
    disabled: (adding.value),
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
let __VLS_60;
const __VLS_61 = {
    /** @type {typeof __VLS_60.click} */
    onClick: (handleAddVideo),
};
void __VLS_61;
const { default: __VLS_62 } = __VLS_nonNull(__VLS_58.slots);
if (adding.value) {
    let __VLS_63;
    /** @ts-ignore @type { | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner']} */
    ionSpinner;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
        // @ts-ignore
        name: "crescent",
    }));
    const __VLS_65 = __VLS_64({
        name: "crescent",
    }, ...__VLS_functionalComponentArgsRest(__VLS_64));
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
// @ts-ignore
[adding, adding,];
var __VLS_58;
var __VLS_59;
if (channels.value.length > 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "channel-tabs" },
    });
    /** @type {__VLS_StyleScopedClasses['channel-tabs']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: // @ts-ignore
            (...[$event]) => {
                void $event;
                if (!(channels.value.length > 0))
                    throw 0;
                return (selectChannel(''));
                // @ts-ignore
                [channels,];
            } },
        ...{ class: (['channel-tab', { active: activeChannel.value === '' }]) },
    });
    /** @type {__VLS_StyleScopedClasses['active']} */ ;
    /** @type {__VLS_StyleScopedClasses['channel-tab']} */ ;
    const __VLS_68 = __VLS_tryAsConstant((channels.value));
    for (const [ch] of __VLS_vFor(__VLS_nonNull(__VLS_68))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: // @ts-ignore
                (...[$event]) => {
                    void $event;
                    if (!(channels.value.length > 0))
                        throw 0;
                    return (selectChannel(ch.channel_id));
                    // @ts-ignore
                    [channels, activeChannel,];
                } },
            key: (ch.channel_id),
            ...{ class: (['channel-tab', { active: activeChannel.value === ch.channel_id }]) },
        });
        /** @type {__VLS_StyleScopedClasses['active']} */ ;
        /** @type {__VLS_StyleScopedClasses['channel-tab']} */ ;
        (ch.channel_name);
        // @ts-ignore
        [activeChannel,];
    }
}
if (loading.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "loading-state" },
    });
    /** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
    let __VLS_69;
    /** @ts-ignore @type { | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner'] | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner']} */
    ionSpinner;
    // @ts-ignore
    const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({
        // @ts-ignore
        name: "crescent",
    }));
    const __VLS_71 = __VLS_70({
        name: "crescent",
    }, ...__VLS_functionalComponentArgsRest(__VLS_70));
}
else if (videos.value.length > 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "video-grid" },
    });
    /** @type {__VLS_StyleScopedClasses['video-grid']} */ ;
    const __VLS_74 = __VLS_tryAsConstant((videos.value));
    for (const [video] of __VLS_vFor(__VLS_nonNull(__VLS_74))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (video.id),
            ...{ class: "video-card" },
        });
        /** @type {__VLS_StyleScopedClasses['video-card']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onMouseenter: // @ts-ignore
                (...[$event]) => {
                    void $event;
                    if (!!(loading.value))
                        throw 0;
                    if (!(videos.value.length > 0))
                        throw 0;
                    return (onHoverStart(video));
                    // @ts-ignore
                    [loading, videos, videos,];
                } },
            ...{ onMouseleave: (onHoverEnd) },
            ...{ onClick: // @ts-ignore
                (...[$event]) => {
                    void $event;
                    if (!!(loading.value))
                        throw 0;
                    if (!(videos.value.length > 0))
                        throw 0;
                    return (openPlayer(video));
                    // @ts-ignore
                    [];
                } },
            ...{ class: "thumbnail-wrapper" },
        });
        /** @type {__VLS_StyleScopedClasses['thumbnail-wrapper']} */ ;
        if (hoveredId.value !== video.id) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
                src: (video.thumbnail_url || ''),
                alt: (video.title),
                loading: "lazy",
            });
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.iframe, __VLS_intrinsics.iframe)({
                src: (hoverSrc(video)),
                frameborder: "0",
                allow: "autoplay; encrypted-media",
                referrerpolicy: "strict-origin-when-cross-origin",
            });
        }
        if (video.duration_seconds) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "duration-badge" },
            });
            /** @type {__VLS_StyleScopedClasses['duration-badge']} */ ;
            (formatDuration(video.duration_seconds));
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "video-info" },
        });
        /** @type {__VLS_StyleScopedClasses['video-info']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
            ...{ class: "video-title" },
        });
        /** @type {__VLS_StyleScopedClasses['video-title']} */ ;
        (video.title);
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "video-meta" },
        });
        /** @type {__VLS_StyleScopedClasses['video-meta']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "channel-name" },
        });
        /** @type {__VLS_StyleScopedClasses['channel-name']} */ ;
        (video.channel_name);
        if (video.published_at) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (formatDate(video.published_at));
        }
        if (isAdmin.value) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "admin-actions" },
            });
            /** @type {__VLS_StyleScopedClasses['admin-actions']} */ ;
            let __VLS_75;
            /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
            ionButton;
            // @ts-ignore
            const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
                // @ts-ignore
                ...{ 'onClick': {} }, size: "small", fill: "clear", color: (video.is_hidden ? 'success' : 'warning'),
            }));
            const __VLS_77 = __VLS_76({
                ...{ 'onClick': {} },
                size: "small",
                fill: "clear",
                color: (video.is_hidden ? 'success' : 'warning'),
            }, ...__VLS_functionalComponentArgsRest(__VLS_76));
            let __VLS_80;
            const __VLS_81 = {
                /** @type {typeof __VLS_80.click} */
                onClick: // @ts-ignore
                (...[$event]) => {
                    void $event;
                    if (!!(loading.value))
                        throw 0;
                    if (!(videos.value.length > 0))
                        throw 0;
                    if (!(isAdmin.value))
                        throw 0;
                    return (toggleVideoVisibility(video.id));
                    // @ts-ignore
                    [isAdmin, hoveredId,];
                },
            };
            void __VLS_81;
            const { default: __VLS_82 } = __VLS_nonNull(__VLS_78.slots);
            (video.is_hidden ? 'Show' : 'Hide');
            // @ts-ignore
            [];
            var __VLS_78;
            var __VLS_79;
            let __VLS_83;
            /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
            ionButton;
            // @ts-ignore
            const __VLS_84 = __VLS_asFunctionalComponent1(__VLS_83, new __VLS_83({
                // @ts-ignore
                ...{ 'onClick': {} }, size: "small", fill: "clear", color: "danger",
            }));
            const __VLS_85 = __VLS_84({
                ...{ 'onClick': {} },
                size: "small",
                fill: "clear",
                color: "danger",
            }, ...__VLS_functionalComponentArgsRest(__VLS_84));
            let __VLS_88;
            const __VLS_89 = {
                /** @type {typeof __VLS_88.click} */
                onClick: // @ts-ignore
                (...[$event]) => {
                    void $event;
                    if (!!(loading.value))
                        throw 0;
                    if (!(videos.value.length > 0))
                        throw 0;
                    if (!(isAdmin.value))
                        throw 0;
                    return (deleteVideo(video.id));
                    // @ts-ignore
                    [];
                },
            };
            void __VLS_89;
            const { default: __VLS_90 } = __VLS_nonNull(__VLS_86.slots);
            // @ts-ignore
            [];
            var __VLS_86;
            var __VLS_87;
        }
        // @ts-ignore
        [];
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "empty-state" },
    });
    /** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
}
if (__VLS_unwrap(totalPages, {}) > 1) {
    const __VLS_91 = Pagination;
    // @ts-ignore
    const __VLS_92 = __VLS_asFunctionalComponent1(__VLS_91, new __VLS_91({
        // @ts-ignore
        currentPage: (__VLS_unwrap(currentPage, {})), totalPages: (__VLS_unwrap(totalPages, {})),
    }));
    const __VLS_93 = __VLS_92({
        currentPage: (__VLS_unwrap(currentPage, {})),
        totalPages: (__VLS_unwrap(totalPages, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_92));
}
// @ts-ignore
[totalPages, totalPages, currentPage,];
var __VLS_9;
let __VLS_96;
/** @ts-ignore @type { | typeof __VLS_components.ionModal | typeof __VLS_components.IonModal | typeof __VLS_components['ion-modal'] | typeof __VLS_components.ionModal | typeof __VLS_components.IonModal | typeof __VLS_components['ion-modal']} */
ionModal;
// @ts-ignore
const __VLS_97 = __VLS_asFunctionalComponent1(__VLS_96, new __VLS_96({
    // @ts-ignore
    ...{ 'onDidDismiss': {} }, isOpen: (__VLS_unwrap(playerOpen, {})),
}));
const __VLS_98 = __VLS_97({
    ...{ 'onDidDismiss': {} },
    isOpen: (__VLS_unwrap(playerOpen, {})),
}, ...__VLS_functionalComponentArgsRest(__VLS_97));
let __VLS_101;
const __VLS_102 = {
    /** @type {typeof __VLS_101.didDismiss} */
    onDidDismiss: (closePlayer),
};
void __VLS_102;
const { default: __VLS_103 } = __VLS_nonNull(__VLS_99.slots);
let __VLS_104;
/** @ts-ignore @type { | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content'] | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content']} */
ionContent;
// @ts-ignore
const __VLS_105 = __VLS_asFunctionalComponent1(__VLS_104, new __VLS_104({
// @ts-ignore
}));
const __VLS_106 = __VLS_105({}, ...__VLS_functionalComponentArgsRest(__VLS_105));
const { default: __VLS_109 } = __VLS_nonNull(__VLS_107.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "player-container" },
});
/** @type {__VLS_StyleScopedClasses['player-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "player-top-bar" },
});
/** @type {__VLS_StyleScopedClasses['player-top-bar']} */ ;
let __VLS_110;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent1(__VLS_110, new __VLS_110({
    // @ts-ignore
    ...{ 'onClick': {} }, fill: "clear", ...{ class: "close-btn" },
}));
const __VLS_112 = __VLS_111({
    ...{ 'onClick': {} },
    fill: "clear",
    ...{ class: "close-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_111));
let __VLS_115;
const __VLS_116 = {
    /** @type {typeof __VLS_115.click} */
    onClick: (closePlayer),
};
void __VLS_116;
/** @type {__VLS_StyleScopedClasses['close-btn']} */ ;
const { default: __VLS_117 } = __VLS_nonNull(__VLS_113.slots);
let __VLS_118;
/** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
ionIcon;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent1(__VLS_118, new __VLS_118({
    // @ts-ignore
    slot: "icon-only", icon: (__VLS_unwrap(closeOutline, {})),
}));
const __VLS_120 = __VLS_119({
    slot: "icon-only",
    icon: (__VLS_unwrap(closeOutline, {})),
}, ...__VLS_functionalComponentArgsRest(__VLS_119));
// @ts-ignore
[playerOpen, closeOutline,];
var __VLS_113;
var __VLS_114;
if (playLoading.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "loading-state" },
    });
    /** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
    let __VLS_123;
    /** @ts-ignore @type { | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner'] | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner']} */
    ionSpinner;
    // @ts-ignore
    const __VLS_124 = __VLS_asFunctionalComponent1(__VLS_123, new __VLS_123({
        // @ts-ignore
        name: "crescent",
    }));
    const __VLS_125 = __VLS_124({
        name: "crescent",
    }, ...__VLS_functionalComponentArgsRest(__VLS_124));
}
else if (playInfo.value) {
    if (playInfo.value.mode === 'error') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "locked-message" },
        });
        /** @type {__VLS_StyleScopedClasses['locked-message']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    }
    else if (playInfo.value.mode === 'locked') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "locked-message" },
        });
        /** @type {__VLS_StyleScopedClasses['locked-message']} */ ;
        if (!authStore.value.isAuthenticated) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
            let __VLS_128;
            /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
            ionButton;
            // @ts-ignore
            const __VLS_129 = __VLS_asFunctionalComponent1(__VLS_128, new __VLS_128({
                // @ts-ignore
                ...{ 'onClick': {} }, fill: "outline",
            }));
            const __VLS_130 = __VLS_129({
                ...{ 'onClick': {} },
                fill: "outline",
            }, ...__VLS_functionalComponentArgsRest(__VLS_129));
            let __VLS_133;
            const __VLS_134 = {
                /** @type {typeof __VLS_133.click} */
                onClick: (goToLogin),
            };
            void __VLS_134;
            const { default: __VLS_135 } = __VLS_nonNull(__VLS_131.slots);
            // @ts-ignore
            [playLoading, playInfo, playInfo, playInfo, authStore,];
            var __VLS_131;
            var __VLS_132;
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
        }
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "player-content" },
        });
        /** @type {__VLS_StyleScopedClasses['player-content']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "player-frame" },
        });
        /** @type {__VLS_StyleScopedClasses['player-frame']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.iframe, __VLS_intrinsics.iframe)({
            src: (__VLS_unwrap(embedSrc, {})),
            frameborder: "0",
            allow: "autoplay; encrypted-media; picture-in-picture",
            referrerpolicy: "strict-origin-when-cross-origin",
            allowfullscreen: true,
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "player-info" },
        });
        /** @type {__VLS_StyleScopedClasses['player-info']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
            ...{ class: "player-title" },
        });
        /** @type {__VLS_StyleScopedClasses['player-title']} */ ;
        (activeVideo.value?.title);
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "player-meta" },
        });
        /** @type {__VLS_StyleScopedClasses['player-meta']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "player-channel" },
        });
        /** @type {__VLS_StyleScopedClasses['player-channel']} */ ;
        (activeVideo.value?.channel_name);
        if (activeVideo.value?.published_at) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (formatDate(activeVideo.value.published_at));
        }
        if (playInfo.value.mode === 'preview') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                ...{ class: "preview-note" },
            });
            /** @type {__VLS_StyleScopedClasses['preview-note']} */ ;
            if (!authStore.value.isAuthenticated) {
                let __VLS_136;
                /** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
                routerLink;
                // @ts-ignore
                const __VLS_137 = __VLS_asFunctionalComponent1(__VLS_136, new __VLS_136({
                    // @ts-ignore
                    to: "/register",
                }));
                const __VLS_138 = __VLS_137({
                    to: "/register",
                }, ...__VLS_functionalComponentArgsRest(__VLS_137));
                const { default: __VLS_141 } = __VLS_nonNull(__VLS_139.slots);
                // @ts-ignore
                [playInfo, authStore, embedSrc, activeVideo, activeVideo, activeVideo, activeVideo,];
                var __VLS_139;
                let __VLS_142;
                /** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
                routerLink;
                // @ts-ignore
                const __VLS_143 = __VLS_asFunctionalComponent1(__VLS_142, new __VLS_142({
                    // @ts-ignore
                    to: "/login",
                }));
                const __VLS_144 = __VLS_143({
                    to: "/login",
                }, ...__VLS_functionalComponentArgsRest(__VLS_143));
                const { default: __VLS_147 } = __VLS_nonNull(__VLS_145.slots);
                // @ts-ignore
                [];
                var __VLS_145;
            }
            else {
            }
        }
    }
}
// @ts-ignore
[];
var __VLS_107;
// @ts-ignore
[];
var __VLS_99;
var __VLS_100;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
