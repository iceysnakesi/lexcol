import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { onIonViewWillEnter // <--- 1. Import this from @ionic/vue
 } from '@ionic/vue';
import { useAuthStore } from '@/stores/authStore';
import { forumService } from '@/services/forumService';
import Search from '@/components/Search.vue';
import Pagination from '@/components/Pagination.vue';
const router = useRouter();
const authStore = useAuthStore();
const searchQuery = ref('');
const sortQuery = ref('newest');
const currentPage = ref(1);
const itemsPerPage = 10;
const totalPages = ref(1);
const loading = ref(false);
const posts = ref([]);
// 2. Replace onMounted (or keep it alongside) with onIonViewWillEnter
onIonViewWillEnter(() => {
    loadPosts();
});
// Watch search query changes to reset page and fetch
watch(searchQuery, () => {
    currentPage.value = 1;
    loadPosts();
});
// Watch pagination changes to fetch new page data
watch(currentPage, () => {
    loadPosts();
});
const loadPosts = async () => {
    loading.value = true;
    try {
        const data = await forumService.getPosts(currentPage.value, itemsPerPage, searchQuery.value, sortQuery.value);
        posts.value = data.posts;
        totalPages.value = data.totalPages;
    }
    catch (err) {
        console.error('Failed to load forum posts:', err);
    }
    finally {
        loading.value = false;
    }
};
const applyFilter = (filterType) => {
    sortQuery.value = filterType === 'oldest' ? 'oldest' : 'newest';
    currentPage.value = 1;
    loadPosts();
};
const viewPost = (id) => {
    router.push(`/forum/${id}`);
};
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
// @ts-ignore
__VLS_withDotValue(loading, {});
// @ts-ignore
__VLS_withDotValue(posts, {});
void {};
/** @type {__VLS_StyleScopedClasses['post-card']} */ ;
/** @type {__VLS_StyleScopedClasses['forum-scroll-container']} */ ;
/** @type {__VLS_StyleScopedClasses['search-container-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-container-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['posts-container']} */ ;
/** @type {__VLS_StyleScopedClasses['post-card']} */ ;
/** @type {__VLS_StyleScopedClasses['post-body-click']} */ ;
/** @type {__VLS_StyleScopedClasses['post-card']} */ ;
/** @type {__VLS_StyleScopedClasses['post-title']} */ ;
/** @type {__VLS_StyleScopedClasses['post-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['post-snippet']} */ ;
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
    ...{ class: "forum-scroll-container" },
});
/** @type {__VLS_StyleScopedClasses['forum-scroll-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "search-container-wrapper" },
});
/** @type {__VLS_StyleScopedClasses['search-container-wrapper']} */ ;
const __VLS_12 = Search;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    // @ts-ignore
    ...{ 'onFilter': {} }, modelValue: (__VLS_unwrap(searchQuery, {})),
}));
const __VLS_14 = __VLS_13({
    ...{ 'onFilter': {} },
    modelValue: (__VLS_unwrap(searchQuery, {})),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_17;
const __VLS_18 = {
    /** @type {typeof __VLS_17.filter} */
    onFilter: (__VLS_unwrap(applyFilter, {})),
};
void __VLS_18;
var __VLS_15;
var __VLS_16;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "posts-container" },
});
/** @type {__VLS_StyleScopedClasses['posts-container']} */ ;
if (loading.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "loading-state" },
    });
    /** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
    let __VLS_19;
    /** @ts-ignore @type { | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner'] | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner']} */
    ionSpinner;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
        // @ts-ignore
        name: "crescent",
    }));
    const __VLS_21 = __VLS_20({
        name: "crescent",
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
}
else if (posts.value.length > 0) {
    const __VLS_24 = __VLS_tryAsConstant((posts.value));
    for (const [post] of __VLS_vFor(__VLS_nonNull(__VLS_24))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (post.id),
            ...{ class: "post-card" },
        });
        /** @type {__VLS_StyleScopedClasses['post-card']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onClick: // @ts-ignore
                (...[$event]) => {
                    void $event;
                    if (!!(loading.value))
                        throw 0;
                    if (!(posts.value.length > 0))
                        throw 0;
                    return (__VLS_unwrap(viewPost, {})(post.id));
                    // @ts-ignore
                    [searchQuery, applyFilter, loading, posts, posts, viewPost,];
                } },
            ...{ class: "post-body-click" },
        });
        /** @type {__VLS_StyleScopedClasses['post-body-click']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
            ...{ class: "post-title" },
        });
        /** @type {__VLS_StyleScopedClasses['post-title']} */ ;
        (post.title);
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "post-meta" },
        });
        /** @type {__VLS_StyleScopedClasses['post-meta']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "author" },
        });
        /** @type {__VLS_StyleScopedClasses['author']} */ ;
        (post.author_name);
        (__VLS_unwrap(formatDate, {})(post.created_at));
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "post-snippet" },
        });
        /** @type {__VLS_StyleScopedClasses['post-snippet']} */ ;
        (post.content);
        // @ts-ignore
        [formatDate,];
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "empty-state" },
    });
    /** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "pagination-container-wrapper" },
});
/** @type {__VLS_StyleScopedClasses['pagination-container-wrapper']} */ ;
const __VLS_25 = Pagination;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    // @ts-ignore
    currentPage: (__VLS_unwrap(currentPage, {})), totalPages: (__VLS_unwrap(totalPages, {})),
}));
const __VLS_27 = __VLS_26({
    currentPage: (__VLS_unwrap(currentPage, {})),
    totalPages: (__VLS_unwrap(totalPages, {})),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
// @ts-ignore
[currentPage, totalPages,];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
