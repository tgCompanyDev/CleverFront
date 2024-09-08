import { StateCreator } from "zustand";
import { AppStore } from "..";

export interface UserState {
    isAuthenticated: boolean;
    role: string;
}

export type UserActions = {
    setUserRole: (value: string) => void,
    setIsAuthenticated: (value: boolean) => void,
}

export type UserSlice = UserState & UserActions;

export const initialUserState: UserState = {
    isAuthenticated: false,
    role: "admin",
};

export const userSelector = (state: AppStore) => state.user

export const createUserSlice: StateCreator<AppStore, [["zustand/devtools", never]], [], UserSlice> = (set) => ({
    ...initialUserState,
    setIsAuthenticated: (value: boolean) => set(
        (state) => ({ ...state, user: {
            ...state.user,
            isAuthenticated: value,
        } }),
        true,
        `setUser${value ? "Open" : "Close"}`
    ),
    setUserRole: (value: string) => set(
        (state) => ({
            ...state,
            user: {
                ...state.user,
                role: value,
            }
        }),
        true,
        'setUserRole'
    )
});