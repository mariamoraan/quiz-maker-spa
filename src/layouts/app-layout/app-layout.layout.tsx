import { bind } from "@/core/styles/bind";
import styles from "./app-layout.module.scss";
import { NavigationBar } from "@/core/components/navigation-bar/navigation-bar.component";
const cn = bind(styles);

export const AppLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={cn("app-layout")}>
      <main className={cn("app-layout__main")}>{children}</main>
      <NavigationBar />
    </div>
  );
};
