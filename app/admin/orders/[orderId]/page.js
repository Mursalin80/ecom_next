import Image from "next/image";
import Link from "next/link";

import prisma from "@/utils/prisma";

async function getOrder(orderId) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
      paymentInfo: true,
      user: true,
      shippingInfo: true,
    },
  });

  return order;
}

export default async function Order({ params: { orderId }, searchParams }) {
  const order = await getOrder(orderId);
  let { orderItems, paymentInfo, user, shippingInfo } = order;
  return (
    <div className="container mx-auto py-10 px-4 my-2 ">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* Order details */}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="caption-top text-left text-3xl my-2 p-2 border border-b-gray-500 rounded-b-lg">
            Order Details
          </caption>
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
              <td className="px-6 py-4">{order.paidAt.toISOString()}</td>
              <td className="px-6 py-4">${order.taxPrice}</td>
              <td className="px-6 py-4">${order.shippingPrice}</td>
              <td className="px-6 py-4">${order.totalPrice / 100}</td>
              <td className="px-6 py-4">{order.orderStatus}</td>
              <td className="px-6 py-4">{order.deliveredAt}</td>
            </tr>
          </tbody>
        </table>
        {/* Order items */}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="caption-top text-left text-3xl my-2 p-2 border border-b-gray-500 rounded-b-lg">
            Orders Items
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product_ID
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Product Image
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quentity
              </th>
              <th scope="col" className="px-6 py-3">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {orderItems?.map((order) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Link
                      href={`/product/${order.product.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {order.id}
                    </Link>
                  </th>
                  <td className="px-6 py-4">{order.product.name}</td>
                  <td className="px-6 py-4">
                    <Image
                      className="rounded-xl"
                      src={order.product.images[0].url}
                      width={80}
                      height={64}
                      alt={order.product.name}
                    />
                  </td>
                  <td className="px-6 py-4">${order.product.price}</td>
                  <td className="px-6 py-4">{order.quantity}</td>
                  <td className="px-6 py-4">
                    ${order.quantity * order.product.price}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Payment Information */}

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="caption-top text-left text-3xl my-2 p-2 border border-b-gray-500 rounded-b-lg">
            Payment Information
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Payment_ID
              </th>
              <th scope="col" className="px-6 py-3">
                Payment_Method
              </th>

              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <Link
                  href={`/admin/orders/${paymentInfo.paymentId}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  {order.id}
                </Link>
              </th>
              <td className="px-6 py-4">{paymentInfo.paymentMethod}</td>
              <td className="px-6 py-4">{paymentInfo.status}</td>
            </tr>
          </tbody>
        </table>

        {/* Shipping Information */}

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="caption-top text-left text-3xl my-2 p-2 border border-b-gray-500 rounded-b-lg">
            Shipping Information
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
              <th scope="col" className="px-6 py-3">
                PostalCode
              </th>
              <th scope="col" className="px-6 py-3">
                Country
              </th>
              <th scope="col" className="px-6 py-3">
                Phone#
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {shippingInfo[0].address}
              </th>
              <td className="px-6 py-4">{shippingInfo[0].city}</td>
              <td className="px-6 py-4">{shippingInfo[0].postalCode}</td>
              <td className="px-6 py-4">{shippingInfo[0].country}</td>
              <td className="px-6 py-4">{shippingInfo[0].phoneNo}</td>
            </tr>
          </tbody>
        </table>

        {/* User Info */}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="caption-top text-left text-3xl my-2 p-2 border border-b-gray-500 rounded-b-lg">
            User Information
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <Link
                  href={`/admin/user/${user.id}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  {user.name}
                </Link>
              </th>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4 ">
                <Image
                  className="rounded-full"
                  src={user.image}
                  width={64}
                  height={64}
                  alt={user.name}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
