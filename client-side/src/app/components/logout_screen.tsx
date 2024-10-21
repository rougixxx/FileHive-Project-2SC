"use client";
import { deleteCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const LogoutScreen = () => {
  useEffect(() => {
    deleteCookie("auth_token");
    redirect(`/sign-in`);
  });
  return <></>;
};

export default LogoutScreen;
