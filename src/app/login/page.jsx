"use client";
import Image from "next/image";
import styles from "./Login.module.css";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
const Login = () => {
  const { status } = useSession();
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  function validatePassword(password) {
    return password.length >= 8;
  }
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleCreateAccount = async (event) => {
    event.preventDefault();
    if (
      formData.fullName.trim() === "" ||
      formData.email.trim() === "" ||
      formData.password.trim() === ""
    ) {
      setError("Must provide all credentials");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Invalid email address");
      return;
    }
    if (!validatePassword(formData.password)) {
      setError("Password must be at least 8 characters long");
      return;
    }
    try {
      setPending(true);
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setPending(false);
        const form = event.target;
        form.reset();
        setSuccessMessage("User Registered Successfully");
      } else {
        const errorData = await res.json();
        setError(errorData.message);
        setPending(false);
      }
    } catch (error) {
      setPending(false);
      setError("Something went wrong!");
    }
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
              name="fullName"
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
              {pending ? <Loader /> : "Create an Account"}
            </button>
            {successMessage && <p>{successMessage}</p>}
            {error ? <p>{error}</p> : <p>{successMessage}</p>}
          </div>
          <div className={styles.end}>
            <p>Already have an account?</p>
            <p onClick={handleClick} disabled={pending}>
              Create an account{" "}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
