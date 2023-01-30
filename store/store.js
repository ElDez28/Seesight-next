import { createSlice, configureStore } from "@reduxjs/toolkit";
const initialState = {
  bg: "bg-transparent",
};
const navSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setBg(state, action) {
      state.bg = action.payload;
    },
  },
});

const registerSlice = createSlice({
  name: "register",
  initialState: {
    register: false,
  },
  reducers: {
    setRegisterToTrue(state) {
      state.register = true;
    },
    setRegisterToFalse(state) {
      state.register = false;
    },
  },
});
const userSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },

  reducers: {
    setWishlist(state, action) {
      state.wishlist = action.payload;
    },
    removeItem(state, action) {
      const newList = state.wishlist.filter(
        (item) => item._id !== action.payload
      );
      state.wishlist = newList;
    },
    addItem(state, action) {
      if (!state.wishlist.find((item) => item._id === action.payload._id)) {
        state.wishlist = [...state.wishlist, action.payload];
      }
    },
  },
});
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    page: 1,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});
const orderSlice = createSlice({
  name: "order",
  initialState: {
    defaultValue: Date.now() + 24 * 60 * 60 * 1000,
    firstDate: Date.now() + 24 * 60 * 60 * 1000,
    secondDate: Date.now() + 48 * 60 * 60 * 1000,
  },
  reducers: {
    setFirstDate(state, action) {
      state.firstDate = action.payload;
    },
    setSecondDate(state, action) {
      state.secondDate = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    navbar: navSlice.reducer,
    register: registerSlice.reducer,
    user: userSlice.reducer,
    profile: profileSlice.reducer,
    order: orderSlice.reducer,
  },
});

export const navActions = navSlice.actions;
export const registerActions = registerSlice.actions;
export const userActions = userSlice.actions;
export const profileActions = profileSlice.actions;
export const orderActions = orderSlice.actions;
export default store;
