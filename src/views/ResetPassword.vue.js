import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { resetPassword } from '@/services/authService';
const route = useRoute();
const router = useRouter();
const newPassword = ref('');
const isLoading = ref(false);
const errorMessage = ref(null);
const isSuccess = ref(false);
const token = ref(null);
onMounted(() => {
    token.value = route.query.token;
    if (!token.value) {
        errorMessage.value = 'Invalid or missing reset token.';
    }
});
const handleSubmit = async () => {
    if (!token.value)
        return;
    isLoading.value = true;
    errorMessage.value = null;
    try {
        await resetPassword(token.value, newPassword.value);
        isSuccess.value = true;
    }
    catch (err) {
        errorMessage.value = err.response?.data?.message || 'Failed to reset password.';
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
__VLS_withDotValue(isSuccess, {});
// @ts-ignore
__VLS_withDotValue(errorMessage, {});
// @ts-ignore
__VLS_withDotValue(isLoading, {});
void {};
const __VLS_0 = AuthLayout || AuthLayout;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    title: "Reset Password", subtitle: "Enter a new password for your account",
}));
const __VLS_2 = __VLS_1({
    title: "Reset Password",
    subtitle: "Enter a new password for your account",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
if (!isSuccess.value) {
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
        modelValue: (__VLS_unwrap(newPassword, {})), label: "New Password", labelPlacement: "stacked", type: "password", required: true, placeholder: "Min. 6 characters",
    }));
    const __VLS_14 = __VLS_13({
        modelValue: (__VLS_unwrap(newPassword, {})),
        label: "New Password",
        labelPlacement: "stacked",
        type: "password",
        required: true,
        placeholder: "Min. 6 characters",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    // @ts-ignore
    [isSuccess, handleSubmit, newPassword,];
    var __VLS_9;
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
        expand: "block", type: "submit", disabled: (isLoading.value), ...{ class: "submit-btn" },
    }));
    const __VLS_19 = __VLS_18({
        expand: "block",
        type: "submit",
        disabled: (isLoading.value),
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
    [errorMessage, errorMessage, isLoading, isLoading,];
    var __VLS_20;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "success-state" },
    });
    /** @type {__VLS_StyleScopedClasses['success-state']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "success-text" },
    });
    /** @type {__VLS_StyleScopedClasses['success-text']} */ ;
    let __VLS_23;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
        // @ts-ignore
        expand: "block", routerLink: "/login", ...{ class: "submit-btn" },
    }));
    const __VLS_25 = __VLS_24({
        expand: "block",
        routerLink: "/login",
        ...{ class: "submit-btn" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    /** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
    const { default: __VLS_28 } = __VLS_nonNull(__VLS_26.slots);
    // @ts-ignore
    [];
    var __VLS_26;
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
