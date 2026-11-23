import { useRouter } from 'vue-router';
import { arrowBackOutline } from 'ionicons/icons';
const __VLS_props = defineProps();
const router = useRouter();
const goHome = (event) => {
    const buttonElement = event.currentTarget;
    buttonElement?.blur();
    router.push('/');
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
void {};
/** @type {__VLS_StyleScopedClasses['auth-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['header-section']} */ ;
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
/** @ts-ignore @type { | typeof __VLS_components.ionHeader | typeof __VLS_components.IonHeader | typeof __VLS_components['ion-header'] | typeof __VLS_components.ionHeader | typeof __VLS_components.IonHeader | typeof __VLS_components['ion-header']} */
ionHeader;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
// @ts-ignore
}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_nonNull(__VLS_9.slots);
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.ionToolbar | typeof __VLS_components.IonToolbar | typeof __VLS_components['ion-toolbar'] | typeof __VLS_components.ionToolbar | typeof __VLS_components.IonToolbar | typeof __VLS_components['ion-toolbar']} */
ionToolbar;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
// @ts-ignore
}));
const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const { default: __VLS_17 } = __VLS_nonNull(__VLS_15.slots);
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.ionButtons | typeof __VLS_components.IonButtons | typeof __VLS_components['ion-buttons'] | typeof __VLS_components.ionButtons | typeof __VLS_components.IonButtons | typeof __VLS_components['ion-buttons']} */
ionButtons;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    // @ts-ignore
    slot: "start",
}));
const __VLS_20 = __VLS_19({
    slot: "start",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_23 } = __VLS_nonNull(__VLS_21.slots);
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    // @ts-ignore
    ...{ 'onClick': {} },
}));
const __VLS_26 = __VLS_25({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
let __VLS_29;
const __VLS_30 = {
    /** @type {typeof __VLS_29.click} */
    onClick: (__VLS_unwrap(goHome, {})),
};
void __VLS_30;
const { default: __VLS_31 } = __VLS_nonNull(__VLS_27.slots);
let __VLS_32;
/** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
ionIcon;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
    // @ts-ignore
    icon: (__VLS_unwrap(arrowBackOutline, {})), slot: "icon-only",
}));
const __VLS_34 = __VLS_33({
    icon: (__VLS_unwrap(arrowBackOutline, {})),
    slot: "icon-only",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
// @ts-ignore
[goHome, arrowBackOutline,];
var __VLS_27;
var __VLS_28;
// @ts-ignore
[];
var __VLS_21;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "return_message" },
});
/** @type {__VLS_StyleScopedClasses['return_message']} */ ;
// @ts-ignore
[];
var __VLS_15;
// @ts-ignore
[];
var __VLS_9;
let __VLS_37;
/** @ts-ignore @type { | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content'] | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content']} */
ionContent;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
    // @ts-ignore
    ...{ class: "ion-padding" }, scrollAssist: (false),
}));
const __VLS_39 = __VLS_38({
    ...{ class: "ion-padding" },
    scrollAssist: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
/** @type {__VLS_StyleScopedClasses['ion-padding']} */ ;
const { default: __VLS_42 } = __VLS_nonNull(__VLS_40.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "auth-wrapper" },
});
/** @type {__VLS_StyleScopedClasses['auth-wrapper']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "auth-container" },
});
/** @type {__VLS_StyleScopedClasses['auth-container']} */ ;
if (__VLS_ctx.title) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "header-section" },
    });
    /** @type {__VLS_StyleScopedClasses['header-section']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    (__VLS_ctx.title);
    if (__VLS_ctx.subtitle) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "subtitle" },
        });
        /** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
        (__VLS_ctx.subtitle);
    }
}
var __VLS_43 = {};
// @ts-ignore
[title, title, subtitle, subtitle,];
var __VLS_40;
// @ts-ignore
[];
var __VLS_3;
var __VLS_44 = __VLS_43;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};
import { defineProps, } from 'vue';
