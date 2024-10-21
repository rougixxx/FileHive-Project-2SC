"use client";
import { isAuth } from "@/lib/utils/is_auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";
const NavBar = () => {
  const router = useRouter();
  const [isUserAuth,setIsUserAuth] = useState(false);
  useEffect(() => {
    setIsUserAuth(isAuth())
  }, []);
  const scrollTo = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <nav className="flex justify-between container items-center mx-auto px-8 pt-2 backdrop-blur-sm">
        <div className="flex gap-12 items-center">
          <Image
            className="mb-3"
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
          />
          <ul className="flex gap-6 text-blueText text-sm">
            <li
              onClick={() => scrollTo("heroSection")}
              className="hover:cursor-pointer hover:opacity-50 transition-opacity duration-500"
            >
              Home
            </li>
            <li
              onClick={() => scrollTo("descriptionSection")}
              className="hover:cursor-pointer hover:opacity-50 transition-opacity duration-500"
            >
              Feutures
            </li>
            <li
              onClick={() => scrollTo("solutionSection")}
              className="hover:cursor-pointer hover:opacity-50 transition-opacity duration-500"
            >
              Solution
            </li>
            <li
              onClick={() => scrollTo("pricingSection")}
              className="hover:cursor-pointer hover:opacity-50 transition-opacity duration-500"
            >
              Pricing
            </li>
            <li
              onClick={() => scrollTo("howItWorkSection")}
              className="hover:cursor-pointer hover:opacity-50 transition-opacity duration-500"
            >
              How it works
            </li>
          </ul>
        </div>
        <div className="space-x-4">
          <button
            onClick={() => {
              router.push("/sign-in");
            }}
            className="text-sm text-blackText border-[2px] rounded-[12px] border-blackText px-6 py-[6px] hover:bg-blackText hover:text-white transition-all duration-500"
          >
            {isUserAuth ? "Go To Home" : "Sign In"}
          </button>
          {!isUserAuth && (
            <button
              onClick={() => {
                router.push("/sign-up");
              }}
              className="text-sm bg-primary border-[2px] border-primary text-white rounded-[12px]  px-6 py-[6px] hover:opacity-50 transition-opacity duration-500"
            >
              Create an account
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
