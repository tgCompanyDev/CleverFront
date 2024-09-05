import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createMessagesSlice, MessagesSlice, MessagesState } from "./slices/messagesSlice";
import { createModalSlice, ModalSlice, ModalState } from "./slices/modalSlice";

export type AppStore = {
    messages: MessagesSlice;
    modal:ModalSlice;
}

//export type AppSlices = MessagesSlice

export interface AppState {
    messages: MessagesState,
    modal: ModalState,
}

export const useAppStore = create<AppStore>()(
    devtools((set, get, store) => ({
        messages: {...createMessagesSlice(set, get, store)},
        modal: {...createModalSlice(set, get, store)},
    }))
)