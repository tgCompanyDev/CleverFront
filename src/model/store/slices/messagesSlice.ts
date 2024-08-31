import { TMessageCard } from "@/widgets/message-list";
import { AppSlices, AppStore } from "..";
import { StateCreator } from "zustand";

export interface MessagesState {
    /* messageList */
    messageList: TMessageCard[] | [];
    /* messageCard */
    currentMessage: TMessageCard | undefined;
    bot_id: number;
}

export type MessagesActions = {

    /* messageList */
    setMessageList: (data: TMessageCard[]) => void,
    /* messageCard */
    addMessage: (tempId: number) => void,
    removeMessage: (data: TMessageCard) => void,
};

export type MessagesSlice = MessagesState & MessagesActions;

export const initialMessagesState: MessagesState = {
    messageList: [],
    currentMessage: {
        bot_id: null,
        id: null,
        save_confirmation: false,
        name: "Новое сообщение",
        text: "Описание",
        type: "message",
        first_message: false,
        wait_input: null,
        need_confirmation: false,
        next_message_id: null,
        image: "",
        attachment_id: null,
        buttons: []
    },
    bot_id: 1,
};

export const MessagesSelector = (state: AppStore) => state.messages

export const createMessagesSlice: StateCreator<AppStore, [["zustand/devtools", never]], [], MessagesSlice> = (set) => ({
    ...initialMessagesState,
    setMessageList: (data) => set(
        (state) => ({...state, messages: {...state.messages, messageList: data}}),
        true,
        "setMessageList"
    ),
    addMessage: (tempId) => set(
        (state) => ({...state, messages: {...state.messages, messageList: [...state.messages.messageList, {...initialMessagesState.currentMessage, id: tempId + 1}]}}),
        false,
        "addMessage"
    ),
    removeMessage: (data) => set(
        (state) => ({ ...state}),
        true,
        "removeMessage"
    ),
});