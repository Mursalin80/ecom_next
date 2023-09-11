"use client";
import getStripe from "@/utils/stripe_client";
import { FaStripeS } from "react-icons/fa";
import Link from "next/link";

import { useCart } from "@/context/cartContext";

const Cart = ({ session }) => {
  const {
    cartState: { items, total },
    removeItem,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/checkout_sessions/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify({ items, total, userId: session.id }),
    });

    const data = await response.json();

    if (data?.session) {
      stripe?.redirectToCheckout({ sessionId: data.session.id });
    }
  };

  return (
    <div className="flex h-full w-full flex-col  bg-gray-200 shadow-xl p-1 mx:1 xl:mx-5 md:w-4/6 rounded-3xl my-2">
      <div className="flex-1  overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <div className="text-lg font-medium text-gray-900">Shopping cart</div>
        </div>

        <div className="mt-8">
          <div className="flow-root ">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <div className="flex py-6 flex-col xl:flex-row ">
                  <li key={item.id} className="">
                    <Link href={`/product/${item.id}`}>
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.images[0].url}
                          alt={item.description}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </Link>
                  </li>
                  <div className="ml-4 flex flex-1 flex-col  ">
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
                  </div>
                  <div className="flex  items-end justify-between sm:bg-indigo-100 lg:bg-inherit p-2 m-1 rounded-xl">
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
                        className="font-bold  text-red-400 hover:text-red-600 p-2 m-1"
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium  bg-indigo-300 rounded text-gray-600">
          <p className="underline   py-1 px-4 m-1  rounded  w-1/2">Subtotal</p>
          <p className="underline w-1/3   py-1 px-4 m-1 rounded ">
            ${total.toFixed(2)}
          </p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="flex rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ">
          <FaStripeS className="rounded-lg mx-1 text-2xl text-gray-800 " />
          <button
            className=" flex-1 ml-2 px-1  rounded border border-transparent  text-white   shadow-sm "
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </div>

        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <Link
              href="/"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
