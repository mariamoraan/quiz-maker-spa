import { useAuth } from "@/features/auth/context/auth.context";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./routes";

export function AuthRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  if (user) return <Navigate to={ROUTES.HOME} />;

  return <Outlet />;
}
