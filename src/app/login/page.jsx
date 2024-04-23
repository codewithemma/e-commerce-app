import Image from "next/image";
import styles from "./Login.module.css";
const Login = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.hero_child}>
        <Image
          style={{ objectFit: "cover" }}
          src="/assets/loginphoto.svg"
          alt="login photo"
          fill
          priority
        />
      </div>
      <div className={styles.form}>
        <h2>Log in to Exclusive</h2>
        <p>Enter your details below</p>
        <div className={styles.input_group}>
          <input type="text" placeholder="Email or Phone Number" />
          <input type="password" placeholder="Password" />
        </div>
        <div className={styles.button_group}>
          <a href="#">Log in</a>
          <a href="#">Forget Password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
