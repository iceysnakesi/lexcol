import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { onIonViewWillEnter } from '@ionic/vue';
import { chatbubbleOutline, returnUpBackOutline, pencilOutline, trashOutline } from 'ionicons/icons';
import { useAuthStore } from '@/stores/authStore';
import Pagination from '@/components/Pagination.vue';
import ReplyComposer from '@/components/ReplyComposer.vue';
import { forumService } from '@/services/forumService';
const route = useRoute();
const authStore = useAuthStore();
const post = ref(null);
const replies = ref([]);
const loading = ref(true);
// Pagination state for replies
const currentPage = ref(1);
const itemsPerPage = 5;
const totalReplies = ref(0);
// Active Reply Target State (controls which post/reply has an open reply form)
const activeReplyTarget = ref(null);
const replyContent = ref('');
const submitting = ref(false);
// Inline edit-reply state
const editingReplyId = ref(null);
const editReplyContent = ref('');
const editReplySubmitting = ref(false);
const totalPages = computed(() => Math.ceil(totalReplies.value / itemsPerPage) || 1);
// Sorted oldest to newest replies slice for current page
const paginatedReplies = computed(() => {
    // Sort oldest to newest first based on created_at
    const sorted = [...replies.value].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    const start = (currentPage.value - 1) * itemsPerPage;
    return sorted.slice(start, start + itemsPerPage);
});
const fetchPostDetails = async () => {
    const postId = String(route.params.id);
    loading.value = true;
    try {
        const response = await forumService.getPostDetails(postId);
        post.value = response.post;
        const fetchedReplies = response.replies || [];
        replies.value = fetchedReplies.sort((a, b) => new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime());
        totalReplies.value = replies.value.length;
    }
    catch (err) {
        console.error('Failed to load post details:', err);
    }
    finally {
        loading.value = false;
    }
};
onIonViewWillEnter(() => {
    fetchPostDetails();
});
// Toggle inline reply form for main post or a specific reply item
const toggleReplyForm = (type, id, authorName) => {
    if (activeReplyTarget.value?.type === type && activeReplyTarget.value?.id === id) {
        activeReplyTarget.value = null;
        replyContent.value = '';
    }
    else {
        activeReplyTarget.value = { type, id };
        replyContent.value = authorName ? `@${authorName} ` : '';
    }
};
const submitReply = async (parentReplyId) => {
    if (!replyContent.value.trim())
        return;
    submitting.value = true;
    try {
        const postId = String(route.params.id);
        const response = await forumService.createReply(postId, {
            content: replyContent.value.trim(),
            parent_reply_id: parentReplyId
        });
        replies.value.push(response);
        totalReplies.value = replies.value.length;
        // Move to the last page after submitting.
        currentPage.value = totalPages.value;
        // Reset the reply form.
        replyContent.value = '';
        activeReplyTarget.value = null;
    }
    catch (err) {
        console.error('Failed to submit reply:', err);
    }
    finally {
        submitting.value = false;
    }
};
const canEditReply = (reply) => {
    if (!authStore.user)
        return false;
    return String(reply.author_id) === String(authStore.user.id);
};
const canDeleteReply = (reply) => {
    if (!authStore.user)
        return false;
    if (authStore.user.role === 'admin')
        return true;
    return String(reply.author_id) === String(authStore.user.id);
};
const startEditReply = (reply) => {
    editingReplyId.value = reply.id;
    editReplyContent.value = reply.content;
    // Close any open reply composer
    activeReplyTarget.value = null;
    replyContent.value = '';
};
const cancelEditReply = () => {
    editingReplyId.value = null;
    editReplyContent.value = '';
};
const saveEditReply = async (replyId) => {
    if (!editReplyContent.value.trim())
        return;
    editReplySubmitting.value = true;
    try {
        const postId = String(route.params.id);
        const updated = await forumService.updateReply(postId, replyId, { content: editReplyContent.value.trim() });
        const idx = replies.value.findIndex(r => r.id === replyId);
        if (idx !== -1) {
            replies.value[idx] = { ...replies.value[idx], ...updated };
        }
        cancelEditReply();
    }
    catch (err) {
        console.error('Failed to edit reply:', err);
    }
    finally {
        editReplySubmitting.value = false;
    }
};
const deleteReply = async (reply) => {
    if (!confirm('Are you sure you want to delete this reply? This cannot be undone.')) {
        return;
    }
    try {
        const postId = String(route.params.id);
        await forumService.deleteReply(postId, reply.id);
    }
    catch (err) {
        // 404 means it was already deleted (e.g. by a moderator in another tab) — treat as success
        if (err?.response?.status !== 404) {
            console.error('Failed to delete reply:', err);
            return;
        }
    }
    replies.value = replies.value.filter((r) => r.id !== reply.id);
    totalReplies.value = replies.value.length;
    // If we deleted the last item on the last page, step back a page
    if (currentPage.value > totalPages.value) {
        currentPage.value = Math.max(1, totalPages.value);
    }
};
const initial = (name) => (name || 'U').trim().charAt(0).toUpperCase() || 'U';
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
// @ts-ignore
__VLS_withDotValue(loading, {});
// @ts-ignore
__VLS_withDotValue(post, {});
// @ts-ignore
__VLS_withDotValue(authStore, {});
// @ts-ignore
__VLS_withDotValue(activeReplyTarget, {});
// @ts-ignore
__VLS_withDotValue(paginatedReplies, {});
// @ts-ignore
__VLS_withDotValue(editingReplyId, {});
// @ts-ignore
__VLS_withDotValue(editReplySubmitting, {});
// @ts-ignore
__VLS_withDotValue(editReplyContent, {});
void {};
/** @type {__VLS_StyleScopedClasses['post-body']} */ ;
/** @type {__VLS_StyleScopedClasses['replies-section']} */ ;
/** @type {__VLS_StyleScopedClasses['post-avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['reply-avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['reply-item-action']} */ ;
/** @type {__VLS_StyleScopedClasses['post-detail-container']} */ ;
/** @type {__VLS_StyleScopedClasses['main-post-card']} */ ;
/** @type {__VLS_StyleScopedClasses['post-title']} */ ;
/** @type {__VLS_StyleScopedClasses['post-body']} */ ;
/** @type {__VLS_StyleScopedClasses['reply-card']} */ ;
/** @type {__VLS_StyleScopedClasses['replies-section']} */ ;
/** @type {__VLS_StyleScopedClasses['main-post-card']} */ ;
/** @type {__VLS_StyleScopedClasses['post-title']} */ ;
/** @type {__VLS_StyleScopedClasses['reply-card']} */ ;
/** @type {__VLS_StyleScopedClasses['reply-header']} */ ;
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
    ...{ class: "post-detail-container" },
});
/** @type {__VLS_StyleScopedClasses['post-detail-container']} */ ;
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
else if (post.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "main-post-card" },
    });
    /** @type {__VLS_StyleScopedClasses['main-post-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "post-title" },
    });
    /** @type {__VLS_StyleScopedClasses['post-title']} */ ;
    (post.value.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "post-meta" },
    });
    /** @type {__VLS_StyleScopedClasses['post-meta']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "author" },
    });
    /** @type {__VLS_StyleScopedClasses['author']} */ ;
    (post.value.author_name);
    let __VLS_17;
    /** @ts-ignore @type { | typeof __VLS_components.ionAvatar | typeof __VLS_components.IonAvatar | typeof __VLS_components['ion-avatar'] | typeof __VLS_components.ionAvatar | typeof __VLS_components.IonAvatar | typeof __VLS_components['ion-avatar']} */
    ionAvatar;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
        // @ts-ignore
        ...{ class: "post-avatar" },
    }));
    const __VLS_19 = __VLS_18({
        ...{ class: "post-avatar" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    /** @type {__VLS_StyleScopedClasses['post-avatar']} */ ;
    const { default: __VLS_22 } = __VLS_nonNull(__VLS_20.slots);
    if (post.value.author_avatar_url) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
            src: (post.value.author_avatar_url),
            alt: "",
        });
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "avatar-fallback" },
        });
        /** @type {__VLS_StyleScopedClasses['avatar-fallback']} */ ;
        (__VLS_unwrap(initial, {})(post.value.author_name));
    }
    // @ts-ignore
    [loading, post, post, post, post, post, post, initial,];
    var __VLS_20;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_unwrap(formatDate, {})(post.value.created_at));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "post-body" },
    });
    /** @type {__VLS_StyleScopedClasses['post-body']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (post.value.content);
    if (authStore.value.isAuthenticated) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card-footer-action" },
        });
        /** @type {__VLS_StyleScopedClasses['card-footer-action']} */ ;
        let __VLS_23;
        /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
        ionButton;
        // @ts-ignore
        const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
            // @ts-ignore
            ...{ 'onClick': {} }, size: "small", fill: "outline",
        }));
        const __VLS_25 = __VLS_24({
            ...{ 'onClick': {} },
            size: "small",
            fill: "outline",
        }, ...__VLS_functionalComponentArgsRest(__VLS_24));
        let __VLS_28;
        const __VLS_29 = {
            /** @type {typeof __VLS_28.click} */
            onClick: // @ts-ignore
            (...[$event]) => {
                void $event;
                if (!!(loading.value))
                    throw 0;
                if (!(post.value))
                    throw 0;
                if (!(authStore.value.isAuthenticated))
                    throw 0;
                return (__VLS_unwrap(toggleReplyForm, {})('main', post.value.id));
                // @ts-ignore
                [post, post, post, formatDate, authStore, toggleReplyForm,];
            },
        };
        void __VLS_29;
        const { default: __VLS_30 } = __VLS_nonNull(__VLS_26.slots);
        let __VLS_31;
        /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
        ionIcon;
        // @ts-ignore
        const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
            // @ts-ignore
            slot: "start", icon: (__VLS_unwrap(chatbubbleOutline, {})),
        }));
        const __VLS_33 = __VLS_32({
            slot: "start",
            icon: (__VLS_unwrap(chatbubbleOutline, {})),
        }, ...__VLS_functionalComponentArgsRest(__VLS_32));
        (activeReplyTarget.value?.type === 'main' ? 'Cancel' : 'Reply to Thread');
        // @ts-ignore
        [chatbubbleOutline, activeReplyTarget,];
        var __VLS_26;
        var __VLS_27;
    }
    if (activeReplyTarget.value?.type === 'main') {
        const __VLS_36 = ReplyComposer;
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
            // @ts-ignore
            ...{ 'onSubmit': {} }, modelValue: (__VLS_unwrap(replyContent, {})), rows: (3), placeholder: "Write your reply to this thread...", submitLabel: "Post Reply", submitting: (__VLS_unwrap(submitting, {})),
        }));
        const __VLS_38 = __VLS_37({
            ...{ 'onSubmit': {} },
            modelValue: (__VLS_unwrap(replyContent, {})),
            rows: (3),
            placeholder: "Write your reply to this thread...",
            submitLabel: "Post Reply",
            submitting: (__VLS_unwrap(submitting, {})),
        }, ...__VLS_functionalComponentArgsRest(__VLS_37));
        let __VLS_41;
        const __VLS_42 = {
            /** @type {typeof __VLS_41.submit} */
            onSubmit: // @ts-ignore
            (...[$event]) => {
                void $event;
                if (!!(loading.value))
                    throw 0;
                if (!(post.value))
                    throw 0;
                if (!(activeReplyTarget.value?.type === 'main'))
                    throw 0;
                return (__VLS_unwrap(submitReply, {})(null));
                // @ts-ignore
                [activeReplyTarget, replyContent, submitting, submitReply,];
            },
        };
        void __VLS_42;
        var __VLS_39;
        var __VLS_40;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "replies-section" },
    });
    /** @type {__VLS_StyleScopedClasses['replies-section']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    (__VLS_unwrap(totalReplies, {}));
    if (paginatedReplies.value.length > 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "replies-list" },
        });
        /** @type {__VLS_StyleScopedClasses['replies-list']} */ ;
        const __VLS_43 = __VLS_tryAsConstant((paginatedReplies.value));
        for (const [reply] of __VLS_vFor(__VLS_nonNull(__VLS_43))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                key: (reply.id),
                ...{ class: "reply-card" },
            });
            /** @type {__VLS_StyleScopedClasses['reply-card']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "reply-header" },
            });
            /** @type {__VLS_StyleScopedClasses['reply-header']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "reply-author-info" },
            });
            /** @type {__VLS_StyleScopedClasses['reply-author-info']} */ ;
            let __VLS_44;
            /** @ts-ignore @type { | typeof __VLS_components.ionAvatar | typeof __VLS_components.IonAvatar | typeof __VLS_components['ion-avatar'] | typeof __VLS_components.ionAvatar | typeof __VLS_components.IonAvatar | typeof __VLS_components['ion-avatar']} */
            ionAvatar;
            // @ts-ignore
            const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({
                // @ts-ignore
                ...{ class: "reply-avatar" },
            }));
            const __VLS_46 = __VLS_45({
                ...{ class: "reply-avatar" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_45));
            /** @type {__VLS_StyleScopedClasses['reply-avatar']} */ ;
            const { default: __VLS_49 } = __VLS_nonNull(__VLS_47.slots);
            if (reply.author_avatar_url) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
                    src: (reply.author_avatar_url),
                    alt: "",
                });
            }
            else {
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "avatar-fallback" },
                });
                /** @type {__VLS_StyleScopedClasses['avatar-fallback']} */ ;
                (__VLS_unwrap(initial, {})(reply.author_name));
            }
            // @ts-ignore
            [initial, totalReplies, paginatedReplies, paginatedReplies,];
            var __VLS_47;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "reply-author" },
            });
            /** @type {__VLS_StyleScopedClasses['reply-author']} */ ;
            (reply.author_name);
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "reply-date" },
            });
            /** @type {__VLS_StyleScopedClasses['reply-date']} */ ;
            (__VLS_unwrap(formatDate, {})(reply.created_at));
            if (editingReplyId.value === reply.id) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "inline-edit-box" },
                });
                /** @type {__VLS_StyleScopedClasses['inline-edit-box']} */ ;
                let __VLS_50;
                /** @ts-ignore @type { | typeof __VLS_components.ionTextarea | typeof __VLS_components.IonTextarea | typeof __VLS_components['ion-textarea']} */
                ionTextarea;
                // @ts-ignore
                const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
                    // @ts-ignore
                    modelValue: (editReplyContent.value), rows: (2), placeholder: "Edit your reply...", autoGrow: true,
                }));
                const __VLS_52 = __VLS_51({
                    modelValue: (editReplyContent.value),
                    rows: (2),
                    placeholder: "Edit your reply...",
                    autoGrow: true,
                }, ...__VLS_functionalComponentArgsRest(__VLS_51));
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "edit-actions" },
                });
                /** @type {__VLS_StyleScopedClasses['edit-actions']} */ ;
                let __VLS_55;
                /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
                ionButton;
                // @ts-ignore
                const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
                    // @ts-ignore
                    ...{ 'onClick': {} }, size: "small", fill: "clear",
                }));
                const __VLS_57 = __VLS_56({
                    ...{ 'onClick': {} },
                    size: "small",
                    fill: "clear",
                }, ...__VLS_functionalComponentArgsRest(__VLS_56));
                let __VLS_60;
                const __VLS_61 = {
                    /** @type {typeof __VLS_60.click} */
                    onClick: (__VLS_unwrap(cancelEditReply, {})),
                };
                void __VLS_61;
                const { default: __VLS_62 } = __VLS_nonNull(__VLS_58.slots);
                // @ts-ignore
                [formatDate, editingReplyId, editReplyContent, cancelEditReply,];
                var __VLS_58;
                var __VLS_59;
                let __VLS_63;
                /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
                ionButton;
                // @ts-ignore
                const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
                    // @ts-ignore
                    ...{ 'onClick': {} }, size: "small", disabled: (editReplySubmitting.value || !editReplyContent.value.trim()),
                }));
                const __VLS_65 = __VLS_64({
                    ...{ 'onClick': {} },
                    size: "small",
                    disabled: (editReplySubmitting.value || !editReplyContent.value.trim()),
                }, ...__VLS_functionalComponentArgsRest(__VLS_64));
                let __VLS_68;
                const __VLS_69 = {
                    /** @type {typeof __VLS_68.click} */
                    onClick: // @ts-ignore
                    (...[$event]) => {
                        void $event;
                        if (!!(loading.value))
                            throw 0;
                        if (!(post.value))
                            throw 0;
                        if (!(paginatedReplies.value.length > 0))
                            throw 0;
                        if (!(editingReplyId.value === reply.id))
                            throw 0;
                        return (__VLS_unwrap(saveEditReply, {})(reply.id));
                        // @ts-ignore
                        [editReplyContent, editReplySubmitting, saveEditReply,];
                    },
                };
                void __VLS_69;
                const { default: __VLS_70 } = __VLS_nonNull(__VLS_66.slots);
                if (editReplySubmitting.value) {
                    let __VLS_71;
                    /** @ts-ignore @type { | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner']} */
                    ionSpinner;
                    // @ts-ignore
                    const __VLS_72 = __VLS_asFunctionalComponent1(__VLS_71, new __VLS_71({
                        // @ts-ignore
                        name: "crescent",
                    }));
                    const __VLS_73 = __VLS_72({
                        name: "crescent",
                    }, ...__VLS_functionalComponentArgsRest(__VLS_72));
                }
                else {
                    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
                }
                // @ts-ignore
                [editReplySubmitting,];
                var __VLS_66;
                var __VLS_67;
            }
            else {
                __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                    ...{ class: "reply-content" },
                });
                /** @type {__VLS_StyleScopedClasses['reply-content']} */ ;
                (reply.content);
            }
            if (authStore.value.isAuthenticated) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "reply-item-action" },
                });
                /** @type {__VLS_StyleScopedClasses['reply-item-action']} */ ;
                if (__VLS_unwrap(canEditReply, {})(reply) && editingReplyId.value !== reply.id) {
                    let __VLS_76;
                    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
                    ionButton;
                    // @ts-ignore
                    const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({
                        // @ts-ignore
                        ...{ 'onClick': {} }, size: "small", fill: "clear",
                    }));
                    const __VLS_78 = __VLS_77({
                        ...{ 'onClick': {} },
                        size: "small",
                        fill: "clear",
                    }, ...__VLS_functionalComponentArgsRest(__VLS_77));
                    let __VLS_81;
                    const __VLS_82 = {
                        /** @type {typeof __VLS_81.click} */
                        onClick: // @ts-ignore
                        (...[$event]) => {
                            void $event;
                            if (!!(loading.value))
                                throw 0;
                            if (!(post.value))
                                throw 0;
                            if (!(paginatedReplies.value.length > 0))
                                throw 0;
                            if (!(authStore.value.isAuthenticated))
                                throw 0;
                            if (!(__VLS_unwrap(canEditReply, {})(reply) && editingReplyId.value !== reply.id))
                                throw 0;
                            return (__VLS_unwrap(startEditReply, {})(reply));
                            // @ts-ignore
                            [authStore, editingReplyId, canEditReply, startEditReply,];
                        },
                    };
                    void __VLS_82;
                    const { default: __VLS_83 } = __VLS_nonNull(__VLS_79.slots);
                    let __VLS_84;
                    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
                    ionIcon;
                    // @ts-ignore
                    const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({
                        // @ts-ignore
                        slot: "start", icon: (__VLS_unwrap(pencilOutline, {})),
                    }));
                    const __VLS_86 = __VLS_85({
                        slot: "start",
                        icon: (__VLS_unwrap(pencilOutline, {})),
                    }, ...__VLS_functionalComponentArgsRest(__VLS_85));
                    // @ts-ignore
                    [pencilOutline,];
                    var __VLS_79;
                    var __VLS_80;
                }
                if (__VLS_unwrap(canDeleteReply, {})(reply) && editingReplyId.value !== reply.id) {
                    let __VLS_89;
                    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
                    ionButton;
                    // @ts-ignore
                    const __VLS_90 = __VLS_asFunctionalComponent1(__VLS_89, new __VLS_89({
                        // @ts-ignore
                        ...{ 'onClick': {} }, size: "small", fill: "clear", color: "danger",
                    }));
                    const __VLS_91 = __VLS_90({
                        ...{ 'onClick': {} },
                        size: "small",
                        fill: "clear",
                        color: "danger",
                    }, ...__VLS_functionalComponentArgsRest(__VLS_90));
                    let __VLS_94;
                    const __VLS_95 = {
                        /** @type {typeof __VLS_94.click} */
                        onClick: // @ts-ignore
                        (...[$event]) => {
                            void $event;
                            if (!!(loading.value))
                                throw 0;
                            if (!(post.value))
                                throw 0;
                            if (!(paginatedReplies.value.length > 0))
                                throw 0;
                            if (!(authStore.value.isAuthenticated))
                                throw 0;
                            if (!(__VLS_unwrap(canDeleteReply, {})(reply) && editingReplyId.value !== reply.id))
                                throw 0;
                            return (__VLS_unwrap(deleteReply, {})(reply));
                            // @ts-ignore
                            [editingReplyId, canDeleteReply, deleteReply,];
                        },
                    };
                    void __VLS_95;
                    const { default: __VLS_96 } = __VLS_nonNull(__VLS_92.slots);
                    let __VLS_97;
                    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
                    ionIcon;
                    // @ts-ignore
                    const __VLS_98 = __VLS_asFunctionalComponent1(__VLS_97, new __VLS_97({
                        // @ts-ignore
                        slot: "start", icon: (__VLS_unwrap(trashOutline, {})),
                    }));
                    const __VLS_99 = __VLS_98({
                        slot: "start",
                        icon: (__VLS_unwrap(trashOutline, {})),
                    }, ...__VLS_functionalComponentArgsRest(__VLS_98));
                    // @ts-ignore
                    [trashOutline,];
                    var __VLS_92;
                    var __VLS_93;
                }
                let __VLS_102;
                /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
                ionButton;
                // @ts-ignore
                const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({
                    // @ts-ignore
                    ...{ 'onClick': {} }, size: "small", fill: "clear",
                }));
                const __VLS_104 = __VLS_103({
                    ...{ 'onClick': {} },
                    size: "small",
                    fill: "clear",
                }, ...__VLS_functionalComponentArgsRest(__VLS_103));
                let __VLS_107;
                const __VLS_108 = {
                    /** @type {typeof __VLS_107.click} */
                    onClick: // @ts-ignore
                    (...[$event]) => {
                        void $event;
                        if (!!(loading.value))
                            throw 0;
                        if (!(post.value))
                            throw 0;
                        if (!(paginatedReplies.value.length > 0))
                            throw 0;
                        if (!(authStore.value.isAuthenticated))
                            throw 0;
                        return (__VLS_unwrap(toggleReplyForm, {})('reply', reply.id, reply.author_name));
                        // @ts-ignore
                        [toggleReplyForm,];
                    },
                };
                void __VLS_108;
                const { default: __VLS_109 } = __VLS_nonNull(__VLS_105.slots);
                let __VLS_110;
                /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
                ionIcon;
                // @ts-ignore
                const __VLS_111 = __VLS_asFunctionalComponent1(__VLS_110, new __VLS_110({
                    // @ts-ignore
                    slot: "start", icon: (__VLS_unwrap(returnUpBackOutline, {})),
                }));
                const __VLS_112 = __VLS_111({
                    slot: "start",
                    icon: (__VLS_unwrap(returnUpBackOutline, {})),
                }, ...__VLS_functionalComponentArgsRest(__VLS_111));
                (activeReplyTarget.value?.id === reply.id ? 'Cancel' : `Reply to ${reply.author_name}`);
                // @ts-ignore
                [activeReplyTarget, returnUpBackOutline,];
                var __VLS_105;
                var __VLS_106;
            }
            if (activeReplyTarget.value?.type === 'reply' && activeReplyTarget.value?.id === reply.id) {
                const __VLS_115 = ReplyComposer;
                // @ts-ignore
                const __VLS_116 = __VLS_asFunctionalComponent1(__VLS_115, new __VLS_115({
                    // @ts-ignore
                    ...{ 'onSubmit': {} }, modelValue: (__VLS_unwrap(replyContent, {})), rows: (2), placeholder: (`Replying to ${reply.author_name}...`), submitLabel: "Send Reply", submitting: (__VLS_unwrap(submitting, {})), nested: true,
                }));
                const __VLS_117 = __VLS_116({
                    ...{ 'onSubmit': {} },
                    modelValue: (__VLS_unwrap(replyContent, {})),
                    rows: (2),
                    placeholder: (`Replying to ${reply.author_name}...`),
                    submitLabel: "Send Reply",
                    submitting: (__VLS_unwrap(submitting, {})),
                    nested: true,
                }, ...__VLS_functionalComponentArgsRest(__VLS_116));
                let __VLS_120;
                const __VLS_121 = {
                    /** @type {typeof __VLS_120.submit} */
                    onSubmit: // @ts-ignore
                    (...[$event]) => {
                        void $event;
                        if (!!(loading.value))
                            throw 0;
                        if (!(post.value))
                            throw 0;
                        if (!(paginatedReplies.value.length > 0))
                            throw 0;
                        if (!(activeReplyTarget.value?.type === 'reply' && activeReplyTarget.value?.id === reply.id))
                            throw 0;
                        return (__VLS_unwrap(submitReply, {})(reply.id));
                        // @ts-ignore
                        [activeReplyTarget, activeReplyTarget, replyContent, submitting, submitReply,];
                    },
                };
                void __VLS_121;
                var __VLS_118;
                var __VLS_119;
            }
            // @ts-ignore
            [];
        }
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "empty-replies" },
        });
        /** @type {__VLS_StyleScopedClasses['empty-replies']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    }
    if (__VLS_unwrap(totalPages, {}) > 1) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "pagination-container-wrapper" },
        });
        /** @type {__VLS_StyleScopedClasses['pagination-container-wrapper']} */ ;
        const __VLS_122 = Pagination;
        // @ts-ignore
        const __VLS_123 = __VLS_asFunctionalComponent1(__VLS_122, new __VLS_122({
            // @ts-ignore
            currentPage: (__VLS_unwrap(currentPage, {})), totalPages: (__VLS_unwrap(totalPages, {})),
        }));
        const __VLS_124 = __VLS_123({
            currentPage: (__VLS_unwrap(currentPage, {})),
            totalPages: (__VLS_unwrap(totalPages, {})),
        }, ...__VLS_functionalComponentArgsRest(__VLS_123));
    }
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
