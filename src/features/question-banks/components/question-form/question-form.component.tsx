import { bind } from "@/core/styles/bind";
import styles from "./question-form.module.scss";
import { FormField } from "@/core/components/form/form-field/form-field.component";
import { CheckboxField } from "@/core/components/form/checkbox-field/checkbox-field.component";
import { useTranslation } from "react-i18next";
import { CheckIcon, CrossIcon } from "@/core/icons";
import { Form } from "@/core/components/form/form/form.component";
import { Button } from "@/core/components/button/button.component";
import type { Question } from "../../domain/question";
import type { FieldValues } from "react-hook-form";
import { generateUUID } from "@/core/utils/generate-uuid";
const cn = bind(styles);

const CustomCheckCorrect = {
  checked: <CheckIcon color="var(--color-success)" />,
  unchecked: <CheckIcon color="var(--color-dark-grey)" />,
};

const CustomCheckIncorrect = {
  checked: <CrossIcon color="var(--color-failure)" />,
  unchecked: <CrossIcon color="var(--color-dark-grey)" />,
};

interface Props {
  onSubmit: (values: Question) => Promise<void>;
  onCancel?: () => void;
  defaultValues?: Question;
  showCancelButton?: boolean;
}

export const QuestionForm = (props: Props) => {
  const { onSubmit, onCancel, defaultValues, showCancelButton = false } = props;
  const { t } = useTranslation();
  const handleSubmit = async (data: FieldValues) => {
    const question: Question = {
      id: defaultValues?.id ?? generateUUID(),
      text: data.question,
      options: [
        {
          id: "a",
          text: data.answer_a,
          isCorrect: data.answer_correct_a,
        },
        {
          id: "b",
          text: data.answer_b,
          isCorrect: data.answer_correct_b,
        },
        {
          id: "c",
          text: data.answer_c,
          isCorrect: data.answer_correct_c,
        },
        {
          id: "d",
          text: data.answer_d,
          isCorrect: data.answer_correct_d,
        },
      ],
    };
    await onSubmit(question);
  };
  return (
    <Form
      onSubmit={handleSubmit}
      className={cn("question-form")}
      resetAfterSubmit
    >
      <FormField
        label={`${t("question-bank-form.question")}`}
        field={`question`}
        placeholder={t("question-bank-form.question-placeholder")}
        required
        defaultValue={defaultValues?.text ?? ""}
      />
      <div className={cn("question-form__answer")}>
        <FormField
          label={`${t("question-bank-form.answer")} a`}
          field={`answer_a`}
          placeholder={t("question-bank-form.answer-placeholder-a")}
          required
          hideLabel
          defaultValue={defaultValues?.options[0].text ?? ""}
        />
        <CheckboxField
          field={`answer_correct_a`}
          customVisual={CustomCheckCorrect}
          defaultValue={defaultValues?.options[0].isCorrect ?? true}
        />
        <CheckboxField
          field={`answer_incorrect_a`}
          customVisual={CustomCheckIncorrect}
          defaultValue={!defaultValues?.options[0].isCorrect}
        />
      </div>
      <div className={cn("question-form__answer")}>
        <FormField
          label={`${t("question-bank-form.answer")} b`}
          field={`answer_b`}
          placeholder={t("question-bank-form.answer-placeholder-b")}
          required
          hideLabel
          defaultValue={defaultValues?.options[1].text ?? ""}
        />
        <CheckboxField
          field={`answer_correct_b`}
          customVisual={CustomCheckCorrect}
          defaultValue={defaultValues?.options[1].isCorrect ?? false}
        />
        <CheckboxField
          field={`answer_incorrect_b`}
          customVisual={CustomCheckIncorrect}
          defaultValue={!defaultValues?.options[1].isCorrect}
        />
      </div>
      <div className={cn("question-form__answer")}>
        <FormField
          label={`${t("question-bank-form.answer")} c`}
          field={`answer_c`}
          placeholder={t("question-bank-form.answer-placeholder-c")}
          required
          hideLabel
          defaultValue={defaultValues?.options[2].text ?? ""}
        />
        <CheckboxField
          field={`answer_correct_c`}
          customVisual={CustomCheckCorrect}
          defaultValue={defaultValues?.options[2].isCorrect ?? false}
        />
        <CheckboxField
          field={`answer_incorrect_c`}
          customVisual={CustomCheckIncorrect}
          defaultValue={!defaultValues?.options[2].isCorrect}
        />
      </div>
      <div className={cn("question-form__answer")}>
        <FormField
          label={`${t("question-bank-form.answer")} d`}
          field={`answer_d`}
          placeholder={t("question-bank-form.answer-placeholder-d")}
          required
          hideLabel
          defaultValue={defaultValues?.options[3].text ?? ""}
        />
        <CheckboxField
          field={`answer_correct_d`}
          customVisual={CustomCheckCorrect}
          defaultValue={defaultValues?.options[3].isCorrect ?? false}
        />
        <CheckboxField
          field={`answer_incorrect_d`}
          customVisual={CustomCheckIncorrect}
          defaultValue={!defaultValues?.options[3].isCorrect}
        />
      </div>
      <div className={cn("question-form__buttons")}>
        {showCancelButton && onCancel ? (
          <Button
            label={t("cancel")}
            type="button"
            onClick={onCancel}
            size="large"
          />
        ) : null}
        <Button label={t("add")} type="submit" size="small" />
      </div>
    </Form>
  );
};
