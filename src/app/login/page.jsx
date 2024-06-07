"use client";
import Image from "next/image";
import styles from "./Login.module.css";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "@/components/loader/Loader";
import Swal from "sweetalert2";
const Login = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [pending, setPending] = useState(false);
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
      toast.error("Must provide all credentials");
      return;
    }
    if (!validateEmail(formData.email)) {
      toast("Invalid email address");
      return;
    }
    if (!validatePassword(formData.password)) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    try {
      setPending(true);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setPending(false);
        setToggle(!toggle);
        Swal.fire({
          title: "Success!",
          text: "User Registered Successfully",
          icon: "success",
        });
        setFormData({
          fullName: "",
          email: "",
          password: "",
        });
      } else {
        setPending(false);
        const errorData = await res.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      setPending(false);
      setError(error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (formData.email.trim() === "" || formData.password.trim() === "") {
      toast.error("Must provide all credentials");
      return;
    }
    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });
    if (res.ok) {
      router.push("/");
    } else {
      toast.error(res.error);
    }
  };
  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <div className={styles.hero}>
      <div className={styles.img_container}>
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
          <div className={styles.content}>
            <p>Create an account</p>
            <p>Enter your details below</p>
          </div>
          <div className={styles.input_group}>
            <input
              type="text"
              placeholder="Full name"
              name="fullName"
              value={formData.fullName}
              required
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              required
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              name="password"
              required
              onChange={handleChange}
            />
          </div>
          <div className={styles.button_group1}>
            <button onClick={handleCreateAccount} className={styles.link}>
              {pending ? <Loader /> : "Create an Account"}
            </button>
          </div>
          <div className={styles.end}>
            <p>Already have an account?</p>
            <p onClick={handleClick} disabled={pending}>
              Login
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.form}>
          <div className={styles.content}>
            <p>Log in to Exclusive</p>
            <p>Enter your details below</p>
          </div>
          <div className={styles.input_group}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className={styles.button_group}>
            <button onClick={handleLogin}>Log in</button>
            <button
              onClick={() => signIn("google")}
              className={`${styles.link} ${styles.google_flex} `}
            >
              <span>
                <Image
                  src="/assets/google.svg"
                  alt="google icon"
                  width={20}
                  height={20}
                  priority
                />
              </span>
              <span>Sign in with Google</span>
            </button>
          </div>
          <div className={styles.end}>
            <p>{"Don't"} have an account?</p>
            <p onClick={handleClick} style={{ cursor: "pointer" }}>
              Register
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
