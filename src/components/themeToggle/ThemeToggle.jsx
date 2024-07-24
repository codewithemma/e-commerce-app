"use client";
import styles from "./ThemeToggle.module.css";
import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";
import { CiDark, CiLight } from "react-icons/ci";
const ThemeToggle = () => {
  const { toggle, theme } = useContext(ThemeContext);
  return (
    <label className={styles.switch} onClick={toggle}>
      {theme === "light" ? <CiDark size={"20px"} /> : <CiLight size={"20px"} />}
    </label>
  );
};

export default ThemeToggle;
