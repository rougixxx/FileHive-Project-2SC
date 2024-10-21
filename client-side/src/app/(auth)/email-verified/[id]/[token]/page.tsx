"use server";
import Button from "@/app/components/button/button";
import Image from "next/image";
import verifyPic from "@/assets/auth/verified.png";
import NotFoundPage from "@/app/not-found";
import { verify } from "@/app/(auth)/server/functions";
import Link from "next/link";

export default async function EmailVerified({
  params,
}: {
  params: { id: string; token: string };
}) {
  const response = await verify(params);

  return (
    <>
      {response ? (
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
              <Image
                className="pb-12"
                width={500}
                height={580}
                src={verifyPic}
                alt="file-hive"
              />
              <h1 className="text-black font-bold text-3xl  pb-2">
                Email has been verified
              </h1>
              <p className="text-textColor pb-8 max-w-[500px] text-center text-sm">
                Your email address has been verified, now you can upload files
                and share them with other people!
              </p>
              <Link href={"/sign-in"}>
                <Button
                  className="mb-6 w-[180px] rounded-md"
                  loading={false}
                  text="Go login"
                />
              </Link>
            </div>
          </section>
          <p className="text-blueText text-xs flex justify-center py-4">
            © FileHive
          </p>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}
