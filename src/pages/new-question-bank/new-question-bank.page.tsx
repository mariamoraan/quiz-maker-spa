import { BankConfigForm } from "@/features/question-banks/components/bank-config-form/bank-config-form.component";
import { QuestionsList } from "@/features/question-banks/components/questions-list-form/questions-list-form.component";
import type { Question } from "@/features/question-banks/domain/question";
import { useState } from "react";
import { Button } from "@/core/components/button/button.component";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/features/auth/context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import type { QuestionBank } from "@/features/question-banks/domain/question-bank";
import { generateUUID } from "@/core/utils/generate-uuid";
import { ROUTES } from "@/core/routes/routes";
import { GoBackArrowIcon } from "@/core/icons";
import styles from "./new-question-bank.module.scss";
import { bind } from "@/core/styles/bind";
import { useQuestionBanks } from "@/features/question-banks/context/question-banks.context";
import { postQuestionBank } from "@/features/question-banks/services/post-question-bank";
const cn = bind(styles);

export const NewQuestionBankPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setQuestionBanks, questionBanks } = useQuestionBanks();
  const [name, setName] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const createBank = async () => {
    if (!user) return;
    const questionBank: QuestionBank = {
      id: generateUUID(),
      name: name,
      questions,
      userId: user.uid,
    };
    await postQuestionBank(questionBank);
    setQuestionBanks([
      ...questionBanks,
      {
        id: questionBank.id,
        name: questionBank.name,
        questionsNumber: questionBank.questions.length,
        userId: questionBank.userId,
      },
    ]);
    navigate(ROUTES.HOME);
  };
  return (
    <div className={cn("new-question-bank-page")}>
      <div className={cn("new-question-bank-page__header")}>
        <Link
          className={cn("new-question-bank-page__header__link")}
          to={ROUTES.HOME}
        >
          <GoBackArrowIcon />
        </Link>
        <h1 className={cn("new-question-bank-page__header__title")}>
          {t("new-question-bank")}
        </h1>
      </div>
      <div className={cn("new-question-bank-page__content")}>
        <BankConfigForm name={name} setName={setName} />
        <QuestionsList questions={questions} setQuestions={setQuestions} />
      </div>
      <Button
        onClick={createBank}
        label={t("question-bank-form.create-question-bank")}
        color="primary"
        disabled={!name || questions.length === 0}
        center
        className={cn("new-question-bank-page__button")}
      />
    </div>
  );
};
