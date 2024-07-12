import styles from "./AuthLinks.module.css";
import Dropdown from "../dropdown/Dropdown";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { CiHeart } from "react-icons/ci";
const AuthLinks = () => {
  return (
    <div className={styles.auth_icons}>
      <ThemeToggle />
      <CiHeart size={"20px"} />
      <Dropdown />
    </div>
  );
};

export default AuthLinks;
