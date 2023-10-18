import axios from "axios";
import { setToken, clearToken } from "../features/User/authSlice";
import { logout, loginFailure } from "../features/User/loginSlice";

const apiMiddleware = (store) => (next) => (action) => {
  if (action.type === "login/loginStart") {
    // Intercept the login action to attach the JWT token
    const { username, password } = action.payload;
    axios({
      // Endpoint to send files
      url: "http://localhost:8000/auth/login/",
      method: "POST",
      headers: {},

      // Attaching the form data
      data: { username, password },
    })
      .then((res) => {
        const token = res.data.access;
        const user = res.data.username;
        //  console.log(token);
        localStorage.setItem("jwt", token);
        localStorage.setItem("user", user);

        store.dispatch(setToken([token, user]));
        next(action);
      })

      // Catch errors if any
      .catch((err) => {
        store.dispatch(loginFailure({ error: "Login failed" }));
      });
  } else if (action.type === "api/logout") {
    // Intercept the logout action to clear the JWT token
    // Perform any other logout-related tasks (e.g., redirecting)
    store.dispatch(clearToken());
    next(action);
  } else {
    // Pass other actions through
    next(action);
  }
};

export default apiMiddleware;
