import { create, createStore, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createMessagesSlice, initialMessagesState, MessagesSlice, MessagesState } from "./slices/messagesSlice";

export type AppStore = {
    messages: MessagesSlice;
}

export type AppSlices = MessagesSlice

export interface AppState {
    messages: MessagesState,
}

export const useAppStore = create<AppStore>()(
    devtools((set, get, store) => ({
        messages: {...createMessagesSlice(set, get, store)}
    }))
)