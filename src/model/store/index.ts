import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createUserSlice, UserSlice, UserState } from "./slices/userSlice";
import { createMessagesSlice, MessagesSlice, MessagesState } from "./slices/messagesSlice";

export type AppStore = {
    constructor: MessagesSlice;
    user:UserSlice;
}

//export type AppSlices = MessagesSlice

export interface AppState {
    constructor: MessagesState,
    modal: UserState,
}

export const useAppStore = create<AppStore>()(
    devtools((set, get, store) => ({
        user: {...createUserSlice(set, get, store)},
        constructor: {...createMessagesSlice(set, get, store)},
    }))
)