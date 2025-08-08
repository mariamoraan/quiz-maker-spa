import { GoBackArrowIcon, PlayIcon } from "@/core/icons";
import { ROUTES } from "@/core/routes/routes";
import { useAuth } from "@/features/auth/context/auth.context";
import { useQuestionBanks } from "@/features/question-banks/context/question-banks.context";
import type {
  QuestionBank,
  QuestionBanksList,
} from "@/features/question-banks/domain/question-bank";
import { getQuestionBank } from "@/features/question-banks/services/get-question-bank";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./question-bank.module.scss";
import { bind } from "@/core/styles/bind";
import { Button } from "@/core/components/button/button.component";
import { useTranslation } from "react-i18next";
import type { Score } from "@/features/quiz/domain/score";
import { getAllScores } from "@/features/quiz/services/get-all-scores";

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
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { questionBanks } = useQuestionBanks();
  const [questionBank, setQuestionBank] = useState<QuestionBank | null>(
    getInitialQuestionBank(questionBanks, id)
  );
  const [scores, setScores] = useState<Score[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setQuestionBank(getInitialQuestionBank(questionBanks, id));
  }, [questionBanks.length]);

  useEffect(() => {
    const setup = async (bankId: string, userId: string) => {
      setIsLoading(true);
      const resBank = await getQuestionBank(bankId);
      const resScores = await getAllScores({ userId, bankId });
      setQuestionBank(resBank);
      setScores(resScores);
      setIsLoading(false);
    };

    if (!user?.uid || !id || !questionBank?.userId) return;
    if (questionBank?.userId !== user.uid) return;
    setup(id, user.uid);
  }, [user?.uid, id, questionBank?.userId]);

  const handleGenerateQuiz = async () => {
    if (!questionBank || !user?.uid) return;
    navigate(ROUTES.QUIZ(questionBank.id));
  };

  // TODO: add skeleton
  if (isLoading) return <div>Loading...</div>;
  // TODO: add good error message
  if (!questionBank) return <div>Question bank not found</div>;

  const calcScoresAverage = (scores: Score[]): number => {
    return Math.round(
      scores.reduce(
        (prev, current) =>
          prev + (current.score * 100) / Object.keys(current.answers).length,
        0
      ) / scores.length
    );
  };

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
        {scores?.length ? (
          <div className={cn("question-bank__info__score")}>
            <p className={cn("question-bank__info__score__title")}>
              {t("average-score")}
            </p>
            <p className={cn("question-bank__info__score__score")}>
              {calcScoresAverage(scores)}/100
            </p>
          </div>
        ) : null}
        <p className={cn("question-bank__info__subtitle")}>
          {questionBank.questions.length} questions
        </p>
        <Button
          label={t("start-quiz")}
          iconStart={<PlayIcon size={12} />}
          size="medium"
          onClick={handleGenerateQuiz}
        />
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
          </li>
        ))}
      </ul>
    </div>
  );
};
