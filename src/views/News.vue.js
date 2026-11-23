import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { onIonViewWillEnter } from '@ionic/vue';
import { useAuthStore } from '@/stores/authStore';
import Search from '@/components/Search.vue';
import Pagination from '@/components/Pagination.vue';
import NewsCard from '@/components/NewsCard.vue';
import MessageOfTheDay from '@/components/MessageOfTheDay.vue';
import { newsService } from '@/services/newsService';
const router = useRouter();
const authStore = useAuthStore();
const isAdmin = computed(() => authStore.user?.role === 'admin');
const articles = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const totalPages = ref(1);
const loading = ref(true);
const itemsPerPage = 6;
// Watch search changes
import { watch } from 'vue';
watch(searchQuery, () => {
    currentPage.value = 1;
    loadNews();
});
watch(currentPage, () => loadNews());
onIonViewWillEnter(() => {
    loadNews();
});
async function loadNews() {
    loading.value = true;
    try {
        const data = await newsService.getNews(currentPage.value, itemsPerPage, searchQuery.value);
        articles.value = data.news;
        totalPages.value = data.totalPages;
    }
    catch (err) {
        console.error('Failed to load news:', err);
    }
    finally {
        loading.value = false;
    }
}
function openArticle(id) {
    router.push(`/news/${id}`);
}
async function handleToggle(id) {
    try {
        await newsService.toggleVisibility(id);
        await loadNews();
    }
    catch (err) {
        console.error('Failed to toggle article:', err);
    }
}
async function handleDelete(id) {
    if (!confirm('Delete this article permanently?'))
        return;
    try {
        await newsService.deleteNews(id);
        await loadNews();
    }
    catch (err) {
        console.error('Failed to delete article:', err);
    }
}
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
// @ts-ignore
__VLS_withDotValue(authStore, {});
// @ts-ignore
__VLS_withDotValue(loading, {});
// @ts-ignore
__VLS_withDotValue(articles, {});
void {};
/** @type {__VLS_StyleScopedClasses['news-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
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
    ...{ class: "news-content" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "news-content" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['news-content']} */ ;
const { default: __VLS_11 } = __VLS_nonNull(__VLS_9.slots);
if (authStore.value.isAuthenticated) {
    const __VLS_12 = MessageOfTheDay;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    // @ts-ignore
    }));
    const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "news-container" },
});
/** @type {__VLS_StyleScopedClasses['news-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "news-header" },
});
/** @type {__VLS_StyleScopedClasses['news-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "page-title" },
});
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
const __VLS_17 = Search;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
    // @ts-ignore
    modelValue: (__VLS_unwrap(searchQuery, {})), placeholder: "Search news...", hideFilter: true, adminButtonLabel: "Create News", adminButtonRoute: "/news/create",
}));
const __VLS_19 = __VLS_18({
    modelValue: (__VLS_unwrap(searchQuery, {})),
    placeholder: "Search news...",
    hideFilter: true,
    adminButtonLabel: "Create News",
    adminButtonRoute: "/news/create",
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
if (loading.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "loading-state" },
    });
    /** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
    let __VLS_22;
    /** @ts-ignore @type { | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner'] | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner']} */
    ionSpinner;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
        // @ts-ignore
        name: "crescent",
    }));
    const __VLS_24 = __VLS_23({
        name: "crescent",
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
}
else if (articles.value.length > 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "news-feed" },
    });
    /** @type {__VLS_StyleScopedClasses['news-feed']} */ ;
    const __VLS_27 = __VLS_tryAsConstant((articles.value));
    for (const [article] of __VLS_vFor(__VLS_nonNull(__VLS_27))) {
        const __VLS_28 = NewsCard;
        // @ts-ignore
        const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
            // @ts-ignore
            ...{ 'onOpen': {} }, ...{ 'onToggle': {} }, ...{ 'onDelete': {} }, key: (article.id), news: (article), isAdmin: (__VLS_unwrap(isAdmin, {})),
        }));
        const __VLS_30 = __VLS_29({
            ...{ 'onOpen': {} },
            ...{ 'onToggle': {} },
            ...{ 'onDelete': {} },
            key: (article.id),
            news: (article),
            isAdmin: (__VLS_unwrap(isAdmin, {})),
        }, ...__VLS_functionalComponentArgsRest(__VLS_29));
        let __VLS_33;
        const __VLS_34 = {
            /** @type {typeof __VLS_33.open} */
            onOpen: (openArticle),
        };
        void __VLS_34;
        const __VLS_35 = {
            /** @type {typeof __VLS_33.toggle} */
            onToggle: (handleToggle),
        };
        void __VLS_35;
        const __VLS_36 = {
            /** @type {typeof __VLS_33.delete} */
            onDelete: (handleDelete),
        };
        void __VLS_36;
        var __VLS_31;
        var __VLS_32;
        // @ts-ignore
        [authStore, searchQuery, loading, articles, articles, isAdmin,];
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
    const __VLS_37 = Pagination;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
        // @ts-ignore
        currentPage: (__VLS_unwrap(currentPage, {})), totalPages: (__VLS_unwrap(totalPages, {})),
    }));
    const __VLS_39 = __VLS_38({
        currentPage: (__VLS_unwrap(currentPage, {})),
        totalPages: (__VLS_unwrap(totalPages, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
}
// @ts-ignore
[totalPages, totalPages, currentPage,];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
