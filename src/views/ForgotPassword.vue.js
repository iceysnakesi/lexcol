import { ref } from 'vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { forgotPassword } from '@/services/authService';
const email = ref('');
const isLoading = ref(false);
const errorMessage = ref(null);
const successMessage = ref(null);
const handleSubmit = async () => {
    isLoading.value = true;
    errorMessage.value = null;
    successMessage.value = null;
    try {
        await forgotPassword(email.value.trim());
        successMessage.value = 'If that email exists, a reset link has been sent. Check your inbox.';
    }
    catch (err) {
        errorMessage.value = err.response?.data?.message || 'Failed to send reset link.';
    }
    finally {
        isLoading.value = false;
    }
};
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
// @ts-ignore
__VLS_withDotValue(successMessage, {});
// @ts-ignore
__VLS_withDotValue(errorMessage, {});
// @ts-ignore
__VLS_withDotValue(isLoading, {});
void {};
/** @type {__VLS_StyleScopedClasses['footer-action']} */ ;
const __VLS_0 = AuthLayout || AuthLayout;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    title: "Forgot Password", subtitle: "Enter your email to receive a reset link",
}));
const __VLS_2 = __VLS_1({
    title: "Forgot Password",
    subtitle: "Enter your email to receive a reset link",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
    ...{ onSubmit: (__VLS_unwrap(handleSubmit, {})) },
});
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
ionItem;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    // @ts-ignore
    ...{ class: "custom-item" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "custom-item" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['custom-item']} */ ;
const { default: __VLS_11 } = __VLS_nonNull(__VLS_9.slots);
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.ionInput | typeof __VLS_components.IonInput | typeof __VLS_components['ion-input'] | typeof __VLS_components.ionInput | typeof __VLS_components.IonInput | typeof __VLS_components['ion-input']} */
ionInput;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    // @ts-ignore
    modelValue: (__VLS_unwrap(email, {})), label: "Email Address", labelPlacement: "stacked", type: "email", required: true, placeholder: "user@example.com",
}));
const __VLS_14 = __VLS_13({
    modelValue: (__VLS_unwrap(email, {})),
    label: "Email Address",
    labelPlacement: "stacked",
    type: "email",
    required: true,
    placeholder: "user@example.com",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
// @ts-ignore
[handleSubmit, email,];
var __VLS_9;
if (successMessage.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "success-text" },
    });
    /** @type {__VLS_StyleScopedClasses['success-text']} */ ;
    (successMessage.value);
}
if (errorMessage.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "error-text" },
    });
    /** @type {__VLS_StyleScopedClasses['error-text']} */ ;
    (errorMessage.value);
}
let __VLS_17;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
    // @ts-ignore
    expand: "block", type: "submit", disabled: (isLoading.value || !!successMessage.value), ...{ class: "submit-btn" },
}));
const __VLS_19 = __VLS_18({
    expand: "block",
    type: "submit",
    disabled: (isLoading.value || !!successMessage.value),
    ...{ class: "submit-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
/** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
const { default: __VLS_22 } = __VLS_nonNull(__VLS_20.slots);
if (isLoading.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
// @ts-ignore
[successMessage, successMessage, successMessage, errorMessage, errorMessage, isLoading, isLoading,];
var __VLS_20;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-action" },
});
/** @type {__VLS_StyleScopedClasses['footer-action']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
let __VLS_23;
/** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
routerLink;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
    // @ts-ignore
    to: "/login",
}));
const __VLS_25 = __VLS_24({
    to: "/login",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
const { default: __VLS_28 } = __VLS_nonNull(__VLS_26.slots);
// @ts-ignore
[];
var __VLS_26;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
