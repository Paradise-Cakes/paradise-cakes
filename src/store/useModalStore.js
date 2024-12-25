import { create } from "zustand";

export const useModalStore = create((set) => ({
  signInModalOpen: false,
  signUpModalOpen: false,
  confirmationCodeModalOpen: false,
  loggedInModalOpen: false,

  openSignInModal: () => set({ signInModalOpen: true }),
  closeSignInModal: () => set({ signInModalOpen: false }),

  openSignUpModal: () => set({ signUpModalOpen: true }),
  closeSignUpModal: () => set({ signUpModalOpen: false }),

  openConfirmationCodeModal: () => set({ confirmationCodeModalOpen: true }),
  closeConfirmationCodeModal: () => set({ confirmationCodeModalOpen: false }),

  openLoggedInModal: () => set({ loggedInModalOpen: true }),
  closeLoggedInModal: () => set({ loggedInModalOpen: false }),

  closeAllModals: () =>
    set({
      signInModalOpen: false,
      signUpModalOpen: false,
      confirmationCodeModalOpen: false,
      loggedInModalOpen: false,
    }),
}));
