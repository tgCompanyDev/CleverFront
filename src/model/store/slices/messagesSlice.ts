import { TMessageCard } from "@/widgets/message-list";
import { AppStore } from "..";
import { StateCreator } from "zustand";
import { initialMessageValue } from "../initialValues";
import { message } from "antd";

export interface MessagesState {
    /* messageList */
    messageList: TMessageCard[];
    /* messageCard */
    currentMessage: TMessageCard | undefined;
    bot_id: number;
}

export type MessagesActions = {

    /* messageList */
    setMessageList: (data: TMessageCard[]) => void,
    /* messageCard */
    addMessage: (tempId: number) => void,
    removeMessage: (id: number) => void,
    updateMessage: (data: TMessageCard, id: number) => void,
    moveCard:  (fromIndex:number, toIndex:number) => void,
};

export type MessagesSlice = MessagesState & MessagesActions;

export const initialMessagesState: MessagesState = {
    messageList: [],
    currentMessage: initialMessageValue,
    bot_id: 1,
};

export const MessagesSelector = (state: AppStore) => state.messages
const calculateDivider = (length: number) => (
    Math.pow(10, (length + 1).toString().length)
)

export const createMessagesSlice: StateCreator<AppStore, [["zustand/devtools", never]], [], MessagesSlice> = (set) => ({
    ...initialMessagesState,
    setMessageList: (data) => set(
        (state) => ({ ...state, messages: { ...state.messages, messageList: data } }),
        true,
        "setMessageList"
    ),
    updateMessage: (data, id) => set(
        (state) => ({
            ...state,
            messages: {
                ...state.messages,
                messageList: state.messages.messageList.map(message => id === message.id ? data : message),
            }
        }),
        false,
        "addMessage"
    ),
    addMessage: () => set(
        (state) => ({ ...state, messages: { ...state.messages, messageList: [...state.messages.messageList, { ...initialMessageValue, id: (state.messages.messageList.length + 1) / calculateDivider(state.messages.messageList.length) }] } }),
        false,
        "addMessage"
    ),
    removeMessage: (id) => set(
        (state) => ({ ...state, messages: { ...state.messages, messageList: state.messages.messageList.filter(message => message.id !== id) } }),
        true,
        "removeMessage"
    ),
    moveCard: (fromIndex, toIndex) => set(
        (state) => {
            const messageList = [...state.messages.messageList];
            const [movedCard] = messageList.splice(fromIndex, 1); // возвращает удаленный массив, в исходном массиве его больше нет
            messageList.splice(toIndex, 0, movedCard); //вставляет на toIndex, 0 - не удаляет, массив вставки
            return  ({ ...state, messages: { ...state.messages, messageList: messageList } })
        }
    )
});