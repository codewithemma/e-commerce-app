import styles from "./AuthLinks.module.css";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import Dropdown from "../dropdown/Dropdown";
import ThemeToggle from "../themeToggle/ThemeToggle";
const AuthLinks = () => {
  return (
    <div className={styles.auth_icons}>
      <ThemeToggle />
      <PiShoppingCartSimpleLight size={"20px"} />
      <Dropdown />
    </div>
  );
};

export default AuthLinks;
