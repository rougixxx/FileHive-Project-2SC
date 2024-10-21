"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import search from "@/assets/icons/search.svg";
import profile from "/public/progile.png";
import Link from "next/link";

const DashboardNav = ({
  filterFileDate,
  pic,
}: {
  filterFileDate?: (filter: string | null, searchInput: string | null) => void;
  pic: string | null;
}) => {
  const router = usePathname();
  const route = router.split("/").pop();

  const getTitle = (route: string | undefined) => {
    switch (route) {
      case "home":
        return "My Files";
      case "profile":
        return "My Profile";
      case "settings":
        return "Security";
      default:
        return "Dashboard";
    }
  };

  return (
    <nav className="flex bg-white justify-between items-center px-12  border-b-[0.5px] py-4 border-mainInput border-opacity-25 h-[11vh] w-full">
      <h1 className="text-primary font-semibold text-2xl">{getTitle(route)}</h1>
      <div className="flex gap-8">
        {route == "home" && (
          <div className="flex bg-lightGray rounded-[40px] px-4 py-2 gap-4">
            <Image
              className=" fill-mainInput stroke-mainInput"
              src={search}
              alt="search"
              width={25}
              height={25}
            />

            <input
              onChange={(e) => {
                filterFileDate!(null, e.target.value);
              }}
              className="bg-transparent text-mainInput outline-none focus:outline-none w-[20rem]"
              placeholder="Search for file..."
              type="text"
            />
          </div>
        )}
        <Link href={"/profile"}>
          <Image
            className="rounded-full w-[50px] h-[50px] object-cover hover:cursor-pointer hover:opacity-70 transition-all duration-700"
            src={pic ? `http://localhost:8000${pic}` : profile}
            alt="profile"
            width={50}
            height={50}
          />
        </Link>
      </div>
    </nav>
  );
};

export default DashboardNav;
