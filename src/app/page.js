import React from "react";
import styles from "./page.module.css";
import EmblaCarousel from "@/components/carousel/EmblaCarousel";
import ProductList from "@/components/productList/ProductList";
import Border from "@/components/border/Border";
import Category from "@/components/category/Category";
import Image from "next/image";
import Services from "@/components/servicesComponents/Services";
import Wrapper from "@/components/wrapper/Wrapper";
import Link from "next/link";
import CategoryItem from "@/components/categoryItems/CategoryItem";
export default async function Home() {
  return (
    <>
      <Wrapper>
        <div className={styles.container_grid}>
          <ProductList />
          <EmblaCarousel />
        </div>
        <CategoryItem />
        <Category />
        <Border />
        <div className={styles.container}>
          <div className={styles.img_container}>
            <Image
              src="/assets/skatedude.png"
              alt="dude holding a skate"
              priority
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={styles.content}>
            <p className={styles.brand}>Exclusive</p>
            <div>
              <p>
                Special offer <br /> in kids product
              </p>
              <p>
                Fashion is a form of self-expression and autonomy at a
                particular period and place
              </p>
              <Link href="/" className={styles.link}>
                Discover more
              </Link>
            </div>
          </div>
        </div>
        <Services />
      </Wrapper>
    </>
  );
}
