import prisma from "@/utils/prisma";

export async function GET(req) {
  console.log("Orders API called!!!!!!!!");
  let orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      paidAt: true,
      taxPrice: true,
      totalPrice: true,
      orderStatus: true,
      deliveredAt: true,
      shippingPrice: true,
    },
  });
  let count = await prisma.order.count();
  return Response.json({ orders, totalOrders: count });
}
