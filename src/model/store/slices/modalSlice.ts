import { StateCreator } from "zustand";
import { AppStore } from "..";

export interface ModalState {
    isModalOpened: boolean;
}

export type ModalActions = {
    setModalOpened: (value: boolean) => void,
}

export type ModalSlice = ModalState & ModalActions;

export const initialModalState: ModalState = {
    isModalOpened: false,
};

export const modalSelector = (state: AppStore) => state.modal

export const createModalSlice: StateCreator<AppStore, [["zustand/devtools", never]], [], ModalSlice> = (set) => ({
    ...initialModalState,
    setModalOpened: (value: boolean) => set(
        (state) => ({ ...state, modal: {
            ...state.modal,
            isModalOpened: value,
        } }),
        true,
        `setModal${value ? "Open" : "Close"}`
    ),
});