import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/login/login.page";
import { HomePage } from "@/pages/home/home.page";
import { ProtectedRoute } from "./protected-routes";
import { AuthRoutes } from "./auth-routes";
import { NewQuestionBankPage } from "@/pages/new-question-bank/new-question-bank.page";
import { QuestionBankPage } from "@/pages/question-bank/question-bank.page";
import { QuizPage } from "@/pages/quiz/quiz.page";
import { ProfilePage } from "@/pages/profile/profile.page";
import { EditQuestionBankPage } from "@/pages/edit-question-bank/edit-question-bank.page";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
          <Route path="settings" index element={<ProfilePage />} />
          <Route path="/question-banks/:id" element={<QuestionBankPage />} />
          <Route
            path="/edit-question-banks/:id"
            element={<EditQuestionBankPage />}
          />
          <Route path="/question-banks/new" element={<NewQuestionBankPage />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
        </Route>
        <Route element={<AuthRoutes />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
