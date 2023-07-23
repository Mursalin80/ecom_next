import React from "react";
import OrderTable from "@/app/components/order_user/OrderTable";
import Layout from "@/app/components/user/User_Layout";
import prisma from "@/utils/prisma";

let order_count = async () => {
  return await prisma.order.count();
};
let user_count = async () => {
  return await prisma.user.count();
};

const page = async () => {
  let orders = {};
  let count = await order_count();
  return (
    <Layout className="">
      <div className=" bg-stone-800 text-center">
        <h1 className="text-6xl text-blue-600 m-5 p-5">All Orders</h1>
        <p className="py-2 text-white">Order count# {count}</p>
      </div>

      <OrderTable orders={orders} />
    </Layout>
  );
};

export default page;
