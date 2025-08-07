import { bind } from "../../styles/bind";
import styles from "./button.module.scss";
const cn = bind(styles);

interface Props {
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
  size?: "full" | "small" | "medium" | "large";
  color?: "light" | "dark";
  iconStart?: React.ReactNode;
}

export const Button = ({
  label,
  onClick,
  className,
  size = "full",
  color = "light",
  iconStart,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={cn("button", className, {
        "button--small": size === "small",
        "button--medium": size === "medium",
        "button--large": size === "large",
        "button--light": color === "light",
        "button--dark": color === "dark",
      })}
    >
      {iconStart ? iconStart : null}
      {label}
    </button>
  );
};
