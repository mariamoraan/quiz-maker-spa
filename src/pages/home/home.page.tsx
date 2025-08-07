import { useAuth } from "@/features/auth/context/auth.context";

export const HomePage = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Hola {user?.name}</h1>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};
