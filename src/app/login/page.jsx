"use client";
import Image from "next/image";
import styles from "./Login.module.css";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const Login = () => {
  const { status } = useSession();
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleCreateAccount = (event) => {
    event.preventDefault;
    if (formData.username || formData.email || formData.password) {
      setError("Must provide all credentials");
    }
    try {
      setPending(true);
      const res = await fetch('api/register', {
        method:'POST',
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify(formData)
      })
    } catch (error) {}
  };
  const handleClick = () => {
    setToggle(!toggle);
  };
  if (status === "authenticated") {
    router.push("/");
    return;
  }
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
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
          </div>
          <div className={styles.button_group}>
            <button>Log in</button>
            <button
              onClick={() => signIn("google")}
              className={`${styles.link} ${styles.google_button} `}
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
              Sign in with Google
            </button>
          </div>
          <div className={styles.end}>
            <p>{"Don't"} have an account?</p>
            <p onClick={handleClick} style={{ cursor: "pointer" }}>
              Sign up
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.form}>
          <h2>Create an account</h2>
          <p>Enter your details below</p>
          <div className={styles.input_group}>
            <input
              type="text"
              placeholder="Full name"
              name="username"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={handleChange}
            />
          </div>
          <div className={styles.button_group1}>
            <button onClick={handleCreateAccount} className={styles.link}>
              Create Account
            </button>
            <button
              onClick={() => signIn("google")}
              className={`${styles.link} ${styles.google_button} `}
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
            </button>
            {error && <p>{error}</p>}
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
