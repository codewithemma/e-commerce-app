"use client";
import Wrapper from "../wrapper/Wrapper";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useContext, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import AuthLinks from "../authLinks/AuthLinks";
import Image from "next/image";
import ThemeToggle from "../themeToggle/ThemeToggle";
import Badge from "@mui/material/Badge";
import { CartContext } from "@/context/CartContext";
import { CiShoppingCart } from "react-icons/ci";
import SearchContainer from "../searchContainer/SearchContainer";
const Navbar = () => {
  const { status } = useSession();

  const [open, setOpen] = useState(false);

  const { cart } = useContext(CartContext);

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
          <ul className={styles.nav_flex}>
            <li>
              <Link className={styles.nav_link} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={styles.nav_link} href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className={styles.nav_link} href="/contact">
                Contact
              </Link>
            </li>
            {status === "authenticated" ? (
              <li>
                <Link className={styles.nav_link} href="/cart">
                  Cart
                </Link>
              </li>
            ) : (
              <li>
                <Link className={styles.nav_link} href="/auth/register">
                  Login
                </Link>
              </li>
            )}
          </ul>
          <div className={styles.none}>
            <SearchContainer />
          </div>
          <div className={styles.auth_icons}>
            <ThemeToggle />
            <Link href="/cart">
              <Badge badgeContent={cart?.length || 0} color="error">
                <CiShoppingCart size="20px" />
              </Badge>
            </Link>
            {status === "authenticated" && <AuthLinks />}
          </div>
          <div className={styles.burger} onClick={() => setOpen(!open)}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
        </div>
        <div>
          {open && (
            <div className={styles.responsiveMenu}>
              <ul>
                <li>
                  <Link
                    className={styles.responsive_link}
                    href="/"
                    onClick={() => setOpen(!open)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className={styles.responsive_link}
                    href="/contact"
                    onClick={() => setOpen(!open)}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    className={styles.responsive_link}
                    href="/about"
                    onClick={() => setOpen(!open)}
                  >
                    About
                  </Link>
                </li>
                {status === "unauthenticated" ? (
                  <li>
                    <Link
                      className={styles.responsive_link}
                      href="/auth/register"
                      onClick={() => setOpen(!open)}
                    >
                      Login
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link
                        className={styles.responsive_link}
                        href="/cart"
                        onClick={() => setOpen(!open)}
                      >
                        cart
                      </Link>
                    </li>
                    <li className={styles.link} onClick={signOut}>
                      Logout
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </Wrapper>
      <div className={styles.nav_border}></div>
    </>
  );
};

export default Navbar;
