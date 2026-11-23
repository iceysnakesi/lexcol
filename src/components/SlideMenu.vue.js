import { computed } from 'vue';
import { menuController } from '@ionic/vue';
import { personOutline, logOutOutline, logInOutline, createOutline, shieldCheckmarkOutline, personAddOutline, newspaperOutline } from 'ionicons/icons';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
const router = useRouter();
const authStore = useAuthStore();
const isAdmin = computed(() => authStore.user?.role === 'admin');
const closeMenu = () => {
    menuController.close('profile-menu');
};
const handleLogout = () => {
    closeMenu();
    authStore.logout();
    router.push('/about');
};
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
// @ts-ignore
__VLS_withDotValue(authStore, {});
// @ts-ignore
__VLS_withDotValue(isAdmin, {});
void {};
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.ionMenu | typeof __VLS_components.IonMenu | typeof __VLS_components['ion-menu'] | typeof __VLS_components.ionMenu | typeof __VLS_components.IonMenu | typeof __VLS_components['ion-menu']} */
ionMenu;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    side: "end", contentId: "main-content", menuId: "profile-menu",
}));
const __VLS_2 = __VLS_1({
    side: "end",
    contentId: "main-content",
    menuId: "profile-menu",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.ionHeader | typeof __VLS_components.IonHeader | typeof __VLS_components['ion-header'] | typeof __VLS_components.ionHeader | typeof __VLS_components.IonHeader | typeof __VLS_components['ion-header']} */
ionHeader;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
// @ts-ignore
}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_nonNull(__VLS_9.slots);
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.ionToolbar | typeof __VLS_components.IonToolbar | typeof __VLS_components['ion-toolbar'] | typeof __VLS_components.ionToolbar | typeof __VLS_components.IonToolbar | typeof __VLS_components['ion-toolbar']} */
ionToolbar;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
// @ts-ignore
}));
const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const { default: __VLS_17 } = __VLS_nonNull(__VLS_15.slots);
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.ionTitle | typeof __VLS_components.IonTitle | typeof __VLS_components['ion-title'] | typeof __VLS_components.ionTitle | typeof __VLS_components.IonTitle | typeof __VLS_components['ion-title']} */
ionTitle;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
// @ts-ignore
}));
const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_23 } = __VLS_nonNull(__VLS_21.slots);
var __VLS_21;
var __VLS_15;
var __VLS_9;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content'] | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content']} */
ionContent;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
// @ts-ignore
}));
const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const { default: __VLS_29 } = __VLS_nonNull(__VLS_27.slots);
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.ionList | typeof __VLS_components.IonList | typeof __VLS_components['ion-list'] | typeof __VLS_components.ionList | typeof __VLS_components.IonList | typeof __VLS_components['ion-list']} */
ionList;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    // @ts-ignore
    lines: "none",
}));
const __VLS_32 = __VLS_31({
    lines: "none",
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_35 } = __VLS_nonNull(__VLS_33.slots);
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.ionMenuToggle | typeof __VLS_components.IonMenuToggle | typeof __VLS_components['ion-menu-toggle'] | typeof __VLS_components.ionMenuToggle | typeof __VLS_components.IonMenuToggle | typeof __VLS_components['ion-menu-toggle']} */
ionMenuToggle;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    // @ts-ignore
    autoHide: (false),
}));
const __VLS_38 = __VLS_37({
    autoHide: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const { default: __VLS_41 } = __VLS_nonNull(__VLS_39.slots);
if (!authStore.value.isAuthenticated) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "guest-header" },
    });
    /** @type {__VLS_StyleScopedClasses['guest-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "guest-greeting" },
    });
    /** @type {__VLS_StyleScopedClasses['guest-greeting']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "guest-title" },
    });
    /** @type {__VLS_StyleScopedClasses['guest-title']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "guest-subtitle" },
    });
    /** @type {__VLS_StyleScopedClasses['guest-subtitle']} */ ;
}
if (authStore.value.isAuthenticated) {
    let __VLS_42;
    /** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
    ionItem;
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
        // @ts-ignore
        ...{ 'onClick': {} }, routerLink: "/your_profile",
    }));
    const __VLS_44 = __VLS_43({
        ...{ 'onClick': {} },
        routerLink: "/your_profile",
    }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    let __VLS_47;
    const __VLS_48 = {
        /** @type {typeof __VLS_47.click} */
        onClick: (__VLS_unwrap(closeMenu, {})),
    };
    void __VLS_48;
    const { default: __VLS_49 } = __VLS_nonNull(__VLS_45.slots);
    let __VLS_50;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
        // @ts-ignore
        slot: "start", icon: (__VLS_unwrap(personOutline, {})),
    }));
    const __VLS_52 = __VLS_51({
        slot: "start",
        icon: (__VLS_unwrap(personOutline, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_51));
    let __VLS_55;
    /** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
    ionLabel;
    // @ts-ignore
    const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
    // @ts-ignore
    }));
    const __VLS_57 = __VLS_56({}, ...__VLS_functionalComponentArgsRest(__VLS_56));
    const { default: __VLS_60 } = __VLS_nonNull(__VLS_58.slots);
    // @ts-ignore
    [authStore, authStore, closeMenu, personOutline,];
    var __VLS_58;
    // @ts-ignore
    [];
    var __VLS_45;
    var __VLS_46;
}
if (isAdmin.value) {
    let __VLS_61;
    /** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
    ionItem;
    // @ts-ignore
    const __VLS_62 = __VLS_asFunctionalComponent1(__VLS_61, new __VLS_61({
        // @ts-ignore
        ...{ 'onClick': {} }, routerLink: "/admin",
    }));
    const __VLS_63 = __VLS_62({
        ...{ 'onClick': {} },
        routerLink: "/admin",
    }, ...__VLS_functionalComponentArgsRest(__VLS_62));
    let __VLS_66;
    const __VLS_67 = {
        /** @type {typeof __VLS_66.click} */
        onClick: (__VLS_unwrap(closeMenu, {})),
    };
    void __VLS_67;
    const { default: __VLS_68 } = __VLS_nonNull(__VLS_64.slots);
    let __VLS_69;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({
        // @ts-ignore
        slot: "start", icon: (__VLS_unwrap(shieldCheckmarkOutline, {})),
    }));
    const __VLS_71 = __VLS_70({
        slot: "start",
        icon: (__VLS_unwrap(shieldCheckmarkOutline, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_70));
    let __VLS_74;
    /** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
    ionLabel;
    // @ts-ignore
    const __VLS_75 = __VLS_asFunctionalComponent1(__VLS_74, new __VLS_74({
    // @ts-ignore
    }));
    const __VLS_76 = __VLS_75({}, ...__VLS_functionalComponentArgsRest(__VLS_75));
    const { default: __VLS_79 } = __VLS_nonNull(__VLS_77.slots);
    // @ts-ignore
    [closeMenu, isAdmin, shieldCheckmarkOutline,];
    var __VLS_77;
    // @ts-ignore
    [];
    var __VLS_64;
    var __VLS_65;
    let __VLS_80;
    /** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
    ionItem;
    // @ts-ignore
    const __VLS_81 = __VLS_asFunctionalComponent1(__VLS_80, new __VLS_80({
        // @ts-ignore
        ...{ 'onClick': {} }, routerLink: "/postmanagement",
    }));
    const __VLS_82 = __VLS_81({
        ...{ 'onClick': {} },
        routerLink: "/postmanagement",
    }, ...__VLS_functionalComponentArgsRest(__VLS_81));
    let __VLS_85;
    const __VLS_86 = {
        /** @type {typeof __VLS_85.click} */
        onClick: (__VLS_unwrap(closeMenu, {})),
    };
    void __VLS_86;
    const { default: __VLS_87 } = __VLS_nonNull(__VLS_83.slots);
    let __VLS_88;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_89 = __VLS_asFunctionalComponent1(__VLS_88, new __VLS_88({
        // @ts-ignore
        slot: "start", icon: (__VLS_unwrap(createOutline, {})),
    }));
    const __VLS_90 = __VLS_89({
        slot: "start",
        icon: (__VLS_unwrap(createOutline, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_89));
    let __VLS_93;
    /** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
    ionLabel;
    // @ts-ignore
    const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({
    // @ts-ignore
    }));
    const __VLS_95 = __VLS_94({}, ...__VLS_functionalComponentArgsRest(__VLS_94));
    const { default: __VLS_98 } = __VLS_nonNull(__VLS_96.slots);
    // @ts-ignore
    [closeMenu, createOutline,];
    var __VLS_96;
    // @ts-ignore
    [];
    var __VLS_83;
    var __VLS_84;
    let __VLS_99;
    /** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
    ionItem;
    // @ts-ignore
    const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
        // @ts-ignore
        ...{ 'onClick': {} }, routerLink: "/news/create",
    }));
    const __VLS_101 = __VLS_100({
        ...{ 'onClick': {} },
        routerLink: "/news/create",
    }, ...__VLS_functionalComponentArgsRest(__VLS_100));
    let __VLS_104;
    const __VLS_105 = {
        /** @type {typeof __VLS_104.click} */
        onClick: (__VLS_unwrap(closeMenu, {})),
    };
    void __VLS_105;
    const { default: __VLS_106 } = __VLS_nonNull(__VLS_102.slots);
    let __VLS_107;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({
        // @ts-ignore
        slot: "start", icon: (__VLS_unwrap(newspaperOutline, {})),
    }));
    const __VLS_109 = __VLS_108({
        slot: "start",
        icon: (__VLS_unwrap(newspaperOutline, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_108));
    let __VLS_112;
    /** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
    ionLabel;
    // @ts-ignore
    const __VLS_113 = __VLS_asFunctionalComponent1(__VLS_112, new __VLS_112({
    // @ts-ignore
    }));
    const __VLS_114 = __VLS_113({}, ...__VLS_functionalComponentArgsRest(__VLS_113));
    const { default: __VLS_117 } = __VLS_nonNull(__VLS_115.slots);
    // @ts-ignore
    [closeMenu, newspaperOutline,];
    var __VLS_115;
    // @ts-ignore
    [];
    var __VLS_102;
    var __VLS_103;
}
if (authStore.value.isAuthenticated) {
    let __VLS_118;
    /** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
    ionItem;
    // @ts-ignore
    const __VLS_119 = __VLS_asFunctionalComponent1(__VLS_118, new __VLS_118({
        // @ts-ignore
        ...{ 'onClick': {} }, button: true, ...{ class: "logout-item" },
    }));
    const __VLS_120 = __VLS_119({
        ...{ 'onClick': {} },
        button: true,
        ...{ class: "logout-item" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_119));
    let __VLS_123;
    const __VLS_124 = {
        /** @type {typeof __VLS_123.click} */
        onClick: (__VLS_unwrap(handleLogout, {})),
    };
    void __VLS_124;
    /** @type {__VLS_StyleScopedClasses['logout-item']} */ ;
    const { default: __VLS_125 } = __VLS_nonNull(__VLS_121.slots);
    let __VLS_126;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_127 = __VLS_asFunctionalComponent1(__VLS_126, new __VLS_126({
        // @ts-ignore
        slot: "start", icon: (__VLS_unwrap(logOutOutline, {})),
    }));
    const __VLS_128 = __VLS_127({
        slot: "start",
        icon: (__VLS_unwrap(logOutOutline, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_127));
    let __VLS_131;
    /** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
    ionLabel;
    // @ts-ignore
    const __VLS_132 = __VLS_asFunctionalComponent1(__VLS_131, new __VLS_131({
    // @ts-ignore
    }));
    const __VLS_133 = __VLS_132({}, ...__VLS_functionalComponentArgsRest(__VLS_132));
    const { default: __VLS_136 } = __VLS_nonNull(__VLS_134.slots);
    // @ts-ignore
    [authStore, handleLogout, logOutOutline,];
    var __VLS_134;
    // @ts-ignore
    [];
    var __VLS_121;
    var __VLS_122;
}
else {
    let __VLS_137;
    /** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
    ionItem;
    // @ts-ignore
    const __VLS_138 = __VLS_asFunctionalComponent1(__VLS_137, new __VLS_137({
        // @ts-ignore
        ...{ 'onClick': {} }, routerLink: "/login",
    }));
    const __VLS_139 = __VLS_138({
        ...{ 'onClick': {} },
        routerLink: "/login",
    }, ...__VLS_functionalComponentArgsRest(__VLS_138));
    let __VLS_142;
    const __VLS_143 = {
        /** @type {typeof __VLS_142.click} */
        onClick: (__VLS_unwrap(closeMenu, {})),
    };
    void __VLS_143;
    const { default: __VLS_144 } = __VLS_nonNull(__VLS_140.slots);
    let __VLS_145;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_146 = __VLS_asFunctionalComponent1(__VLS_145, new __VLS_145({
        // @ts-ignore
        slot: "start", icon: (__VLS_unwrap(logInOutline, {})),
    }));
    const __VLS_147 = __VLS_146({
        slot: "start",
        icon: (__VLS_unwrap(logInOutline, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_146));
    let __VLS_150;
    /** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
    ionLabel;
    // @ts-ignore
    const __VLS_151 = __VLS_asFunctionalComponent1(__VLS_150, new __VLS_150({
    // @ts-ignore
    }));
    const __VLS_152 = __VLS_151({}, ...__VLS_functionalComponentArgsRest(__VLS_151));
    const { default: __VLS_155 } = __VLS_nonNull(__VLS_153.slots);
    // @ts-ignore
    [closeMenu, logInOutline,];
    var __VLS_153;
    // @ts-ignore
    [];
    var __VLS_140;
    var __VLS_141;
    let __VLS_156;
    /** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
    ionItem;
    // @ts-ignore
    const __VLS_157 = __VLS_asFunctionalComponent1(__VLS_156, new __VLS_156({
        // @ts-ignore
        ...{ 'onClick': {} }, routerLink: "/register",
    }));
    const __VLS_158 = __VLS_157({
        ...{ 'onClick': {} },
        routerLink: "/register",
    }, ...__VLS_functionalComponentArgsRest(__VLS_157));
    let __VLS_161;
    const __VLS_162 = {
        /** @type {typeof __VLS_161.click} */
        onClick: (__VLS_unwrap(closeMenu, {})),
    };
    void __VLS_162;
    const { default: __VLS_163 } = __VLS_nonNull(__VLS_159.slots);
    let __VLS_164;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_165 = __VLS_asFunctionalComponent1(__VLS_164, new __VLS_164({
        // @ts-ignore
        slot: "start", icon: (__VLS_unwrap(personAddOutline, {})), color: "primary",
    }));
    const __VLS_166 = __VLS_165({
        slot: "start",
        icon: (__VLS_unwrap(personAddOutline, {})),
        color: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_165));
    let __VLS_169;
    /** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
    ionLabel;
    // @ts-ignore
    const __VLS_170 = __VLS_asFunctionalComponent1(__VLS_169, new __VLS_169({
        // @ts-ignore
        color: "primary",
    }));
    const __VLS_171 = __VLS_170({
        color: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_170));
    const { default: __VLS_174 } = __VLS_nonNull(__VLS_172.slots);
    // @ts-ignore
    [closeMenu, personAddOutline,];
    var __VLS_172;
    // @ts-ignore
    [];
    var __VLS_159;
    var __VLS_160;
}
// @ts-ignore
[];
var __VLS_39;
// @ts-ignore
[];
var __VLS_33;
// @ts-ignore
[];
var __VLS_27;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
