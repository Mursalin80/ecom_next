import prisma from "@/utils/prisma";

export async function GET(req, ctx) {
  let {
    params: { orderId },
  } = ctx;

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
      paymentInfo: {
        select: {
          paymentId: true,
          paymentMethod: true,
          status: true,
        },
      },
      user: true,
      shippingInfo: true,
    },
  });
  console.log("Orders API called!!!!!!!!");

  return Response.json({ order });
}
