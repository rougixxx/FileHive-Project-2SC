"use client";
import Image from "next/image";
import frame from "@/assets/Landing/Frame.svg";
import frame2 from "@/assets/Landing/Frame2.svg";
import frame3 from "@/assets/Landing/Frame3.svg";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const DescriptionSection = () => {
    const router = useRouter();
    useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section className="container mx-auto flex flex-col justify-items-center items-center px-12 justify-center gap-4 pt-20 pb-8">
      <h2 className="text-blackText text-5xl text-center font-bold max-w-[40%]">
        All kinds of files.
        <br /> On all your devices.
      </h2>
      <p className="text-textColor text-center max-w-[40%]">
        Securely access all your files from your computer, smartphone, tablet,
        or any device with a connection to the internet via the most secure
        cloud storage app.
      </p>
      <Image className="pb-12" src={frame} width={800} height={800} alt="fileHive" />

      <div className="flex justify-center items-center gap-12 px-20  py-16">
        <div data-aos-duration="1000" data-aos="fade-right" className="bg-background rounded-full w-[550px] h-[550px]">
          <Image
            className="p-12"
            src={frame2}
            width={500}
            height={500}
            alt="fileHive"
          />
        </div>

        <div data-aos-duration="1000" data-aos="fade-left" className=" flex flex-col gap-8 w-[40%]">
          <div className="font-bold text-4xl text-blackText">
            Share your files with ease, security is on us.
          </div>
          <div className="text-textColor">
            Deupload focuses on privacy and security, so you only have to focus
            on what matters to you, like sharing files with your coworkers, or
            the photos of your last travel with your family. You choose with who
            you want to share them and how many times you want them to be
            downloaded.
          </div>
          <button onClick={() => {
              router.push("/sign-up");
            }} className="text-sm w-[12rem] text-blackText border-[2px] rounded-[12px] border-blackText px-6 py-[8px] hover:bg-blackText hover:text-white transition-all duration-500">
            Get Started
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center gap-12 px-20  py-16">
        <div data-aos-duration="1000" data-aos="fade-right" className=" flex flex-col gap-8 w-[40%]">
          <div className="font-bold text-4xl text-blackText">
            Your files are available on all your devices.
          </div>
          <div className="text-textColor">
            Deupload lets you organize your files in folders, rename them, and
            filter a list of files to find what you want faster. You can even
            backup your computer folders like your documents folder, so you
            always have the most recent changes of your most important files.
          </div>
          <button onClick={()=>{
             document.getElementById("howItWorkSection")?.scrollIntoView({ behavior: "smooth" });
          }} className="text-sm w-[12rem] text-blackText border-[2px] rounded-[12px] border-blackText px-6 py-[8px] hover:bg-blackText hover:text-white transition-all duration-500">
            Learn more
          </button>
        </div>
        <div  data-aos-duration="1000" data-aos="fade-left" className="bg-background rounded-full w-[550px] h-[550px]">
          <Image
            className="p-12"
            src={frame3}
            width={500}
            height={500}
            alt="fileHive"
          />
        </div>
      </div>
    </section>
  );
};

export default DescriptionSection;
