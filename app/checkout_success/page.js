"use client";
import { useCart } from "@/context/cartContext";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
useEffect;

const page = () => {
  let pay_id = useSearchParams().get("session_id");

  const { clearCart } = useCart();
  useEffect(() => {
    toast.success(`Payment done successful!`);

    clearCart();
  }, []);
  return (
    <div className="container mx-auto h-screen w-1/2">
      <div className="text-xl border-2 border-green-400 p-5 m-5   bg-gray-300 rounded-xl">
        Order was successfuly completed!
      </div>
      <p className="bg-slate-300 p-2 rounded-lg">
        Payment_id:
        <span className="bg-slate-200 p-2 m-2 rounded-lg border border-b-green-300">
          {pay_id}
        </span>
      </p>
    </div>
  );
};

export default page;
