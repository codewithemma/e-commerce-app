"use client";
import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import { CiUser } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Dropdown = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("option 1");
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession();
  const options = [
    {
      label: "Option 1",
      title: `${data?.user.name}`,
      onClick: () => setSelectedOption("Option 1"),
      onAdd: router.push("/dashboard"),
    },
    {
      label: "Option 2",
      title: "My Order",
      onClick: () => setSelectedOption("Option 2"),
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
        <CiUser size={"20px"} />
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
