import React from "react";
import { useDispatch } from "react-redux";
import { clearToken } from "../features/User/authSlice";

function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearToken());
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
