"use client";
import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState("User");
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession();
  const options = [
    {
      id: 1,
      title: `${data.user.name}`,
    },
    {
      id: 2,
      title: "My Order",
    },
    {
      id: 3,
      title: "Logout",
    },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <FontAwesomeIcon
        onClick={() => setIsOpen(!isOpen)}
        icon={faUser}
        size="lg"
      />
      {isOpen && (
        <ul className={styles.dropdown_menu}>
          {options?.map((option) => (
            <li key={option.id} onClick={() => handleOptionClick(option)}>
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
