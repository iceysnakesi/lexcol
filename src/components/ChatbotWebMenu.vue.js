import { menuController, } from '@ionic/vue';
import { menuOutline, addOutline, chatbubblesOutline, trashOutline } from 'ionicons/icons';
const __VLS_props = defineProps();
const emit = defineEmits();
const MENU_ID = 'chat-web-menu';
function openMenu() {
    menuController.open(MENU_ID);
}
function handleNew() {
    menuController.close(MENU_ID);
    emit('new');
}
function handleSelect(id) {
    menuController.close(MENU_ID);
    emit('select', id);
}
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
/** @type {__VLS_StyleScopedClasses['web-menu-trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-trigger-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-trigger-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-trigger-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-empty']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "web-menu-trigger" },
});
/** @type {__VLS_StyleScopedClasses['web-menu-trigger']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    ...{ 'onClick': {} }, ...{ class: "menu-trigger-btn" }, 'aria-label': "Chat options",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    ...{ class: "menu-trigger-btn" },
    'aria-label': "Chat options",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.click} */
    onClick: (openMenu),
};
void __VLS_6;
/** @type {__VLS_StyleScopedClasses['menu-trigger-btn']} */ ;
const { default: __VLS_7 } = __VLS_nonNull(__VLS_3.slots);
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
ionIcon;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    // @ts-ignore
    slot: "icon-only", icon: (__VLS_unwrap(menuOutline, {})),
}));
const __VLS_10 = __VLS_9({
    slot: "icon-only",
    icon: (__VLS_unwrap(menuOutline, {})),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
// @ts-ignore
[menuOutline,];
var __VLS_3;
var __VLS_4;
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.ionMenu | typeof __VLS_components.IonMenu | typeof __VLS_components['ion-menu'] | typeof __VLS_components.ionMenu | typeof __VLS_components.IonMenu | typeof __VLS_components['ion-menu']} */
ionMenu;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    // @ts-ignore
    contentId: "chat-main-content", menuId: "chat-web-menu", side: "start",
}));
const __VLS_15 = __VLS_14({
    contentId: "chat-main-content",
    menuId: "chat-web-menu",
    side: "start",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
const { default: __VLS_18 } = __VLS_nonNull(__VLS_16.slots);
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.ionHeader | typeof __VLS_components.IonHeader | typeof __VLS_components['ion-header'] | typeof __VLS_components.ionHeader | typeof __VLS_components.IonHeader | typeof __VLS_components['ion-header']} */
ionHeader;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
// @ts-ignore
}));
const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const { default: __VLS_24 } = __VLS_nonNull(__VLS_22.slots);
let __VLS_25;
/** @ts-ignore @type { | typeof __VLS_components.ionToolbar | typeof __VLS_components.IonToolbar | typeof __VLS_components['ion-toolbar'] | typeof __VLS_components.ionToolbar | typeof __VLS_components.IonToolbar | typeof __VLS_components['ion-toolbar']} */
ionToolbar;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    // @ts-ignore
    ...{ class: "menu-toolbar" },
}));
const __VLS_27 = __VLS_26({
    ...{ class: "menu-toolbar" },
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
/** @type {__VLS_StyleScopedClasses['menu-toolbar']} */ ;
const { default: __VLS_30 } = __VLS_nonNull(__VLS_28.slots);
let __VLS_31;
/** @ts-ignore @type { | typeof __VLS_components.ionTitle | typeof __VLS_components.IonTitle | typeof __VLS_components['ion-title'] | typeof __VLS_components.ionTitle | typeof __VLS_components.IonTitle | typeof __VLS_components['ion-title']} */
ionTitle;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
// @ts-ignore
}));
const __VLS_33 = __VLS_32({}, ...__VLS_functionalComponentArgsRest(__VLS_32));
const { default: __VLS_36 } = __VLS_nonNull(__VLS_34.slots);
// @ts-ignore
[];
var __VLS_34;
// @ts-ignore
[];
var __VLS_28;
// @ts-ignore
[];
var __VLS_22;
let __VLS_37;
/** @ts-ignore @type { | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content'] | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content']} */
ionContent;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
// @ts-ignore
}));
const __VLS_39 = __VLS_38({}, ...__VLS_functionalComponentArgsRest(__VLS_38));
const { default: __VLS_42 } = __VLS_nonNull(__VLS_40.slots);
let __VLS_43;
/** @ts-ignore @type { | typeof __VLS_components.ionList | typeof __VLS_components.IonList | typeof __VLS_components['ion-list'] | typeof __VLS_components.ionList | typeof __VLS_components.IonList | typeof __VLS_components['ion-list']} */
ionList;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
    // @ts-ignore
    lines: "none",
}));
const __VLS_45 = __VLS_44({
    lines: "none",
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
const { default: __VLS_48 } = __VLS_nonNull(__VLS_46.slots);
let __VLS_49;
/** @ts-ignore @type { | typeof __VLS_components.ionListHeader | typeof __VLS_components.IonListHeader | typeof __VLS_components['ion-list-header'] | typeof __VLS_components.ionListHeader | typeof __VLS_components.IonListHeader | typeof __VLS_components['ion-list-header']} */
ionListHeader;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
// @ts-ignore
}));
const __VLS_51 = __VLS_50({}, ...__VLS_functionalComponentArgsRest(__VLS_50));
const { default: __VLS_54 } = __VLS_nonNull(__VLS_52.slots);
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
[];
var __VLS_58;
// @ts-ignore
[];
var __VLS_52;
if (__VLS_ctx.savedChats.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "menu-empty" },
    });
    /** @type {__VLS_StyleScopedClasses['menu-empty']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
}
const __VLS_61 = __VLS_tryAsConstant((__VLS_ctx.savedChats));
for (const [chat] of __VLS_vFor(__VLS_nonNull(__VLS_61))) {
    let __VLS_62;
    /** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
    ionItem;
    // @ts-ignore
    const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({
        // @ts-ignore
        ...{ 'onClick': {} }, key: (chat.id), button: true,
    }));
    const __VLS_64 = __VLS_63({
        ...{ 'onClick': {} },
        key: (chat.id),
        button: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_63));
    let __VLS_67;
    const __VLS_68 = {
        /** @type {typeof __VLS_67.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            return (handleSelect(chat.id));
            // @ts-ignore
            [savedChats, savedChats,];
        },
    };
    void __VLS_68;
    const { default: __VLS_69 } = __VLS_nonNull(__VLS_65.slots);
    let __VLS_70;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
        // @ts-ignore
        slot: "start", icon: (__VLS_unwrap(chatbubblesOutline, {})),
    }));
    const __VLS_72 = __VLS_71({
        slot: "start",
        icon: (__VLS_unwrap(chatbubblesOutline, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_71));
    let __VLS_75;
    /** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
    ionLabel;
    // @ts-ignore
    const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
    // @ts-ignore
    }));
    const __VLS_77 = __VLS_76({}, ...__VLS_functionalComponentArgsRest(__VLS_76));
    const { default: __VLS_80 } = __VLS_nonNull(__VLS_78.slots);
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    (chat.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (chat.last_message || 'No messages yet');
    // @ts-ignore
    [chatbubblesOutline,];
    var __VLS_78;
    let __VLS_81;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
        // @ts-ignore
        ...{ 'onClick': {} }, slot: "end", fill: "clear", color: "danger",
    }));
    const __VLS_83 = __VLS_82({
        ...{ 'onClick': {} },
        slot: "end",
        fill: "clear",
        color: "danger",
    }, ...__VLS_functionalComponentArgsRest(__VLS_82));
    let __VLS_86;
    const __VLS_87 = {
        /** @type {typeof __VLS_86.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            return (__VLS_unwrap(emit, {})('delete', chat.id));
            // @ts-ignore
            [emit,];
        },
    };
    void __VLS_87;
    const { default: __VLS_88 } = __VLS_nonNull(__VLS_84.slots);
    let __VLS_89;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_90 = __VLS_asFunctionalComponent1(__VLS_89, new __VLS_89({
        // @ts-ignore
        slot: "icon-only", icon: (__VLS_unwrap(trashOutline, {})),
    }));
    const __VLS_91 = __VLS_90({
        slot: "icon-only",
        icon: (__VLS_unwrap(trashOutline, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_90));
    // @ts-ignore
    [trashOutline,];
    var __VLS_84;
    var __VLS_85;
    // @ts-ignore
    [];
    var __VLS_65;
    var __VLS_66;
    // @ts-ignore
    [];
}
let __VLS_94;
/** @ts-ignore @type { | typeof __VLS_components.ionItemDivider | typeof __VLS_components.IonItemDivider | typeof __VLS_components['ion-item-divider']} */
ionItemDivider;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent1(__VLS_94, new __VLS_94({
// @ts-ignore
}));
const __VLS_96 = __VLS_95({}, ...__VLS_functionalComponentArgsRest(__VLS_95));
let __VLS_99;
/** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
ionItem;
// @ts-ignore
const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
    // @ts-ignore
    ...{ 'onClick': {} }, button: true,
}));
const __VLS_101 = __VLS_100({
    ...{ 'onClick': {} },
    button: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_100));
let __VLS_104;
const __VLS_105 = {
    /** @type {typeof __VLS_104.click} */
    onClick: (handleNew),
};
void __VLS_105;
const { default: __VLS_106 } = __VLS_nonNull(__VLS_102.slots);
let __VLS_107;
/** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
ionIcon;
// @ts-ignore
const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({
    // @ts-ignore
    slot: "start", icon: (__VLS_unwrap(addOutline, {})),
}));
const __VLS_109 = __VLS_108({
    slot: "start",
    icon: (__VLS_unwrap(addOutline, {})),
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
[addOutline,];
var __VLS_115;
// @ts-ignore
[];
var __VLS_102;
var __VLS_103;
// @ts-ignore
[];
var __VLS_46;
// @ts-ignore
[];
var __VLS_40;
// @ts-ignore
[];
var __VLS_16;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
import { defineProps, defineEmits, } from 'vue';
