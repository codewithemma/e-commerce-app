"use client";
import Image from "next/image";
import styles from "./Login.module.css";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Loader from "@/components/loader/Loader";
import Swal from "sweetalert2";
const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [toggle, setToggle] = useState(false);
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  let callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    try {
      setPending(true);
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const resData = await res.json();
        setPending(false);
        setToggle(!toggle);
        toast.success(`${resData.message}`);
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
      toast.error("Something went wrong");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setPending(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
        callbackUrl,
      });
      const data = await res.json();
      if (res.ok) {
        setPending(false);
        router.push(callbackUrl);
        toast.success("Login Successful 🎉");
      } else {
        setPending(false);
        toast.error(data.error);
      }
    } catch (error) {
      setPending(false);
      toast.error("Something went wrong on our end");
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
        <div className={styles.container}>
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
                onChange={handleChange}
                disabled={pending}
              />
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={pending}
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                name="password"
                onChange={handleChange}
                disabled={pending}
              />
            </div>
            <div className={styles.button_group1}>
              <button
                onClick={handleCreateAccount}
                className={styles.link}
                disabled={pending}
              >
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
        </div>
      ) : (
        <div className={styles.container}>
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
                value={formData.email}
                onChange={handleChange}
                disabled={pending}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={pending}
              />
            </div>
            <div className={styles.button_group}>
              <button onClick={handleLogin} disabled={pending}>
                {pending ? <Loader /> : "Log in"}
              </button>
              <button
                onClick={() => signIn("google")}
                className={`${styles.link} ${styles.google_flex} `}
                disabled={pending}
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
              <p
                disabled={pending}
                onClick={handleClick}
                style={{ cursor: "pointer" }}
              >
                Register
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
