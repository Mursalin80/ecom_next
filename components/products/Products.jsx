"use client";
import Link from "next/link";
import Image from "next/image";

import { useCart } from "@/context/cartContext";
import Rating from "./Rating";

const Products = ({ products }) => {
  let { addItem, toggleCart } = useCart();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group  my-1">
              <Link href={`/product/${product.id}`}>
                <div className=" aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <Image
                    width={250}
                    height={350}
                    src={product.images[0].url}
                    alt={product.images[0].public_id}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
              </Link>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <div className="flex items-center justify-between my-2 bg-gray-100 py-1 px-3 rounded-lg">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  $ {product.price}
                </span>
                <button
                  onClick={() => {
                    addItem({ ...product, quantity: 1 });
                    toggleCart();
                    setTimeout(() => toggleCart(), 1500);
                  }}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                </button>
              </div>
              <Rating
                details={false}
                rating={product.ratings}
                numOfReviews={product.numOfReviews}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
