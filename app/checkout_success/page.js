"use client";
import { useCart } from "@/context/cartContext";
import { useEffect } from "react";
useEffect;

const page = () => {
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="container mx-auto h-screen w-1/2">
      <div className="text-5xl border-2 border-green-400 p-5 m-5   bg-green-300 rounded-xl">
        Order was successfuly completed!
      </div>
    </div>
  );
};

export default page;
