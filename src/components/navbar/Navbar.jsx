"use client";
import Wrapper from "../wrapper/Wrapper";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import AuthLinks from "../authLinks/AuthLinks";
import Image from "next/image";
import ThemeToggle from "../themeToggle/ThemeToggle";
import Badge from "@mui/material/Badge";
import { IoCartOutline } from "react-icons/io5";
const Navbar = () => {
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Wrapper>
        <div className={styles.container}>
          <Link href="/">
            <Image
              style={{ objectFit: "contain" }}
              src="/assets/logo-no-background.svg"
              alt="logo"
              width={50}
              height={50}
              priority
            />
          </Link>
          <ul>
            <li className={styles.nav_flex}>
              <Link className={styles.nav_link} href="/">
                Home
              </Link>
              <Link className={styles.nav_link} href="/contact">
                Contact
              </Link>
              <Link className={styles.nav_link} href="/about">
                About
              </Link>
              {status === "authenticated" ? (
                <Link className={styles.nav_link} href="/user/cart">
                  Cart
                </Link>
              ) : (
                <Link className={styles.nav_link} href="/auth/register">
                  Login
                </Link>
              )}
            </li>
          </ul>
          <div>
            <div className={styles.input_group}>
              <input
                className={styles.input}
                type="text"
                placeholder="what are you looking for....?"
              />
              <span>
                <HiMagnifyingGlass
                  size={"20px"}
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 10,
                  }}
                />
              </span>
            </div>
          </div>
          <div className={styles.auth_icons}>
            <ThemeToggle />
            <Link href="/user/cart">
              <Badge badgeContent={4} color="error">
                <IoCartOutline size="20px" />
              </Badge>
            </Link>
            {status === "authenticated" && <AuthLinks />}
          </div>
        </div>{" "}
        <div>
          <div className={styles.burger} onClick={() => setOpen(!open)}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
          {open && (
            <div className={styles.responsiveMenu}>
              <Link className={styles.responsive_link} href="/">
                Home
              </Link>
              <Link className={styles.responsive_link} href="/">
                Contact
              </Link>
              <Link className={styles.responsive_link} href="/">
                About
              </Link>
              {status === "unauthenticated" ? (
                <Link className={styles.responsive_link} href="/auth/register">
                  Login
                </Link>
              ) : (
                <>
                  <Link className={styles.responsive_link} href="/write">
                    Cart
                  </Link>
                  <span className={styles.link}>Logout</span>
                </>
              )}
            </div>
          )}
        </div>
      </Wrapper>
      <div className={styles.nav_border}></div>
    </>
  );
};

export default Navbar;
