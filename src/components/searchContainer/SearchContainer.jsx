"use client";
import { HiMagnifyingGlass } from "react-icons/hi2";
import styles from "./SearchContainer.module.css";
import { useState } from "react";

const SearchContainer = ({ onChange, onKeyDown }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={styles.input_group}>
      <input
        className={styles.input}
        type="text"
        onChange={onChange}
        placeholder="Search products..."
        onKeyDown={onKeyDown}
      />
      <span>
        <HiMagnifyingGlass
          size={"18px"}
          style={{
            position: "absolute",
            top: 12,
            right: 10,
          }}
        />
      </span>
    </div>
  );
};

export default SearchContainer;
