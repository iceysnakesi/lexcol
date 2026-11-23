import { ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { menuController, } from '@ionic/vue';
import { chatbubblesOutline, addOutline, arrowBackOutline, sendOutline, pencilOutline, refreshOutline } from 'ionicons/icons';
import PageHeader from '@/components/PageHeader.vue';
import ChatbotWebMenu from '@/components/ChatbotWebMenu.vue';
import { chatbotService } from '@/services/chatbotService';
import { onIonViewWillEnter } from '@ionic/vue';
const router = useRouter();
const messages = ref([]);
const input = ref('');
const sending = ref(false);
const contentRef = ref();
const savedChats = ref([]);
const currentChatId = ref(null);
const editingMessageId = ref(null);
const editDraftContent = ref('');
let msgCounter = 0;
function nextId() {
    return `msg-${++msgCounter}-${Date.now()}`;
}
onIonViewWillEnter(async () => {
    try {
        savedChats.value = await chatbotService.getChats();
    }
    catch (err) {
        console.error('Failed to load chats:', err);
    }
});
function startEdit(msg) {
    if (sending.value)
        return;
    editingMessageId.value = msg.id;
    editDraftContent.value = msg.content;
}
function cancelEdit() {
    editingMessageId.value = null;
    editDraftContent.value = '';
}
async function saveEdit(index) {
    const text = editDraftContent.value.trim();
    if (!text)
        return;
    // Update the text in the UI immediately
    const msgToEdit = messages.value[index];
    if (msgToEdit) {
        msgToEdit.content = text;
    }
    // Remove any AI responses that came after this message (since the context changed)
    messages.value = messages.value.slice(0, index + 1);
    cancelEdit();
    sending.value = true;
    await scrollToBottom();
    try {
        // Send to backend with isEdit: true
        const response = await chatbotService.sendMessage(text, currentChatId.value, true);
        messages.value.push({ id: nextId(), role: 'assistant', content: response.reply });
    }
    catch (error) {
        messages.value.push({
            id: nextId(),
            role: 'assistant',
            content: error.response?.data?.error || 'Sorry, an error occurred.',
        });
    }
    finally {
        sending.value = false;
        await scrollToBottom();
    }
}
async function sendMessage() {
    const text = input.value.trim();
    if (!text || sending.value)
        return;
    // Add the new (or edited) message to the UI
    messages.value.push({ id: nextId(), role: 'user', content: text });
    input.value = '';
    sending.value = true;
    await scrollToBottom();
    try {
        const response = await chatbotService.sendMessage(text, currentChatId.value);
        if (!currentChatId.value) {
            currentChatId.value = response.chatId;
            savedChats.value = await chatbotService.getChats();
        }
        messages.value.push({ id: nextId(), role: 'assistant', content: response.reply });
    }
    catch (error) {
        console.error('Chat error:', error);
        messages.value.push({
            id: nextId(),
            role: 'assistant',
            content: error.response?.data?.error || 'Sorry, I encountered an error. Please try again.',
        });
    }
    finally {
        sending.value = false;
        await scrollToBottom();
    }
}
async function regenerateAnswer() {
    if (sending.value || !currentChatId.value)
        return;
    // Remove the last AI message from the UI so we can show the typing indicator
    if (messages.value[messages.value.length - 1]?.role === 'assistant') {
        messages.value.pop();
    }
    sending.value = true;
    await scrollToBottom();
    try {
        const response = await chatbotService.regenerate(currentChatId.value);
        messages.value.push({ id: nextId(), role: 'assistant', content: response.reply });
    }
    catch (error) {
        messages.value.push({
            id: nextId(),
            role: 'assistant',
            content: error.response?.data?.error || 'Failed to regenerate answer.',
        });
    }
    finally {
        sending.value = false;
        await scrollToBottom();
    }
}
async function selectChat(id) {
    if (sending.value)
        return;
    menuController.close('chat-menu');
    try {
        // Fetch messages for this chat
        const history = await chatbotService.getChatMessages(id);
        // Clear current UI and load the historical messages
        messages.value = history.map((msg) => ({
            id: nextId(),
            role: msg.role,
            content: msg.content
        }));
        currentChatId.value = id;
        await scrollToBottom();
    }
    catch (err) {
        console.error('Failed to load chat messages:', err);
    }
}
function newChat() {
    messages.value = [];
    currentChatId.value = null; // Reset the ID so the next message creates a new chat
    input.value = '';
    menuController.close('chat-menu');
}
async function deleteChat(id) {
    if (!confirm('Are you sure you want to delete this conversation? This cannot be undone.')) {
        return;
    }
    try {
        await chatbotService.deleteChat(id);
        // Remove from list
        savedChats.value = savedChats.value.filter(c => c.id !== id);
        // If the deleted chat was the one currently open, reset the view
        if (currentChatId.value === id) {
            newChat();
        }
    }
    catch (err) {
        console.error('Failed to delete chat:', err);
    }
}
async function scrollToBottom() {
    await nextTick();
    const el = contentRef.value?.$el || contentRef.value;
    if (el && typeof el.scrollToBottom === 'function') {
        await el.scrollToBottom(250);
    }
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
__VLS_withDotValue(editingMessageId, {});
// @ts-ignore
__VLS_withDotValue(sending, {});
// @ts-ignore
__VLS_withDotValue(input, {});
void {};
/** @type {__VLS_StyleScopedClasses['mobile-chat-header']} */ ;
/** @type {__VLS_StyleScopedClasses['chat-toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['chat-toolbar']} */ ;
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
/** @type {__VLS_StyleScopedClasses['msg-action-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['msg-action-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['typing']} */ ;
/** @type {__VLS_StyleScopedClasses['typing']} */ ;
/** @type {__VLS_StyleScopedClasses['typing']} */ ;
/** @type {__VLS_StyleScopedClasses['chat-input']} */ ;
/** @type {__VLS_StyleScopedClasses['send-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-edit-textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-edit-textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-edit-textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-edit-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-edit-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-edit-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-empty']} */ ;
/** @type {__VLS_StyleScopedClasses['msg-action-btn']} */ ;
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
    ...{ 'onNew': {} }, ...{ 'onSelect': {} }, ...{ 'onDelete': {} }, savedChats: (savedChats.value),
}));
const __VLS_13 = __VLS_12({
    ...{ 'onNew': {} },
    ...{ 'onSelect': {} },
    ...{ 'onDelete': {} },
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
const __VLS_19 = {
    /** @type {typeof __VLS_16.delete} */
    onDelete: (deleteChat),
};
void __VLS_19;
var __VLS_14;
var __VLS_15;
let __VLS_20;
/** @ts-ignore @type { | typeof __VLS_components.ionMenu | typeof __VLS_components.IonMenu | typeof __VLS_components['ion-menu'] | typeof __VLS_components.ionMenu | typeof __VLS_components.IonMenu | typeof __VLS_components['ion-menu']} */
ionMenu;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
    // @ts-ignore
    contentId: "chat-main-content", side: "start", menuId: "chat-menu",
}));
const __VLS_22 = __VLS_21({
    contentId: "chat-main-content",
    side: "start",
    menuId: "chat-menu",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const { default: __VLS_25 } = __VLS_nonNull(__VLS_23.slots);
let __VLS_26;
/** @ts-ignore @type { | typeof __VLS_components.ionHeader | typeof __VLS_components.IonHeader | typeof __VLS_components['ion-header'] | typeof __VLS_components.ionHeader | typeof __VLS_components.IonHeader | typeof __VLS_components['ion-header']} */
ionHeader;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
// @ts-ignore
}));
const __VLS_28 = __VLS_27({}, ...__VLS_functionalComponentArgsRest(__VLS_27));
const { default: __VLS_31 } = __VLS_nonNull(__VLS_29.slots);
let __VLS_32;
/** @ts-ignore @type { | typeof __VLS_components.ionToolbar | typeof __VLS_components.IonToolbar | typeof __VLS_components['ion-toolbar'] | typeof __VLS_components.ionToolbar | typeof __VLS_components.IonToolbar | typeof __VLS_components['ion-toolbar']} */
ionToolbar;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
    // @ts-ignore
    ...{ class: "menu-toolbar" },
}));
const __VLS_34 = __VLS_33({
    ...{ class: "menu-toolbar" },
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
/** @type {__VLS_StyleScopedClasses['menu-toolbar']} */ ;
const { default: __VLS_37 } = __VLS_nonNull(__VLS_35.slots);
let __VLS_38;
/** @ts-ignore @type { | typeof __VLS_components.ionTitle | typeof __VLS_components.IonTitle | typeof __VLS_components['ion-title'] | typeof __VLS_components.ionTitle | typeof __VLS_components.IonTitle | typeof __VLS_components['ion-title']} */
ionTitle;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
// @ts-ignore
}));
const __VLS_40 = __VLS_39({}, ...__VLS_functionalComponentArgsRest(__VLS_39));
const { default: __VLS_43 } = __VLS_nonNull(__VLS_41.slots);
// @ts-ignore
[savedChats,];
var __VLS_41;
// @ts-ignore
[];
var __VLS_35;
// @ts-ignore
[];
var __VLS_29;
let __VLS_44;
/** @ts-ignore @type { | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content'] | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content']} */
ionContent;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({
// @ts-ignore
}));
const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
const { default: __VLS_49 } = __VLS_nonNull(__VLS_47.slots);
let __VLS_50;
/** @ts-ignore @type { | typeof __VLS_components.ionList | typeof __VLS_components.IonList | typeof __VLS_components['ion-list'] | typeof __VLS_components.ionList | typeof __VLS_components.IonList | typeof __VLS_components['ion-list']} */
ionList;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
    // @ts-ignore
    lines: "none",
}));
const __VLS_52 = __VLS_51({
    lines: "none",
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
const { default: __VLS_55 } = __VLS_nonNull(__VLS_53.slots);
let __VLS_56;
/** @ts-ignore @type { | typeof __VLS_components.ionListHeader | typeof __VLS_components.IonListHeader | typeof __VLS_components['ion-list-header'] | typeof __VLS_components.ionListHeader | typeof __VLS_components.IonListHeader | typeof __VLS_components['ion-list-header']} */
ionListHeader;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
// @ts-ignore
}));
const __VLS_58 = __VLS_57({}, ...__VLS_functionalComponentArgsRest(__VLS_57));
const { default: __VLS_61 } = __VLS_nonNull(__VLS_59.slots);
let __VLS_62;
/** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
ionLabel;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({
// @ts-ignore
}));
const __VLS_64 = __VLS_63({}, ...__VLS_functionalComponentArgsRest(__VLS_63));
const { default: __VLS_67 } = __VLS_nonNull(__VLS_65.slots);
// @ts-ignore
[];
var __VLS_65;
// @ts-ignore
[];
var __VLS_59;
if (savedChats.value.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "menu-empty" },
    });
    /** @type {__VLS_StyleScopedClasses['menu-empty']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
}
const __VLS_68 = __VLS_tryAsConstant((savedChats.value));
for (const [chat] of __VLS_vFor(__VLS_nonNull(__VLS_68))) {
    let __VLS_69;
    /** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
    ionItem;
    // @ts-ignore
    const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({
        // @ts-ignore
        ...{ 'onClick': {} }, key: (chat.id), button: true,
    }));
    const __VLS_71 = __VLS_70({
        ...{ 'onClick': {} },
        key: (chat.id),
        button: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_70));
    let __VLS_74;
    const __VLS_75 = {
        /** @type {typeof __VLS_74.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            return (selectChat(chat.id));
            // @ts-ignore
            [savedChats, savedChats,];
        },
    };
    void __VLS_75;
    const { default: __VLS_76 } = __VLS_nonNull(__VLS_72.slots);
    let __VLS_77;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_78 = __VLS_asFunctionalComponent1(__VLS_77, new __VLS_77({
        // @ts-ignore
        slot: "start", icon: (__VLS_unwrap(chatbubblesOutline, {})),
    }));
    const __VLS_79 = __VLS_78({
        slot: "start",
        icon: (__VLS_unwrap(chatbubblesOutline, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_78));
    let __VLS_82;
    /** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
    ionLabel;
    // @ts-ignore
    const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({
    // @ts-ignore
    }));
    const __VLS_84 = __VLS_83({}, ...__VLS_functionalComponentArgsRest(__VLS_83));
    const { default: __VLS_87 } = __VLS_nonNull(__VLS_85.slots);
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    (chat.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (chat.last_message || 'No messages yet');
    // @ts-ignore
    [chatbubblesOutline,];
    var __VLS_85;
    // @ts-ignore
    [];
    var __VLS_72;
    var __VLS_73;
    // @ts-ignore
    [];
}
let __VLS_88;
/** @ts-ignore @type { | typeof __VLS_components.ionItemDivider | typeof __VLS_components.IonItemDivider | typeof __VLS_components['ion-item-divider'] | typeof __VLS_components.ionItemDivider | typeof __VLS_components.IonItemDivider | typeof __VLS_components['ion-item-divider']} */
ionItemDivider;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent1(__VLS_88, new __VLS_88({
// @ts-ignore
}));
const __VLS_90 = __VLS_89({}, ...__VLS_functionalComponentArgsRest(__VLS_89));
let __VLS_93;
/** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
ionItem;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({
    // @ts-ignore
    ...{ 'onClick': {} }, button: true,
}));
const __VLS_95 = __VLS_94({
    ...{ 'onClick': {} },
    button: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_94));
let __VLS_98;
const __VLS_99 = {
    /** @type {typeof __VLS_98.click} */
    onClick: (newChat),
};
void __VLS_99;
const { default: __VLS_100 } = __VLS_nonNull(__VLS_96.slots);
let __VLS_101;
/** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
ionIcon;
// @ts-ignore
const __VLS_102 = __VLS_asFunctionalComponent1(__VLS_101, new __VLS_101({
    // @ts-ignore
    slot: "start", icon: (__VLS_unwrap(addOutline, {})),
}));
const __VLS_103 = __VLS_102({
    slot: "start",
    icon: (__VLS_unwrap(addOutline, {})),
}, ...__VLS_functionalComponentArgsRest(__VLS_102));
let __VLS_106;
/** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
ionLabel;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent1(__VLS_106, new __VLS_106({
// @ts-ignore
}));
const __VLS_108 = __VLS_107({}, ...__VLS_functionalComponentArgsRest(__VLS_107));
const { default: __VLS_111 } = __VLS_nonNull(__VLS_109.slots);
// @ts-ignore
[addOutline,];
var __VLS_109;
// @ts-ignore
[];
var __VLS_96;
var __VLS_97;
let __VLS_112;
/** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
ionItem;
// @ts-ignore
const __VLS_113 = __VLS_asFunctionalComponent1(__VLS_112, new __VLS_112({
    // @ts-ignore
    ...{ 'onClick': {} }, button: true,
}));
const __VLS_114 = __VLS_113({
    ...{ 'onClick': {} },
    button: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_113));
let __VLS_117;
const __VLS_118 = {
    /** @type {typeof __VLS_117.click} */
    onClick: (returnToLexcol),
};
void __VLS_118;
const { default: __VLS_119 } = __VLS_nonNull(__VLS_115.slots);
let __VLS_120;
/** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon'] | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
ionIcon;
// @ts-ignore
const __VLS_121 = __VLS_asFunctionalComponent1(__VLS_120, new __VLS_120({
    // @ts-ignore
    slot: "start", icon: (__VLS_unwrap(arrowBackOutline, {})),
}));
const __VLS_122 = __VLS_121({
    slot: "start",
    icon: (__VLS_unwrap(arrowBackOutline, {})),
}, ...__VLS_functionalComponentArgsRest(__VLS_121));
let __VLS_125;
/** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
ionLabel;
// @ts-ignore
const __VLS_126 = __VLS_asFunctionalComponent1(__VLS_125, new __VLS_125({
// @ts-ignore
}));
const __VLS_127 = __VLS_126({}, ...__VLS_functionalComponentArgsRest(__VLS_126));
const { default: __VLS_130 } = __VLS_nonNull(__VLS_128.slots);
// @ts-ignore
[arrowBackOutline,];
var __VLS_128;
// @ts-ignore
[];
var __VLS_115;
var __VLS_116;
// @ts-ignore
[];
var __VLS_53;
// @ts-ignore
[];
var __VLS_47;
// @ts-ignore
[];
var __VLS_23;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    id: "chat-main-content",
    ...{ class: "chat-layout" },
});
/** @type {__VLS_StyleScopedClasses['chat-layout']} */ ;
let __VLS_131;
/** @ts-ignore @type { | typeof __VLS_components.ionHeader | typeof __VLS_components.IonHeader | typeof __VLS_components['ion-header'] | typeof __VLS_components.ionHeader | typeof __VLS_components.IonHeader | typeof __VLS_components['ion-header']} */
ionHeader;
// @ts-ignore
const __VLS_132 = __VLS_asFunctionalComponent1(__VLS_131, new __VLS_131({
    // @ts-ignore
    ...{ class: "mobile-chat-header" },
}));
const __VLS_133 = __VLS_132({
    ...{ class: "mobile-chat-header" },
}, ...__VLS_functionalComponentArgsRest(__VLS_132));
/** @type {__VLS_StyleScopedClasses['mobile-chat-header']} */ ;
const { default: __VLS_136 } = __VLS_nonNull(__VLS_134.slots);
let __VLS_137;
/** @ts-ignore @type { | typeof __VLS_components.ionToolbar | typeof __VLS_components.IonToolbar | typeof __VLS_components['ion-toolbar'] | typeof __VLS_components.ionToolbar | typeof __VLS_components.IonToolbar | typeof __VLS_components['ion-toolbar']} */
ionToolbar;
// @ts-ignore
const __VLS_138 = __VLS_asFunctionalComponent1(__VLS_137, new __VLS_137({
    // @ts-ignore
    ...{ class: "chat-toolbar" },
}));
const __VLS_139 = __VLS_138({
    ...{ class: "chat-toolbar" },
}, ...__VLS_functionalComponentArgsRest(__VLS_138));
/** @type {__VLS_StyleScopedClasses['chat-toolbar']} */ ;
const { default: __VLS_142 } = __VLS_nonNull(__VLS_140.slots);
let __VLS_143;
/** @ts-ignore @type { | typeof __VLS_components.ionButtons | typeof __VLS_components.IonButtons | typeof __VLS_components['ion-buttons'] | typeof __VLS_components.ionButtons | typeof __VLS_components.IonButtons | typeof __VLS_components['ion-buttons']} */
ionButtons;
// @ts-ignore
const __VLS_144 = __VLS_asFunctionalComponent1(__VLS_143, new __VLS_143({
    // @ts-ignore
    slot: "start",
}));
const __VLS_145 = __VLS_144({
    slot: "start",
}, ...__VLS_functionalComponentArgsRest(__VLS_144));
const { default: __VLS_148 } = __VLS_nonNull(__VLS_146.slots);
let __VLS_149;
/** @ts-ignore @type { | typeof __VLS_components.ionMenuButton | typeof __VLS_components.IonMenuButton | typeof __VLS_components['ion-menu-button'] | typeof __VLS_components.ionMenuButton | typeof __VLS_components.IonMenuButton | typeof __VLS_components['ion-menu-button']} */
ionMenuButton;
// @ts-ignore
const __VLS_150 = __VLS_asFunctionalComponent1(__VLS_149, new __VLS_149({
    // @ts-ignore
    menu: "chat-menu",
}));
const __VLS_151 = __VLS_150({
    menu: "chat-menu",
}, ...__VLS_functionalComponentArgsRest(__VLS_150));
// @ts-ignore
[];
var __VLS_146;
let __VLS_154;
/** @ts-ignore @type { | typeof __VLS_components.ionTitle | typeof __VLS_components.IonTitle | typeof __VLS_components['ion-title'] | typeof __VLS_components.ionTitle | typeof __VLS_components.IonTitle | typeof __VLS_components['ion-title']} */
ionTitle;
// @ts-ignore
const __VLS_155 = __VLS_asFunctionalComponent1(__VLS_154, new __VLS_154({
// @ts-ignore
}));
const __VLS_156 = __VLS_155({}, ...__VLS_functionalComponentArgsRest(__VLS_155));
const { default: __VLS_159 } = __VLS_nonNull(__VLS_157.slots);
// @ts-ignore
[];
var __VLS_157;
// @ts-ignore
[];
var __VLS_140;
// @ts-ignore
[];
var __VLS_134;
let __VLS_160;
/** @ts-ignore @type { | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content'] | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content']} */
ionContent;
// @ts-ignore
const __VLS_161 = __VLS_asFunctionalComponent1(__VLS_160, new __VLS_160({
    // @ts-ignore
    ref: "contentRef", ...{ class: "chat-content" },
}));
const __VLS_162 = __VLS_161({
    ref: "contentRef",
    ...{ class: "chat-content" },
}, ...__VLS_functionalComponentArgsRest(__VLS_161));
/** @type {__VLS_StyleScopedClasses['chat-content']} */ ;
const { default: __VLS_165 } = __VLS_nonNull(__VLS_163.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "messages-container" },
});
/** @type {__VLS_StyleScopedClasses['messages-container']} */ ;
if (messages.value.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "empty-state" },
    });
    /** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
    let __VLS_166;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_167 = __VLS_asFunctionalComponent1(__VLS_166, new __VLS_166({
        // @ts-ignore
        icon: (__VLS_unwrap(chatbubblesOutline, {})), ...{ class: "empty-icon" },
    }));
    const __VLS_168 = __VLS_167({
        icon: (__VLS_unwrap(chatbubblesOutline, {})),
        ...{ class: "empty-icon" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_167));
    /** @type {__VLS_StyleScopedClasses['empty-icon']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "message-list" },
    });
    /** @type {__VLS_StyleScopedClasses['message-list']} */ ;
    const __VLS_171 = __VLS_tryAsConstant((messages.value));
    for (const [msg, index] of __VLS_vFor(__VLS_nonNull(__VLS_171))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (msg.id),
            ...{ class: (['message-row', msg.role]) },
        });
        /** @type {__VLS_StyleScopedClasses['message-row']} */ ;
        if (editingMessageId.value === msg.id) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "inline-edit-wrapper" },
            });
            /** @type {__VLS_StyleScopedClasses['inline-edit-wrapper']} */ ;
            let __VLS_172;
            /** @ts-ignore @type { | typeof __VLS_components.ionTextarea | typeof __VLS_components.IonTextarea | typeof __VLS_components['ion-textarea']} */
            ionTextarea;
            // @ts-ignore
            const __VLS_173 = __VLS_asFunctionalComponent1(__VLS_172, new __VLS_172({
                // @ts-ignore
                modelValue: (__VLS_unwrap(editDraftContent, {})), autoGrow: (false), rows: (1), ...{ class: "inline-edit-textarea" },
            }));
            const __VLS_174 = __VLS_173({
                modelValue: (__VLS_unwrap(editDraftContent, {})),
                autoGrow: (false),
                rows: (1),
                ...{ class: "inline-edit-textarea" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_173));
            /** @type {__VLS_StyleScopedClasses['inline-edit-textarea']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "inline-edit-actions" },
            });
            /** @type {__VLS_StyleScopedClasses['inline-edit-actions']} */ ;
            let __VLS_177;
            /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
            ionButton;
            // @ts-ignore
            const __VLS_178 = __VLS_asFunctionalComponent1(__VLS_177, new __VLS_177({
                // @ts-ignore
                ...{ 'onClick': {} }, size: "small", fill: "clear",
            }));
            const __VLS_179 = __VLS_178({
                ...{ 'onClick': {} },
                size: "small",
                fill: "clear",
            }, ...__VLS_functionalComponentArgsRest(__VLS_178));
            let __VLS_182;
            const __VLS_183 = {
                /** @type {typeof __VLS_182.click} */
                onClick: (cancelEdit),
            };
            void __VLS_183;
            const { default: __VLS_184 } = __VLS_nonNull(__VLS_180.slots);
            // @ts-ignore
            [chatbubblesOutline, messages, messages, editingMessageId, editDraftContent,];
            var __VLS_180;
            var __VLS_181;
            let __VLS_185;
            /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
            ionButton;
            // @ts-ignore
            const __VLS_186 = __VLS_asFunctionalComponent1(__VLS_185, new __VLS_185({
                // @ts-ignore
                ...{ 'onClick': {} }, size: "small", color: "dark",
            }));
            const __VLS_187 = __VLS_186({
                ...{ 'onClick': {} },
                size: "small",
                color: "dark",
            }, ...__VLS_functionalComponentArgsRest(__VLS_186));
            let __VLS_190;
            const __VLS_191 = {
                /** @type {typeof __VLS_190.click} */
                onClick: // @ts-ignore
                (...[$event]) => {
                    void $event;
                    if (!!(messages.value.length === 0))
                        throw 0;
                    if (!(editingMessageId.value === msg.id))
                        throw 0;
                    return (saveEdit(index));
                    // @ts-ignore
                    [];
                },
            };
            void __VLS_191;
            const { default: __VLS_192 } = __VLS_nonNull(__VLS_188.slots);
            // @ts-ignore
            [];
            var __VLS_188;
            var __VLS_189;
        }
        else {
            if (msg.role === 'user' && index === messages.value.map(m => m.role).lastIndexOf('user') && !sending.value) {
                let __VLS_193;
                /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
                ionButton;
                // @ts-ignore
                const __VLS_194 = __VLS_asFunctionalComponent1(__VLS_193, new __VLS_193({
                    // @ts-ignore
                    ...{ 'onClick': {} }, fill: "clear", size: "small", ...{ class: "msg-action-btn" },
                }));
                const __VLS_195 = __VLS_194({
                    ...{ 'onClick': {} },
                    fill: "clear",
                    size: "small",
                    ...{ class: "msg-action-btn" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_194));
                let __VLS_198;
                const __VLS_199 = {
                    /** @type {typeof __VLS_198.click} */
                    onClick: // @ts-ignore
                    (...[$event]) => {
                        void $event;
                        if (!!(messages.value.length === 0))
                            throw 0;
                        if (!!(editingMessageId.value === msg.id))
                            throw 0;
                        if (!(msg.role === 'user' && index === messages.value.map(m => m.role).lastIndexOf('user') && !sending.value))
                            throw 0;
                        return (startEdit(msg));
                        // @ts-ignore
                        [messages, sending,];
                    },
                };
                void __VLS_199;
                /** @type {__VLS_StyleScopedClasses['msg-action-btn']} */ ;
                const { default: __VLS_200 } = __VLS_nonNull(__VLS_196.slots);
                let __VLS_201;
                /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
                ionIcon;
                // @ts-ignore
                const __VLS_202 = __VLS_asFunctionalComponent1(__VLS_201, new __VLS_201({
                    // @ts-ignore
                    icon: (__VLS_unwrap(pencilOutline, {})),
                }));
                const __VLS_203 = __VLS_202({
                    icon: (__VLS_unwrap(pencilOutline, {})),
                }, ...__VLS_functionalComponentArgsRest(__VLS_202));
                // @ts-ignore
                [pencilOutline,];
                var __VLS_196;
                var __VLS_197;
            }
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "message-bubble" },
            });
            /** @type {__VLS_StyleScopedClasses['message-bubble']} */ ;
            (msg.content);
            if (msg.role === 'assistant' && index === messages.value.length - 1 && !sending.value) {
                let __VLS_206;
                /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
                ionButton;
                // @ts-ignore
                const __VLS_207 = __VLS_asFunctionalComponent1(__VLS_206, new __VLS_206({
                    // @ts-ignore
                    ...{ 'onClick': {} }, fill: "clear", size: "small", ...{ class: "msg-action-btn" },
                }));
                const __VLS_208 = __VLS_207({
                    ...{ 'onClick': {} },
                    fill: "clear",
                    size: "small",
                    ...{ class: "msg-action-btn" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_207));
                let __VLS_211;
                const __VLS_212 = {
                    /** @type {typeof __VLS_211.click} */
                    onClick: (regenerateAnswer),
                };
                void __VLS_212;
                /** @type {__VLS_StyleScopedClasses['msg-action-btn']} */ ;
                const { default: __VLS_213 } = __VLS_nonNull(__VLS_209.slots);
                let __VLS_214;
                /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
                ionIcon;
                // @ts-ignore
                const __VLS_215 = __VLS_asFunctionalComponent1(__VLS_214, new __VLS_214({
                    // @ts-ignore
                    icon: (__VLS_unwrap(refreshOutline, {})),
                }));
                const __VLS_216 = __VLS_215({
                    icon: (__VLS_unwrap(refreshOutline, {})),
                }, ...__VLS_functionalComponentArgsRest(__VLS_215));
                // @ts-ignore
                [messages, sending, refreshOutline,];
                var __VLS_209;
                var __VLS_210;
            }
        }
        // @ts-ignore
        [];
    }
    if (sending.value && editingMessageId.value === null) {
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
[editingMessageId, sending,];
var __VLS_163;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "input-bar" },
});
/** @type {__VLS_StyleScopedClasses['input-bar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "input-wrapper" },
});
/** @type {__VLS_StyleScopedClasses['input-wrapper']} */ ;
let __VLS_219;
/** @ts-ignore @type { | typeof __VLS_components.ionTextarea | typeof __VLS_components.IonTextarea | typeof __VLS_components['ion-textarea']} */
ionTextarea;
// @ts-ignore
const __VLS_220 = __VLS_asFunctionalComponent1(__VLS_219, new __VLS_219({
    // @ts-ignore
    ...{ 'onKeydown': {} }, modelValue: (input.value), rows: (1), autoGrow: (true), placeholder: "Message Lexcol Assistant...", ...{ class: "chat-input" },
}));
const __VLS_221 = __VLS_220({
    ...{ 'onKeydown': {} },
    modelValue: (input.value),
    rows: (1),
    autoGrow: (true),
    placeholder: "Message Lexcol Assistant...",
    ...{ class: "chat-input" },
}, ...__VLS_functionalComponentArgsRest(__VLS_220));
let __VLS_224;
const __VLS_225 = {
    /** @type {typeof __VLS_224.keydown} */
    onKeydown: (sendMessage),
};
void __VLS_225;
/** @type {__VLS_StyleScopedClasses['chat-input']} */ ;
var __VLS_222;
var __VLS_223;
let __VLS_226;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_227 = __VLS_asFunctionalComponent1(__VLS_226, new __VLS_226({
    // @ts-ignore
    ...{ 'onClick': {} }, ...{ class: "send-btn" }, disabled: (!input.value.trim() || sending.value),
}));
const __VLS_228 = __VLS_227({
    ...{ 'onClick': {} },
    ...{ class: "send-btn" },
    disabled: (!input.value.trim() || sending.value),
}, ...__VLS_functionalComponentArgsRest(__VLS_227));
let __VLS_231;
const __VLS_232 = {
    /** @type {typeof __VLS_231.click} */
    onClick: (sendMessage),
};
void __VLS_232;
/** @type {__VLS_StyleScopedClasses['send-btn']} */ ;
const { default: __VLS_233 } = __VLS_nonNull(__VLS_229.slots);
let __VLS_234;
/** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
ionIcon;
// @ts-ignore
const __VLS_235 = __VLS_asFunctionalComponent1(__VLS_234, new __VLS_234({
    // @ts-ignore
    icon: (__VLS_unwrap(sendOutline, {})),
}));
const __VLS_236 = __VLS_235({
    icon: (__VLS_unwrap(sendOutline, {})),
}, ...__VLS_functionalComponentArgsRest(__VLS_235));
// @ts-ignore
[sending, input, input, sendOutline,];
var __VLS_229;
var __VLS_230;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
