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
import CategoryItems from "@/components/categoryItems/CategoryItems";
// import { url } from "@/utils/api";
// const getData = async () => {
//   const res = await fetch(`${url}/api/admin/products`, {
//     cache: "no-store",
//   });
//   return res.json();
// };

export default async function Home() {
  // const products = await getData();
  // console.log(products);
  return (
    <>
      <Wrapper>
        <div className={styles.container_flex}>
          <ProductList />
          <EmblaCarousel />
        </div>
        <CategoryItems />
        <Border />
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
            {/* {products?.map((product) => {
              return (
                <div key={product._id}>
                  <h1>{product.name}</h1>
                  <p>{product.description}</p>
                  <p>{product.price}</p>
                </div>
              );
            })} */}
          </div>
        </div>
        <Services />
      </Wrapper>
    </>
  );
}
