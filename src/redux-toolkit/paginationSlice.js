import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isResetPagination: false,
  page: 1,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    handleChangePage: (state, action) => {
      state.page = action.payload;
    },
    handleResetPagination: (state, action) => {
      state.isResetPagination = action.payload;
    },
  },
});

export const { handleChangePage, handleResetPagination } =
  paginationSlice.actions;

export default paginationSlice.reducer;
