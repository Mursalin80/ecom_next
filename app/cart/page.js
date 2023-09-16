import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import Cart from "@/components/cart/Cart";
// import Address from "@/components/order_user/Address";

const getSessionData = async () => {
  let session = await getServerSession(authOption);
  if (!session) {
    redirect("api/auth/signin");
  }
  return session;
};

// let fetchUser = async (id) => {
//   return await prisma.user.findUnique({
//     where: {
//       id,
//     },
//     select: {
//       name: true,
//       email: true,
//       address: true,
//       id: true,
//       image: true,
//     },
//   });
// };

const page = async () => {
  const data = await getSessionData();

  // let user = await fetchUser(data.user.id);

  return (
    <div className="container mx-auto h-screen">
      {/* <Address /> */}
      <Cart session={data.user} />
    </div>
  );
};

export default page;
