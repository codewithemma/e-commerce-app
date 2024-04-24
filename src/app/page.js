import React from "react";
import styles from "./page.module.css";
import EmblaCarousel from "@/components/carousel/EmblaCarousel";
import ProductList from "@/components/productList/ProductList";
import Border from "@/components/border/Border";
import Category from "@/components/category/Category";
export default function Home() {
  return (
    <>
      <div className={styles.container_flex}>
        <ProductList />
        <EmblaCarousel />
      </div>
      <Border />
      <Category />
    </>
  );
}
