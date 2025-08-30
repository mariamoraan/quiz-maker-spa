import { GoBackArrowIcon } from "@/core/icons";
import { ROUTES } from "@/core/routes/routes";
import { Link, useNavigate, useParams } from "react-router-dom";

import styles from "./edit-question-bank.module.scss";
import { bind } from "@/core/styles/bind";
import { useQuestionBanks } from "@/features/question-banks/context/question-banks.context";
import { useEffect, useState } from "react";
import type { QuestionBank } from "@/features/question-banks/domain/question-bank";
import { getInitialQuestionBank } from "@/features/question-banks/utils/get-initial-question-bank";
import { getQuestionBank } from "@/features/question-banks/services/get-question-bank";
import { useAuth } from "@/features/auth/context/auth.context";
import { BankConfigForm } from "@/features/question-banks/components/bank-config-form/bank-config-form.component";
import { QuestionsList } from "@/features/question-banks/components/questions-list-form/questions-list-form.component";
import { Button } from "@/core/components/button/button.component";
import { useTranslation } from "react-i18next";
import { postQuestionBank } from "@/features/question-banks/services/post-question-bank";
import { getEnabledQuestions } from "@/features/question-banks/utils/get-enabled-questions";
const cn = bind(styles);

export const EditQuestionBankPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { questionBanks, setQuestionBanks } = useQuestionBanks();
  const [questionBank, setQuestionBank] = useState<QuestionBank | null>(
    getInitialQuestionBank(questionBanks, id)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(questionBank?.name || "");
  const [questions, setQuestions] = useState(questionBank?.questions || []);

  useEffect(() => {
    setQuestionBank(getInitialQuestionBank(questionBanks, id));
  }, [questionBanks.length]);
  useEffect(() => {
    const setup = async (bankId: string) => {
      setIsLoading(true);
      const resBank = await getQuestionBank(bankId);
      setName(resBank?.name ?? "");
      setQuestions(resBank?.questions ?? []);
      setQuestionBank(resBank);
      setIsLoading(false);
    };

    if (!user?.uid || !id || !questionBank?.userId) return;
    if (questionBank?.userId !== user.uid) return;
    setup(id);
  }, [user?.uid, id, questionBank?.userId]);

  const editBank = async () => {
    if (!user || !id) return;
    const questionBank: QuestionBank = {
      id: id,
      name: name,
      questions,
      userId: user.uid,
    };
    await postQuestionBank(questionBank);
    setQuestionBanks([
      ...questionBanks.filter((qb) => qb.id !== questionBank.id),
      {
        id: questionBank.id,
        name: questionBank.name,
        questionsNumber: questionBank.questions.length,
        userId: questionBank.userId,
      },
    ]);
    navigate(ROUTES.QUESTION_BANK(questionBank.id));
  };

  // TODO: add skeleton
  if (isLoading) return <div>Loading...</div>;
  // TODO: add good error message
  if (!questionBank) return <div>Question bank not found</div>;

  return (
    <div className={cn("edit-question-bank")}>
      <div className={cn("edit-question-bank__header")}>
        <Link
          className={cn("edit-question-bank__header__link")}
          to={ROUTES.QUESTION_BANK(questionBank.id)}
        >
          <GoBackArrowIcon />
        </Link>
        <h1 className={cn("edit-question-bank__header__title")}>
          {questionBank.name}
        </h1>
      </div>
      <div className={cn("edit-question-bank__content")}>
        <BankConfigForm name={name} setName={setName} />
        <QuestionsList questions={questions} setQuestions={setQuestions} />
      </div>
      <Button
        onClick={editBank}
        label={t("question-bank-form.edit-question-bank")}
        color="primary"
        disabled={!name || getEnabledQuestions(questions).length === questionBank.questions.length}
        center
        className={cn("new-question-bank-page__button")}
      />
    </div>
  );
};
