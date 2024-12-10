import { create } from "zustand";

interface useOpenProps {
	isOpen: boolean;
	setOpen: () => void;
	setClose: () => void;
}

export const useOpenSidebar = create<useOpenProps>((set) => ({
	isOpen: false,
	setOpen: () => set({ isOpen: true }),
	setClose: () => set({ isOpen: false }),
}));
