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

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    reservations: [],
    complaints: [],
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setReservations(state, action) {
      state.reservations = action.payload;
    },
    setComplaints(state, action) {
      state.complaints = action.payload;
    },
    changeUserStatus(state, action) {
      const user = state.users.find((user) => user._id === action.payload.id);
      user.isActive = action.payload.status;
      const filteredUsers = state.users.filter(
        (user) => user.id !== action.payload.id
      );
      const newUsers = [...filteredUsers, user];
      state.users = newUsers;
    },
    changeResStatus(state, action) {
      const reservation = state.reservations.find(
        (res) => res._id === action.payload.id
      );

      reservation.status = action.payload.status;
      const filteredReservations = state.reservations.filter(
        (res) => res._id !== action.payload.id
      );
      const newRes = [...filteredReservations, reservation];
      state.reservations = newRes.sort(
        (a, b) => new Date(a.startingDate) - new Date(b.startingDate)
      );
    },
    deleteRes(state, action) {
      const newRes = state.reservations.filter(
        (res) => res._id !== action.payload
      );
      state.reservations = newRes.sort(
        (a, b) => new Date(a.startingDate) - new Date(b.startingDate)
      );
    },
    deleteComplaint(state, action) {
      const newRes = state.complaints.filter(
        (com) => com._id !== action.payload
      );
      state.complaints = newRes;
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
    admin: adminSlice.reducer,
  },
});

export const navActions = navSlice.actions;
export const registerActions = registerSlice.actions;
export const userActions = userSlice.actions;
export const profileActions = profileSlice.actions;
export const orderActions = orderSlice.actions;
export const adminActions = adminSlice.actions;
export default store;
