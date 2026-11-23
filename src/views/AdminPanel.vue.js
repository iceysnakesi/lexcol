import { ref, onMounted } from 'vue';
import { getAllUsers, updateUserRole } from '@/services/userService';
const users = ref([]);
const fetchUsers = async () => {
    try {
        const response = await getAllUsers();
        users.value = response.data;
    }
    catch (error) {
        console.error('Failed to fetch users', error);
    }
};
const promoteToAdmin = async (id) => {
    try {
        await updateUserRole(id, { role: 'admin' });
        await fetchUsers();
    }
    catch (error) {
        console.error('Failed to update role', error);
    }
};
const demoteToUser = async (id) => {
    try {
        await updateUserRole(id, { role: 'user' });
        await fetchUsers();
    }
    catch (error) {
        console.error('Failed to demote user', error);
    }
};
const updateUserTier = async (user, event) => {
    const newTier = event.detail.value;
    try {
        await updateUserRole(user.id, { membership_tier: newTier });
        user.membership_tier = newTier;
    }
    catch (error) {
        console.error('Failed to update tier', error);
    }
};
onMounted(() => {
    fetchUsers();
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
void {};
/** @type {__VLS_StyleScopedClasses['tier-select']} */ ;
/** @type {__VLS_StyleScopedClasses['tier-select']} */ ;
/** @type {__VLS_StyleScopedClasses['tier-select']} */ ;
/** @type {__VLS_StyleScopedClasses['user-card']} */ ;
/** @type {__VLS_StyleScopedClasses['action-section']} */ ;
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
    ...{ class: "ion-padding" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "ion-padding" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['ion-padding']} */ ;
const { default: __VLS_11 } = __VLS_nonNull(__VLS_9.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "admin-container" },
});
/** @type {__VLS_StyleScopedClasses['admin-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "subtitle" },
});
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "user-list" },
});
/** @type {__VLS_StyleScopedClasses['user-list']} */ ;
const __VLS_12 = __VLS_tryAsConstant((__VLS_unwrap(users, {})));
for (const [user] of __VLS_vFor(__VLS_nonNull(__VLS_12))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (user.id),
        ...{ class: "user-card" },
    });
    /** @type {__VLS_StyleScopedClasses['user-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "user-info-section" },
    });
    /** @type {__VLS_StyleScopedClasses['user-info-section']} */ ;
    let __VLS_13;
    /** @ts-ignore @type { | typeof __VLS_components.ionAvatar | typeof __VLS_components.IonAvatar | typeof __VLS_components['ion-avatar'] | typeof __VLS_components.ionAvatar | typeof __VLS_components.IonAvatar | typeof __VLS_components['ion-avatar']} */
    ionAvatar;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
        // @ts-ignore
        ...{ class: "user-avatar" },
    }));
    const __VLS_15 = __VLS_14({
        ...{ class: "user-avatar" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    /** @type {__VLS_StyleScopedClasses['user-avatar']} */ ;
    const { default: __VLS_18 } = __VLS_nonNull(__VLS_16.slots);
    if (user.avatar_url) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
            src: (user.avatar_url),
            alt: "Avatar",
        });
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "avatar-placeholder" },
        });
        /** @type {__VLS_StyleScopedClasses['avatar-placeholder']} */ ;
        ((user.name || user.email || 'U').charAt(0).toUpperCase());
    }
    // @ts-ignore
    [users,];
    var __VLS_16;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "user-details" },
    });
    /** @type {__VLS_StyleScopedClasses['user-details']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (user.name || 'Unnamed User');
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "user-email" },
    });
    /** @type {__VLS_StyleScopedClasses['user-email']} */ ;
    (user.email || 'No email provided');
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "user-meta" },
    });
    /** @type {__VLS_StyleScopedClasses['user-meta']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "badge" },
    });
    /** @type {__VLS_StyleScopedClasses['badge']} */ ;
    (user.role || 'user');
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "badge" },
    });
    /** @type {__VLS_StyleScopedClasses['badge']} */ ;
    (user.membership_tier || 'free');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "action-section" },
    });
    /** @type {__VLS_StyleScopedClasses['action-section']} */ ;
    if (user.role === 'admin') {
        let __VLS_19;
        /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
        ionButton;
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
            // @ts-ignore
            ...{ 'onClick': {} }, size: "small", color: "medium",
        }));
        const __VLS_21 = __VLS_20({
            ...{ 'onClick': {} },
            size: "small",
            color: "medium",
        }, ...__VLS_functionalComponentArgsRest(__VLS_20));
        let __VLS_24;
        const __VLS_25 = {
            /** @type {typeof __VLS_24.click} */
            onClick: // @ts-ignore
            (...[$event]) => {
                void $event;
                if (!(user.role === 'admin'))
                    throw 0;
                return (__VLS_unwrap(demoteToUser, {})(user.id));
                // @ts-ignore
                [demoteToUser,];
            },
        };
        void __VLS_25;
        const { default: __VLS_26 } = __VLS_nonNull(__VLS_22.slots);
        // @ts-ignore
        [];
        var __VLS_22;
        var __VLS_23;
    }
    else {
        let __VLS_27;
        /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
        ionButton;
        // @ts-ignore
        const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
            // @ts-ignore
            ...{ 'onClick': {} }, size: "small",
        }));
        const __VLS_29 = __VLS_28({
            ...{ 'onClick': {} },
            size: "small",
        }, ...__VLS_functionalComponentArgsRest(__VLS_28));
        let __VLS_32;
        const __VLS_33 = {
            /** @type {typeof __VLS_32.click} */
            onClick: // @ts-ignore
            (...[$event]) => {
                void $event;
                if (!!(user.role === 'admin'))
                    throw 0;
                return (__VLS_unwrap(promoteToAdmin, {})(user.id));
                // @ts-ignore
                [promoteToAdmin,];
            },
        };
        void __VLS_33;
        const { default: __VLS_34 } = __VLS_nonNull(__VLS_30.slots);
        // @ts-ignore
        [];
        var __VLS_30;
        var __VLS_31;
    }
    let __VLS_35;
    /** @ts-ignore @type { | typeof __VLS_components.ionSelect | typeof __VLS_components.IonSelect | typeof __VLS_components['ion-select'] | typeof __VLS_components.ionSelect | typeof __VLS_components.IonSelect | typeof __VLS_components['ion-select']} */
    ionSelect;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
        // @ts-ignore
        ...{ 'onIonChange': {} }, value: (user.membership_tier || 'free'), interface: "popover", placeholder: "", ...{ class: "tier-select" },
    }));
    const __VLS_37 = __VLS_36({
        ...{ 'onIonChange': {} },
        value: (user.membership_tier || 'free'),
        interface: "popover",
        placeholder: "",
        ...{ class: "tier-select" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    let __VLS_40;
    const __VLS_41 = {
        /** @type {typeof __VLS_40.ionChange} */
        onIonChange: // @ts-ignore
        (...[$event]) => {
            void $event;
            return (__VLS_unwrap(updateUserTier, {})(user, $event));
            // @ts-ignore
            [updateUserTier,];
        },
    };
    void __VLS_41;
    /** @type {__VLS_StyleScopedClasses['tier-select']} */ ;
    const { default: __VLS_42 } = __VLS_nonNull(__VLS_38.slots);
    let __VLS_43;
    /** @ts-ignore @type { | typeof __VLS_components.ionSelectOption | typeof __VLS_components.IonSelectOption | typeof __VLS_components['ion-select-option'] | typeof __VLS_components.ionSelectOption | typeof __VLS_components.IonSelectOption | typeof __VLS_components['ion-select-option']} */
    ionSelectOption;
    // @ts-ignore
    const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
        // @ts-ignore
        value: "free",
    }));
    const __VLS_45 = __VLS_44({
        value: "free",
    }, ...__VLS_functionalComponentArgsRest(__VLS_44));
    const { default: __VLS_48 } = __VLS_nonNull(__VLS_46.slots);
    // @ts-ignore
    [];
    var __VLS_46;
    let __VLS_49;
    /** @ts-ignore @type { | typeof __VLS_components.ionSelectOption | typeof __VLS_components.IonSelectOption | typeof __VLS_components['ion-select-option'] | typeof __VLS_components.ionSelectOption | typeof __VLS_components.IonSelectOption | typeof __VLS_components['ion-select-option']} */
    ionSelectOption;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
        // @ts-ignore
        value: "pro",
    }));
    const __VLS_51 = __VLS_50({
        value: "pro",
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    const { default: __VLS_54 } = __VLS_nonNull(__VLS_52.slots);
    // @ts-ignore
    [];
    var __VLS_52;
    // @ts-ignore
    [];
    var __VLS_38;
    var __VLS_39;
    // @ts-ignore
    [];
}
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
