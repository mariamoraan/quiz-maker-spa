import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/login/login.page";
import { HomePage } from "@/pages/home/home.page";
import { ProtectedRoute } from "./protected-routes";
import { AuthRoutes } from "./auth-routes";
import { NewQuestionBankPage } from "@/pages/new-question-bank/new-question-bank.page";
import { QuestionBankPage } from "@/pages/question-bank/question-bank.page";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
          <Route path="/question-banks/:id" element={<QuestionBankPage />} />
          <Route path="/question-banks/new" element={<NewQuestionBankPage />} />
        </Route>
        <Route element={<AuthRoutes />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
