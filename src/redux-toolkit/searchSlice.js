import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { handleGetAllProductService } from "../services/productService";
import { toast } from "react-toastify";

const initialState = {
  allResultSearch: [],
  searchText: "",
};

export const fetchAllProductSearchRedux = createAsyncThunk(
  "admin/fetchAllBrandRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllProductService(
        params?.limit,
        params?.page,
        params?.name
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllProductSearchSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllProductSearchFailed());
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      thunkAPI.dispatch(fetchAllProductSearchFailed());
      console.log(error);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    fetchAllProductSearchSuccess: (state, action) => {
      state.allResultSearch = action.payload;
    },
    fetchAllProductSearchFailed: (state, action) => {
      state.allResultSearch = [];
    },
    handleChangSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const {
  fetchAllProductSearchSuccess,
  fetchAllProductSearchFailed,
  handleChangSearchText,
} = searchSlice.actions;

export default searchSlice.reducer;
