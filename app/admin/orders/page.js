import React from "react";
import ODT from "@/components/order_user/OrderTable";

async function fetchOrders() {
  let res = await fetch(`${process.env.NEXTAUTH_URL}/api/admin/orders`);
  let or = await res.json();
  return or;
}

const page = async () => {
  let orders = await fetchOrders();

  return <ODT ordersData={orders} />;
};

export default page;
