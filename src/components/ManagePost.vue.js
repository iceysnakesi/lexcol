import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { createOutline, eyeOutline, eyeOffOutline, trashOutline } from 'ionicons/icons';
import { forumService } from '@/services/forumService';
const router = useRouter();
const posts = ref([]);
const loading = ref(false);
const loadPosts = async () => {
    loading.value = true;
    try {
        const data = await forumService.getAdminPosts(1, 50);
        posts.value = data.posts;
    }
    catch (err) {
        console.error('Failed to load posts for management:', err);
    }
    finally {
        loading.value = false;
    }
};
onMounted(() => {
    loadPosts();
});
const editPost = (id) => {
    router.push(`/forum/edit/${id}`);
};
const toggleVisibility = async (id) => {
    try {
        await forumService.toggleVisibility(id);
        await loadPosts();
    }
    catch (err) {
        console.error('Failed to toggle visibility:', err);
    }
};
const deletePost = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this post? This action cannot be undone.')) {
        return;
    }
    try {
        await forumService.deletePost(id);
        await loadPosts();
    }
    catch (err) {
        console.error('Failed to delete post:', err);
    }
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
/** @type {__VLS_StyleScopedClasses['post-info']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "manage-post-component" },
});
/** @type {__VLS_StyleScopedClasses['manage-post-component']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
if (loading.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ion-text-center ion-padding" },
    });
    /** @type {__VLS_StyleScopedClasses['ion-text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['ion-padding']} */ ;
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner'] | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner']} */
    ionSpinner;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        // @ts-ignore
        name: "crescent",
    }));
    const __VLS_2 = __VLS_1({
        name: "crescent",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
else if (posts.value.length > 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "manage-list" },
    });
    /** @type {__VLS_StyleScopedClasses['manage-list']} */ ;
    const __VLS_5 = __VLS_tryAsConstant((posts.value));
    for (const [post] of __VLS_vFor(__VLS_nonNull(__VLS_5))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (post.id),
            ...{ class: "manage-item-card" },
        });
        /** @type {__VLS_StyleScopedClasses['manage-item-card']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "post-info" },
        });
        /** @type {__VLS_StyleScopedClasses['post-info']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
        (post.title);
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
        (post.author_name);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: (post.is_hidden ? 'text-hidden' : 'text-active') },
        });
        (post.is_hidden ? 'Hidden' : 'Visible');
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "manage-actions" },
        });
        /** @type {__VLS_StyleScopedClasses['manage-actions']} */ ;
        let __VLS_6;
        /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
        ionButton;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
            // @ts-ignore
            ...{ 'onClick': {} }, size: "small", fill: "clear", color: "primary", title: "Edit Post",
        }));
        const __VLS_8 = __VLS_7({
            ...{ 'onClick': {} },
            size: "small",
            fill: "clear",
            color: "primary",
            title: "Edit Post",
        }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        let __VLS_11;
        const __VLS_12 = {
            /** @type {typeof __VLS_11.click} */
            onClick: // @ts-ignore
            (...[$event]) => {
                void $event;
                if (!!(loading.value))
                    throw 0;
                if (!(posts.value.length > 0))
                    throw 0;
                return (__VLS_unwrap(editPost, {})(post.id));
                // @ts-ignore
                [loading, posts, posts, editPost,];
            },
        };
        void __VLS_12;
        const { default: __VLS_13 } = __VLS_nonNull(__VLS_9.slots);
        let __VLS_14;
        /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
        ionIcon;
        // @ts-ignore
        const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
            // @ts-ignore
            slot: "icon-only", icon: (__VLS_unwrap(createOutline, {})),
        }));
        const __VLS_16 = __VLS_15({
            slot: "icon-only",
            icon: (__VLS_unwrap(createOutline, {})),
        }, ...__VLS_functionalComponentArgsRest(__VLS_15));
        // @ts-ignore
        [createOutline,];
        var __VLS_9;
        var __VLS_10;
        let __VLS_19;
        /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
        ionButton;
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
            // @ts-ignore
            ...{ 'onClick': {} }, size: "small", fill: "clear", color: (post.is_hidden ? 'success' : 'warning'), title: (post.is_hidden ? 'Show Post' : 'Hide Post'),
        }));
        const __VLS_21 = __VLS_20({
            ...{ 'onClick': {} },
            size: "small",
            fill: "clear",
            color: (post.is_hidden ? 'success' : 'warning'),
            title: (post.is_hidden ? 'Show Post' : 'Hide Post'),
        }, ...__VLS_functionalComponentArgsRest(__VLS_20));
        let __VLS_24;
        const __VLS_25 = {
            /** @type {typeof __VLS_24.click} */
            onClick: // @ts-ignore
            (...[$event]) => {
                void $event;
                if (!!(loading.value))
                    throw 0;
                if (!(posts.value.length > 0))
                    throw 0;
                return (__VLS_unwrap(toggleVisibility, {})(post.id));
                // @ts-ignore
                [toggleVisibility,];
            },
        };
        void __VLS_25;
        const { default: __VLS_26 } = __VLS_nonNull(__VLS_22.slots);
        let __VLS_27;
        /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
        ionIcon;
        // @ts-ignore
        const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
            // @ts-ignore
            slot: "icon-only", icon: (post.is_hidden ? __VLS_unwrap(eyeOutline, {}) : __VLS_unwrap(eyeOffOutline, {})),
        }));
        const __VLS_29 = __VLS_28({
            slot: "icon-only",
            icon: (post.is_hidden ? __VLS_unwrap(eyeOutline, {}) : __VLS_unwrap(eyeOffOutline, {})),
        }, ...__VLS_functionalComponentArgsRest(__VLS_28));
        // @ts-ignore
        [eyeOutline, eyeOffOutline,];
        var __VLS_22;
        var __VLS_23;
        let __VLS_32;
        /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
        ionButton;
        // @ts-ignore
        const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
            // @ts-ignore
            ...{ 'onClick': {} }, size: "small", fill: "clear", color: "danger", title: "Delete Post",
        }));
        const __VLS_34 = __VLS_33({
            ...{ 'onClick': {} },
            size: "small",
            fill: "clear",
            color: "danger",
            title: "Delete Post",
        }, ...__VLS_functionalComponentArgsRest(__VLS_33));
        let __VLS_37;
        const __VLS_38 = {
            /** @type {typeof __VLS_37.click} */
            onClick: // @ts-ignore
            (...[$event]) => {
                void $event;
                if (!!(loading.value))
                    throw 0;
                if (!(posts.value.length > 0))
                    throw 0;
                return (__VLS_unwrap(deletePost, {})(post.id));
                // @ts-ignore
                [deletePost,];
            },
        };
        void __VLS_38;
        const { default: __VLS_39 } = __VLS_nonNull(__VLS_35.slots);
        let __VLS_40;
        /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
        ionIcon;
        // @ts-ignore
        const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
            // @ts-ignore
            slot: "icon-only", icon: (__VLS_unwrap(trashOutline, {})),
        }));
        const __VLS_42 = __VLS_41({
            slot: "icon-only",
            icon: (__VLS_unwrap(trashOutline, {})),
        }, ...__VLS_functionalComponentArgsRest(__VLS_41));
        // @ts-ignore
        [trashOutline,];
        var __VLS_35;
        var __VLS_36;
        // @ts-ignore
        [];
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
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
