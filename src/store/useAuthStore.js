import { create } from "zustand";

export const useAuthStore = create((set) => ({
  email: "",
  password: "",

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),

  clearSensitiveData: () => set({ password: "" }),
}));
