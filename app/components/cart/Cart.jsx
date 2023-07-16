"use client";

import { useCart } from "@/context/cartContext";
import Link from "next/link";

const Cart = () => {
  let {
    cartState: { cartOpen, items, total },
    toggleCart,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  return (
    <div className="container mx-auto h-screen my-2 p-9">
      <div className="flex h-full flex-col bg-white shadow-xl m-5 w-1/2 mx-auto rounded-3xl my-2">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <div className="text-lg font-medium text-gray-900">
              Shopping cart
            </div>
          </div>

          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <Link href={`/product/${item.id}`}>
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.images[0].url}
                          alt={item.description}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </Link>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.id}>{item.name}</a>
                          </h3>
                          <p className="ml-4">
                            Price:{item.price}x{item.quantity}=
                            <span className="underline  bg-slate-200 py-1 px-2 m-1 rounded text-gray-600">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Rating:{item.ratings}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {item.quantity}</p>

                        <div className="flex text-lg">
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500 p-2 m-1"
                          >
                            +
                          </button>
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500 p-2 m-1"
                          >
                            -
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500 p-2 m-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium  bg-indigo-600 rounded">
            <p className="underline   py-1 px-4 m-1 bg-indigo-500 rounded text-gray-300 w-1/2">
              Subtotal
            </p>
            <p className="underline w-1/3 bg-indigo-500  py-1 px-4 m-1 rounded text-gray-300">
              ${total.toFixed(2)}
            </p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <a
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </a>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                // onClick={() => setOpen(false)}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
