import { bind } from "@/core/styles/bind";
import styles from "./navigation-bar.module.scss";
import { ROUTES } from "@/core/routes/routes";
import { ChartIcon, HeartIcon, HomeIcon, UserIcon } from "@/core/icons";
import { Link } from "react-router-dom";
const cn = bind(styles);

interface Route {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const routes: Route[] = [
  { path: ROUTES.HOME, label: "Home", icon: <HomeIcon size={24} /> },
  { path: ROUTES.STATISTICS, label: "Stats", icon: <ChartIcon size={24} /> },
  { path: ROUTES.FAVORITES, label: "Favorites", icon: <HeartIcon size={24} /> },
  { path: ROUTES.SETTINGS, label: "Settings", icon: <UserIcon size={24} /> },
];

export const NavigationBar = () => {
  return (
    <div className={cn("navigation-bar")}>
      {routes.map((route) => (
        <Link
          to={route.path}
          key={route.path}
          className={cn("navigation-bar__nav-link")}
        >
          {route.icon}
        </Link>
      ))}
    </div>
  );
};
