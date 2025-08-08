import { bind } from "@/core/styles/bind";
import { useForm } from "../form/form.context";
import styles from "./password-field.module.scss";
const cn = bind(styles);

interface FormFieldProps {
  label: string;
  field: string;
  required?: boolean;
}

export const PasswordField = (props: FormFieldProps) => {
  const { label, field, required = false } = props;
  const { register } = useForm();
  if (!register) throw new Error("useForm is required");
  return (
    <div className={cn("password-field")}>
      <label className={cn("password-field__label")} htmlFor={field}>
        {label}
      </label>
      <input
        className={cn("password-field__input")}
        type="password"
        id={field}
        required={required}
        placeholder="•••••••••"
        {...register(field, { required })}
      />
    </div>
  );
};
