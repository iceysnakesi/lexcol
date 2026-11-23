import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { forumService } from '@/services/forumService';
const router = useRouter();
const title = ref('');
const content = ref('');
const loading = ref(false);
const errorMessage = ref(null);
const handleCreatePost = async () => {
    if (!title.value.trim() || !content.value.trim()) {
        errorMessage.value = 'Please fill out all required fields.';
        return;
    }
    loading.value = true;
    errorMessage.value = null;
    try {
        await forumService.createPost({
            title: title.value.trim(),
            content: content.value.trim(),
        });
        router.push('/forum');
    }
    catch (err) {
        console.error('Failed to create post:', err);
        errorMessage.value = err instanceof Error
            ? err.message
            : 'Failed to create post.';
    }
    finally {
        loading.value = false;
    }
};
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
// @ts-ignore
__VLS_withDotValue(errorMessage, {});
// @ts-ignore
__VLS_withDotValue(loading, {});
void {};
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "create-post-component" },
});
/** @type {__VLS_StyleScopedClasses['create-post-component']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
    ...{ onSubmit: (__VLS_unwrap(handleCreatePost, {})) },
});
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
ionItem;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    ...{ class: "custom-item" }, lines: "none",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "custom-item" },
    lines: "none",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['custom-item']} */ ;
const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.ionInput | typeof __VLS_components.IonInput | typeof __VLS_components['ion-input'] | typeof __VLS_components.ionInput | typeof __VLS_components.IonInput | typeof __VLS_components['ion-input']} */
ionInput;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    // @ts-ignore
    modelValue: (__VLS_unwrap(title, {})), label: "Post Title", labelPlacement: "stacked", type: "text", required: true, placeholder: "Enter discussion title...",
}));
const __VLS_8 = __VLS_7({
    modelValue: (__VLS_unwrap(title, {})),
    label: "Post Title",
    labelPlacement: "stacked",
    type: "text",
    required: true,
    placeholder: "Enter discussion title...",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
// @ts-ignore
[handleCreatePost, title,];
var __VLS_3;
let __VLS_11;
/** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
ionItem;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    // @ts-ignore
    ...{ class: "custom-item textarea-item" }, lines: "none",
}));
const __VLS_13 = __VLS_12({
    ...{ class: "custom-item textarea-item" },
    lines: "none",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
/** @type {__VLS_StyleScopedClasses['custom-item']} */ ;
/** @type {__VLS_StyleScopedClasses['textarea-item']} */ ;
const { default: __VLS_16 } = __VLS_nonNull(__VLS_14.slots);
let __VLS_17;
/** @ts-ignore @type { | typeof __VLS_components.ionTextarea | typeof __VLS_components.IonTextarea | typeof __VLS_components['ion-textarea'] | typeof __VLS_components.ionTextarea | typeof __VLS_components.IonTextarea | typeof __VLS_components['ion-textarea']} */
ionTextarea;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
    // @ts-ignore
    modelValue: (__VLS_unwrap(content, {})), label: "Content", labelPlacement: "stacked", rows: (6), required: true, placeholder: "Write your discussion content here...",
}));
const __VLS_19 = __VLS_18({
    modelValue: (__VLS_unwrap(content, {})),
    label: "Content",
    labelPlacement: "stacked",
    rows: (6),
    required: true,
    placeholder: "Write your discussion content here...",
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
// @ts-ignore
[content,];
var __VLS_14;
if (errorMessage.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "error-text" },
    });
    /** @type {__VLS_StyleScopedClasses['error-text']} */ ;
    (errorMessage.value);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "submit-btn-wrapper" },
});
/** @type {__VLS_StyleScopedClasses['submit-btn-wrapper']} */ ;
let __VLS_22;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
    // @ts-ignore
    expand: "block", type: "submit", disabled: (loading.value), ...{ class: "submit-btn" },
}));
const __VLS_24 = __VLS_23({
    expand: "block",
    type: "submit",
    disabled: (loading.value),
    ...{ class: "submit-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
/** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
const { default: __VLS_27 } = __VLS_nonNull(__VLS_25.slots);
if (loading.value) {
    let __VLS_28;
    /** @ts-ignore @type { | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner'] | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner']} */
    ionSpinner;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
        // @ts-ignore
        name: "crescent",
    }));
    const __VLS_30 = __VLS_29({
        name: "crescent",
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
// @ts-ignore
[errorMessage, errorMessage, loading, loading,];
var __VLS_25;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
