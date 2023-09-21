import Link from "next/link";

const OrderTable = ({ ordersData }) => {
  let { orders, totalOrders } = ordersData;

  return (
    <div className="container mx-auto py-10 px-4 my-2 h-screen">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="caption-top">Total Orders:{totalOrders}</caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order_ID
              </th>
              <th scope="col" className="px-6 py-3">
                Paid_At
              </th>
              <th scope="col" className="px-6 py-3">
                Tax
              </th>
              <th scope="col" className="px-6 py-3">
                Shipping Fee
              </th>
              <th scope="col" className="px-6 py-3">
                Total Price
              </th>
              <th scope="col" className="px-6 py-3">
                Order Status
              </th>

              <th scope="col" className="px-6 py-3">
                Delivered_At
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {order.id}
                    </Link>
                  </th>
                  <td className="px-6 py-4">{order.paidAt}</td>
                  <td className="px-6 py-4">${order.taxPrice}</td>
                  <td className="px-6 py-4">${order.shippingPrice}</td>
                  <td className="px-6 py-4">${order.totalPrice / 100}</td>
                  <td className="px-6 py-4">{order.orderStatus}</td>
                  <td className="px-6 py-4">{order.deliveredAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
