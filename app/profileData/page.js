import React from "react";
import ProfileData from "@/components/user/ProfileTabs";

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";

import { authOption } from "@/app/api/auth/[...nextauth]/route";

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

const page = async () => {
  const data = await getSessionData();
  let user = await fetchUser(data.user.id);
  return (
    <div className="h-screen flex p-3 m-2 ">
      <ProfileData profile={data.user || {}} userData={user || {}} />
    </div>
  );
};

export default page;
