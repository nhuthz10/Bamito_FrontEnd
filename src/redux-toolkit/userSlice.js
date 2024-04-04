import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  userInfo: [],
  favourites: [],
  cartId: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.login = true;
      state.userInfo = action.payload;
    },
    logOut: (state) => {
      state.login = false;
      state.userInfo = [];
      state.favourites = [];
      state.cartId = null;
    },
    updateAvatar: (state, action) => {
      state.userInfo.avatar = action.payload;
    },
    updateFavourites: (state, action) => {
      state.favourites = action.payload;
    },
    updateCartId: (state, action) => {
      state.cartId = action.payload;
    },
  },
});

export const { logOut, logIn, updateAvatar, updateFavourites, updateCartId } =
  userSlice.actions;

export default userSlice.reducer;
