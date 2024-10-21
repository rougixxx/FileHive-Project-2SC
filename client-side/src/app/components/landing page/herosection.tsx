"use client";
import Image from "next/image";
import hero from "@/assets/Landing/hero.svg";
import { useRouter } from "next/navigation";

const HeroSection = () => {
    const router = useRouter();

  return (
    <section className="container mx-auto flex flex-col justify-items-center items-center justify-center gap-4 pt-40 pb-8">
      <h1 className="text-blackText text-5xl text-center font-bold max-w-[60%]">
        Keep your file in <span className="text-primary">safe place</span> with
        hight security.
      </h1>
      <p className="text-textColor text-center max-w-[60%]">
        Store, share, and access your files from anywhere, anytime. Collaborate
        with your team, access your files on-the-go, and feel confident knowing
        your data is protected with top-notch security measures.
      </p>
      <div className="space-x-4 pt-4">
        <button onClick={() => {
              router.push("/sign-up");
            }} className="text-sm bg-primary border-[2px] border-primary text-white rounded-[12px]  px-6 py-[8px] hover:opacity-50 transition-opacity duration-500">
          Get Started
        </button>
        <button onClick={()=>{
          document.getElementById("pricingSection")?.scrollIntoView({ behavior: "smooth" });
        }} className="text-sm text-blackText border-[2px] rounded-[12px] border-blackText px-6 py-[8px] hover:bg-blackText hover:text-white transition-all duration-500">
          Pricing
        </button>
      </div>
      <Image src={hero} width={800} height={800} alt="fileHive" />
    </section>
  );
};

export default HeroSection;
