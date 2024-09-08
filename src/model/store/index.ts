import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createMessagesSlice, MessagesSlice, MessagesState } from "./slices/messagesSlice";
import { createUserSlice, UserSlice, UserState } from "./slices/userSlice";

export type AppStore = {
    messages: MessagesSlice;
    user:UserSlice;
}

//export type AppSlices = MessagesSlice

export interface AppState {
    messages: MessagesState,
    modal: UserState,
}

export const useAppStore = create<AppStore>()(
    devtools((set, get, store) => ({
        messages: {...createMessagesSlice(set, get, store)},
        user: {...createUserSlice(set, get, store)},
    }))
)