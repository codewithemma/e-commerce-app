"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.css";
import { CiLogout, CiUser, CiShoppingBasket, CiSettings } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Dropdown = () => {
  const dropdownRef = useRef(null);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("option 1");
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession();
  const handleProfileClick = () => {
    router.push("/profile");
    setSelectedOption("Option 1");
    setIsOpen(false);
  };

  const options = [
    {
      label: "Option 1",
      title: (
        <span className={styles.flex}>
          <CiUser size={"30px"} />
          <span>Manage your account</span>
        </span>
      ),
      // title: `Hi, ${data?.user.name}`,
      onClick: () => setSelectedOption("Option 1"),
      onAdd: handleProfileClick,
    },
    {
      label: "Option 2",
      title: (
        <span className={styles.flex}>
          <CiShoppingBasket size={"30px"} />
          <span>My Order</span>
        </span>
      ),
      onClick: () => setSelectedOption("Option 2"),
    },
    {
      label: "Option 3",
      title: (
        <span className={styles.flex}>
          <CiSettings size={"30px"} />
          <span>Admin</span>
        </span>
      ),
      onClick: () => setSelectedOption("Option 3"),
      // onAdd: router.push("/auth/admin"),
    },
    {
      label: "Option 4",
      title: (
        <span className={styles.flex}>
          <CiLogout size={"30px"} />
          <span>Logout</span>
        </span>
      ),
      onClick: () => setSelectedOption("Option 3"),
      onAdd: signOut,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.dropdown} ref={dropdownRef}>
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
