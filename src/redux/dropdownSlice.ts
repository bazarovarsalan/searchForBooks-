import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type dropdownState = {
  categories: string;
  sortingBy: string;
};

const initialState: dropdownState = {
  categories: "all",
  sortingBy: "relevance",
};

const dropdownSlice = createSlice({
  name: "dropdowns",
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<string>) => {
      state.categories = action.payload;
    },
    selectSortingBy: (state, action: PayloadAction<string>) => {
      state.sortingBy = action.payload;
    },
  },
});

export const { selectCategory, selectSortingBy } = dropdownSlice.actions;

export default dropdownSlice.reducer;
