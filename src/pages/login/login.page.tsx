import { useTranslation } from "react-i18next";
import { bind } from "../../core/styles/bind";
import styles from "./login.module.scss";
const cn = bind(styles);

export const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <div className={cn("login-page")}>
      <h1>{t("welcome")}</h1>
      <button>{t("startQuiz")}</button>
    </div>
  );
};
