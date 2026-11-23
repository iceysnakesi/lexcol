import { computed } from 'vue';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
const props = defineProps();
const emit = defineEmits();
const changePage = (page) => {
    if (page < 1 || page > props.totalPages)
        return;
    emit('update:currentPage', page);
};
const visiblePages = computed(() => {
    const range = 5;
    let start = Math.max(1, props.currentPage - Math.floor(range / 2));
    let end = Math.min(props.totalPages, start + range - 1);
    if (end - start + range < range) {
        start = Math.max(1, end - range + 1);
    }
    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
});
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
void {};
/** @type {__VLS_StyleScopedClasses['page-number-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['page-number-btn']} */ ;
if (__VLS_ctx.totalPages > 1) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "pagination-footer" },
    });
    /** @type {__VLS_StyleScopedClasses['pagination-footer']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "pagination-btn-wrapper" },
    });
    /** @type {__VLS_StyleScopedClasses['pagination-btn-wrapper']} */ ;
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        // @ts-ignore
        ...{ 'onClick': {} }, fill: "clear", disabled: (__VLS_ctx.currentPage === 1),
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        fill: "clear",
        disabled: (__VLS_ctx.currentPage === 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = {
        /** @type {typeof __VLS_5.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            if (!(__VLS_ctx.totalPages > 1))
                throw 0;
            return (__VLS_unwrap(changePage, {})(__VLS_ctx.currentPage - 1));
            // @ts-ignore
            [totalPages, currentPage, currentPage, changePage,];
        },
    };
    void __VLS_6;
    const { default: __VLS_7 } = __VLS_nonNull(__VLS_3.slots);
    let __VLS_8;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
        // @ts-ignore
        slot: "icon-only", icon: (__VLS_unwrap(chevronBackOutline, {})),
    }));
    const __VLS_10 = __VLS_9({
        slot: "icon-only",
        icon: (__VLS_unwrap(chevronBackOutline, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    // @ts-ignore
    [chevronBackOutline,];
    var __VLS_3;
    var __VLS_4;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "page-numbers" },
    });
    /** @type {__VLS_StyleScopedClasses['page-numbers']} */ ;
    const __VLS_13 = __VLS_tryAsConstant((__VLS_unwrap(visiblePages, {})));
    for (const [page] of __VLS_vFor(__VLS_nonNull(__VLS_13))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: // @ts-ignore
                (...[$event]) => {
                    void $event;
                    if (!(__VLS_ctx.totalPages > 1))
                        throw 0;
                    return (__VLS_unwrap(changePage, {})(page));
                    // @ts-ignore
                    [changePage, visiblePages,];
                } },
            key: (page),
            ...{ class: (['page-number-btn', { active: page === __VLS_ctx.currentPage }]) },
        });
        /** @type {__VLS_StyleScopedClasses['active']} */ ;
        /** @type {__VLS_StyleScopedClasses['page-number-btn']} */ ;
        (page);
        // @ts-ignore
        [currentPage,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "pagination-btn-wrapper" },
    });
    /** @type {__VLS_StyleScopedClasses['pagination-btn-wrapper']} */ ;
    let __VLS_14;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
        // @ts-ignore
        ...{ 'onClick': {} }, fill: "clear", disabled: (__VLS_ctx.currentPage === __VLS_ctx.totalPages),
    }));
    const __VLS_16 = __VLS_15({
        ...{ 'onClick': {} },
        fill: "clear",
        disabled: (__VLS_ctx.currentPage === __VLS_ctx.totalPages),
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    let __VLS_19;
    const __VLS_20 = {
        /** @type {typeof __VLS_19.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            if (!(__VLS_ctx.totalPages > 1))
                throw 0;
            return (__VLS_unwrap(changePage, {})(__VLS_ctx.currentPage + 1));
            // @ts-ignore
            [totalPages, currentPage, currentPage, changePage,];
        },
    };
    void __VLS_20;
    const { default: __VLS_21 } = __VLS_nonNull(__VLS_17.slots);
    let __VLS_22;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
        // @ts-ignore
        slot: "icon-only", icon: (__VLS_unwrap(chevronForwardOutline, {})),
    }));
    const __VLS_24 = __VLS_23({
        slot: "icon-only",
        icon: (__VLS_unwrap(chevronForwardOutline, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    // @ts-ignore
    [chevronForwardOutline,];
    var __VLS_17;
    var __VLS_18;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
import { defineProps, defineEmits, } from 'vue';
