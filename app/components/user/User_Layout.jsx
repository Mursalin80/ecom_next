"use client";
import React, { useState } from "react";
import Link from "next/link";

import { CgProfile } from "react-icons/cg";
import { FaBackward } from "react-icons/fa";
import { HiAdjustmentsVertical, HiShoppingBag, HiHome } from "react-icons/hi2";

const User_Layout = ({ children }) => {
  const [open, setOpen] = useState(true);
  return (
    // Wraping container
    <div className="flex h-full">
      {/* SideBar NavBar */}
      <div
        className={`text-sm px-1 lg:pl-3 pl-2 m-0 bg-gray-200 flex-col relative   ${
          open ? "w-[30%] lg:w-[20%] lg:text-2xl" : "w-[5%] lg:w-[3%] "
        } duration-700`}
      >
        <div
          className={` absolute top-1 right-1 text-blue-600 text-4xl cursor-pointer m-1 hover:text-5xl  hover:text-orange-500 ${
            !open && "rotate-180 -right-3 z-50 "
          }`}
          onClick={() => setOpen(!open)}
        >
          <FaBackward />
        </div>
        {/* Sidebar Nav contants Meun */}
        <div className="flex flex-col overflow-hidden">
          <span className=" p-2 text-4xl border-b-2 border-green-500 text-center bg-gray-300 my-1 rounded-t-md ">
            <HiAdjustmentsVertical />
          </span>
          <Link
            href="/user"
            className=" flex flex-row py-2 px-2 gap-3 border-b-[1px] border-gray-400 text-gray-400 hover:text-gray-600 "
          >
            <CgProfile className=" " />
            User
          </Link>
          <Link
            href="/orders"
            className=" flex flex-row py-2 px-2 gap-3 border-b-[1px] border-gray-400 text-gray-400 hover:text-gray-600 "
          >
            <HiShoppingBag className=" " />
            Orders
          </Link>
          <Link
            href="/address"
            className=" flex flex-row py-2 px-2 gap-3 border-b-[1px] border-gray-400 text-gray-400 hover:text-gray-600 "
          >
            <HiHome className=" " />
            Address
          </Link>
        </div>
      </div>

      {/* Main contants  */}
      <div className="flex-1 p-5  bg-gray-300">{children}</div>
    </div>
  );
};

export default User_Layout;
