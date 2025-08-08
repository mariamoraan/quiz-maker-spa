import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./core/routes/app-router.tsx";
import "@/core/styles/globals.css";
import "./core/i18n";
import { AuthProvider } from "./features/auth/context/auth.context.tsx";
import { QuestionBanksProvider } from "./features/question-banks/context/question-banks.context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QuestionBanksProvider>
        <AppRouter />
      </QuestionBanksProvider>
    </AuthProvider>
  </StrictMode>
);
