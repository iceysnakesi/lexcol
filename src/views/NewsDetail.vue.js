import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { onIonViewWillEnter } from '@ionic/vue';
import { newsService } from '@/services/newsService';
const route = useRoute();
const article = ref(null);
const loading = ref(true);
onIonViewWillEnter(loadArticle);
async function loadArticle() {
    loading.value = true;
    try {
        article.value = await newsService.getOne(String(route.params.id));
    }
    catch (err) {
        console.error('Failed to load article:', err);
    }
    finally {
        loading.value = false;
    }
}
function formatDate(iso) {
    return new Date(iso).toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric',
    });
}
// Simple, safe markdown-lite: escape HTML, then apply **bold** / *italic* / newlines
function renderText(text) {
    const escaped = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    return escaped
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
}
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
// @ts-ignore
__VLS_withDotValue(loading, {});
// @ts-ignore
__VLS_withDotValue(article, {});
void {};
/** @type {__VLS_StyleScopedClasses['text-block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-block']} */ ;
/** @type {__VLS_StyleScopedClasses['image-block']} */ ;
/** @type {__VLS_StyleScopedClasses['image-block']} */ ;
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
    ...{ class: "ion-padding news-detail-content" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "ion-padding news-detail-content" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['ion-padding']} */ ;
/** @type {__VLS_StyleScopedClasses['news-detail-content']} */ ;
const { default: __VLS_11 } = __VLS_nonNull(__VLS_9.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "detail-container" },
});
/** @type {__VLS_StyleScopedClasses['detail-container']} */ ;
if (loading.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "loading-state" },
    });
    /** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
    let __VLS_12;
    /** @ts-ignore @type { | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner'] | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner']} */
    ionSpinner;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        // @ts-ignore
        name: "crescent",
    }));
    const __VLS_14 = __VLS_13({
        name: "crescent",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
}
else if (article.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "detail-title" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-title']} */ ;
    (article.value.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "detail-meta" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-meta']} */ ;
    (formatDate(article.value.created_at));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "detail-body" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-body']} */ ;
    const __VLS_17 = __VLS_tryAsConstant((article.value.content));
    for (const [block, i] of __VLS_vFor(__VLS_nonNull(__VLS_17))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.template)({
            key: (i),
        });
        if (block.type === 'text') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: (['text-block', `style-${block.style || 'normal'}`]) },
            });
            /** @type {__VLS_StyleScopedClasses['text-block']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
            __VLS_asFunctionalDirective(__VLS_directives.vHtml, {})(__VLS_nonNull(null), { ...__VLS_directiveBindingRestFields, value: (renderText(block.content || '')), }, __VLS_nonNull(null), __VLS_nonNull(null));
        }
        else if (block.type === 'image' && block.url) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.figure, __VLS_intrinsics.figure)({
                ...{ class: "image-block" },
            });
            /** @type {__VLS_StyleScopedClasses['image-block']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
                src: (block.url),
                alt: "",
                loading: "lazy",
            });
            if (block.commentary) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.figcaption, __VLS_intrinsics.figcaption)({});
                (block.commentary);
            }
        }
        // @ts-ignore
        [loading, article, article, article, article,];
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "empty-state" },
    });
    /** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
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
