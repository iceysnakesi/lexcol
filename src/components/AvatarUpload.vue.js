import { ref, computed, onUnmounted } from 'vue';
import { personOutline } from 'ionicons/icons';
const emit = defineEmits();
const props = defineProps();
const currentAvatar = computed(() => props.currentAvatar);
const selectedFile = ref(null);
const previewUrl = ref(null);
const errorMessage = ref('');
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp'
];
const handleFileSelection = (event) => {
    const input = event.target;
    const file = input.files?.[0];
    errorMessage.value = '';
    if (!file)
        return;
    if (!ALLOWED_TYPES.includes(file.type)) {
        errorMessage.value = 'Please select a JPEG, PNG or WebP image.';
        input.value = '';
        return;
    }
    if (file.size > MAX_FILE_SIZE) {
        errorMessage.value = 'The image must be smaller than 5 MB.';
        input.value = '';
        return;
    }
    if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value);
    }
    selectedFile.value = file;
    previewUrl.value = URL.createObjectURL(file);
    emit('file-selected', file);
};
const clearSelection = () => {
    if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value);
    }
    selectedFile.value = null;
    previewUrl.value = null;
    errorMessage.value = '';
    const input = document.getElementById('avatar-input');
    if (input)
        input.value = '';
    emit('file-selected', null);
};
onUnmounted(() => {
    if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value);
    }
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
// @ts-ignore
__VLS_withDotValue(previewUrl, {});
// @ts-ignore
__VLS_withDotValue(errorMessage, {});
// @ts-ignore
__VLS_withDotValue(selectedFile, {});
void {};
/** @type {__VLS_StyleScopedClasses['avatar-preview']} */ ;
/** @type {__VLS_StyleScopedClasses['upload-label']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar-upload']} */ ;
/** @type {__VLS_StyleScopedClasses['upload-controls']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "avatar-upload" },
});
/** @type {__VLS_StyleScopedClasses['avatar-upload']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "avatar-preview" },
});
/** @type {__VLS_StyleScopedClasses['avatar-preview']} */ ;
if (previewUrl.value || props.currentAvatar) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: (previewUrl.value || props.currentAvatar || ''),
        alt: "Profile picture preview",
    });
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "avatar-placeholder" },
    });
    /** @type {__VLS_StyleScopedClasses['avatar-placeholder']} */ ;
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        // @ts-ignore
        icon: (__VLS_unwrap(personOutline, {})),
    }));
    const __VLS_2 = __VLS_1({
        icon: (__VLS_unwrap(personOutline, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "upload-controls" },
});
/** @type {__VLS_StyleScopedClasses['upload-controls']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: "avatar-input",
    ...{ class: "upload-label" },
});
/** @type {__VLS_StyleScopedClasses['upload-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onChange: (__VLS_unwrap(handleFileSelection, {})) },
    id: "avatar-input",
    type: "file",
    accept: "image/jpeg,image/png,image/webp",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "upload-hint" },
});
/** @type {__VLS_StyleScopedClasses['upload-hint']} */ ;
if (errorMessage.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "error-message" },
    });
    /** @type {__VLS_StyleScopedClasses['error-message']} */ ;
    (errorMessage.value);
}
if (selectedFile.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_unwrap(clearSelection, {})) },
        type: "button",
        ...{ class: "remove-button" },
    });
    /** @type {__VLS_StyleScopedClasses['remove-button']} */ ;
}
// @ts-ignore
[previewUrl, previewUrl, personOutline, handleFileSelection, errorMessage, errorMessage, selectedFile, clearSelection,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
import { defineProps, defineEmits, } from 'vue';
