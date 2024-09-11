import { StateCreator } from "zustand";
import { AppStore } from "@/model/store";
import { initialMessageValue, TMessageCard } from "@/features/constructor";

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

export const MessagesSelector = (state: AppStore) => state.constructor
const calculateDivider = (length: number) => (
    Math.pow(10, (length + 1).toString().length)
)

export const createMessagesSlice: StateCreator<AppStore, [["zustand/devtools", never]], [], MessagesSlice> = (set) => ({
    ...initialMessagesState,
    setMessageList: (data) => set(
        (state) => ({ ...state, constructor: { ...state.constructor, messageList: data } }),
        true,
        "setMessageList"
    ),
    updateMessage: (data, id) => set(
        (state) => ({
            ...state,
            constructor: {
                ...state.constructor,
                messageList: state.constructor.messageList.map(message => id === message.id ? data : message),
            }
        }),
        false,
        "addMessage"
    ),
    addMessage: () => set(
        (state) => ({ ...state, constructor: { ...state.constructor, messageList: [...state.constructor.messageList, { ...initialMessageValue, id: (state.constructor.messageList.length + 1) / calculateDivider(state.constructor.messageList.length) }] } }),
        false,
        "addMessage"
    ),
    removeMessage: (id) => set(
        (state) => ({ ...state, constructor: { ...state.constructor, messageList: state.constructor.messageList.filter(message => message.id !== id) } }),
        true,
        "removeMessage"
    ),
    moveCard: (fromIndex, toIndex) => set(
        (state) => {
            const messageList = [...state.constructor.messageList];
            const [movedCard] = messageList.splice(fromIndex, 1); // возвращает удаленный массив, в исходном массиве его больше нет
            messageList.splice(toIndex, 0, movedCard); //вставляет на toIndex, 0 - не удаляет, массив вставки
            return  ({ ...state, constructor: { ...state.constructor, messageList: messageList } })
        }
    )
});