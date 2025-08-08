import { bind } from "@/core/styles/bind";
import { useForm } from "../form/form.context";
import styles from "./checkbox-field.module.scss";
const cn = bind(styles);

interface CheckboxFieldProps {
  field: string;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  value?: boolean;
  className?: string;
  customVisual?: {
    checked: React.ReactNode;
    unchecked: React.ReactNode;
  };
}

export const CheckboxField = (props: CheckboxFieldProps) => {
  const { field, defaultValue, onChange, value, className, customVisual } =
    props;
  const { register } = useForm();
  const handleChange = (value: boolean) => {
    if (onChange) onChange(value);
  };
  const isControlled = onChange !== undefined;
  if (isControlled) {
    if (customVisual) {
      return (
        <div
          className={cn("checkbox-field", "checkbox-field--custom", className)}
        >
          <input
            className={cn(
              "checkbox-field__input",
              "checkbox-field__input--custom"
            )}
            type="checkbox"
            id={field}
            defaultChecked={defaultValue}
            checked={value}
            onChange={(e) => handleChange(e.target.checked)}
          />
          <span aria-hidden="true" className={cn("custom-visual")}>
            <span aria-hidden="true" className={cn("custom-visual__checked")}>
              {customVisual.checked}
            </span>
            <span aria-hidden="true" className={cn("custom-visual__unchecked")}>
              {customVisual.unchecked}
            </span>
          </span>
        </div>
      );
    }
    return (
      <div className={cn("checkbox-field", className)}>
        <input
          className={cn("checkbox-field__input")}
          type="checkbox"
          id={field}
          defaultChecked={defaultValue}
          checked={value}
          onChange={(e) => handleChange(e.target.checked)}
        />
      </div>
    );
  }
  if (!register) throw new Error("useForm is required");

  if (customVisual) {
    return (
      <div
        className={cn("checkbox-field", "checkbox-field--custom", className)}
      >
        <input
          id={field}
          defaultChecked={defaultValue}
          className={cn(
            "checkbox-field__input",
            "checkbox-field__input--custom"
          )}
          type="checkbox"
          {...register(field)}
        />
        <span aria-hidden="true" className={cn("custom-visual")}>
          <span aria-hidden="true" className={cn("custom-visual__checked")}>
            {customVisual.checked}
          </span>
          <span aria-hidden="true" className={cn("custom-visual__unchecked")}>
            {customVisual.unchecked}
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className={cn("checkbox-field", className)}>
      <input
        className={cn("checkbox-field__input")}
        type="checkbox"
        {...register(field)}
      />
    </div>
  );
};
