import { bind } from "@/core/styles/bind";
import styles from "./questions-list-form.module.scss";
import type { Dispatch, SetStateAction } from "react";
import type { Question } from "../../domain/question";
import { QuestionForm } from "../question-form/question-form.component";
import { useTranslation } from "react-i18next";
const cn = bind(styles);

interface Props {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}

export const QuestionsList = (props: Props) => {
  const { questions, setQuestions } = props;
  const { t } = useTranslation();

  const onSubmit = async (question: Question) => {
    setQuestions([...questions, question]);
  };
  return (
    <div className={cn("questions-list-form")}>
      <h2 className={cn("questions-list-form__title")}>{t("questions")}</h2>
      {questions.length ? (
        <ol className={cn("questions-list-form__questions")}>
          {questions.map((question) => (
            <li
              key={question.id}
              className={cn("questions-list-form__questions__li")}
            >
              {question.text}
            </li>
          ))}
        </ol>
      ) : (
        <p className={cn("questions-list-form__subtitle")}>
          {t("add-a-question")}
        </p>
      )}
      <QuestionForm onSubmit={onSubmit} />
    </div>
  );
};
