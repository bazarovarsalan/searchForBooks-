import { configureStore } from "@reduxjs/toolkit";
import inputSearchSlice from "../inputSearchSlice";
import booksListSlice from "../booksListSlice";
import dropdownSlice from "../dropdownSlice";
import paginationSlice from "../paginationSlice";
import bookItemDetailsSlice from "../bookItemDetailsSlice";

const store = configureStore({
  reducer: {
    inputSearch: inputSearchSlice,
    dropdowns: dropdownSlice,
    booksList: booksListSlice,
    pagination: paginationSlice,
    bookItemDetails: bookItemDetailsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
