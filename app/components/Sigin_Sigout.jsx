"use client";
import { signIn, signOut } from "next-auth/react";

export const Login = () => {
  return <div onClick={() => signIn()}>Login</div>;
};

export const Logout = () => {
  return <div onClick={() => signOut()}>SignOut</div>;
};
