import type { Quiz } from "@/features/quiz/domain/quiz";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./quiz.module.scss";
import { bind } from "@/core/styles/bind";
import { GoBackArrowIcon } from "@/core/icons";
import { ROUTES } from "@/core/routes/routes";
import { Button } from "@/core/components/button/button.component";
import { useTranslation } from "react-i18next";
import { generateQuiz } from "@/features/quiz/utils/generate-quiz";
import { useAuth } from "@/features/auth/context/auth.context";
import { getQuestionBank } from "@/features/question-banks/services/get-question-bank";
import type { Score } from "@/features/quiz/domain/score";
import { generateUUID } from "@/core/utils/generate-uuid";
import { postScore } from "@/features/quiz/services/post-score";
const cn = bind(styles);

export const QuizPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const setup = async (userId: string, bankId: string) => {
      setIsLoading(true);
      const bankRes = await getQuestionBank(bankId);
      if (!bankRes) return;
      const quiz = generateQuiz({ bank: bankRes, userId });
      setQuiz(quiz);
      setIsLoading(false);
    };
    if (!id || !user?.uid) return;
    setup(user.uid, id);
  }, [id]);

  useEffect(() => {
    if (!quiz?.questions.length) return;
    if (currentQuestionIndex > quiz.questions.length - 1) {
      handleScore();
    }
  }, [currentQuestionIndex]);

  const nextQuestion = () => setCurrentQuestionIndex((prev) => prev + 1);
  const selectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleScore = async () => {
    if (!user?.uid || !id) return;
    const score: Score = {
      id: generateUUID(),
      userId: user?.uid,
      bankId: id,
      date: new Date().toISOString(),
      answers,
      score: calcScore(),
    };
    await postScore(score);
  };

  const calcScore = () => {
    if (!quiz) return 0;
    const correctAnswers = Object.entries(answers).filter(
      ([questionId, optionId]) =>
        quiz.questions
          .find((q) => q.id === questionId)
          ?.options.filter((option) => option.isCorrect)
          .some((correctOption) => correctOption.id === optionId)
    );
    return correctAnswers.length;
  };

  const getMessageBasedOnScore = (score: number) => {
    if (!quiz?.questions.length) return "Error";
    if (score / quiz.questions.length >= 0.8) {
      return t("quiz.congratulations");
    }
    return t("quiz.tryAgain");
  };

  // TODO: Add skeleton
  if (isLoading) return <div>Loading...</div>;
  // TODO: Add error message
  if (!quiz) return <div>Quiz not found</div>;

  if (currentQuestionIndex > quiz.questions.length - 1) {
    return (
      <div className={cn("quiz-page-result")}>
        <div className={cn("quiz-page-result__info")}>
          <p className={cn("quiz-page-result__info__score-title")}>
            {t("quiz.your-score")}
          </p>
          <p className={cn("quiz-page-result__info__score")}>
            {calcScore()}/{quiz.questions.length}
          </p>
          <p className={cn("quiz-page-result__info__message")}>
            {t(getMessageBasedOnScore(calcScore()))}
          </p>
        </div>
        <Link to={ROUTES.HOME} className={cn("quiz-page-result__footer__link")}>
          {t("back-to-home")}
        </Link>
      </div>
    );
  }

  return (
    <div className={cn("quiz-page")}>
      <div className={cn("quiz-page__header")}>
        <Link to={ROUTES.HOME}>
          <GoBackArrowIcon />
        </Link>
      </div>
      <div className={cn("quiz-page__quiz")}>
        <div className={cn("quiz-page__quiz__header")}>
          <div
            className={cn("quiz-page__quiz__header__progress-indicator-number")}
          >
            <p
              className={cn(
                "quiz-page__quiz__header__progress-indicator-number__label"
              )}
            >
              Question
            </p>
            <p
              className={cn(
                "quiz-page__quiz__header__progress-indicator-number__info"
              )}
            >
              {currentQuestionIndex + 1} / {quiz.questions.length}
            </p>
          </div>
        </div>
        <div className={cn("quiz-page__quiz__test")}>
          <p className={cn("quiz-page__quiz__test__question")}>
            {quiz.questions[currentQuestionIndex].text}
          </p>
          <ul className={cn("quiz-page__quiz__test__options-list")}>
            {quiz.questions[currentQuestionIndex].options.map((option) => (
              <li
                className={cn("quiz-page__quiz__test__options-list__li")}
                key={option.id}
              >
                <Button
                  className={cn(
                    "quiz-page__quiz__test__options-list__li__button",
                    {
                      "quiz-page__quiz__test__options-list__li__button--selected":
                        answers[quiz.questions[currentQuestionIndex].id] ===
                        option.id,
                    }
                  )}
                  label={option.text}
                  size="full"
                  onClick={() =>
                    selectOption(
                      quiz.questions[currentQuestionIndex].id,
                      option.id
                    )
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Button
        onClick={nextQuestion}
        label={t("next")}
        className={cn("quiz-page__footer__button")}
        disabled={!answers[quiz.questions[currentQuestionIndex].id]}
      />
    </div>
  );
};
