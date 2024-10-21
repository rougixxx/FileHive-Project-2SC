"use client"
import Button from "@/app/components/button/button";
import Image from "next/image";
import verify from "@/assets/auth/veify.png";
import { useRouter } from "next/navigation";

const VerifyEmail = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <section className=" flex flex-col items-center justify-center">
        <Image
          className="mt-8"
          width={150}
          height={80}
          src={"/logo.png"}
          alt="file-hive"
        />
        <div className=" flex flex-col p-8 items-center">
          <Image width={350} height={580} src={verify} alt="file-hive" />
          <h1 className="text-black font-bold text-3xl  pb-2">Email verification</h1>
          <p className="text-textColor pb-8 max-w-[500px] text-center text-sm">
            We have sent you an email to your inbox in order to verify your
            email address. Please check it out!
          </p>
          <Button
            className="mb-6 w-[180px] rounded-md"
            loading={false}
            onClick={()=>{
              router.push("/sign-in");
            }}
            text="Go to login page"
          />
        </div>
      </section>
      <p className="text-blueText text-xs flex justify-center py-4">
        © FileHive
      </p>
    </div>
  );
};

export default VerifyEmail;
