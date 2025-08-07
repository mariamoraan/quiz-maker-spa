import { useTranslation } from "react-i18next";
import { bind } from "../../core/styles/bind";
import styles from "./login.module.scss";
import { LoginWithGoogleButton } from "@/features/auth/components/login-with-google-button";
const cn = bind(styles);

export const LoginPage = () => {
  const { t } = useTranslation();
  console.log("HOLA 2");
  return (
    <div className={cn("login-page")}>
      <h1 className={cn("login-page__title")}>{t("sign-in-to-quiz-maker")}</h1>
      <LoginWithGoogleButton />
    </div>
  );
};
