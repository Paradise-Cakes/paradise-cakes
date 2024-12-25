import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set) => ({
      user: {
        firstName: "",
        lastName: "",
        loggedIn: false,
      },
      setUser: (user) => set({ user }),

      // logout
      logout: () =>
        set({
          user: {
            firstName: "",
            lastName: "",
            loggedIn: false,
          },
        }),
    }),
    {
      name: "app-store",
      getStorage: () => localStorage,
    }
  )
);
