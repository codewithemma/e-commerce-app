import Wrapper from "../wrapper/Wrapper";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "../themeToggle/ThemeToggle";
const Navbar = () => {
  return (
    <>
      <Wrapper>
        <div className={styles.container}>
          <h2>Exclusive</h2>
          <ul>
            <li className={styles.nav_flex}>
              <Link href="/">Home</Link>
              <Link href="/">Contact</Link>
              <Link href="/">About</Link>
              <Link href="/login">Sign Up</Link>
            </li>
          </ul>
          <div className={styles.input_group}>
            <input
              className={styles.input}
              type="text"
              placeholder="what are you looking for....?"
            />
            <span>
              <Image
                src="/assets/magnify.svg"
                width={25}
                height={25}
                alt="search icon"
                style={{
                  position: "absolute",
                  top: 15,
                  right: 10,
                }}
              />
            </span>
          </div>
          <div>
            <ThemeToggle />
          </div>
        </div>
      </Wrapper>
      <div className={styles.nav_border}></div>
    </>
  );
};

export default Navbar;
