import { ref, computed, onMounted, onUnmounted } from 'vue';
import { sunnyOutline, partlySunnyOutline, moonOutline } from 'ionicons/icons';
import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore();
// Recompute every minute so a stale greeting doesn't survive 11:59 → 12:01
const now = ref(new Date());
let ticker = null;
onMounted(() => {
    ticker = setInterval(() => { now.value = new Date(); }, 60_000);
});
onUnmounted(() => {
    if (ticker)
        clearInterval(ticker);
});
const hour = computed(() => now.value.getHours());
const greetingWord = computed(() => {
    const h = hour.value;
    if (h >= 5 && h < 12)
        return 'Good morning';
    if (h >= 12 && h < 18)
        return 'Good afternoon';
    return 'Good evening';
});
const greetingIcon = computed(() => {
    const h = hour.value;
    if (h >= 5 && h < 12)
        return sunnyOutline;
    if (h >= 12 && h < 18)
        return partlySunnyOutline;
    return moonOutline;
});
const firstName = computed(() => {
    const n = authStore.user?.name?.trim();
    if (!n)
        return null;
    return n.split(/\s+/)[0]; // "Juan Pérez" → "Juan"
});
const greetingText = computed(() => firstName.value
    ? `${greetingWord.value}, ${firstName.value}!`
    : `${greetingWord.value}!`);
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
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
void {};
/** @type {__VLS_StyleScopedClasses['motd-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['motd-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['motd-greeting']} */ ;
/** @type {__VLS_StyleScopedClasses['motd-datetime']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "motd-banner" },
});
/** @type {__VLS_StyleScopedClasses['motd-banner']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "motd-inner" },
});
/** @type {__VLS_StyleScopedClasses['motd-inner']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
ionIcon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    icon: (__VLS_unwrap(greetingIcon, {})), ...{ class: "motd-icon" },
}));
const __VLS_2 = __VLS_1({
    icon: (__VLS_unwrap(greetingIcon, {})),
    ...{ class: "motd-icon" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['motd-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "motd-content" },
});
/** @type {__VLS_StyleScopedClasses['motd-content']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "motd-greeting" },
});
/** @type {__VLS_StyleScopedClasses['motd-greeting']} */ ;
(__VLS_unwrap(greetingText, {}));
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "motd-datetime" },
});
/** @type {__VLS_StyleScopedClasses['motd-datetime']} */ ;
(__VLS_unwrap(formattedDateTime, {}));
// @ts-ignore
[greetingIcon, greetingText, formattedDateTime,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
