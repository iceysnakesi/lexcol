import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { newsService } from '@/services/newsService';
const router = useRouter();
const title = ref('');
const coverUrl = ref('');
const blocks = ref([
    { type: 'text', content: '', style: 'normal' },
]);
const uploadingCover = ref(false);
const saving = ref(false);
const error = ref(null);
async function onCoverSelected(e) {
    const file = e.target.files?.[0];
    if (!file)
        return;
    uploadingCover.value = true;
    error.value = null;
    try {
        coverUrl.value = await newsService.uploadImage(file);
    }
    catch (err) {
        console.error('Cover upload failed:', err);
        error.value = 'Failed to upload cover image.';
    }
    finally {
        uploadingCover.value = false;
    }
}
async function onImageSelected(e, block) {
    const file = e.target.files?.[0];
    if (!file)
        return;
    try {
        block.url = await newsService.uploadImage(file);
    }
    catch (err) {
        console.error('Block image upload failed:', err);
        error.value = 'Failed to upload block image.';
    }
}
function addBlock(type) {
    if (type === 'text') {
        blocks.value.push({ type: 'text', content: '', style: 'normal' });
    }
    else {
        blocks.value.push({ type: 'image', url: '', commentary: '' });
    }
}
function removeBlock(i) {
    blocks.value.splice(i, 1);
}
function moveBlock(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= blocks.value.length)
        return;
    const [b] = blocks.value.splice(i, 1);
    blocks.value.splice(j, 0, b);
}
async function save() {
    error.value = null;
    if (!title.value.trim()) {
        error.value = 'Title is required.';
        return;
    }
    if (!coverUrl.value) {
        error.value = 'Cover image is required.';
        return;
    }
    // Drop empty blocks
    const clean = blocks.value.filter((b) => b.type === 'text' ? (b.content || '').trim() : !!b.url);
    if (clean.length === 0) {
        error.value = 'Add at least one content block.';
        return;
    }
    saving.value = true;
    try {
        await newsService.createNews({
            title: title.value.trim(),
            cover_image_url: coverUrl.value,
            content: clean,
        });
        router.push('/news');
    }
    catch (err) {
        error.value =
            err?.response?.data?.error ||
                err?.response?.data?.message ||
                'Failed to publish article.';
    }
    finally {
        saving.value = false;
    }
}
function cancel() {
    router.push('/news');
}
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
// @ts-ignore
__VLS_withDotValue(coverUrl, {});
// @ts-ignore
__VLS_withDotValue(uploadingCover, {});
// @ts-ignore
__VLS_withDotValue(blocks, {});
// @ts-ignore
__VLS_withDotValue(error, {});
// @ts-ignore
__VLS_withDotValue(saving, {});
void {};
/** @type {__VLS_StyleScopedClasses['field']} */ ;
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
    ...{ class: "ion-padding news-content" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "ion-padding news-content" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['ion-padding']} */ ;
/** @type {__VLS_StyleScopedClasses['news-content']} */ ;
const { default: __VLS_11 } = __VLS_nonNull(__VLS_9.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "create-container" },
});
/** @type {__VLS_StyleScopedClasses['create-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "page-title" },
});
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "field" },
});
/** @type {__VLS_StyleScopedClasses['field']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.ionInput | typeof __VLS_components.IonInput | typeof __VLS_components['ion-input']} */
ionInput;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    // @ts-ignore
    modelValue: (__VLS_unwrap(title, {})), placeholder: "Article headline",
}));
const __VLS_14 = __VLS_13({
    modelValue: (__VLS_unwrap(title, {})),
    placeholder: "Article headline",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "field" },
});
/** @type {__VLS_StyleScopedClasses['field']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onChange: (onCoverSelected) },
    type: "file",
    accept: "image/*",
});
if (coverUrl.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: (coverUrl.value),
        ...{ class: "cover-preview" },
        alt: "Cover preview",
    });
    /** @type {__VLS_StyleScopedClasses['cover-preview']} */ ;
}
if (uploadingCover.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "hint" },
    });
    /** @type {__VLS_StyleScopedClasses['hint']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "field" },
});
/** @type {__VLS_StyleScopedClasses['field']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
const __VLS_17 = __VLS_tryAsConstant((blocks.value));
for (const [block, i] of __VLS_vFor(__VLS_nonNull(__VLS_17))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (i),
        ...{ class: "block-item" },
    });
    /** @type {__VLS_StyleScopedClasses['block-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "block-header" },
    });
    /** @type {__VLS_StyleScopedClasses['block-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "block-type" },
    });
    /** @type {__VLS_StyleScopedClasses['block-type']} */ ;
    (block.type === 'text' ? 'Text' : 'Image');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "block-actions" },
    });
    /** @type {__VLS_StyleScopedClasses['block-actions']} */ ;
    let __VLS_18;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
        // @ts-ignore
        ...{ 'onClick': {} }, fill: "clear", size: "small", disabled: (i === 0),
    }));
    const __VLS_20 = __VLS_19({
        ...{ 'onClick': {} },
        fill: "clear",
        size: "small",
        disabled: (i === 0),
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    let __VLS_23;
    const __VLS_24 = {
        /** @type {typeof __VLS_23.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            return (moveBlock(i, -1));
            // @ts-ignore
            [title, coverUrl, coverUrl, uploadingCover, blocks,];
        },
    };
    void __VLS_24;
    const { default: __VLS_25 } = __VLS_nonNull(__VLS_21.slots);
    // @ts-ignore
    [];
    var __VLS_21;
    var __VLS_22;
    let __VLS_26;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
        // @ts-ignore
        ...{ 'onClick': {} }, fill: "clear", size: "small", disabled: (i === blocks.value.length - 1),
    }));
    const __VLS_28 = __VLS_27({
        ...{ 'onClick': {} },
        fill: "clear",
        size: "small",
        disabled: (i === blocks.value.length - 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    let __VLS_31;
    const __VLS_32 = {
        /** @type {typeof __VLS_31.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            return (moveBlock(i, 1));
            // @ts-ignore
            [blocks,];
        },
    };
    void __VLS_32;
    const { default: __VLS_33 } = __VLS_nonNull(__VLS_29.slots);
    // @ts-ignore
    [];
    var __VLS_29;
    var __VLS_30;
    let __VLS_34;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
        // @ts-ignore
        ...{ 'onClick': {} }, fill: "clear", size: "small", color: "danger",
    }));
    const __VLS_36 = __VLS_35({
        ...{ 'onClick': {} },
        fill: "clear",
        size: "small",
        color: "danger",
    }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    let __VLS_39;
    const __VLS_40 = {
        /** @type {typeof __VLS_39.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            return (removeBlock(i));
            // @ts-ignore
            [];
        },
    };
    void __VLS_40;
    const { default: __VLS_41 } = __VLS_nonNull(__VLS_37.slots);
    // @ts-ignore
    [];
    var __VLS_37;
    var __VLS_38;
    if (block.type === 'text') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "style-row" },
        });
        /** @type {__VLS_StyleScopedClasses['style-row']} */ ;
        let __VLS_42;
        /** @ts-ignore @type { | typeof __VLS_components.ionSelect | typeof __VLS_components.IonSelect | typeof __VLS_components['ion-select'] | typeof __VLS_components.ionSelect | typeof __VLS_components.IonSelect | typeof __VLS_components['ion-select']} */
        ionSelect;
        // @ts-ignore
        const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
            // @ts-ignore
            modelValue: (block.style), interface: "popover", ...{ class: "style-select" },
        }));
        const __VLS_44 = __VLS_43({
            modelValue: (block.style),
            interface: "popover",
            ...{ class: "style-select" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_43));
        /** @type {__VLS_StyleScopedClasses['style-select']} */ ;
        const { default: __VLS_47 } = __VLS_nonNull(__VLS_45.slots);
        let __VLS_48;
        /** @ts-ignore @type { | typeof __VLS_components.ionSelectOption | typeof __VLS_components.IonSelectOption | typeof __VLS_components['ion-select-option'] | typeof __VLS_components.ionSelectOption | typeof __VLS_components.IonSelectOption | typeof __VLS_components['ion-select-option']} */
        ionSelectOption;
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
            // @ts-ignore
            value: "normal",
        }));
        const __VLS_50 = __VLS_49({
            value: "normal",
        }, ...__VLS_functionalComponentArgsRest(__VLS_49));
        const { default: __VLS_53 } = __VLS_nonNull(__VLS_51.slots);
        // @ts-ignore
        [];
        var __VLS_51;
        let __VLS_54;
        /** @ts-ignore @type { | typeof __VLS_components.ionSelectOption | typeof __VLS_components.IonSelectOption | typeof __VLS_components['ion-select-option'] | typeof __VLS_components.ionSelectOption | typeof __VLS_components.IonSelectOption | typeof __VLS_components['ion-select-option']} */
        ionSelectOption;
        // @ts-ignore
        const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
            // @ts-ignore
            value: "h2",
        }));
        const __VLS_56 = __VLS_55({
            value: "h2",
        }, ...__VLS_functionalComponentArgsRest(__VLS_55));
        const { default: __VLS_59 } = __VLS_nonNull(__VLS_57.slots);
        // @ts-ignore
        [];
        var __VLS_57;
        let __VLS_60;
        /** @ts-ignore @type { | typeof __VLS_components.ionSelectOption | typeof __VLS_components.IonSelectOption | typeof __VLS_components['ion-select-option'] | typeof __VLS_components.ionSelectOption | typeof __VLS_components.IonSelectOption | typeof __VLS_components['ion-select-option']} */
        ionSelectOption;
        // @ts-ignore
        const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
            // @ts-ignore
            value: "h3",
        }));
        const __VLS_62 = __VLS_61({
            value: "h3",
        }, ...__VLS_functionalComponentArgsRest(__VLS_61));
        const { default: __VLS_65 } = __VLS_nonNull(__VLS_63.slots);
        // @ts-ignore
        [];
        var __VLS_63;
        // @ts-ignore
        [];
        var __VLS_45;
        let __VLS_66;
        /** @ts-ignore @type { | typeof __VLS_components.ionTextarea | typeof __VLS_components.IonTextarea | typeof __VLS_components['ion-textarea']} */
        ionTextarea;
        // @ts-ignore
        const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
            // @ts-ignore
            modelValue: (block.content), rows: (4), placeholder: "Text (supports **bold** and *italic*)",
        }));
        const __VLS_68 = __VLS_67({
            modelValue: (block.content),
            rows: (4),
            placeholder: "Text (supports **bold** and *italic*)",
        }, ...__VLS_functionalComponentArgsRest(__VLS_67));
    }
    else if (block.type === 'image') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            ...{ onChange: ((e) => onImageSelected(e, block)) },
            type: "file",
            accept: "image/*",
        });
        if (block.url) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
                src: (block.url),
                ...{ class: "block-preview" },
                alt: "",
            });
            /** @type {__VLS_StyleScopedClasses['block-preview']} */ ;
        }
        let __VLS_71;
        /** @ts-ignore @type { | typeof __VLS_components.ionInput | typeof __VLS_components.IonInput | typeof __VLS_components['ion-input']} */
        ionInput;
        // @ts-ignore
        const __VLS_72 = __VLS_asFunctionalComponent1(__VLS_71, new __VLS_71({
            // @ts-ignore
            modelValue: (block.commentary), placeholder: "Optional image caption", ...{ class: "commentary-input" },
        }));
        const __VLS_73 = __VLS_72({
            modelValue: (block.commentary),
            placeholder: "Optional image caption",
            ...{ class: "commentary-input" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_72));
        /** @type {__VLS_StyleScopedClasses['commentary-input']} */ ;
    }
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "add-block-buttons" },
});
/** @type {__VLS_StyleScopedClasses['add-block-buttons']} */ ;
let __VLS_76;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({
    // @ts-ignore
    ...{ 'onClick': {} }, fill: "outline", size: "small",
}));
const __VLS_78 = __VLS_77({
    ...{ 'onClick': {} },
    fill: "outline",
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
let __VLS_81;
const __VLS_82 = {
    /** @type {typeof __VLS_81.click} */
    onClick: // @ts-ignore
    (...[$event]) => {
        void $event;
        return (addBlock('text'));
        // @ts-ignore
        [];
    },
};
void __VLS_82;
const { default: __VLS_83 } = __VLS_nonNull(__VLS_79.slots);
// @ts-ignore
[];
var __VLS_79;
var __VLS_80;
let __VLS_84;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({
    // @ts-ignore
    ...{ 'onClick': {} }, fill: "outline", size: "small",
}));
const __VLS_86 = __VLS_85({
    ...{ 'onClick': {} },
    fill: "outline",
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
let __VLS_89;
const __VLS_90 = {
    /** @type {typeof __VLS_89.click} */
    onClick: // @ts-ignore
    (...[$event]) => {
        void $event;
        return (addBlock('image'));
        // @ts-ignore
        [];
    },
};
void __VLS_90;
const { default: __VLS_91 } = __VLS_nonNull(__VLS_87.slots);
// @ts-ignore
[];
var __VLS_87;
var __VLS_88;
if (error.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "error-text" },
    });
    /** @type {__VLS_StyleScopedClasses['error-text']} */ ;
    (error.value);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "actions" },
});
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
let __VLS_92;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({
    // @ts-ignore
    ...{ 'onClick': {} }, fill: "clear",
}));
const __VLS_94 = __VLS_93({
    ...{ 'onClick': {} },
    fill: "clear",
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
let __VLS_97;
const __VLS_98 = {
    /** @type {typeof __VLS_97.click} */
    onClick: (cancel),
};
void __VLS_98;
const { default: __VLS_99 } = __VLS_nonNull(__VLS_95.slots);
// @ts-ignore
[error, error,];
var __VLS_95;
var __VLS_96;
let __VLS_100;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent1(__VLS_100, new __VLS_100({
    // @ts-ignore
    ...{ 'onClick': {} }, disabled: (saving.value),
}));
const __VLS_102 = __VLS_101({
    ...{ 'onClick': {} },
    disabled: (saving.value),
}, ...__VLS_functionalComponentArgsRest(__VLS_101));
let __VLS_105;
const __VLS_106 = {
    /** @type {typeof __VLS_105.click} */
    onClick: (save),
};
void __VLS_106;
const { default: __VLS_107 } = __VLS_nonNull(__VLS_103.slots);
if (saving.value) {
    let __VLS_108;
    /** @ts-ignore @type { | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner']} */
    ionSpinner;
    // @ts-ignore
    const __VLS_109 = __VLS_asFunctionalComponent1(__VLS_108, new __VLS_108({
        // @ts-ignore
        name: "crescent",
    }));
    const __VLS_110 = __VLS_109({
        name: "crescent",
    }, ...__VLS_functionalComponentArgsRest(__VLS_109));
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
// @ts-ignore
[saving, saving,];
var __VLS_103;
var __VLS_104;
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
