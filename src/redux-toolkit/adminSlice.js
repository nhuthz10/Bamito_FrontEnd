import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleGetAllUserService,
  handleGetAllRoleService,
} from "../services/userService";
import dayjs from "dayjs";
import {
  handleGetAllBrandService,
  handleGetAllProductTypeService,
  handleGetAllSizeService,
  handleGetAllProductService,
  handleGetAllProductSizeService,
  handleGetAllSizeOfTheProductType,
  handleGetAllVoucher,
  handleGetAllOrderAdmin,
  handleGetAllProductReport,
} from "../services/productService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  allUser: {},
  allRole: [],
  allBrand: [],
  allProductType: [],
  allSize: [],
  allProduct: [],
  allProductSize: [],
  allProductSizeOfTheProductType: [],
  allVoucher: [],
  productData: {},
  allOrder: [],
  allProductOrder: [],
  searchTextProductAdmin: null,
  timeReport: {
    timeStart: dayjs(dayjs().startOf("month").toDate()).valueOf(),
    timeEnd: dayjs(dayjs().endOf("month").toDate()).valueOf(),
  },
};

export const fetchAllUserRedux = createAsyncThunk(
  "admin/fetchAllUserRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllUserService(
        params?.limit,
        params?.page,
        params?.name
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllUserSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllUserFailed());
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      thunkAPI.dispatch(fetchAllUserFailed());
      console.log(error);
    }
  }
);

export const fetchAllRoleRedux = createAsyncThunk(
  "admin/fetchAllRoleRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllRoleService();
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllRoleSuccess(res?.data));
      } else {
        thunkAPI.dispatch(fetchAllRoleFailed());
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      thunkAPI.dispatch(fetchAllRoleFailed());
      console.log(error);
    }
  }
);

export const fetchAllBrandRedux = createAsyncThunk(
  "admin/fetchAllBrandRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllBrandService(
        params?.limit,
        params?.page,
        params?.name,
        params?.pagination
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllBrandSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllBrandFailed());
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      thunkAPI.dispatch(fetchAllBrandFailed());
      console.log(error);
    }
  }
);

export const fetchAllProductTypeRedux = createAsyncThunk(
  "admin/fetchAllBrandRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllProductTypeService(
        params?.limit,
        params?.page,
        params?.name,
        params?.pagination
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllProductTypeSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllProductTypeFailed());
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      thunkAPI.dispatch(fetchAllProductTypeFailed());
      console.log(error);
    }
  }
);

export const fetchAllSizeRedux = createAsyncThunk(
  "admin/fetchAllBrandRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllSizeService(
        params?.limit,
        params?.page,
        params?.name
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllSizeSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllSizeFailed());
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      thunkAPI.dispatch(fetchAllSizeFailed());
      console.log(error);
    }
  }
);

export const fetchAllProductRedux = createAsyncThunk(
  "admin/fetchAllBrandRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllProductService(
        params?.limit,
        params?.page,
        params?.name
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllProductSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllProductFailed());
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      thunkAPI.dispatch(fetchAllProductFailed());
      console.log(error);
    }
  }
);

export const fetchAllProductSizeRedux = createAsyncThunk(
  "admin/fetchAllBrandRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllProductSizeService(
        params?.productId,
        params?.limit,
        params?.page
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllProductSizeSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllProductSizeFailed());
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      thunkAPI.dispatch(fetchAllProductSizeFailed());
      console.log(error);
    }
  }
);

export const fetchAllProductSizeOfTheProductTypeRedux = createAsyncThunk(
  "admin/fetchAllBrandRedux",
  async (productTypeId, thunkAPI) => {
    try {
      let res = await handleGetAllSizeOfTheProductType(productTypeId);
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(
          fetchAllProductSizeOfTheProductTypeSuccess(res?.data)
        );
      } else {
        thunkAPI.dispatch(fetchAllProductSizeOfTheProductTypeFailed());
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      thunkAPI.dispatch(fetchAllProductSizeOfTheProductTypeFailed());
      console.log(error);
    }
  }
);

export const fetchAllVoucherRedux = createAsyncThunk(
  "admin/fetchAllBrandRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllVoucher(
        params?.limit,
        params?.page,
        params?.name,
        params?.pagination
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllVoucherSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllVoucherFailed());
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      thunkAPI.dispatch(fetchAllVoucherFailed());
      console.log(error);
    }
  }
);

export const fetchAllOrderAdminRedux = createAsyncThunk(
  "admin/fetchAllOrderRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllOrderAdmin(
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

export const fetchAllProductOrderRedux = createAsyncThunk(
  "admin/fetchAllProductOrderRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllProductReport(
        params?.timeStart,
        params?.timeEnd,
        params?.limit,
        params?.page
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllProductOrderSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllProductOrderFailed());
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      thunkAPI.dispatch(fetchAllProductOrderFailed());
      console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loadingAdmin: (state, action) => {
      state.isLoading = action.payload;
    },
    fetchAllUserSuccess: (state, action) => {
      state.allUser = action.payload;
    },
    fetchAllUserFailed: (state, action) => {
      state.allUser = [];
    },
    fetchAllRoleSuccess: (state, action) => {
      state.allRole = action.payload;
    },
    fetchAllRoleFailed: (state, action) => {
      state.allRole = [];
    },
    fetchAllBrandSuccess: (state, action) => {
      state.allBrand = action.payload;
    },
    fetchAllBrandFailed: (state, action) => {
      state.allBrand = [];
    },
    fetchAllProductTypeSuccess: (state, action) => {
      state.allProductType = action.payload;
    },
    fetchAllProductTypeFailed: (state, action) => {
      state.allProductType = [];
    },
    fetchAllSizeSuccess: (state, action) => {
      state.allSize = action.payload;
    },
    fetchAllSizeFailed: (state, action) => {
      state.allSize = [];
    },
    fetchAllProductSuccess: (state, action) => {
      state.allProduct = action.payload;
    },
    fetchAllProductFailed: (state, action) => {
      state.allProduct = [];
    },
    fetchAllProductSizeSuccess: (state, action) => {
      state.allProductSize = action.payload;
    },
    fetchAllProductSizeFailed: (state, action) => {
      state.allProductSize = [];
    },
    CRUDProductSize: (state, action) => {
      state.productData = action.payload;
    },
    fetchAllProductSizeOfTheProductTypeSuccess: (state, action) => {
      state.allProductSizeOfTheProductType = action.payload;
    },
    fetchAllProductSizeOfTheProductTypeFailed: (state, action) => {
      state.allProductSizeOfTheProductType = [];
    },
    fetchAllVoucherSuccess: (state, action) => {
      state.allVoucher = action.payload;
    },
    fetchAllVoucherFailed: (state, action) => {
      state.allVoucher = [];
    },
    fetchAllOrderSuccess: (state, action) => {
      state.allOrder = action.payload;
    },
    fetchAllOrderFailed: (state, action) => {
      state.allOrder = [];
    },
    handleChangeSearchProductAdmin: (state, action) => {
      state.searchTextProductAdmin = action.payload;
    },
    fetchAllProductOrderSuccess: (state, action) => {
      state.allProductOrder = action.payload;
    },
    fetchAllProductOrderFailed: (state, action) => {
      state.allProductOrder = [];
    },
    handleChangeTimeReport: (state, action) => {
      state.timeReport = action.payload;
    },
  },
});

export const {
  fetchAllUserSuccess,
  fetchAllUserFailed,
  fetchAllRoleSuccess,
  fetchAllRoleFailed,
  loadingAdmin,
  fetchAllBrandSuccess,
  fetchAllBrandFailed,
  fetchAllProductTypeSuccess,
  fetchAllProductTypeFailed,
  fetchAllSizeSuccess,
  fetchAllSizeFailed,
  fetchAllProductSuccess,
  fetchAllProductFailed,
  CRUDProductSize,
  fetchAllProductSizeSuccess,
  fetchAllProductSizeFailed,
  fetchAllProductSizeOfTheProductTypeSuccess,
  fetchAllProductSizeOfTheProductTypeFailed,
  CRUDProuctSize,
  fetchAllVoucherSuccess,
  fetchAllVoucherFailed,
  fetchAllOrderSuccess,
  fetchAllOrderFailed,
  handleChangeSearchProductAdmin,
  fetchAllProductOrderSuccess,
  fetchAllProductOrderFailed,
  handleChangeTimeReport,
} = userSlice.actions;

export default userSlice.reducer;
