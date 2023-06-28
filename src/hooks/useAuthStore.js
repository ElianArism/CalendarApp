import { useDispatch, useSelector } from "react-redux";
import API from "../api/calendarApi";
import {
  clearError,
  onLogin,
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

      dispatch(onLogin({ email, username, _id }));

      localStorage.setItem("x-token", token);
      localStorage.setItem(
        "x-token-start-date",
        new Date().getTime()
      );
    } catch ({ response: { data } }) {
      dispatch(onLogout(data.error.message));
    }
  };

  const clearErrors = () => {
    dispatch(clearError());
  };

  return { startLogin, status, user, errorMessage, clearErrors };
};
