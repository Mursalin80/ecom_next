"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import Products from "@/components/products/Products";
import Spinner from "@/components/util/Spinner";

export const metadata = {
  title: "E-Commerance Store",
  description: "We provide the electronic items smart phone labtop iphone",
};

// const handleScroll = () => {
//   let top = window.innerHeight + document.documentElement.scrollTop + 20;
//   let bot = document.documentElement.offsetHeight;
//   console.log({ url });

//   if (top > bot) {
//     return productsQuery(url);
//   }
// };

export default function Home() {
  let [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  let [meta, setMeta] = useState({ hasNextPage: true, lastCursor: "" });

  const productsQuery = async ({ take = 10, lastCursor = "" }) => {
    setLoading(true);
    let url = "/api/products?" + new URLSearchParams({ take, lastCursor });
    const response = await fetch(url, {
      cache: "force-cache",
      next: { revalidate: 3600 },
    });
    let data = await response.json();
    setLoading(false);
    if (data) {
      setProducts([...products, ...data?.data]);
      setMeta({ ...data?.metaData });
    }
  };

  useEffect(() => {
    productsQuery({});
  }, []);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:5 xl:p-20 p-1">
      {products?.length > 0 ? (
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <Products products={products} />
        </div>
      ) : (
        ""
      )}

      <div className="">{loading && <Spinner />}</div>
      {!loading && !meta.hasNextPage ? (
        <div class="skew-y-2 text-center  text-gray-600 m-2 px-6 py-3 bg-gradient-to-t from-slate-300 via-green-200 dark:from-black dark:via-black">
          No more Products
        </div>
      ) : (
        <button
          disabled={!meta.hasNextPage}
          onClick={() =>
            productsQuery({ take: 10, lastCursor: meta.lastCursor })
          }
          class="bg-blue-700 hover:bg-blue-400  text-white  py-2 px-4 rounded-xl inline-flex items-center"
        >
          <span className="animate-bounce">Load more products!</span>
        </button>
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
