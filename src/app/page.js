import React from "react";
import styles from "./page.module.css";
import EmblaCarousel from "@/components/carousel/EmblaCarousel";
import ProductList from "@/components/productList/ProductList";
import Border from "@/components/border/Border";
import Category from "@/components/category/Category";
import Image from "next/image";
import Services from "@/components/servicesComponents/Services";
import Wrapper from "@/components/wrapper/Wrapper";
export default function Home() {
  return (
    <>
      <Wrapper>
        <div className={styles.container_flex}>
          <ProductList />
          <EmblaCarousel />
        </div>
        <Border />
        <Category />
        <Border />
        <div className={styles.img_container}>
          <Image
            src="/assets/test1.svg"
            alt="cat-img"
            priority
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <Services />
      </Wrapper>
    </>
  );
}
