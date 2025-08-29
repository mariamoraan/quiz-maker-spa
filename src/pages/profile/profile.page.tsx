import { bind } from "@/core/styles/bind";
import styles from "./profile.module.scss";
import { useTranslation } from "react-i18next";
import { Avatar } from "@/core/components/avatar/avatar.component";
import { useAuth } from "@/features/auth/context/auth.context";
import { EmailIcon, LogoutIcon, UserIcon } from "@/core/icons";
import { Button } from "@/core/components/button/button.component";
const cn = bind(styles);

export const ProfilePage = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  return (
    <div className={cn("profile")}>
      <h2 className={cn("profile__title")}>{t("profile")}</h2>
      <div className={cn("profile__employee-card")}>
        <div className={cn("profile__employee-card__avatar")}>
          <Avatar username={user?.name ?? ""} imageUrl={user?.imageUrl ?? ""} />
        </div>
        <p className={cn("profile__employee-card__title")}>
          {t("profile.greeting", { name: user?.name?.split(" ").at(0) })}
        </p>
        <p className={cn("profile__employee-card__subtitle")}>
          {t("profile.user-type.basic")}
        </p>
      </div>
      <div className={cn("profile__section")}>
        <h2 className={cn("profile__section__title")}>{t("profile.info")}</h2>
        <div className={cn("profile__info")}>
          <div className={cn("profile__info__row")}>
            <UserIcon className={cn("profile__info__row__icon")} />
            <p className={cn("profile__info__row__label")}>{t("name")}</p>
            <p className={cn("profile__info__row__value")}>{user?.name}</p>
          </div>
          <div className={cn("profile__info__row")}>
            <EmailIcon className={cn("profile__info__row__icon")} />
            <p className={cn("profile__info__row__label")}>{t("email")}</p>
            <p className={cn("profile__info__row__value")}>{user?.email}</p>
          </div>
        </div>
      </div>
      <Button
        iconStart={<LogoutIcon />}
        label={t("logout")}
        color="none"
        onClick={logout}
      />
    </div>
  );
};
