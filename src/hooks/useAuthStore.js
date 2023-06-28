import { useDispatch, useSelector } from "react-redux";
import API from "../api/calendarApi";
import { saveJWT } from "../helpers/saveJWT";
import {
  clearError,
  clearEvents,
  onAuthenticated,
  onLogout,
  verifyAuthentication,
} from "../store";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector(
    (state) => state.auth
  );

  const startLogin = async ({ email, password }) => {
    dispatch(verifyAuthentication());
    try {
      const {
        data: {
          data: { username, _id, token },
        },
      } = await API.post("/auth/login", {
        email,
        password,
      });

      dispatch(onAuthenticated({ email, username, _id }));

      saveJWT(token);
    } catch (error) {
      const exception =
        error?.response?.data?.error?.message || "Unknown error";
      dispatch(onLogout(exception));
    }
  };

  const startRegister = async ({ username, email, password }) => {
    dispatch(verifyAuthentication());
    try {
      const {
        data: { data: userInfo },
      } = await API.post("/auth/signup", {
        username,
        email,
        password,
      });

      dispatch(
        onAuthenticated({ email, username, _id: userInfo._id })
      );

      saveJWT(userInfo.token);
    } catch (error) {
      const exception =
        error?.response?.data?.error?.message || "Unknown error";
      dispatch(onLogout(exception));
    }
  };

  const clearErrors = () => {
    dispatch(clearError());
  };

  const startLogout = () => {
    dispatch(clearEvents());
    dispatch(onLogout());
    localStorage.clear();
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("x-token");
    if (!token) return dispatch(onLogout());

    try {
      const response = await API.get("/auth/renew");
      const { username, _id, token } = response.data.data;
      saveJWT(token);
      dispatch(onAuthenticated({ username, _id }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  return {
    startLogin,
    startRegister,
    status,
    user,
    checkAuthToken,
    errorMessage,
    startLogout,
    clearErrors,
  };
};
