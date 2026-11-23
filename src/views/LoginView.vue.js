import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import AuthLayout from '@/layouts/AuthLayout.vue';
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const handleLogin = async () => {
    try {
        authStore.errorMessage = null;
        await authStore.login({
            email: email.value.trim(),
            password: password.value,
        });
        const redirectPath = route.query.redirect || '/news';
        router.push(redirectPath);
    }
    catch (error) {
        console.error('Login failed', error);
    }
};
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
// @ts-ignore
__VLS_withDotValue(authStore, {});
void {};
/** @type {__VLS_StyleScopedClasses['footer-action']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-action']} */ ;
/** @type {__VLS_StyleScopedClasses['forgot-link']} */ ;
const __VLS_0 = AuthLayout || AuthLayout;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    title: "Sign In", subtitle: "Sign in to continue to your dashboard",
}));
const __VLS_2 = __VLS_1({
    title: "Sign In",
    subtitle: "Sign in to continue to your dashboard",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
    ...{ onSubmit: (__VLS_unwrap(handleLogin, {})) },
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
    modelValue: (__VLS_unwrap(email, {})), label: "Email Address", labelPlacement: "stacked", type: "email", required: true, placeholder: "user@example.com", autocomplete: "email",
}));
const __VLS_14 = __VLS_13({
    modelValue: (__VLS_unwrap(email, {})),
    label: "Email Address",
    labelPlacement: "stacked",
    type: "email",
    required: true,
    placeholder: "user@example.com",
    autocomplete: "email",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
// @ts-ignore
[handleLogin, email,];
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
    modelValue: (__VLS_unwrap(password, {})), label: "Password", labelPlacement: "stacked", type: "password", required: true, placeholder: "Enter your password", autocomplete: "current-password",
}));
const __VLS_25 = __VLS_24({
    modelValue: (__VLS_unwrap(password, {})),
    label: "Password",
    labelPlacement: "stacked",
    type: "password",
    required: true,
    placeholder: "Enter your password",
    autocomplete: "current-password",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
// @ts-ignore
[password,];
var __VLS_20;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "forgot-password-wrapper" },
});
/** @type {__VLS_StyleScopedClasses['forgot-password-wrapper']} */ ;
let __VLS_28;
/** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
routerLink;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
    // @ts-ignore
    to: "/forgot-password", ...{ class: "forgot-link" },
}));
const __VLS_30 = __VLS_29({
    to: "/forgot-password",
    ...{ class: "forgot-link" },
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
/** @type {__VLS_StyleScopedClasses['forgot-link']} */ ;
const { default: __VLS_33 } = __VLS_nonNull(__VLS_31.slots);
// @ts-ignore
[];
var __VLS_31;
if (authStore.value.errorMessage) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "error-text" },
    });
    /** @type {__VLS_StyleScopedClasses['error-text']} */ ;
    (authStore.value.errorMessage);
}
let __VLS_34;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
    // @ts-ignore
    expand: "block", type: "submit", disabled: (authStore.value.isLoading), ...{ class: "submit-btn" },
}));
const __VLS_36 = __VLS_35({
    expand: "block",
    type: "submit",
    disabled: (authStore.value.isLoading),
    ...{ class: "submit-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
/** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
const { default: __VLS_39 } = __VLS_nonNull(__VLS_37.slots);
if (authStore.value.isLoading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
// @ts-ignore
[authStore, authStore, authStore, authStore,];
var __VLS_37;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-action" },
});
/** @type {__VLS_StyleScopedClasses['footer-action']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
let __VLS_40;
/** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
routerLink;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
    // @ts-ignore
    to: "/register",
}));
const __VLS_42 = __VLS_41({
    to: "/register",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
const { default: __VLS_45 } = __VLS_nonNull(__VLS_43.slots);
// @ts-ignore
[];
var __VLS_43;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
