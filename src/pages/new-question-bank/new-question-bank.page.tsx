import { bind } from "@/core/styles/bind";
import styles from "./new-question-bank.module.scss";
import { Form } from "@/core/components/form/form/form.component";
import { FormField } from "@/core/components/form/form-field/form-field.component";
import { Button } from "@/core/components/button/button.component";
import type { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { CheckIcon, CrossIcon, GoBackArrowIcon, PlusIcon } from "@/core/icons";
import type { Question } from "@/features/question-banks/domain/question";
import type { QuestionBank } from "@/features/question-banks/domain/question-bank";
import { CheckboxField } from "@/core/components/form/checkbox-field/checkbox-field.component";
import { useAuth } from "@/features/auth/context/auth.context";
import { postQuestionBank } from "@/features/question-banks/services/post-question-bank";
import { generateUUID } from "@/core/utils/generate-uuid";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/routes";
const cn = bind(styles);

const CustomCheck = {
  checked: <CheckIcon color="var(--color-success)" />,
  unchecked: <CrossIcon color="var(--color-failure)" />,
};

export const NewQuestionBankPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [questionCount, setQuestionCount] = useState(1);
  const addQuestion = () => setQuestionCount(questionCount + 1);

  const onSubmit = async (data: FieldValues) => {
    if (!user) return;
    const questions: Question[] = [];
    Array.from({ length: questionCount }).forEach((_, index) => {
      questions.push({
        id: `question_${index}`,
        text: data[`question_${index}`],
        options: [
          {
            id: `answer_${index}_a`,
            text: data[`answer_${index}_a`],
            isCorrect: data[`answer_correct_${index}_a`],
          },
          {
            id: `answer_${index}_b`,
            text: data[`answer_${index}_b`],
            isCorrect: data[`answer_correct_${index}_b`],
          },
          {
            id: `answer_${index}_c`,
            text: data[`answer_${index}_c`],
            isCorrect: data[`answer_correct_${index}_c`],
          },
          {
            id: `answer_${index}_d`,
            text: data[`answer_${index}_d`],
            isCorrect: data[`answer_correct_${index}_d`],
          },
        ],
      });
    });
    const questionBank: QuestionBank = {
      id: generateUUID(),
      name: data.name,
      questions,
      userId: user.uid,
    };
    await postQuestionBank(questionBank);
    navigate(ROUTES.HOME);
  };
  return (
    <div className={cn("new-question-bank")}>
      <div className={cn("new-question-bank__header")}>
        <Link
          className={cn("new-question-bank__header__link")}
          to={ROUTES.HOME}
        >
          <GoBackArrowIcon />
        </Link>
        <h1 className={cn("new-question-bank__header__title")}>
          {t("new-question-bank")}
        </h1>
      </div>

      <Form onSubmit={onSubmit} className={cn("new-question-bank__form")}>
        <div className={cn("new-question-bank__form__section")}>
          <h3 className={cn("new-question-bank__form__section__title")}>
            {t("question-bank-form.question-bank")}
          </h3>
          <FormField
            label={t("question-bank-form.question-bank.name")}
            field={"name"}
            placeholder={t("question-bank-form.question-bank.name.placeholder")}
            required
          />
        </div>

        <div className={cn("new-question-bank__form__section")}>
          <h3 className={cn("new-question-bank__form__section__title")}>
            {t("questions")}
          </h3>
          <ul className={cn("question-list")}>
            {Array.from({ length: questionCount }).map((_, index) => (
              <li key={index} className={cn("question-list__li")}>
                <FormField
                  label={`${t("question-bank-form.question")} ${index + 1}`}
                  field={`question_${index}`}
                  placeholder={t("question-bank-form.question-placeholder")}
                  required
                />
                <div className={cn("answer-field-wrapper")}>
                  <CheckboxField
                    field={`answer_correct_${index}_a`}
                    customVisual={CustomCheck}
                    defaultValue={true}
                  />
                  <FormField
                    label={`${t("question-bank-form.answer")} ${index + 1} a`}
                    field={`answer_${index}_a`}
                    placeholder={t("question-bank-form.answer-placeholder-a")}
                    required
                    className={cn("answer-field")}
                    hideLabel
                  />
                </div>
                <div className={cn("answer-field-wrapper")}>
                  <CheckboxField
                    field={`answer_correct_${index}_b`}
                    customVisual={CustomCheck}
                  />
                  <FormField
                    label={`${t("question-bank-form.answer")} ${index + 1} b`}
                    field={`answer_${index}_b`}
                    placeholder={t("question-bank-form.answer-placeholder-b")}
                    required
                    className={cn("answer-field")}
                    hideLabel
                  />
                </div>
                <div className={cn("answer-field-wrapper")}>
                  <CheckboxField
                    field={`answer_correct_${index}_c`}
                    customVisual={CustomCheck}
                  />
                  <FormField
                    label={`${t("question-bank-form.answer")} ${index + 1} c`}
                    field={`answer_${index}_c`}
                    placeholder={t("question-bank-form.answer-placeholder-c")}
                    required
                    className={cn("answer-field")}
                    hideLabel
                  />
                </div>
                <div className={cn("answer-field-wrapper")}>
                  <CheckboxField
                    field={`answer_correct_${index}_d`}
                    customVisual={CustomCheck}
                  />
                  <FormField
                    label={`${t("question-bank-form.answer")} ${index + 1} d`}
                    field={`answer_${index}_d`}
                    placeholder={t("question-bank-form.answer-placeholder-d")}
                    required
                    className={cn("answer-field")}
                    hideLabel
                  />
                </div>
              </li>
            ))}
            <Button
              type="button"
              iconStart={<PlusIcon />}
              label={t("question-bank-form.add-question")}
              onClick={addQuestion}
              size="small"
              color="dark"
            />
          </ul>
        </div>

        <Button
          type="submit"
          label={t("question-bank-form.submit")}
          color="dark"
          size="large"
        />
      </Form>
    </div>
  );
};
