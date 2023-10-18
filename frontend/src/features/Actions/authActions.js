import { LOGIN_SUCCESS, LOGOUT } from "./actionTypes";

export const loginSuccess = (token, name) => ({
  type: LOGIN_SUCCESS,
  payload: { token, name },
});

export const logout = () => ({
  type: LOGOUT,
});
