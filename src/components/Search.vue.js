import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { optionsOutline, createOutline } from 'ionicons/icons';
import { useAuthStore } from '@/stores/authStore';
const props = withDefaults(defineProps(), {
    placeholder: 'Search discussions...',
    hideFilter: false,
    adminButtonLabel: 'Post Management',
    adminButtonRoute: '/postmanagement',
});
const router = useRouter();
const goToAdminRoute = (event) => {
    const target = event.currentTarget;
    if (target) {
        target.blur();
    }
    router.push(props.adminButtonRoute);
};
const emit = defineEmits();
const authStore = useAuthStore();
const isFilterOpen = ref(false);
const isAdmin = computed(() => authStore.user?.role === 'admin');
const handleInput = (event) => {
    const value = event.detail.value || '';
    emit('update:modelValue', value);
};
const selectFilter = (filterType) => {
    emit('filter', filterType);
};
const __VLS_defaults = {
    placeholder: 'Search discussions...',
    hideFilter: false,
    adminButtonLabel: 'Post Management',
    adminButtonRoute: '/postmanagement',
};
void __VLS_defaults;
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
// @ts-ignore
__VLS_withDotValue(isAdmin, {});
// @ts-ignore
__VLS_withDotValue(isFilterOpen, {});
void {};
/** @type {__VLS_StyleScopedClasses['search-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['desktop-admin-action']} */ ;
/** @type {__VLS_StyleScopedClasses['desktop-manage-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-btn']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "forum-header-controls" },
});
/** @type {__VLS_StyleScopedClasses['forum-header-controls']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "search-wrapper" },
});
/** @type {__VLS_StyleScopedClasses['search-wrapper']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.ionSearchbar | typeof __VLS_components.IonSearchbar | typeof __VLS_components['ion-searchbar'] | typeof __VLS_components.ionSearchbar | typeof __VLS_components.IonSearchbar | typeof __VLS_components['ion-searchbar']} */
ionSearchbar;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    ...{ 'onIonInput': {} }, modelValue: (__VLS_ctx.modelValue), placeholder: (__VLS_ctx.placeholder), debounce: (400),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onIonInput': {} },
    modelValue: (__VLS_ctx.modelValue),
    placeholder: (__VLS_ctx.placeholder),
    debounce: (400),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.ionInput} */
    onIonInput: (__VLS_unwrap(handleInput, {})),
};
void __VLS_6;
var __VLS_3;
var __VLS_4;
if (!__VLS_ctx.hideFilter) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "filter-btn-wrapper" },
    });
    /** @type {__VLS_StyleScopedClasses['filter-btn-wrapper']} */ ;
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        // @ts-ignore
        fill: "clear", id: "filter-trigger", ...{ class: "filter-btn" }, ...{ class: ({ 'filter-active': isFilterOpen.value }) },
    }));
    const __VLS_9 = __VLS_8({
        fill: "clear",
        id: "filter-trigger",
        ...{ class: "filter-btn" },
        ...{ class: ({ 'filter-active': isFilterOpen.value }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    /** @type {__VLS_StyleScopedClasses['filter-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['filter-active']} */ ;
    const { default: __VLS_12 } = __VLS_nonNull(__VLS_10.slots);
    let __VLS_13;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
        // @ts-ignore
        slot: "icon-only", icon: (__VLS_unwrap(optionsOutline, {})),
    }));
    const __VLS_15 = __VLS_14({
        slot: "icon-only",
        icon: (__VLS_unwrap(optionsOutline, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    // @ts-ignore
    [modelValue, placeholder, handleInput, hideFilter, isFilterOpen, optionsOutline,];
    var __VLS_10;
}
if (isAdmin.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "desktop-admin-action" },
    });
    /** @type {__VLS_StyleScopedClasses['desktop-admin-action']} */ ;
    let __VLS_18;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
        // @ts-ignore
        ...{ 'onClick': {} }, fill: "clear", ...{ class: "desktop-manage-btn" },
    }));
    const __VLS_20 = __VLS_19({
        ...{ 'onClick': {} },
        fill: "clear",
        ...{ class: "desktop-manage-btn" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    let __VLS_23;
    const __VLS_24 = {
        /** @type {typeof __VLS_23.click} */
        onClick: (__VLS_unwrap(goToAdminRoute, {})),
    };
    void __VLS_24;
    /** @type {__VLS_StyleScopedClasses['desktop-manage-btn']} */ ;
    const { default: __VLS_25 } = __VLS_nonNull(__VLS_21.slots);
    let __VLS_26;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
        // @ts-ignore
        slot: "start", icon: (__VLS_unwrap(createOutline, {})),
    }));
    const __VLS_28 = __VLS_27({
        slot: "start",
        icon: (__VLS_unwrap(createOutline, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    (__VLS_ctx.adminButtonLabel);
    // @ts-ignore
    [isAdmin, goToAdminRoute, createOutline, adminButtonLabel,];
    var __VLS_21;
    var __VLS_22;
}
if (!__VLS_ctx.hideFilter) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "filter-popover-wrapper" },
    });
    /** @type {__VLS_StyleScopedClasses['filter-popover-wrapper']} */ ;
    let __VLS_31;
    /** @ts-ignore @type { | typeof __VLS_components.ionPopover | typeof __VLS_components.IonPopover | typeof __VLS_components['ion-popover'] | typeof __VLS_components.ionPopover | typeof __VLS_components.IonPopover | typeof __VLS_components['ion-popover']} */
    ionPopover;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
        // @ts-ignore
        ...{ 'onIonPopoverWillPresent': {} }, ...{ 'onIonPopoverDidDismiss': {} }, trigger: "filter-trigger", triggerAction: "click",
    }));
    const __VLS_33 = __VLS_32({
        ...{ 'onIonPopoverWillPresent': {} },
        ...{ 'onIonPopoverDidDismiss': {} },
        trigger: "filter-trigger",
        triggerAction: "click",
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    let __VLS_36;
    const __VLS_37 = {
        /** @type {typeof __VLS_36.ionPopoverWillPresent} */
        onIonPopoverWillPresent: // @ts-ignore
        (...[$event]) => {
            void $event;
            if (!(!__VLS_ctx.hideFilter))
                throw 0;
            return (isFilterOpen.value = true);
            // @ts-ignore
            [hideFilter, isFilterOpen,];
        },
    };
    void __VLS_37;
    const __VLS_38 = {
        /** @type {typeof __VLS_36.ionPopoverDidDismiss} */
        onIonPopoverDidDismiss: // @ts-ignore
        (...[$event]) => {
            void $event;
            if (!(!__VLS_ctx.hideFilter))
                throw 0;
            return (isFilterOpen.value = false);
            // @ts-ignore
            [isFilterOpen,];
        },
    };
    void __VLS_38;
    const { default: __VLS_39 } = __VLS_nonNull(__VLS_34.slots);
    let __VLS_40;
    /** @ts-ignore @type { | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content'] | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content']} */
    ionContent;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
        // @ts-ignore
        ...{ class: "ion-padding" },
    }));
    const __VLS_42 = __VLS_41({
        ...{ class: "ion-padding" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    /** @type {__VLS_StyleScopedClasses['ion-padding']} */ ;
    const { default: __VLS_45 } = __VLS_nonNull(__VLS_43.slots);
    let __VLS_46;
    /** @ts-ignore @type { | typeof __VLS_components.ionList | typeof __VLS_components.IonList | typeof __VLS_components['ion-list'] | typeof __VLS_components.ionList | typeof __VLS_components.IonList | typeof __VLS_components['ion-list']} */
    ionList;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
        // @ts-ignore
        lines: "none",
    }));
    const __VLS_48 = __VLS_47({
        lines: "none",
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
    const { default: __VLS_51 } = __VLS_nonNull(__VLS_49.slots);
    let __VLS_52;
    /** @ts-ignore @type { | typeof __VLS_components.ionListHeader | typeof __VLS_components.IonListHeader | typeof __VLS_components['ion-list-header'] | typeof __VLS_components.ionListHeader | typeof __VLS_components.IonListHeader | typeof __VLS_components['ion-list-header']} */
    ionListHeader;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
    // @ts-ignore
    }));
    const __VLS_54 = __VLS_53({}, ...__VLS_functionalComponentArgsRest(__VLS_53));
    const { default: __VLS_57 } = __VLS_nonNull(__VLS_55.slots);
    // @ts-ignore
    [];
    var __VLS_55;
    let __VLS_58;
    /** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
    ionItem;
    // @ts-ignore
    const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({
        // @ts-ignore
        ...{ 'onClick': {} }, button: true,
    }));
    const __VLS_60 = __VLS_59({
        ...{ 'onClick': {} },
        button: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_59));
    let __VLS_63;
    const __VLS_64 = {
        /** @type {typeof __VLS_63.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            if (!(!__VLS_ctx.hideFilter))
                throw 0;
            return (__VLS_unwrap(selectFilter, {})('newest'));
            // @ts-ignore
            [selectFilter,];
        },
    };
    void __VLS_64;
    const { default: __VLS_65 } = __VLS_nonNull(__VLS_61.slots);
    let __VLS_66;
    /** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
    ionLabel;
    // @ts-ignore
    const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
    // @ts-ignore
    }));
    const __VLS_68 = __VLS_67({}, ...__VLS_functionalComponentArgsRest(__VLS_67));
    const { default: __VLS_71 } = __VLS_nonNull(__VLS_69.slots);
    // @ts-ignore
    [];
    var __VLS_69;
    // @ts-ignore
    [];
    var __VLS_61;
    var __VLS_62;
    let __VLS_72;
    /** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
    ionItem;
    // @ts-ignore
    const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
        // @ts-ignore
        ...{ 'onClick': {} }, button: true,
    }));
    const __VLS_74 = __VLS_73({
        ...{ 'onClick': {} },
        button: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_73));
    let __VLS_77;
    const __VLS_78 = {
        /** @type {typeof __VLS_77.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            if (!(!__VLS_ctx.hideFilter))
                throw 0;
            return (__VLS_unwrap(selectFilter, {})('oldest'));
            // @ts-ignore
            [selectFilter,];
        },
    };
    void __VLS_78;
    const { default: __VLS_79 } = __VLS_nonNull(__VLS_75.slots);
    let __VLS_80;
    /** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
    ionLabel;
    // @ts-ignore
    const __VLS_81 = __VLS_asFunctionalComponent1(__VLS_80, new __VLS_80({
    // @ts-ignore
    }));
    const __VLS_82 = __VLS_81({}, ...__VLS_functionalComponentArgsRest(__VLS_81));
    const { default: __VLS_85 } = __VLS_nonNull(__VLS_83.slots);
    // @ts-ignore
    [];
    var __VLS_83;
    // @ts-ignore
    [];
    var __VLS_75;
    var __VLS_76;
    // @ts-ignore
    [];
    var __VLS_49;
    // @ts-ignore
    [];
    var __VLS_43;
    // @ts-ignore
    [];
    var __VLS_34;
    var __VLS_35;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
import { defineProps, defineEmits, withDefaults, } from 'vue';
