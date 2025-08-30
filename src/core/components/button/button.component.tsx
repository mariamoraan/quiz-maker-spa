import { bind } from "../../styles/bind";
import styles from "./button.module.scss";
const cn = bind(styles);

interface Props {
  label: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "full" | "small" | "medium" | "large";
  color?: "light" | "dark" | "primary" | "none" | "text" ;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  center?: boolean;
}

export const Button = ({
  label,
  onClick,
  className,
  size = "full",
  color = "light",
  iconStart,
  iconEnd,
  type = "button",
  disabled = false,
  center = false,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn("button", {
        "button--small": size === "small",
        "button--medium": size === "medium",
        "button--large": size === "large",
        "button--light": color === "light",
        "button--dark": color === "dark",
        "button--primary": color === "primary",
        "button--none": color === "none",
        "button--text": color === "text",
        "button--center": center,
      }, className)}
    >
      {iconStart ? iconStart : null}
      {label}
      {iconEnd ? iconEnd : null}
    </button>
  );
};
