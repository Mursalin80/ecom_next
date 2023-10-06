"use client";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";

import Products from "@/components/products/Products";
import Spinner from "@/components/util/Spinner";
import useProductsStore from "@/context/productsStore";

export const metadata = {
  title: "E-Commerance Store",
  description: "We provide the electronic items smart phone labtop iphone",
};

export default function Home() {
  const products = useProductsStore((state) => state.products);
  const loading = useProductsStore((state) => state.loading);
  const setProducts = useProductsStore((state) => state.fetchProducts);
  const setError = useProductsStore((state) => state.setError);
  const setLoading = useProductsStore((state) => state.setLoading);
  const meta = useProductsStore((state) => state.metadata);

  console.log("🚀 ~ file: page.js:20 ~ Home ~ products:", products.length);

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const productsQuery = useCallback(async ({ take = 10, lastCursor = "" }) => {
    setLoading(true);
    try {
      let url = "/api/products?" + new URLSearchParams({ take, lastCursor });
      const response = await fetch(url, {
        cache: "force-cache",
        next: { revalidate: 3600 },
      });
      let { data, metaData } = await response.json();

      setProducts(data, metaData);
      setLoading(false);
    } catch (error) {
      console.log({ error });
      setError(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (products.length < 1) {
      console.log("init useEffect fired!");
      productsQuery({});
    }
  }, []);

  useEffect(() => {
    if (inView && !loading) {
      productsQuery({ take: 10, lastCursor: meta.lastCursor });
    }
  }, [inView]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:5 xl:p-20 p-1">
      {products?.length > 0 ? (
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <Products products={products} />
        </div>
      ) : (
        ""
      )}

      {loading && <Spinner />}

      {!loading && !meta.hasNextPage ? (
        <div class=" text-center w-full  text-white m-2 px-6 py-3 bg-black">
          No more Products
        </div>
      ) : (
        <div ref={ref}></div>
      )}

      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
    </main>
  );
}
