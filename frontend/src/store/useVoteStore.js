import { create } from "zustand";

export const MAX_SELECTIONS = 3;

// Zustand store
export const useVoteStore = create((set) => ({
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
}));

// export useVoteStore;
