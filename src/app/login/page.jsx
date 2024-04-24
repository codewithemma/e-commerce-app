"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./Login.module.css";
import { useState } from "react";
const Login = () => {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };
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
      {toggle ? (
        <div className={styles.form}>
          <h2>Log in to Exclusive</h2>
          <p>Enter your details below</p>
          <div className={styles.input_group}>
            <input type="text" placeholder="Email or Phone Number" />
            <input type="password" placeholder="Password" />
          </div>
          <div className={styles.button_group}>
            <Link className={styles.link} href="/">
              Log in
            </Link>
            <Link className={styles.link} href="#" onClick={handleClick}>
              Sign Up
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.form}>
          <h2>Create an account</h2>
          <p>Enter your details below</p>
          <div className={styles.input_group}>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Email or Phone Number" />
            <input type="password" placeholder="Password" />
          </div>
          <div className={styles.button_group1}>
            <Link className={styles.link} href="/">
              Create Account
            </Link>
            <Link
              className={`${styles.link} ${styles.google_button} `}
              href="/"
            >
              <span>
                <Image
                  src="/assets/google.svg"
                  alt="google icon"
                  width={20}
                  height={20}
                  priority
                  style={{
                    marginRight: "10px",
                    marginTop: "8px",
                  }}
                />
              </span>
              Sign up with Google
            </Link>
          </div>
          <div className={styles.end}>
            <p>Already have an account?</p>
            <p onClick={handleClick} style={{ cursor: "pointer" }}>
              Log in
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
