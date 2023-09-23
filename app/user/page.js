import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

import Layout from "@/components/user/User_Layout";

const getSessionData = async () => {
  let session = await getServerSession(authOption);
  if (!session) {
    redirect("/");
    return;
  }
  return session;
};

let fetchUser = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
      address: true,
      id: true,
      image: true,
    },
  });
};

const User = async () => {
  const data = await getSessionData();
  let user = await fetchUser(data.user.id);

  return (
    <div className="h-screen">
      <Layout>{user.name}</Layout>
    </div>
  );
};

export default User;
