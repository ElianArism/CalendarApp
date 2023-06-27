import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../auth/pages/Login";
import { Calendar } from "../calendar/pages/Calendar";

export const AppRouter = () => {
  const authStatus = "not-authenticated";
  return (
    <>
      <Routes>
        {authStatus === "not-authenticated" ? (
          <Route path="/auth/*" element={<Login />} />
        ) : (
          <Route path="/*" element={<Calendar />} />
        )}
        <Route path="/*" element={<Navigate to={"/auth/login"} />} />
      </Routes>
    </>
  );
};
