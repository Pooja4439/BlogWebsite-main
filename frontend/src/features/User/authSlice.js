import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("jwt") || null,
  user: localStorage.getItem("user") || null,
  isAuthenticated: localStorage.getItem("jwt") ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setToken(state, action) {
      state.token = action.payload[0];
      state.user = action.payload[1];
      state.isAuthenticated = true;
      localStorage.setItem("jwt", action.payload[0]);
      localStorage.setItem("user", action.payload[1]);
    },
    clearToken(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
