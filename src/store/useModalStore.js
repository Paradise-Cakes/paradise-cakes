import { create } from "zustand";

export const useModalStore = create((set) => ({
  signInModalOpen: false,
  signUpModalOpen: false,
  confirmationCodeModalOpen: false,
  loggedInModalOpen: false,
  forgotPasswordModalOpen: false,
  resetPasswordModalOpen: false,
  sentResetPassswordEmailModalOpen: false,
  resetPasswordParams: null,

  openSignInModal: () => set({ signInModalOpen: true }),
  closeSignInModal: () => set({ signInModalOpen: false }),

  openSignUpModal: () => set({ signUpModalOpen: true }),
  closeSignUpModal: () => set({ signUpModalOpen: false }),

  openConfirmationCodeModal: () => set({ confirmationCodeModalOpen: true }),
  closeConfirmationCodeModal: () => set({ confirmationCodeModalOpen: false }),

  openLoggedInModal: () => set({ loggedInModalOpen: true }),
  closeLoggedInModal: () => set({ loggedInModalOpen: false }),

  openForgotPasswordModal: () => set({ forgotPasswordModalOpen: true }),
  closeForgotPasswordModal: () => set({ forgotPasswordModalOpen: false }),

  openResetPasswordModal: () => set({ resetPasswordModalOpen: true }),
  closeResetPasswordModal: () => set({ resetPasswordModalOpen: false }),

  openSentResetPassswordEmailModal: () =>
    set({ sentResetPassswordEmailModalOpen: true }),
  closeSentResetPassswordEmailModal: () =>
    set({ sentResetPassswordEmailModalOpen: false }),

  setResetPasswordParams: (params) => set({ resetPasswordParams: params }),

  closeAllModals: () =>
    set({
      signInModalOpen: false,
      signUpModalOpen: false,
      confirmationCodeModalOpen: false,
      loggedInModalOpen: false,
      forgotPasswordModalOpen: false,
      resetPasswordModalOpen: false,
      sentResetPassswordEmailModalOpen: false,
    }),
}));
