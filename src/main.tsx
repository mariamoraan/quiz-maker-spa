import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./core/routes/app-router.tsx";
import "@/core/styles/globals.css";
import "./core/i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
