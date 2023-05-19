import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../auth/pages/Login";
import { Calendar } from "../calendar/pages/Calendar";

export const AppRouter = () => {
  const authStatus = "";
  return (
    <>
      <Routes>
        {authStatus === "notAuthenticated" ? (
          <Route path="/auth/*" element={<Login />} />
        ) : (
          <Route path="/*" element={<Calendar />} />
        )}
        <Route path="/*" element={<Navigate to={"/auth/login"} />} />
      </Routes>
    </>
  );
};
