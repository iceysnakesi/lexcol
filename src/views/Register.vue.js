import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createUser } from '@/services/userService';
import AuthLayout from '@/layouts/AuthLayout.vue';
const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref(null);
const handleRegister = async () => {
    try {
        isLoading.value = true;
        errorMessage.value = null;
        await createUser({
            name: name.value.trim(),
            email: email.value.trim(),
            password: password.value,
        });
        router.push('/login');
    }
    catch (error) {
        console.error('Registration failed', error);
        errorMessage.value =
            error.response?.data?.message ||
                'Failed to create account. Please try again.';
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
__VLS_withDotValue(errorMessage, {});
// @ts-ignore
__VLS_withDotValue(isLoading, {});
void {};
/** @type {__VLS_StyleScopedClasses['footer-action']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-action']} */ ;
const __VLS_0 = AuthLayout || AuthLayout;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    title: "Create Account", subtitle: "Sign up to get started with Lexcol",
}));
const __VLS_2 = __VLS_1({
    title: "Create Account",
    subtitle: "Sign up to get started with Lexcol",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
    ...{ onSubmit: (__VLS_unwrap(handleRegister, {})) },
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
    modelValue: (__VLS_unwrap(name, {})), label: "Full Name", labelPlacement: "stacked", type: "text", required: true, placeholder: "Juan Pérez", autocomplete: "name",
}));
const __VLS_14 = __VLS_13({
    modelValue: (__VLS_unwrap(name, {})),
    label: "Full Name",
    labelPlacement: "stacked",
    type: "text",
    required: true,
    placeholder: "Juan Pérez",
    autocomplete: "name",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
// @ts-ignore
[handleRegister, name,];
var __VLS_9;
let __VLS_17;
/** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
ionItem;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
    // @ts-ignore
    ...{ class: "custom-item" },
}));
const __VLS_19 = __VLS_18({
    ...{ class: "custom-item" },
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
/** @type {__VLS_StyleScopedClasses['custom-item']} */ ;
const { default: __VLS_22 } = __VLS_nonNull(__VLS_20.slots);
let __VLS_23;
/** @ts-ignore @type { | typeof __VLS_components.ionInput | typeof __VLS_components.IonInput | typeof __VLS_components['ion-input'] | typeof __VLS_components.ionInput | typeof __VLS_components.IonInput | typeof __VLS_components['ion-input']} */
ionInput;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
    // @ts-ignore
    modelValue: (__VLS_unwrap(email, {})), label: "Email Address", labelPlacement: "stacked", type: "email", required: true, placeholder: "user@example.com", autocomplete: "email",
}));
const __VLS_25 = __VLS_24({
    modelValue: (__VLS_unwrap(email, {})),
    label: "Email Address",
    labelPlacement: "stacked",
    type: "email",
    required: true,
    placeholder: "user@example.com",
    autocomplete: "email",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
// @ts-ignore
[email,];
var __VLS_20;
let __VLS_28;
/** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
ionItem;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
    // @ts-ignore
    ...{ class: "custom-item" },
}));
const __VLS_30 = __VLS_29({
    ...{ class: "custom-item" },
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
/** @type {__VLS_StyleScopedClasses['custom-item']} */ ;
const { default: __VLS_33 } = __VLS_nonNull(__VLS_31.slots);
let __VLS_34;
/** @ts-ignore @type { | typeof __VLS_components.ionInput | typeof __VLS_components.IonInput | typeof __VLS_components['ion-input'] | typeof __VLS_components.ionInput | typeof __VLS_components.IonInput | typeof __VLS_components['ion-input']} */
ionInput;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
    // @ts-ignore
    modelValue: (__VLS_unwrap(password, {})), label: "Password", labelPlacement: "stacked", type: "password", required: true, placeholder: "Create a password", autocomplete: "new-password",
}));
const __VLS_36 = __VLS_35({
    modelValue: (__VLS_unwrap(password, {})),
    label: "Password",
    labelPlacement: "stacked",
    type: "password",
    required: true,
    placeholder: "Create a password",
    autocomplete: "new-password",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
// @ts-ignore
[password,];
var __VLS_31;
if (errorMessage.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "error-text" },
    });
    /** @type {__VLS_StyleScopedClasses['error-text']} */ ;
    (errorMessage.value);
}
let __VLS_39;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
    // @ts-ignore
    expand: "block", type: "submit", disabled: (isLoading.value), ...{ class: "submit-btn" },
}));
const __VLS_41 = __VLS_40({
    expand: "block",
    type: "submit",
    disabled: (isLoading.value),
    ...{ class: "submit-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
/** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
const { default: __VLS_44 } = __VLS_nonNull(__VLS_42.slots);
if (isLoading.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
// @ts-ignore
[errorMessage, errorMessage, isLoading, isLoading,];
var __VLS_42;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-action" },
});
/** @type {__VLS_StyleScopedClasses['footer-action']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
let __VLS_45;
/** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
routerLink;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
    // @ts-ignore
    to: "/login",
}));
const __VLS_47 = __VLS_46({
    to: "/login",
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
const { default: __VLS_50 } = __VLS_nonNull(__VLS_48.slots);
// @ts-ignore
[];
var __VLS_48;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
