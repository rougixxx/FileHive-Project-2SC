"use client";
import Image from "next/image";
import secure from "@/assets/Landing/secure.png";
import privatee from "@/assets/Landing/private.png";
import available from "@/assets/Landing/available.png";
import performance from "@/assets/Landing/performant.png";
import frame4 from "@/assets/Landing/frame4.svg";
import files from "@/assets/Landing/collectfiles.png";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const SolutionSection = () => {
  const router = useRouter();
 useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <section className="container mx-auto px-24 flex py-12">
        <div data-aos-duration="1000" data-aos="fade-right" className="flex flex-col gap-8">
          <h2 className="text-blackText text-5xl font-bold ">
            Your data.
            <br /> Decentralized.
          </h2>
          <p className="text-textColor w-[80%] text-lg">
            Deupload build on FIPS gateway, your files aren&apos;t stored in
            centralized data centers— instead, they&apos;re encrypted, split
            into pieces, and distributed on a Sia decentralized network.
          </p>
        </div>
        <div data-aos-duration="1000" data-aos="fade-left" className="grid grid-cols-2 grid-rows-2 gap-8">
          <div className="flex flex-col gap-4">
            <div className="bg-primary h-20 w-20 rounded-full flex justify-center items-center">
              <Image
                className="p-4"
                src={secure}
                width={80}
                height={80}
                alt="secure"
              />
            </div>
            <div className="text-blackText text-xl font-bold">Secure</div>
            <p className="text-textColor">
              Every file is encrypted, split into pieces, and stored on diverse
              Nodes, making data breaches a thing of the past.
            </p>
          </div>
          <div className="flex flex-col  gap-4">
            <div className="bg-primary h-20 w-20 rounded-full flex justify-center items-center">
              <Image
                className="p-4"
                src={privatee}
                width={80}
                height={80}
                alt="private"
              />
            </div>
            <div className="text-blackText text-xl font-bold">Private</div>
            <p className="text-textColor">
              Everything is encrypted before being uploaded—your data is only in
              your hands and those you share it with.
            </p>
          </div>
          <div className="flex flex-col  gap-4">
            <div className="bg-primary h-20 w-20 rounded-full flex justify-center items-center">
              <Image
                className="p-4"
                src={available}
                width={80}
                height={80}
                alt="available"
              />
            </div>
            <div className="text-blackText text-xl font-bold">Available</div>
            <p className="text-textColor">
              Due to our decentralized network of Storage Nodes, your data is
              multi-region by default, always available when you need it.
            </p>
          </div>
          <div className="flex flex-col  gap-4">
            <div className="bg-primary h-20 w-20 rounded-full flex justify-center items-center">
              <Image
                className="p-4"
                src={performance}
                width={80}
                height={80}
                alt="performance"
              />
            </div>
            <div className="text-blackText text-xl font-bold">Performant</div>
            <p className="text-textColor">
              Download speeds are equal to or better than all major cloud
              providers. In fact, our fast speeds are default.
            </p>
          </div>
        </div>
      </section>
      <section data-aos-duration="1000" data-aos="fade-up" className="container mx-auto px-24 items-center flex justify-center py-12 gap-16">
        <div className="bg-primary rounded-3xl ">
          <Image
            src={frame4}
            width={500}
            height={500}
            alt="fileHive"
            className="p-8"
          />
        </div>
        <div className="flex flex-col gap-8 w-[44%]">
          <span className="hover:opacity-50 transition-opacity duration-500 flex w-[10.5rem] items-center  text-white  gap-2 bg-primary rounded-[10px] px-6 py-[6.5px] hover:cursor-default">
            <Image src={files} height={20} width={20} alt="files" />{" "}
            <span>Collect Files</span>
          </span>
          <h2 className="text-blackText text-5xl  font-bold">
            Send request and collect files from anyone.
          </h2>
          <p className="text-textColor w-[80%]">
            Whether you&apos;re a recruiter collecting resumes or a professor
            gathering assignments or any collection process involves getting
            files from multiple people. Just create custom upload links, and
            enable users to submit their documents securely.
          </p>
          <button
            onClick={() => {
              router.push("/sign-up");
            }}
            className="w-[12rem] text-sm bg-primary border-[2px] border-primary text-white rounded-[12px]  px-6 py-[12px] hover:opacity-50 transition-opacity duration-500"
          >
            Get Started
          </button>
        </div>
      </section>
    </>
  );
};

export default SolutionSection;
