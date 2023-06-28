import { useEffect, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../auth/pages/Login";
import { Calendar } from "../calendar/pages/Calendar";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {
  const { checkAuthToken, status } = useAuthStore();

  const isAuthenticated = useMemo(
    () => status === "authenticated",
    [status]
  );

  useEffect(() => {
    checkAuthToken();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (status === "checking") {
    return (
      <div
        style={{ height: "100vh", width: "100%" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div
          className="spinner-border text-primary"
          role="status"
        ></div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Calendar />} />
            <Route path="/*" element={<Navigate to={"/"} />} />
          </>
        ) : (
          <>
            <Route path="/auth/*" element={<Login />} />
            <Route
              path="/*"
              element={<Navigate to={"/auth/login"} />}
            />
          </>
        )}
      </Routes>
    </>
  );
};
