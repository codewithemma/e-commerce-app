"use client";
import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState("option 1");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data, status } = useSession();
  //   if (status === "unauthenticated") {
  //     router.push("/");
  //     return;
  //   }
  const options = [
    {
      label: "Option 1",
      title: `${data?.user.name}`,
      onClick: () => setSelectedOption("Option 1"),
      onAdd: () => alert("ejffruf"),
    },
    {
      label: "Option 2",
      title: "My Order",
      onClick: () => setSelectedOption("Option 2"),
      onAdd: () => alert("ejffruf"),
    },
    {
      label: "Option 3",
      title: "Logout",
      onClick: () => setSelectedOption("Option 3"),
      onAdd: signOut,
    },
  ];
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.dropdown}>
      <div onClick={toggleDropdown}>
        <span style={{ display: "none" }}>{selectedOption}</span>
        <FontAwesomeIcon
          onClick={() => setIsOpen(!isOpen)}
          icon={faUser}
          size="lg"
        />
      </div>
      {isOpen && (
        <ul className={styles.dropdown_menu}>
          {options?.map((option) => (
            <li key={option.id} onClick={(() => option.onClick, option.onAdd)}>
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
