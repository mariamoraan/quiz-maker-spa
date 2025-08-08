import { CheckIcon, GoBackArrowIcon } from "@/core/icons";
import { ROUTES } from "@/core/routes/routes";
import { useAuth } from "@/features/auth/context/auth.context";
import { useQuestionBanks } from "@/features/question-banks/context/question-banks.context";
import type {
  QuestionBank,
  QuestionBanksList,
} from "@/features/question-banks/domain/question-bank";
import { getQuestionBank } from "@/features/question-banks/services/get-question-bank";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./question-bank.module.scss";
import { bind } from "@/core/styles/bind";
const cn = bind(styles);

const getInitialQuestionBank = (
  questionBanks: QuestionBanksList,
  id?: string
): QuestionBank | null => {
  if (!id) return null;
  const questionBank = questionBanks.find((item) => item.id === id);
  if (!questionBank) return null;
  return {
    ...questionBank,
    questions: [],
  };
};

export const QuestionBankPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { questionBanks } = useQuestionBanks();
  const [questionBank, setQuestionBank] = useState<QuestionBank | null>(
    getInitialQuestionBank(questionBanks, id)
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setup = async (bankId: string) => {
      if (questionBank?.userId !== user?.uid) return;
      setIsLoading(true);
      const res = await getQuestionBank(bankId);
      setQuestionBank(res);
      setIsLoading(false);
    };
    if (!user || !id || !questionBank?.userId) return;
    setup(id);
  }, [user, id, questionBank?.userId]);

  // TODO: add skeleton
  if (isLoading) return <div>Loading...</div>;
  // TODO: add good error message
  if (!questionBank) return <div>Question bank not found</div>;

  return (
    <div className={cn("question-bank")}>
      <div className={cn("question-bank__header")}>
        <Link className={cn("question-bank__header__link")} to={ROUTES.HOME}>
          <GoBackArrowIcon />
        </Link>
        <h1 className={cn("question-bank__header__title")}>
          {questionBank.name}
        </h1>
      </div>
      <div className={cn("question-bank__info")}>
        <h2 className={cn("question-bank__info__title")}>
          {questionBank.name}
        </h2>
        <p className={cn("question-bank__info__subtitle")}>
          {questionBank.questions.length} questions
        </p>
      </div>
      <ul className={cn("question-bank__questions-list")}>
        {questionBank.questions.map((question) => (
          <li
            className={cn("question-bank__questions-list__li")}
            key={question.id}
          >
            <div className={cn("question-bank__questions-list__li__question")}>
              <p> {question.text}</p>
            </div>
            <ul className={cn("question-bank__questions-list__li__answer")}>
              {question.options
                .filter((option) => option.isCorrect)
                .map((correctOption) => (
                  <li
                    key={correctOption.id}
                    className={cn(
                      "question-bank__questions-list__li__answer__li"
                    )}
                  >
                    <CheckIcon color="var(--color-success)" />
                    <p>{correctOption.text}</p>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
