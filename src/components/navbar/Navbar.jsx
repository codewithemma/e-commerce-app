import Wrapper from "../wrapper/Wrapper";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <>
      <Wrapper>
        <div className={styles.container}>
          <h2>Exclusive</h2>
          <ul>
            <li className={styles.nav_flex}>
              <a href="#">Home</a>
              <a href="#">Contact</a>
              <a href="#">About</a>
              <a href="#">Sign Up</a>
            </li>
          </ul>
          <div>
            <input type="text" placeholder="what are you looking for...." />
          </div>
        </div>
      </Wrapper>
      <div className={styles.nav_border}></div>
    </>
  );
};

export default Navbar;
