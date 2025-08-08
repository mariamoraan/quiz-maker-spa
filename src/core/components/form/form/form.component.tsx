import { type FieldValues, useForm } from "react-hook-form";
import { FormProvider } from "./form.context";
import styles from "./form.module.scss";
import { bind } from "@/core/styles/bind";
const cn = bind(styles);

interface FormProps {
  onSubmit?: (data: FieldValues) => Promise<void>;
  children: React.ReactNode;
  className?: string;
  resetAfterSubmit?: boolean;
}

export const Form = (props: FormProps) => {
  const { onSubmit, children, className, resetAfterSubmit } = props;
  const { register, handleSubmit, formState, reset } = useForm();
  const onHandleSubmit = handleSubmit(async (data) => {
    if (onSubmit) {
      await onSubmit(data);
    }
    if (resetAfterSubmit) {
      reset();
    }
  });
  return (
    <FormProvider register={register} formState={formState}>
      <form className={cn("form", className)} onSubmit={onHandleSubmit}>
        {children}
      </form>
    </FormProvider>
  );
};
