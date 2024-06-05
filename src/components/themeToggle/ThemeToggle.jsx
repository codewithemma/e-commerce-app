"use client";
import styles from "./ThemeToggle.module.css";
import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";
import { CiSun } from "react-icons/ci";
import { CiCloudMoon } from "react-icons/ci";
const ThemeToggle = () => {
  const { toggle, theme } = useContext(ThemeContext);
  return (
    <label className={styles.switch} onClick={toggle}>
      {theme === "light" ? (
        <CiCloudMoon size={"20px"} />
      ) : (
        <CiSun size={"20px"} />
      )}
    </label>
  );
};

export default ThemeToggle;
