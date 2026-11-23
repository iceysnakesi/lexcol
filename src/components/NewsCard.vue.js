const __VLS_props = defineProps();
const __VLS_emit = defineEmits();
function formatDate(iso) {
    return new Date(iso).toLocaleDateString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric',
    });
}
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
/** @type {__VLS_StyleScopedClasses['news-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-image-wrapper']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
    ...{ onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            return (__VLS_ctx.$emit('open', __VLS_ctx.news.id));
            // @ts-ignore
            [$emit, news,];
        } },
    ...{ class: "news-card" },
});
/** @type {__VLS_StyleScopedClasses['news-card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card-image-wrapper" },
});
/** @type {__VLS_StyleScopedClasses['card-image-wrapper']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.img)({
    src: (__VLS_ctx.news.cover_image_url),
    alt: (__VLS_ctx.news.title),
    loading: "lazy",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card-body" },
});
/** @type {__VLS_StyleScopedClasses['card-body']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "card-title" },
});
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
(__VLS_ctx.news.title);
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "card-meta" },
});
/** @type {__VLS_StyleScopedClasses['card-meta']} */ ;
if (__VLS_ctx.news.is_hidden) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "badge-hidden" },
    });
    /** @type {__VLS_StyleScopedClasses['badge-hidden']} */ ;
}
(formatDate(__VLS_ctx.news.created_at));
if (__VLS_ctx.isAdmin) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: () => { } },
        ...{ class: "card-admin" },
    });
    /** @type {__VLS_StyleScopedClasses['card-admin']} */ ;
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        // @ts-ignore
        ...{ 'onClick': {} }, size: "small", fill: "clear", color: (__VLS_ctx.news.is_hidden ? 'success' : 'warning'),
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        size: "small",
        fill: "clear",
        color: (__VLS_ctx.news.is_hidden ? 'success' : 'warning'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = {
        /** @type {typeof __VLS_5.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            if (!(__VLS_ctx.isAdmin))
                throw 0;
            return (__VLS_ctx.$emit('toggle', __VLS_ctx.news.id));
            // @ts-ignore
            [$emit, news, news, news, news, news, news, news, isAdmin,];
        },
    };
    void __VLS_6;
    const { default: __VLS_7 } = __VLS_nonNull(__VLS_3.slots);
    (__VLS_ctx.news.is_hidden ? 'Show' : 'Hide');
    // @ts-ignore
    [news,];
    var __VLS_3;
    var __VLS_4;
    let __VLS_8;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
        // @ts-ignore
        ...{ 'onClick': {} }, size: "small", fill: "clear", color: "danger",
    }));
    const __VLS_10 = __VLS_9({
        ...{ 'onClick': {} },
        size: "small",
        fill: "clear",
        color: "danger",
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_13;
    const __VLS_14 = {
        /** @type {typeof __VLS_13.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            if (!(__VLS_ctx.isAdmin))
                throw 0;
            return (__VLS_ctx.$emit('delete', __VLS_ctx.news.id));
            // @ts-ignore
            [$emit, news,];
        },
    };
    void __VLS_14;
    const { default: __VLS_15 } = __VLS_nonNull(__VLS_11.slots);
    // @ts-ignore
    [];
    var __VLS_11;
    var __VLS_12;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
import { defineProps, defineEmits, } from 'vue';
