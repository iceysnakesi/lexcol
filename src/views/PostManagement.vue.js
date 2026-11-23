import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { arrowBackOutline, createOutline, listOutline } from 'ionicons/icons';
import { useAuthStore } from '@/stores/authStore';
// Import sub-components
import CreatePost from '@/components/CreatePost.vue';
import ManagePost from '@/components/ManagePost.vue';
const router = useRouter();
const authStore = useAuthStore();
const currentView = ref(null);
const isAdmin = computed(() => authStore.user?.role === 'admin');
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
// @ts-ignore
__VLS_withDotValue(isAdmin, {});
// @ts-ignore
__VLS_withDotValue(currentView, {});
void {};
/** @type {__VLS_StyleScopedClasses['card-info']} */ ;
/** @type {__VLS_StyleScopedClasses['management-container']} */ ;
/** @type {__VLS_StyleScopedClasses['hub-header']} */ ;
/** @type {__VLS_StyleScopedClasses['hub-title']} */ ;
/** @type {__VLS_StyleScopedClasses['hub-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['hub-cards-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['hub-card']} */ ;
/** @type {__VLS_StyleScopedClasses['hub-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['card-info']} */ ;
/** @type {__VLS_StyleScopedClasses['card-info']} */ ;
/** @type {__VLS_StyleScopedClasses['sub-component-wrapper']} */ ;
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
    ...{ class: "ion-padding forum-content" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "ion-padding forum-content" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['ion-padding']} */ ;
/** @type {__VLS_StyleScopedClasses['forum-content']} */ ;
const { default: __VLS_11 } = __VLS_nonNull(__VLS_9.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "management-container" },
});
/** @type {__VLS_StyleScopedClasses['management-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hub-header" },
});
/** @type {__VLS_StyleScopedClasses['hub-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "hub-title" },
});
/** @type {__VLS_StyleScopedClasses['hub-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "hub-subtitle" },
});
/** @type {__VLS_StyleScopedClasses['hub-subtitle']} */ ;
if (!isAdmin.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "unauthorized-state" },
    });
    /** @type {__VLS_StyleScopedClasses['unauthorized-state']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "hub-cards-grid" },
    });
    /** @type {__VLS_StyleScopedClasses['hub-cards-grid']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: // @ts-ignore
            (...[$event]) => {
                void $event;
                if (!!(!isAdmin.value))
                    throw 0;
                return (currentView.value = 'create');
                // @ts-ignore
                [isAdmin, currentView,];
            } },
        ...{ class: "hub-card" },
    });
    /** @type {__VLS_StyleScopedClasses['hub-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card-icon create-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
    /** @type {__VLS_StyleScopedClasses['create-icon']} */ ;
    let __VLS_12;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        // @ts-ignore
        icon: (__VLS_unwrap(createOutline, {})),
    }));
    const __VLS_14 = __VLS_13({
        icon: (__VLS_unwrap(createOutline, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card-info" },
    });
    /** @type {__VLS_StyleScopedClasses['card-info']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: // @ts-ignore
            (...[$event]) => {
                void $event;
                if (!!(!isAdmin.value))
                    throw 0;
                return (currentView.value = 'manage');
                // @ts-ignore
                [currentView, createOutline,];
            } },
        ...{ class: "hub-card" },
    });
    /** @type {__VLS_StyleScopedClasses['hub-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card-icon manage-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
    /** @type {__VLS_StyleScopedClasses['manage-icon']} */ ;
    let __VLS_17;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
        // @ts-ignore
        icon: (__VLS_unwrap(listOutline, {})),
    }));
    const __VLS_19 = __VLS_18({
        icon: (__VLS_unwrap(listOutline, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card-info" },
    });
    /** @type {__VLS_StyleScopedClasses['card-info']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
}
if (isAdmin.value && currentView.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "sub-component-wrapper" },
    });
    /** @type {__VLS_StyleScopedClasses['sub-component-wrapper']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "sub-header-bar" },
    });
    /** @type {__VLS_StyleScopedClasses['sub-header-bar']} */ ;
    let __VLS_22;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
        // @ts-ignore
        ...{ 'onClick': {} }, size: "small", fill: "outline",
    }));
    const __VLS_24 = __VLS_23({
        ...{ 'onClick': {} },
        size: "small",
        fill: "outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    let __VLS_27;
    const __VLS_28 = {
        /** @type {typeof __VLS_27.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            if (!(isAdmin.value && currentView.value))
                throw 0;
            return (currentView.value = null);
            // @ts-ignore
            [isAdmin, currentView, currentView, listOutline,];
        },
    };
    void __VLS_28;
    const { default: __VLS_29 } = __VLS_nonNull(__VLS_25.slots);
    let __VLS_30;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
        // @ts-ignore
        slot: "start", icon: (__VLS_unwrap(arrowBackOutline, {})),
    }));
    const __VLS_32 = __VLS_31({
        slot: "start",
        icon: (__VLS_unwrap(arrowBackOutline, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    // @ts-ignore
    [arrowBackOutline,];
    var __VLS_25;
    var __VLS_26;
    if (currentView.value === 'create') {
        const __VLS_35 = CreatePost;
        // @ts-ignore
        const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
        // @ts-ignore
        }));
        const __VLS_37 = __VLS_36({}, ...__VLS_functionalComponentArgsRest(__VLS_36));
    }
    if (currentView.value === 'manage') {
        const __VLS_40 = ManagePost;
        // @ts-ignore
        const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
        // @ts-ignore
        }));
        const __VLS_42 = __VLS_41({}, ...__VLS_functionalComponentArgsRest(__VLS_41));
    }
}
// @ts-ignore
[currentView, currentView,];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
