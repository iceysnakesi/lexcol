import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { forumService } from '@/services/forumService';
const route = useRoute();
const router = useRouter();
const post = ref(null);
const title = ref('');
const content = ref('');
const loading = ref(true);
const saving = ref(false);
const errorMessage = ref(null);
const fetchPost = async () => {
    loading.value = true;
    try {
        const id = String(route.params.id);
        const data = await forumService.getAdminPost(id);
        post.value = data;
        title.value = data.title;
        content.value = data.content;
    }
    catch (err) {
        console.error('Failed to load post:', err);
        errorMessage.value = 'Failed to load post.';
    }
    finally {
        loading.value = false;
    }
};
const handleSave = async () => {
    if (!title.value.trim() || !content.value.trim()) {
        errorMessage.value = 'Title and content are required.';
        return;
    }
    saving.value = true;
    errorMessage.value = null;
    try {
        const id = Number(route.params.id);
        await forumService.updatePost(id, {
            title: title.value.trim(),
            content: content.value.trim(),
        });
        router.push('/postmanagement');
    }
    catch (err) {
        console.error('Failed to update post:', err);
        errorMessage.value = 'Failed to save changes.';
    }
    finally {
        saving.value = false;
    }
};
const cancel = () => {
    router.push('/postmanagement');
};
onMounted(fetchPost);
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
__VLS_withDotValue(errorMessage, {});
// @ts-ignore
__VLS_withDotValue(saving, {});
void {};
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
    ...{ class: "edit-post-container" },
});
/** @type {__VLS_StyleScopedClasses['edit-post-container']} */ ;
if (loading.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ion-text-center ion-padding" },
    });
    /** @type {__VLS_StyleScopedClasses['ion-text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['ion-padding']} */ ;
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
        ...{ class: "edit-post-card" },
    });
    /** @type {__VLS_StyleScopedClasses['edit-post-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "section-title" },
    });
    /** @type {__VLS_StyleScopedClasses['section-title']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
        ...{ onSubmit: (__VLS_unwrap(handleSave, {})) },
    });
    let __VLS_17;
    /** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
    ionItem;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
        // @ts-ignore
        ...{ class: "custom-item" }, lines: "none",
    }));
    const __VLS_19 = __VLS_18({
        ...{ class: "custom-item" },
        lines: "none",
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    /** @type {__VLS_StyleScopedClasses['custom-item']} */ ;
    const { default: __VLS_22 } = __VLS_nonNull(__VLS_20.slots);
    let __VLS_23;
    /** @ts-ignore @type { | typeof __VLS_components.ionInput | typeof __VLS_components.IonInput | typeof __VLS_components['ion-input'] | typeof __VLS_components.ionInput | typeof __VLS_components.IonInput | typeof __VLS_components['ion-input']} */
    ionInput;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
        // @ts-ignore
        modelValue: (__VLS_unwrap(title, {})), label: "Post Title", labelPlacement: "stacked", type: "text", required: true,
    }));
    const __VLS_25 = __VLS_24({
        modelValue: (__VLS_unwrap(title, {})),
        label: "Post Title",
        labelPlacement: "stacked",
        type: "text",
        required: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    // @ts-ignore
    [loading, post, handleSave, title,];
    var __VLS_20;
    let __VLS_28;
    /** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
    ionItem;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
        // @ts-ignore
        ...{ class: "custom-item textarea-item" }, lines: "none",
    }));
    const __VLS_30 = __VLS_29({
        ...{ class: "custom-item textarea-item" },
        lines: "none",
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    /** @type {__VLS_StyleScopedClasses['custom-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['textarea-item']} */ ;
    const { default: __VLS_33 } = __VLS_nonNull(__VLS_31.slots);
    let __VLS_34;
    /** @ts-ignore @type { | typeof __VLS_components.ionTextarea | typeof __VLS_components.IonTextarea | typeof __VLS_components['ion-textarea'] | typeof __VLS_components.ionTextarea | typeof __VLS_components.IonTextarea | typeof __VLS_components['ion-textarea']} */
    ionTextarea;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
        // @ts-ignore
        modelValue: (__VLS_unwrap(content, {})), label: "Content", labelPlacement: "stacked", rows: (8), required: true,
    }));
    const __VLS_36 = __VLS_35({
        modelValue: (__VLS_unwrap(content, {})),
        label: "Content",
        labelPlacement: "stacked",
        rows: (8),
        required: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    // @ts-ignore
    [content,];
    var __VLS_31;
    if (errorMessage.value) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "error-text" },
        });
        /** @type {__VLS_StyleScopedClasses['error-text']} */ ;
        (errorMessage.value);
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "actions-row" },
    });
    /** @type {__VLS_StyleScopedClasses['actions-row']} */ ;
    let __VLS_39;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
        // @ts-ignore
        ...{ 'onClick': {} }, fill: "clear", type: "button",
    }));
    const __VLS_41 = __VLS_40({
        ...{ 'onClick': {} },
        fill: "clear",
        type: "button",
    }, ...__VLS_functionalComponentArgsRest(__VLS_40));
    let __VLS_44;
    const __VLS_45 = {
        /** @type {typeof __VLS_44.click} */
        onClick: (__VLS_unwrap(cancel, {})),
    };
    void __VLS_45;
    const { default: __VLS_46 } = __VLS_nonNull(__VLS_42.slots);
    // @ts-ignore
    [errorMessage, errorMessage, cancel,];
    var __VLS_42;
    var __VLS_43;
    let __VLS_47;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
        // @ts-ignore
        type: "submit", disabled: (saving.value),
    }));
    const __VLS_49 = __VLS_48({
        type: "submit",
        disabled: (saving.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_48));
    const { default: __VLS_52 } = __VLS_nonNull(__VLS_50.slots);
    if (saving.value) {
        let __VLS_53;
        /** @ts-ignore @type { | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner'] | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner']} */
        ionSpinner;
        // @ts-ignore
        const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({
            // @ts-ignore
            name: "crescent",
        }));
        const __VLS_55 = __VLS_54({
            name: "crescent",
        }, ...__VLS_functionalComponentArgsRest(__VLS_54));
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    }
    // @ts-ignore
    [saving, saving,];
    var __VLS_50;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "empty-state" },
    });
    /** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (errorMessage.value || 'Post not found.');
}
// @ts-ignore
[errorMessage,];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
