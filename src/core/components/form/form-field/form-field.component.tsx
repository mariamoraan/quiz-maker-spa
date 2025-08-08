import { bind } from "@/core/styles/bind";
import { useForm } from "../form/form.context";
import styles from "./form-field.module.scss";
const cn = bind(styles);

interface FormFieldProps {
  label: string;
  field: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  value?: string;
  className?: string;
  hideLabel?: boolean;
}

export const FormField = (props: FormFieldProps) => {
  const {
    label,
    field,
    required = false,
    placeholder,
    defaultValue,
    onChange,
    value,
    className,
    hideLabel = false,
  } = props;
  const { register } = useForm();
  const handleChange = (value: string) => {
    if (onChange) onChange(value);
  };
  const isControlled = onChange !== undefined;
  if (isControlled) {
    return (
      <div className={cn("form-field", className)}>
        <label
          className={cn("form-field__label", {
            "form-field__label--hidden": hideLabel,
          })}
          htmlFor={field}
        >
          {label}
        </label>
        <input
          className={cn("form-field__input")}
          type="text"
          id={field}
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    );
  }
  if (!register) throw new Error("useForm is required");

  return (
    <div className={cn("form-field", className)}>
      <label
        className={cn("form-field__label", {
          "form-field__label--hidden": hideLabel,
        })}
        htmlFor={field}
      >
        {label}
      </label>
      <input
        className={cn("form-field__input")}
        type="text"
        id={field}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        {...register(field, { required })}
      />
    </div>
  );
};
