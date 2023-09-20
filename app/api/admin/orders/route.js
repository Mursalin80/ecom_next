import {} from "next/headers";

import prisma from "@/utils/prisma";

export async function GET(req) {
  let orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      paymentInfo: {
        select: {
          paymentId: true,
          status: true,
        },
      },
      user: {
        select: {
          id: true,
          email: true,
        },
      },
      orderItems: {
        select: {
          productId: true,
          product: {
            select: {
              name: true,
            },
          },
          price: true,
          quantity: true,
        },
      },
    },
  });
  let count = await prisma.order.count();
  return Response.json({ orders, totalOrders: count });
}
