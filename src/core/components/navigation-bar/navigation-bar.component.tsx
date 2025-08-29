import { NavigationBarDesktop } from "./navigation-bar-desktop/navigation-bar-desktop";
import { NavigationBarMobile } from "./navigation-bar-mobile/navigation-bar-mobile";

export const NavigationBar = () => {
  return (
    <>
    <NavigationBarMobile />
    <NavigationBarDesktop />
    </>
  );
};
