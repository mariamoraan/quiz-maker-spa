import { Button } from "@/core/components/button/button.component";
import { GoogleIcon } from "@/core/icons";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/auth.context";

export const LoginWithGoogleButton = () => {
  const { t } = useTranslation();
  const { loginWithGoogle } = useAuth();
  return (
    <Button
      label={t("sign-in-with-google")}
      onClick={loginWithGoogle}
      iconStart={<GoogleIcon />}
      size="large"
    />
  );
};
