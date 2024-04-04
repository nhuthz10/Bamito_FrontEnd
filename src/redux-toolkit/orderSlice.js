import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleGetAllOrderService } from "../services/productService";
import { toast } from "react-toastify";

const initialState = {
  allOrder: [],
};

export const fetchAllOrderRedux = createAsyncThunk(
  "admin/fetchAllOrderRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllOrderService(
        params?.userId,
        params?.status,
        params?.limit,
        params?.page
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllOrderSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllOrderFailed());
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      thunkAPI.dispatch(fetchAllOrderFailed());
      console.log(error);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    fetchAllOrderSuccess: (state, action) => {
      state.allOrder = action.payload;
    },
    fetchAllOrderFailed: (state, action) => {
      state.allOrder = [];
    },
  },
});

export const {
  fetchAllOrderSuccess,
  fetchAllOrderFailed,
  handleChangSearchText,
} = searchSlice.actions;

export default searchSlice.reducer;
