import { TMessageCard } from "@/widgets/message-list";
import { AppSlices, AppStore } from "..";
import { StateCreator } from "zustand";
import { initialMessageValue } from "../initialValues";

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
    currentMessage: initialMessageValue,
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
        (state) => ({...state, messages: {...state.messages, messageList: [...state.messages.messageList, {...initialMessageValue, id: tempId + 1}]}}),
        false,
        "addMessage"
    ),
    removeMessage: (data) => set(
        (state) => ({ ...state}),
        true,
        "removeMessage"
    ),
});