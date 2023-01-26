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
      state.wishlist.push(action.payload);
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

const store = configureStore({
  reducer: {
    navbar: navSlice.reducer,
    register: registerSlice.reducer,
    user: userSlice.reducer,
    profile: profileSlice.reducer,
  },
});

export const navActions = navSlice.actions;
export const registerActions = registerSlice.actions;
export const userActions = userSlice.actions;
export const profileActions = profileSlice.actions;
export default store;
