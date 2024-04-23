"use client";
import styles from "./ThemeToggle.module.css";
import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";

const ThemeToggle = () => {
  const { toggle, theme } = useContext(ThemeContext);
  return (
    <label className={styles.switch}>
      <input onClick={toggle} type="checkbox" className={styles.input1} />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ThemeToggle;
