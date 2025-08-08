import { Avatar } from "@/core/components/avatar/avatar.component";
import { useAuth } from "@/features/auth/context/auth.context";
import styles from "./home.module.scss";
import { bind } from "@/core/styles/bind";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { PlusIcon } from "@/core/icons";
import { ROUTES } from "@/core/routes/routes";
import { useQuestionBanks } from "@/features/question-banks/context/question-banks.context";
const cn = bind(styles);

export const HomePage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { questionBanks } = useQuestionBanks();

  return (
    <div className={cn("home")}>
      <div className={cn("employee-card")}>
        <div className={cn("employee-card__avatar")}>
          <Avatar username={user?.name ?? ""} imageUrl={user?.imageUrl ?? ""} />
        </div>
        <p className={cn("employee-card__title")}>
          {t("home.greeting", { name: user?.name?.split(" ").at(0) })}
        </p>
        <p className={cn("employee-card__subtitle")}>
          {t("home.ready-to-play")}
        </p>
      </div>
      <div className={cn("section")}>
        <h2 className={cn("section__title")}>{t("question-banks")}</h2>
        <ul className={cn("question-banks-list")}>
          {questionBanks.map((questionBank) => (
            <li key={questionBank.id}>
              <Link
                to={ROUTES.QUESTION_BANK(questionBank.id)}
                className={cn("question-banks-list__li")}
              >
                <p className={cn("question-banks-list__li__name")}>
                  {questionBank.name}
                </p>
                <p className={cn("question-banks-list__li__count")}>
                  {questionBank.questionsNumber} preguntas
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Link
        to={ROUTES.NEW_QUESTION_BANK}
        className={cn("question-banks-list__new-link")}
      >
        <PlusIcon />
      </Link>
    </div>
  );
};
