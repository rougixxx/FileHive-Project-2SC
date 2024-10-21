"use client";
import Image from "next/image";
import Link from "next/link";
import FileName from "../home/file_name";
import download from "@/assets/icons/document-download.svg";
import { useRouter } from "next/navigation";
import fileDownload from "js-file-download";
import axios from "axios";
import { isAuth } from "@/lib/utils/is_auth";
import { useEffect, useState } from "react";

const DownloadNavBar = ({ data }: { data: any }) => {
  const [isUserAuth, setIsUserAuth] = useState(false);
  useEffect(() => {
    setIsUserAuth(isAuth());
  }, []);
  const handleDownload = (url: string, filename: string) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res: any) => {
        fileDownload(res.data, filename);
      });
  };
  const router = useRouter();
  return (
    <nav className="flex items-center bg-white justify-between  px-12  border-b-[0.5px] py-4 border-mainInput border-opacity-25 h-[11vh] w-full">
      <Link className="self-center" href={"/"}>
        <Image
          className="hover:cursor-pointer"
          src="/logo.png"
          alt="logo"
          width={100}
          height={100}
        />
      </Link>
      <FileName fileType={data.file_type} title={data.title} />
      <div className="flex gap-8">
        Shared by {data.owner.first_name} {data.owner.last_name}
      </div>
      <div className="space-x-4 flex">
        <button className="text-sm bg-grayBack flex gap-2 items-center text-textColor rounded-[12px]  px-6 py-[6px] hover:opacity-60 transition-all duration-500">
          <Image src={download} width={24} height={24} alt="download" />
          <a
            onClick={() => {
              handleDownload(`http://localhost:8000${data.file}`, `${data.title}.${data.file_type}`);
            }}
          >
            Download
          </a>
        </button>
        {!isUserAuth && (
          <button
            onClick={() => {
              router.push("/sign-up");
            }}
            className="text-sm text-blackText rounded-[12px]  px-6 py-[6px]transition-all duration-500"
          >
            Register
          </button>
        )}
        <button
          onClick={() => {
            router.push("/sign-in");
          }}
          className="text-sm bg-primary  border-primary text-white rounded-[12px]  px-6 py-[6px] hover:opacity-50 transition-opacity duration-500"
        >
          {!isUserAuth ? "Login" : "Go Home"}
        </button>
      </div>
    </nav>
  );
};

export default DownloadNavBar;
