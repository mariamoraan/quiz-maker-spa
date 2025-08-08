import { bind } from "@/core/styles/bind";
import styles from "./bank-config-form.module.scss";
import { useTranslation } from "react-i18next";
import { Form } from "@/core/components/form/form/form.component";
import { FormField } from "@/core/components/form/form-field/form-field.component";
import type { Dispatch, SetStateAction } from "react";
import type { FieldValues } from "react-hook-form";
const cn = bind(styles);

interface Props {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}

export const BankConfigForm = (props: Props) => {
  const { name, setName } = props;
  const { t } = useTranslation();
  const onSubmit = async (data: FieldValues) => {
    setName(data.name);
  };
  return (
    <div className={cn("bank-config-form")}>
      <h2 className={cn("bank-config-form__title")}>{t("bank-config")}</h2>
      <Form onSubmit={onSubmit} className={cn("bank-config-form__form")}>
        <FormField
          label={t("question-bank-form.question-bank.name")}
          field={"name"}
          placeholder={t("question-bank-form.question-bank.name.placeholder")}
          required
          defaultValue={name}
          value={name}
          onChange={(value) => setName(value)}
        />
      </Form>
    </div>
  );
};
