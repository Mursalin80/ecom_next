import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import prisma from "@/utils/prisma";

import { authOption } from "@/app/api/auth/[...nextauth]/route";

const getSessionData = async () => {
  let session = await getServerSession(authOption);
  return session;
};

export async function GET() {
  let session = await getSessionData();
  if (!session && session.user.role !== "admin") {
    return Response.json({
      error: "You are Not Authorized! to get the resources.",
    });
  }
  let prdoucts = await prisma.product.findMany({
    include: {
      orders: true,
    },
  });

  return Response.json({ prdoucts });
}
