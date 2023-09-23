import ODT from "@/components/order_user/OrderTable";
import Layout from "@/components/user/User_Layout";

async function fetchOrders() {
  let res = await fetch(`${process.env.NEXTAUTH_URL}/api/admin/orders`);
  let or = await res.json();
  return or;
}

const page = async () => {
  let orders = await fetchOrders();

  return (
    <Layout>
      <ODT ordersData={orders} />;
    </Layout>
  );
};

export default page;
