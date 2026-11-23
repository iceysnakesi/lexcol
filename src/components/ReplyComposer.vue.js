const __VLS_props = defineProps();
const __VLS_emit = defineEmits();
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "inline-reply-box" },
    ...{ class: ({ 'nested-reply': __VLS_ctx.nested }) },
});
/** @type {__VLS_StyleScopedClasses['inline-reply-box']} */ ;
/** @type {__VLS_StyleScopedClasses['nested-reply']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
    ...{ onSubmit: // @ts-ignore
        (...[$event]) => {
            void $event;
            return (__VLS_ctx.$emit('submit'));
            // @ts-ignore
            [nested, $emit,];
        } },
});
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.ionTextarea | typeof __VLS_components.IonTextarea | typeof __VLS_components['ion-textarea']} */
ionTextarea;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    ...{ 'onUpdate:modelValue': {} }, modelValue: (__VLS_ctx.modelValue), rows: (__VLS_ctx.rows), placeholder: (__VLS_ctx.placeholder), required: true,
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.modelValue),
    rows: (__VLS_ctx.rows),
    placeholder: (__VLS_ctx.placeholder),
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.'update:modelValue'} */
    'onUpdate:modelValue': // @ts-ignore
    (...[$event]) => {
        void $event;
        return (__VLS_ctx.$emit('update:modelValue', $event));
        // @ts-ignore
        [$emit, modelValue, rows, placeholder,];
    },
};
void __VLS_6;
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "reply-form-actions" },
});
/** @type {__VLS_StyleScopedClasses['reply-form-actions']} */ ;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    // @ts-ignore
    size: "small", type: "submit", disabled: (__VLS_ctx.submitting),
}));
const __VLS_9 = __VLS_8({
    size: "small",
    type: "submit",
    disabled: (__VLS_ctx.submitting),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_nonNull(__VLS_10.slots);
if (__VLS_ctx.submitting) {
    let __VLS_13;
    /** @ts-ignore @type { | typeof __VLS_components.ionSpinner | typeof __VLS_components.IonSpinner | typeof __VLS_components['ion-spinner']} */
    ionSpinner;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
        // @ts-ignore
        name: "crescent",
    }));
    const __VLS_15 = __VLS_14({
        name: "crescent",
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.submitLabel);
}
// @ts-ignore
[submitting, submitting, submitLabel,];
var __VLS_10;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
import { defineProps, defineEmits, } from 'vue';
