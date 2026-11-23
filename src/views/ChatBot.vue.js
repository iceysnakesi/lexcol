import { ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { menuController, } from '@ionic/vue';
import { chatbubblesOutline, addOutline, arrowBackOutline, sendOutline, } from 'ionicons/icons';
import PageHeader from '@/components/PageHeader.vue';
import ChatbotWebMenu from '@/components/ChatbotWebMenu.vue';
const router = useRouter();
const messages = ref([]);
const input = ref('');
const sending = ref(false);
const contentRef = ref();
// Placeholder for future chat history from backend
const savedChats = ref([]);
let msgCounter = 0;
function nextId() {
    return `msg-${++msgCounter}-${Date.now()}`;
}
async function sendMessage() {
    const text = input.value.trim();
    if (!text || sending.value)
        return;
    messages.value.push({ id: nextId(), role: 'user', content: text });
    input.value = '';
    sending.value = true;
    await scrollToBottom();
    // TODO: replace with actual chatbot API call
    await new Promise((r) => setTimeout(r, 700));
    messages.value.push({
        id: nextId(),
        role: 'assistant',
        content: 'The chatbot API is not connected yet. This is a placeholder response.',
    });
    sending.value = false;
    await scrollToBottom();
}
async function scrollToBottom() {
    await nextTick();
    await contentRef.value?.scrollToBottom(250);
}
function newChat() {
    messages.value = [];
    input.value = '';
    menuController.close('chat-menu');
}
function selectChat(_id) {
    // TODO: load this conversation's messages from the backend
    menuController.close('chat-menu');
}
function returnToLexcol() {
    menuController.close('chat-menu');
    router.push('/news');
}
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
// @ts-ignore
__VLS_withDotValue(savedChats, {});
// @ts-ignore
__VLS_withDotValue(messages, {});
// @ts-ignore
__VLS_withDotValue(sending, {});
// @ts-ignore
__VLS_withDotValue(input, {});
void {};
/** @type {__VLS_StyleScopedClasses['mobile-chat-header']} */ ;
/** @type {__VLS_StyleScopedClasses['chat-toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['chat-toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
/** @type {__VLS_StyleScopedClasses['message-row']} */ ;
/** @type {__VLS_StyleScopedClasses['message-row']} */ ;
/** @type {__VLS_StyleScopedClasses['message-row']} */ ;
/** @type {__VLS_StyleScopedClasses['user']} */ ;
/** @type {__VLS_StyleScopedClasses['message-bubble']} */ ;
/** @type {__VLS_StyleScopedClasses['message-row']} */ ;
/** @type {__VLS_StyleScopedClasses['assistant']} */ ;
/** @type {__VLS_StyleScopedClasses['message-bubble']} */ ;
/** @type {__VLS_StyleScopedClasses['typing']} */ ;
/** @type {__VLS_StyleScopedClasses['typing']} */ ;
/** @type {__VLS_StyleScopedClasses['typing']} */ ;
/** @type {__VLS_StyleScopedClasses['chat-toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['send-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-empty']} */ ;
/** @type {__VLS_StyleScopedClasses['messages-container']} */ ;
/** @type {__VLS_StyleScopedClasses['message-bubble']} */ ;
/** @type {__VLS_StyleScopedClasses['input-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['input-wrapper']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.ionPage | typeof __VLS_components.IonPage | typeof __VLS_components['ion-page'] | typeof __VLS_components.ionPage | typeof __VLS_components.IonPage | typeof __VLS_components['ion-page']} */
ionPage;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    ...{ class: "chat-page" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "chat-page" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['chat-page']} */ ;
const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
const __VLS_6 = PageHeader;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
// @ts-ignore
}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const __VLS_11 = ChatbotWebMenu;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    // @ts-ignore
    ...{ 'onNew': {} }, ...{ 'onSelect': {} }, savedChats: (savedChats.value),
}));
const __VLS_13 = __VLS_12({
    ...{ 'onNew': {} },
    ...{ 'onSelect': {} },
    savedChats: (savedChats.value),
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
let __VLS_16;
const __VLS_17 = {
    /** @type {typeof __VLS_16.new} */
    onNew: (newChat),
};
void __VLS_17;
const __VLS_18 = {
    /** @type {typeof __VLS_16.select} */
    onSelect: (selectChat),
};
void __VLS_18;
var __VLS_14;
var __VLS_15;
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.ionMenu | typeof __VLS_components.IonMenu | typeof __VLS_components['ion-menu'] | typeof __VLS_components.ionMenu | typeof __VLS_components.IonMenu | typeof __VLS_components['ion-menu']} */
ionMenu;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    // @ts-ignore
    contentId: "chat-main-content", side: "start", menuId: "chat-menu",
}));
const __VLS_21 = __VLS_20({
    contentId: "chat-main-content",
    side: "start",
    menuId: "chat-menu",
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const { default: __VLS_24 } = __VLS_nonNull(__VLS_22.slots);
let __VLS_25;
/** @ts-ignore @type { | typeof __VLS_components.ionHeader | typeof __VLS_components.IonHeader | typeof __VLS_components['ion-header'] | typeof __VLS_components.ionHeader | typeof __VLS_components.IonHeader | typeof __VLS_components['ion-header']} */
ionHeader;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
// @ts-ignore
}));
const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
const { default: __VLS_30 } = __VLS_nonNull(__VLS_28.slots);
let __VLS_31;
/** @ts-ignore @type { | typeof __VLS_components.ionToolbar | typeof __VLS_components.IonToolbar | typeof __VLS_components['ion-toolbar'] | typeof __VLS_components.ionToolbar | typeof __VLS_components.IonToolbar | typeof __VLS_components['ion-toolbar']} */
ionToolbar;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
    // @ts-ignore
    ...{ class: "menu-toolbar" },
}));
const __VLS_33 = __VLS_32({
    ...{ class: "menu-toolbar" },
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
/** @type {__VLS_StyleScopedClasses['menu-toolbar']} */ ;
const { default: __VLS_36 } = __VLS_nonNull(__VLS_34.slots);
let __VLS_37;
/** @ts-ignore @type { | typeof __VLS_components.ionTitle | typeof __VLS_components.IonTitle | typeof __VLS_components['ion-title'] | typeof __VLS_components.ionTitle | typeof __VLS_components.IonTitle | typeof __VLS_components['ion-title']} */
ionTitle;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
// @ts-ignore
}));
const __VLS_39 = __VLS_38({}, ...__VLS_functionalComponentArgsRest(__VLS_38));
const { default: __VLS_42 } = __VLS_nonNull(__VLS_40.slots);
// @ts-ignore
[savedChats,];
var __VLS_40;
// @ts-ignore
[];
var __VLS_34;
// @ts-ignore
[];
var __VLS_28;
let __VLS_43;
/** @ts-ignore @type { | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content'] | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content']} */
ionContent;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
// @ts-ignore
}));
const __VLS_45 = __VLS_44({}, ...__VLS_functionalComponentArgsRest(__VLS_44));
const { default: __VLS_48 } = __VLS_nonNull(__VLS_46.slots);
let __VLS_49;
/** @ts-ignore @type { | typeof __VLS_components.ionList | typeof __VLS_components.IonList | typeof __VLS_components['ion-list'] | typeof __VLS_components.ionList | typeof __VLS_components.IonList | typeof __VLS_components['ion-list']} */
ionList;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
    // @ts-ignore
    lines: "none",
}));
const __VLS_51 = __VLS_50({
    lines: "none",
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
const { default: __VLS_54 } = __VLS_nonNull(__VLS_52.slots);
let __VLS_55;
/** @ts-ignore @type { | typeof __VLS_components.ionListHeader | typeof __VLS_components.IonListHeader | typeof __VLS_components['ion-list-header'] | typeof __VLS_components.ionListHeader | typeof __VLS_components.IonListHeader | typeof __VLS_components['ion-list-header']} */
ionListHeader;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
// @ts-ignore
}));
const __VLS_57 = __VLS_56({}, ...__VLS_functionalComponentArgsRest(__VLS_56));
const { default: __VLS_60 } = __VLS_nonNull(__VLS_58.slots);
let __VLS_61;
/** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
ionLabel;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent1(__VLS_61, new __VLS_61({
// @ts-ignore
}));
const __VLS_63 = __VLS_62({}, ...__VLS_functionalComponentArgsRest(__VLS_62));
const { default: __VLS_66 } = __VLS_nonNull(__VLS_64.slots);
// @ts-ignore
[];
var __VLS_64;
// @ts-ignore
[];
var __VLS_58;
if (savedChats.value.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "menu-empty" },
    });
    /** @type {__VLS_StyleScopedClasses['menu-empty']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
}
const __VLS_67 = __VLS_tryAsConstant((savedChats.value));
for (const [chat] of __VLS_vFor(__VLS_nonNull(__VLS_67))) {
    let __VLS_68;
    /** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
    ionItem;
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
        // @ts-ignore
        ...{ 'onClick': {} }, key: (chat.id), button: true,
    }));
    const __VLS_70 = __VLS_69({
        ...{ 'onClick': {} },
        key: (chat.id),
        button: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    let __VLS_73;
    const __VLS_74 = {
        /** @type {typeof __VLS_73.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            return (selectChat(chat.id));
            // @ts-ignore
            [savedChats, savedChats,];
        },
    };
    void __VLS_74;
    const { default: __VLS_75 } = __VLS_nonNull(__VLS_71.slots);
    let __VLS_76;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({
        // @ts-ignore
        slot: "start", icon: (__VLS_unwrap(chatbubblesOutline, {})),
    }));
    const __VLS_78 = __VLS_77({
        slot: "start",
        icon: (__VLS_unwrap(chatbubblesOutline, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_77));
    let __VLS_81;
    /** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
    ionLabel;
    // @ts-ignore
    const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
    // @ts-ignore
    }));
    const __VLS_83 = __VLS_82({}, ...__VLS_functionalComponentArgsRest(__VLS_82));
    const { default: __VLS_86 } = __VLS_nonNull(__VLS_84.slots);
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    (chat.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (chat.lastMessage);
    // @ts-ignore
    [chatbubblesOutline,];
    var __VLS_84;
    // @ts-ignore
    [];
    var __VLS_71;
    var __VLS_72;
    // @ts-ignore
    [];
}
let __VLS_87;
/** @ts-ignore @type { | typeof __VLS_components.ionItemDivider | typeof __VLS_components.IonItemDivider | typeof __VLS_components['ion-item-divider'] | typeof __VLS_components.ionItemDivider | typeof __VLS_components.IonItemDivider | typeof __VLS_components['ion-item-divider']} */
ionItemDivider;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
// @ts-ignore
}));
const __VLS_89 = __VLS_88({}, ...__VLS_functionalComponentArgsRest(__VLS_88));
let __VLS_92;
/** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
ionItem;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({
    // @ts-ignore
    ...{ 'onClick': {} }, button: true,
}));
const __VLS_94 = __VLS_93({
    ...{ 'onClick': {} },
    button: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
let __VLS_97;
const __VLS_98 = {
    /** @type {typeof __VLS_97.click} */
    onClick: (newChat),
};
void __VLS_98;
const { default: __VLS_99 } = __VLS_nonNull(__VLS_95.slots);
let __VLS_100;
/** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
ionIcon;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent1(__VLS_100, new __VLS_100({
    // @ts-ignore
    slot: "start", icon: (__VLS_unwrap(addOutline, {})),
}));
const __VLS_102 = __VLS_101({
    slot: "start",
    icon: (__VLS_unwrap(addOutline, {})),
}, ...__VLS_functionalComponentArgsRest(__VLS_101));
let __VLS_105;
/** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
ionLabel;
// @ts-ignore
const __VLS_106 = __VLS_asFunctionalComponent1(__VLS_105, new __VLS_105({
// @ts-ignore
}));
const __VLS_107 = __VLS_106({}, ...__VLS_functionalComponentArgsRest(__VLS_106));
const { default: __VLS_110 } = __VLS_nonNull(__VLS_108.slots);
// @ts-ignore
[addOutline,];
var __VLS_108;
// @ts-ignore
[];
var __VLS_95;
var __VLS_96;
let __VLS_111;
/** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
ionItem;
// @ts-ignore
const __VLS_112 = __VLS_asFunctionalComponent1(__VLS_111, new __VLS_111({
    // @ts-ignore
    ...{ 'onClick': {} }, button: true,
}));
const __VLS_113 = __VLS_112({
    ...{ 'onClick': {} },
    button: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_112));
let __VLS_116;
const __VLS_117 = {
    /** @type {typeof __VLS_116.click} */
    onClick: (returnToLexcol),
};
void __VLS_117;
const { default: __VLS_118 } = __VLS_nonNull(__VLS_114.slots);
let __VLS_119;
/** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
ionIcon;
// @ts-ignore
const __VLS_120 = __VLS_asFunctionalComponent1(__VLS_119, new __VLS_119({
    // @ts-ignore
    slot: "start", icon: (__VLS_unwrap(arrowBackOutline, {})),
}));
const __VLS_121 = __VLS_120({
    slot: "start",
    icon: (__VLS_unwrap(arrowBackOutline, {})),
}, ...__VLS_functionalComponentArgsRest(__VLS_120));
let __VLS_124;
/** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
ionLabel;
// @ts-ignore
const __VLS_125 = __VLS_asFunctionalComponent1(__VLS_124, new __VLS_124({
// @ts-ignore
}));
const __VLS_126 = __VLS_125({}, ...__VLS_functionalComponentArgsRest(__VLS_125));
const { default: __VLS_129 } = __VLS_nonNull(__VLS_127.slots);
// @ts-ignore
[arrowBackOutline,];
var __VLS_127;
// @ts-ignore
[];
var __VLS_114;
var __VLS_115;
// @ts-ignore
[];
var __VLS_52;
// @ts-ignore
[];
var __VLS_46;
// @ts-ignore
[];
var __VLS_22;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    id: "chat-main-content",
    ...{ class: "ion-page chat-layout" },
});
/** @type {__VLS_StyleScopedClasses['ion-page']} */ ;
/** @type {__VLS_StyleScopedClasses['chat-layout']} */ ;
let __VLS_130;
/** @ts-ignore @type { | typeof __VLS_components.ionHeader | typeof __VLS_components.IonHeader | typeof __VLS_components['ion-header'] | typeof __VLS_components.ionHeader | typeof __VLS_components.IonHeader | typeof __VLS_components['ion-header']} */
ionHeader;
// @ts-ignore
const __VLS_131 = __VLS_asFunctionalComponent1(__VLS_130, new __VLS_130({
    // @ts-ignore
    ...{ class: "mobile-chat-header" },
}));
const __VLS_132 = __VLS_131({
    ...{ class: "mobile-chat-header" },
}, ...__VLS_functionalComponentArgsRest(__VLS_131));
/** @type {__VLS_StyleScopedClasses['mobile-chat-header']} */ ;
const { default: __VLS_135 } = __VLS_nonNull(__VLS_133.slots);
let __VLS_136;
/** @ts-ignore @type { | typeof __VLS_components.ionToolbar | typeof __VLS_components.IonToolbar | typeof __VLS_components['ion-toolbar'] | typeof __VLS_components.ionToolbar | typeof __VLS_components.IonToolbar | typeof __VLS_components['ion-toolbar']} */
ionToolbar;
// @ts-ignore
const __VLS_137 = __VLS_asFunctionalComponent1(__VLS_136, new __VLS_136({
    // @ts-ignore
    ...{ class: "chat-toolbar" },
}));
const __VLS_138 = __VLS_137({
    ...{ class: "chat-toolbar" },
}, ...__VLS_functionalComponentArgsRest(__VLS_137));
/** @type {__VLS_StyleScopedClasses['chat-toolbar']} */ ;
const { default: __VLS_141 } = __VLS_nonNull(__VLS_139.slots);
let __VLS_142;
/** @ts-ignore @type { | typeof __VLS_components.ionButtons | typeof __VLS_components.IonButtons | typeof __VLS_components['ion-buttons'] | typeof __VLS_components.ionButtons | typeof __VLS_components.IonButtons | typeof __VLS_components['ion-buttons']} */
ionButtons;
// @ts-ignore
const __VLS_143 = __VLS_asFunctionalComponent1(__VLS_142, new __VLS_142({
    // @ts-ignore
    slot: "start",
}));
const __VLS_144 = __VLS_143({
    slot: "start",
}, ...__VLS_functionalComponentArgsRest(__VLS_143));
const { default: __VLS_147 } = __VLS_nonNull(__VLS_145.slots);
let __VLS_148;
/** @ts-ignore @type { | typeof __VLS_components.ionMenuButton | typeof __VLS_components.IonMenuButton | typeof __VLS_components['ion-menu-button'] | typeof __VLS_components.ionMenuButton | typeof __VLS_components.IonMenuButton | typeof __VLS_components['ion-menu-button']} */
ionMenuButton;
// @ts-ignore
const __VLS_149 = __VLS_asFunctionalComponent1(__VLS_148, new __VLS_148({
    // @ts-ignore
    menu: "chat-menu",
}));
const __VLS_150 = __VLS_149({
    menu: "chat-menu",
}, ...__VLS_functionalComponentArgsRest(__VLS_149));
// @ts-ignore
[];
var __VLS_145;
let __VLS_153;
/** @ts-ignore @type { | typeof __VLS_components.ionTitle | typeof __VLS_components.IonTitle | typeof __VLS_components['ion-title'] | typeof __VLS_components.ionTitle | typeof __VLS_components.IonTitle | typeof __VLS_components['ion-title']} */
ionTitle;
// @ts-ignore
const __VLS_154 = __VLS_asFunctionalComponent1(__VLS_153, new __VLS_153({
// @ts-ignore
}));
const __VLS_155 = __VLS_154({}, ...__VLS_functionalComponentArgsRest(__VLS_154));
const { default: __VLS_158 } = __VLS_nonNull(__VLS_156.slots);
// @ts-ignore
[];
var __VLS_156;
// @ts-ignore
[];
var __VLS_139;
// @ts-ignore
[];
var __VLS_133;
let __VLS_159;
/** @ts-ignore @type { | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content'] | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content']} */
ionContent;
// @ts-ignore
const __VLS_160 = __VLS_asFunctionalComponent1(__VLS_159, new __VLS_159({
    // @ts-ignore
    ref: "contentRef", ...{ class: "chat-content" },
}));
const __VLS_161 = __VLS_160({
    ref: "contentRef",
    ...{ class: "chat-content" },
}, ...__VLS_functionalComponentArgsRest(__VLS_160));
/** @type {__VLS_StyleScopedClasses['chat-content']} */ ;
const { default: __VLS_164 } = __VLS_nonNull(__VLS_162.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "messages-container" },
});
/** @type {__VLS_StyleScopedClasses['messages-container']} */ ;
if (messages.value.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "empty-state" },
    });
    /** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
    let __VLS_165;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_166 = __VLS_asFunctionalComponent1(__VLS_165, new __VLS_165({
        // @ts-ignore
        icon: (__VLS_unwrap(chatbubblesOutline, {})), ...{ class: "empty-icon" },
    }));
    const __VLS_167 = __VLS_166({
        icon: (__VLS_unwrap(chatbubblesOutline, {})),
        ...{ class: "empty-icon" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_166));
    /** @type {__VLS_StyleScopedClasses['empty-icon']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "message-list" },
    });
    /** @type {__VLS_StyleScopedClasses['message-list']} */ ;
    const __VLS_170 = __VLS_tryAsConstant((messages.value));
    for (const [msg] of __VLS_vFor(__VLS_nonNull(__VLS_170))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (msg.id),
            ...{ class: (['message-row', msg.role]) },
        });
        /** @type {__VLS_StyleScopedClasses['message-row']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "message-bubble" },
        });
        /** @type {__VLS_StyleScopedClasses['message-bubble']} */ ;
        (msg.content);
        // @ts-ignore
        [chatbubblesOutline, messages, messages,];
    }
    if (sending.value) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "message-row assistant" },
        });
        /** @type {__VLS_StyleScopedClasses['message-row']} */ ;
        /** @type {__VLS_StyleScopedClasses['assistant']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "message-bubble typing" },
        });
        /** @type {__VLS_StyleScopedClasses['message-bubble']} */ ;
        /** @type {__VLS_StyleScopedClasses['typing']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    }
}
// @ts-ignore
[sending,];
var __VLS_162;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "input-bar" },
});
/** @type {__VLS_StyleScopedClasses['input-bar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "input-wrapper" },
});
/** @type {__VLS_StyleScopedClasses['input-wrapper']} */ ;
let __VLS_171;
/** @ts-ignore @type { | typeof __VLS_components.ionTextarea | typeof __VLS_components.IonTextarea | typeof __VLS_components['ion-textarea']} */
ionTextarea;
// @ts-ignore
const __VLS_172 = __VLS_asFunctionalComponent1(__VLS_171, new __VLS_171({
    // @ts-ignore
    ...{ 'onKeydown': {} }, modelValue: (input.value), rows: (1), autoGrow: (true), placeholder: "Message Lexcol Assistant...", ...{ class: "chat-input" },
}));
const __VLS_173 = __VLS_172({
    ...{ 'onKeydown': {} },
    modelValue: (input.value),
    rows: (1),
    autoGrow: (true),
    placeholder: "Message Lexcol Assistant...",
    ...{ class: "chat-input" },
}, ...__VLS_functionalComponentArgsRest(__VLS_172));
let __VLS_176;
const __VLS_177 = {
    /** @type {typeof __VLS_176.keydown} */
    onKeydown: (sendMessage),
};
void __VLS_177;
/** @type {__VLS_StyleScopedClasses['chat-input']} */ ;
var __VLS_174;
var __VLS_175;
let __VLS_178;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_179 = __VLS_asFunctionalComponent1(__VLS_178, new __VLS_178({
    // @ts-ignore
    ...{ 'onClick': {} }, ...{ class: "send-btn" }, disabled: (!input.value.trim() || sending.value),
}));
const __VLS_180 = __VLS_179({
    ...{ 'onClick': {} },
    ...{ class: "send-btn" },
    disabled: (!input.value.trim() || sending.value),
}, ...__VLS_functionalComponentArgsRest(__VLS_179));
let __VLS_183;
const __VLS_184 = {
    /** @type {typeof __VLS_183.click} */
    onClick: (sendMessage),
};
void __VLS_184;
/** @type {__VLS_StyleScopedClasses['send-btn']} */ ;
const { default: __VLS_185 } = __VLS_nonNull(__VLS_181.slots);
let __VLS_186;
/** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
ionIcon;
// @ts-ignore
const __VLS_187 = __VLS_asFunctionalComponent1(__VLS_186, new __VLS_186({
    // @ts-ignore
    icon: (__VLS_unwrap(sendOutline, {})),
}));
const __VLS_188 = __VLS_187({
    icon: (__VLS_unwrap(sendOutline, {})),
}, ...__VLS_functionalComponentArgsRest(__VLS_187));
// @ts-ignore
[sending, input, input, sendOutline,];
var __VLS_181;
var __VLS_182;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
