import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/User/authSlice";
import loginReducer from "./features/User/loginSlice";
import thunkMiddleware from "redux-thunk";

const store = configureStore({
  reducer: {
    auth: authReducer,
    login: loginReducer,
  },
  middleware: [thunkMiddleware],
});

export default store;
