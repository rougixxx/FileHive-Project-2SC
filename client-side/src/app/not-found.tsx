"use client"
import Image from "next/image";
import Button from "./components/button/button";
import error from "@/assets/404/404.png";
import { useRouter } from "next/navigation";

function NotFoundPage() {
  const router = useRouter();
  return (
    <section className=" flex flex-col h-screen items-center justify-center">
        <Image
          className="pb-12"
          width={500}
          height={580}
          src={error}
          alt="file-hive"
        />
        <h1 className="text-black font-bold text-3xl  pb-2">
          Opps! Page not found.
        </h1>
        <p className="text-textColor pb-8 max-w-[500px] text-center text-sm">
          We are sorry! The page you request can not be found. Please go back to
          the homepage.
        </p>
        <Button
          onClick={() => {
            router.push("/");
          }}
          className="mb-6 w-[180px] rounded-md"
          loading={false}
          text="Go home"
        />
    </section>
  );
}

export default NotFoundPage;
