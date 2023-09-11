import { createSlice } from "@reduxjs/toolkit";

type TPagination = {
  pagination: number;
};

const initialState: TPagination = {
  pagination: 30, //поскольку шаг pagination 30, установлено такое default значение
};

const paginationSlice = createSlice({
  name: "offset",
  initialState,
  reducers: {
    addPaginationStep: (state) => {
      state.pagination += 30;
    },
    resetPaginationStep: (state) => {
      state.pagination = 30;
    },
  },
});

export const { resetPaginationStep, addPaginationStep } =
  paginationSlice.actions;

export default paginationSlice.reducer;
