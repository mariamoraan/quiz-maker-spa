import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/login/login.page";
import { HomePage } from "@/pages/home/home.page";
import { ProtectedRoute } from "./protected-routes";
import { AuthRoutes } from "./auth-routes";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route element={<AuthRoutes />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
