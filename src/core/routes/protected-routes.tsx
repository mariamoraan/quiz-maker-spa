import { useAuth } from "@/features/auth/context/auth.context";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./routes";
import { AppLayout } from "@/layouts/app-layout/app-layout.layout";

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to={ROUTES.LOGIN} />;

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
