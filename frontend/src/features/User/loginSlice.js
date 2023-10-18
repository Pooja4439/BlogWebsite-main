import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: { isLoading: false, error: null },
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      // Store the JWT token in the auth slice
      const token = action.payload.token;
      if (token) {
        state.auth.token = token;
        state.auth.isAuthenticated = true;
      }
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = loginSlice.actions;

export default loginSlice.reducer;
