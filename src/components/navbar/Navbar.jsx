"use client";
import Wrapper from "../wrapper/Wrapper";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../dropdown/Dropdown";
const Navbar = () => {
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Wrapper>
        <div className={styles.container}>
          <h2>Exclusive</h2>
          <ul>
            <li className={styles.nav_flex}>
              <Link className={styles.nav_link} href="/">
                Home
              </Link>
              <Link className={styles.nav_link} href="/">
                Contact
              </Link>
              <Link className={styles.nav_link} href="/">
                About
              </Link>
              {status === "authenticated" ? (
                <Link className={styles.nav_link} href="/">
                  Wishlist
                </Link>
              ) : (
                <Link className={styles.nav_link} href="/login">
                  Sign Up
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
                <Image
                  src="/assets/magnify.svg"
                  className={styles.input_image}
                  width={25}
                  height={25}
                  alt="search icon"
                  style={{
                    position: "absolute",
                    top: 15,
                    right: 10,
                  }}
                />
              </span>
            </div>
          </div>
          <div>
            <ThemeToggle />
          </div>
          <div className={styles.auth_icons}>
            <FontAwesomeIcon icon={faCartShopping} size="lg" />
            <Dropdown />
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
                  <Link className={styles.responsive_link} href="/login">
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
        </div>
      </Wrapper>
      <div className={styles.nav_border}></div>
    </>
  );
};

export default Navbar;
