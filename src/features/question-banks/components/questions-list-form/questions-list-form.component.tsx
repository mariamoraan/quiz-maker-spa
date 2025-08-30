import { bind } from "@/core/styles/bind";
import styles from "./questions-list-form.module.scss";
import type { Dispatch, SetStateAction } from "react";
import type { Question } from "../../domain/question";
import { QuestionForm } from "../question-form/question-form.component";
import { useTranslation } from "react-i18next";
import { Dropdown } from "@/core/components/dropdown/dropdown.component";
import { Button } from "@/core/components/button/button.component";
import { DeleteIcon, EditIcon } from "@/core/icons";
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

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(questions.map(q => q.id === questionId ? { ...q, isDisabled: true } : q));
  };

  return (
    <div className={cn("questions-list-form")}>
      <h2 className={cn("questions-list-form__title")}>{t("questions")}</h2>
      {questions.length ? (
        <ol className={cn("questions-list-form__questions")}>
          {questions.filter(q => !q.isDisabled).map((question) => (
            <li
              key={question.id}
              className={cn("questions-list-form__questions__li")}
            >
              <Dropdown>
                <Button color="text" label="Editar" iconStart={<EditIcon />} />
                <Button onClick={() => handleDeleteQuestion(question.id)} color="text" className={cn("questions-list-form__actions--delete")} label="Eliminar" iconStart={<DeleteIcon color="var(--color-failure)"  />} />
              </Dropdown>
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
