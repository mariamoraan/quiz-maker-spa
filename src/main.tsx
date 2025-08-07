import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./core/routes/app-router.tsx";
import "@/core/styles/globals.css";
import "./core/i18n";
import { AuthProvider } from "./features/auth/context/auth.context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>
);
