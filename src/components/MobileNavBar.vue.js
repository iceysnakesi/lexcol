import { useRouter, useRoute } from 'vue-router';
import { chatbubblesOutline, chatboxEllipsesOutline, logoYoutube, newspaperOutline } from 'ionicons/icons';
const router = useRouter();
const route = useRoute();
const navigateTo = (path) => {
    if (route.path !== path) {
        router.push(path);
    }
};
const isActive = (path) => route.path === path;
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
void {};
/** @type {__VLS_StyleScopedClasses['mobile-bottom-bar']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.ionTabBar | typeof __VLS_components.IonTabBar | typeof __VLS_components['ion-tab-bar'] | typeof __VLS_components.ionTabBar | typeof __VLS_components.IonTabBar | typeof __VLS_components['ion-tab-bar']} */
ionTabBar;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    slot: "bottom", ...{ class: "mobile-bottom-bar" },
}));
const __VLS_2 = __VLS_1({
    slot: "bottom",
    ...{ class: "mobile-bottom-bar" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['mobile-bottom-bar']} */ ;
const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.ionTabButton | typeof __VLS_components.IonTabButton | typeof __VLS_components['ion-tab-button'] | typeof __VLS_components.ionTabButton | typeof __VLS_components.IonTabButton | typeof __VLS_components['ion-tab-button']} */
ionTabButton;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    // @ts-ignore
    ...{ 'onClick': {} }, selected: (__VLS_unwrap(isActive, {})('/forum')),
}));
const __VLS_8 = __VLS_7({
    ...{ 'onClick': {} },
    selected: (__VLS_unwrap(isActive, {})('/forum')),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_11;
const __VLS_12 = {
    /** @type {typeof __VLS_11.click} */
    onClick: // @ts-ignore
    (...[$event]) => {
        void $event;
        return (__VLS_unwrap(navigateTo, {})('/forum'));
        // @ts-ignore
        [isActive, navigateTo,];
    },
};
void __VLS_12;
const { default: __VLS_13 } = __VLS_nonNull(__VLS_9.slots);
let __VLS_14;
/** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
ionIcon;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
    // @ts-ignore
    icon: (__VLS_unwrap(chatbubblesOutline, {})),
}));
const __VLS_16 = __VLS_15({
    icon: (__VLS_unwrap(chatbubblesOutline, {})),
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
ionLabel;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
// @ts-ignore
}));
const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const { default: __VLS_24 } = __VLS_nonNull(__VLS_22.slots);
// @ts-ignore
[chatbubblesOutline,];
var __VLS_22;
// @ts-ignore
[];
var __VLS_9;
var __VLS_10;
let __VLS_25;
/** @ts-ignore @type { | typeof __VLS_components.ionTabButton | typeof __VLS_components.IonTabButton | typeof __VLS_components['ion-tab-button'] | typeof __VLS_components.ionTabButton | typeof __VLS_components.IonTabButton | typeof __VLS_components['ion-tab-button']} */
ionTabButton;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    // @ts-ignore
    ...{ 'onClick': {} }, selected: (__VLS_unwrap(isActive, {})('/chatbot')),
}));
const __VLS_27 = __VLS_26({
    ...{ 'onClick': {} },
    selected: (__VLS_unwrap(isActive, {})('/chatbot')),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
let __VLS_30;
const __VLS_31 = {
    /** @type {typeof __VLS_30.click} */
    onClick: // @ts-ignore
    (...[$event]) => {
        void $event;
        return (__VLS_unwrap(navigateTo, {})('/chatbot'));
        // @ts-ignore
        [isActive, navigateTo,];
    },
};
void __VLS_31;
const { default: __VLS_32 } = __VLS_nonNull(__VLS_28.slots);
let __VLS_33;
/** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
ionIcon;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({
    // @ts-ignore
    icon: (__VLS_unwrap(chatboxEllipsesOutline, {})),
}));
const __VLS_35 = __VLS_34({
    icon: (__VLS_unwrap(chatboxEllipsesOutline, {})),
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
let __VLS_38;
/** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
ionLabel;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
// @ts-ignore
}));
const __VLS_40 = __VLS_39({}, ...__VLS_functionalComponentArgsRest(__VLS_39));
const { default: __VLS_43 } = __VLS_nonNull(__VLS_41.slots);
// @ts-ignore
[chatboxEllipsesOutline,];
var __VLS_41;
// @ts-ignore
[];
var __VLS_28;
var __VLS_29;
let __VLS_44;
/** @ts-ignore @type { | typeof __VLS_components.ionTabButton | typeof __VLS_components.IonTabButton | typeof __VLS_components['ion-tab-button'] | typeof __VLS_components.ionTabButton | typeof __VLS_components.IonTabButton | typeof __VLS_components['ion-tab-button']} */
ionTabButton;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({
    // @ts-ignore
    ...{ 'onClick': {} }, selected: (__VLS_unwrap(isActive, {})('/videos')),
}));
const __VLS_46 = __VLS_45({
    ...{ 'onClick': {} },
    selected: (__VLS_unwrap(isActive, {})('/videos')),
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
let __VLS_49;
const __VLS_50 = {
    /** @type {typeof __VLS_49.click} */
    onClick: // @ts-ignore
    (...[$event]) => {
        void $event;
        return (__VLS_unwrap(navigateTo, {})('/videos'));
        // @ts-ignore
        [isActive, navigateTo,];
    },
};
void __VLS_50;
const { default: __VLS_51 } = __VLS_nonNull(__VLS_47.slots);
let __VLS_52;
/** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
ionIcon;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
    // @ts-ignore
    icon: (__VLS_unwrap(logoYoutube, {})),
}));
const __VLS_54 = __VLS_53({
    icon: (__VLS_unwrap(logoYoutube, {})),
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
let __VLS_57;
/** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
ionLabel;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
// @ts-ignore
}));
const __VLS_59 = __VLS_58({}, ...__VLS_functionalComponentArgsRest(__VLS_58));
const { default: __VLS_62 } = __VLS_nonNull(__VLS_60.slots);
// @ts-ignore
[logoYoutube,];
var __VLS_60;
// @ts-ignore
[];
var __VLS_47;
var __VLS_48;
let __VLS_63;
/** @ts-ignore @type { | typeof __VLS_components.ionTabButton | typeof __VLS_components.IonTabButton | typeof __VLS_components['ion-tab-button'] | typeof __VLS_components.ionTabButton | typeof __VLS_components.IonTabButton | typeof __VLS_components['ion-tab-button']} */
ionTabButton;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
    // @ts-ignore
    ...{ 'onClick': {} }, selected: (__VLS_unwrap(isActive, {})('/news')),
}));
const __VLS_65 = __VLS_64({
    ...{ 'onClick': {} },
    selected: (__VLS_unwrap(isActive, {})('/news')),
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
let __VLS_68;
const __VLS_69 = {
    /** @type {typeof __VLS_68.click} */
    onClick: // @ts-ignore
    (...[$event]) => {
        void $event;
        return (__VLS_unwrap(navigateTo, {})('/news'));
        // @ts-ignore
        [isActive, navigateTo,];
    },
};
void __VLS_69;
const { default: __VLS_70 } = __VLS_nonNull(__VLS_66.slots);
let __VLS_71;
/** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
ionIcon;
// @ts-ignore
const __VLS_72 = __VLS_asFunctionalComponent1(__VLS_71, new __VLS_71({
    // @ts-ignore
    icon: (__VLS_unwrap(newspaperOutline, {})),
}));
const __VLS_73 = __VLS_72({
    icon: (__VLS_unwrap(newspaperOutline, {})),
}, ...__VLS_functionalComponentArgsRest(__VLS_72));
let __VLS_76;
/** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
ionLabel;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({
// @ts-ignore
}));
const __VLS_78 = __VLS_77({}, ...__VLS_functionalComponentArgsRest(__VLS_77));
const { default: __VLS_81 } = __VLS_nonNull(__VLS_79.slots);
// @ts-ignore
[newspaperOutline,];
var __VLS_79;
// @ts-ignore
[];
var __VLS_66;
var __VLS_67;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
