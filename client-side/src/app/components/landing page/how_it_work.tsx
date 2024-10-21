import Image from "next/image";
import account from "@/assets/Landing/account.png";
import upload from "@/assets/Landing/upload.png";
import share from "@/assets/Landing/share.png";
import line from "@/assets/Landing/line.svg";

const HowItWorkSection = () => {
  return (
    <section className="container mx-auto px-24 flex flex-col gap-4 justify-center items-center py-28">
      <h2 className="text-6xl text-blackText font-bold text-center">
        How it works?
      </h2>
      <p className="text-blueText text-center w-[60%]">
        Deupload removes complexity and offers a simple interface that allows
        users to take advantage of the vast array of decentralized storage with
        better security, performance, and pricing.
      </p>
      <div className="flex justify-center items-center gap-8 pt-20">
        <div className="bg-primary h-20 w-20 rounded-full flex justify-center items-center">
          <Image
            src={account}
            height={80}
            width={80}
            className="p-5"
            alt="account"
          />
        </div>
        <Image src={line} height={10} width={190} alt="line" />
        <div className="bg-primary h-20 w-20 rounded-full flex justify-center items-center">
          <Image
            src={upload}
            height={80}
            width={80}
            className="p-5"
            alt="upload"
          />
        </div>
        <Image src={line} height={10} width={190} alt="line" />

        <div className="bg-primary h-20 w-20 rounded-full flex justify-center items-center">
          <Image
            src={share}
            height={80}
            width={80}
            className="p-5"
            alt="share"
          />
        </div>
      </div>
      <div className="grid grid-rows-2 justify-center items-center pb-36">
        <div className="flex justify-center items-center gap-32">
          <div className="text-2xl font-bold text-blackText">
            Create an account
          </div>
          <div className="text-2xl font-bold text-blackText">
            Upload your files
          </div>
          <div className="text-2xl font-bold text-blackText">
            Share file instantly
          </div>
        </div>
        <div className="flex justify-center items-center gap-12">
          <p className=" text-blueText text-center w-[18rem]">
            Create an Deupload account and start uploading your files to
            Decentralized Storage.
          </p>
          <p className="text-blueText text-center w-[18rem]">
            Your file is encrypted and split into pieces then distributed to the
            nodes around the world.
          </p>
          <p className="text-blueText text-center w-[18rem]">
            Send your file via email or shareable link with password protect and
            expiration time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorkSection;
