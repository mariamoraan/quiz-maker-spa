import { bind } from "@/core/styles/bind";
import styles from "./app-layout.module.scss";
import { NavigationBar } from "@/core/components/navigation-bar/navigation-bar.component";
import { ROUTES } from "@/core/routes/routes";
import { useLocation } from "react-router-dom";
const cn = bind(styles);

const routeHasSidebar = (route: string) => {
  return [
    ROUTES.HOME,
    ROUTES.FAVORITES,
    ROUTES.SETTINGS,
    ROUTES.STATISTICS,
  ].includes(route);
};

export const AppLayout = ({ children }: React.PropsWithChildren) => {
  const locale = useLocation();
  const hasSidebar = routeHasSidebar(locale.pathname);

  return (
    <div className={cn("app-layout")}>
      <main className={cn("app-layout__main")}>{children}</main>
      {hasSidebar ? <NavigationBar /> : null}
    </div>
  );
};
