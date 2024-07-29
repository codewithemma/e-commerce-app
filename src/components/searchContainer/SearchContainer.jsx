"use client";
import { HiMagnifyingGlass } from "react-icons/hi2";
import styles from "./SearchContainer.module.css";

const SearchContainer = ({ onChange }) => {
  return (
    <div className={styles.input_group}>
      <input
        className={styles.input}
        type="text"
        placeholder="what are you looking for....?"
        onChange={onChange}
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
