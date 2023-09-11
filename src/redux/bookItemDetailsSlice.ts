import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Booktem {
  title: string;
  authors: string[];
  categories: string[];
  image: string;
  id: string;
  description: string;
}
interface IInitState {
  details: Booktem | null;
}

const initialState: IInitState = {
  details: null,
};

const bookItemDetailsSlice = createSlice({
  name: "bookItemDetails",
  initialState,
  reducers: {
    addDetails: (state, action: PayloadAction<Booktem>) => {
      state.details = action.payload;
    },
  },
});

export const { addDetails } = bookItemDetailsSlice.actions;

export default bookItemDetailsSlice.reducer;
