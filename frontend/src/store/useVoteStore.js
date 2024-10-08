import { create } from "zustand";
import { persist } from "zustand/middleware";

export const MAX_SELECTIONS = 5;

export const useVoteStore = create(
  persist(
    (set) => ({
      options: [],
      selectedOptions: [],
      jwtToken: null,

      setOptions: (options) => set({ options }),
      toggleOption: (id) =>
        set((state) => {
          if (state.selectedOptions.includes(id)) {
            return {
              selectedOptions: state.selectedOptions.filter(
                (optionId) => optionId !== id
              ),
            };
          } else if (state.selectedOptions.length < MAX_SELECTIONS) {
            return { selectedOptions: [...state.selectedOptions, id] };
          }
          return state;
        }),
      setJwtToken: (token) => set({ jwtToken: token }),
    }),
    {
      name: "vote-storage",
      getStorage: () => localStorage,
    }
  )
);

// export useVoteStore;
