import { computed } from 'vue';
import { menuController } from '@ionic/vue';
import { personOutline } from 'ionicons/icons';
import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore();
const initial = computed(() => {
    const name = authStore.user?.name || authStore.user?.email || 'U';
    return name.trim().charAt(0).toUpperCase() || 'U';
});
const openProfileMenu = (event) => {
    const buttonElement = event.currentTarget;
    buttonElement?.blur();
    menuController.open('profile-menu');
};
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
// @ts-ignore
__VLS_withDotValue(authStore, {});
void {};
/** @type {__VLS_StyleScopedClasses['mobile-header']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.ionHeader | typeof __VLS_components.IonHeader | typeof __VLS_components['ion-header'] | typeof __VLS_components.ionHeader | typeof __VLS_components.IonHeader | typeof __VLS_components['ion-header']} */
ionHeader;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    ...{ class: "mobile-header" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "mobile-header" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['mobile-header']} */ ;
const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.ionToolbar | typeof __VLS_components.IonToolbar | typeof __VLS_components['ion-toolbar'] | typeof __VLS_components.ionToolbar | typeof __VLS_components.IonToolbar | typeof __VLS_components['ion-toolbar']} */
ionToolbar;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
// @ts-ignore
}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_nonNull(__VLS_9.slots);
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.ionTitle | typeof __VLS_components.IonTitle | typeof __VLS_components['ion-title'] | typeof __VLS_components.ionTitle | typeof __VLS_components.IonTitle | typeof __VLS_components['ion-title']} */
ionTitle;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    // @ts-ignore
    ...{ class: "ion-text-center" },
}));
const __VLS_14 = __VLS_13({
    ...{ class: "ion-text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
/** @type {__VLS_StyleScopedClasses['ion-text-center']} */ ;
const { default: __VLS_17 } = __VLS_nonNull(__VLS_15.slots);
var __VLS_15;
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.ionButtons | typeof __VLS_components.IonButtons | typeof __VLS_components['ion-buttons'] | typeof __VLS_components.ionButtons | typeof __VLS_components.IonButtons | typeof __VLS_components['ion-buttons']} */
ionButtons;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    // @ts-ignore
    slot: "end",
}));
const __VLS_20 = __VLS_19({
    slot: "end",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_23 } = __VLS_nonNull(__VLS_21.slots);
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    // @ts-ignore
    ...{ 'onClick': {} }, ...{ class: "avatar-button" },
}));
const __VLS_26 = __VLS_25({
    ...{ 'onClick': {} },
    ...{ class: "avatar-button" },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
let __VLS_29;
const __VLS_30 = {
    /** @type {typeof __VLS_29.click} */
    onClick: // @ts-ignore
    (...[$event]) => {
        void $event;
        return (__VLS_unwrap(openProfileMenu, {})($event));
        // @ts-ignore
        [openProfileMenu,];
    },
};
void __VLS_30;
/** @type {__VLS_StyleScopedClasses['avatar-button']} */ ;
const { default: __VLS_31 } = __VLS_nonNull(__VLS_27.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "avatar-placeholder" },
});
/** @type {__VLS_StyleScopedClasses['avatar-placeholder']} */ ;
if (authStore.value.user?.avatar_url) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: (authStore.value.user.avatar_url),
        alt: "Profile",
        ...{ class: "avatar-img" },
    });
    /** @type {__VLS_StyleScopedClasses['avatar-img']} */ ;
}
else if (authStore.value.isAuthenticated) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "avatar-initial" },
    });
    /** @type {__VLS_StyleScopedClasses['avatar-initial']} */ ;
    (__VLS_unwrap(initial, {}));
}
else {
    let __VLS_32;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
        // @ts-ignore
        icon: (__VLS_unwrap(personOutline, {})), ...{ class: "guest-icon" },
    }));
    const __VLS_34 = __VLS_33({
        icon: (__VLS_unwrap(personOutline, {})),
        ...{ class: "guest-icon" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    /** @type {__VLS_StyleScopedClasses['guest-icon']} */ ;
}
// @ts-ignore
[authStore, authStore, authStore, initial, personOutline,];
var __VLS_27;
var __VLS_28;
// @ts-ignore
[];
var __VLS_21;
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
