import icons from "@/assets/Landing/Social icons.svg"
import  Image from "next/image";
const Footer = () => {
  return (
    <>
      <footer className="flex flex-col gap-12  bg-darkBackground">
        <section className="container mx-auto px-24 pt-12 pb-8">
          <div className="flex justify-between pr-[10%]">
            <div className="flex flex-col gap-8 max-w-[30%]">
              <p className="text-white font-semibold">What is FileHive?</p>
              <div className="flex flex-col gap-4 text-white text-opacity-60">
                FileHive is a online file manager website, you can upload
                download and share documents online with people around the
                world.
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <p className="text-white font-semibold">Products</p>
              <ul className="flex flex-col gap-4 text-white text-opacity-60">
                <li className="hover:underline hover:cursor-pointer">Features</li>
                <li className="hover:underline hover:cursor-pointer">Solutions</li>
                <li className="hover:underline hover:cursor-pointer">Pricing</li>
                <li className="hover:underline hover:cursor-pointer">Token</li>
                <li className="hover:underline hover:cursor-pointer">Security</li>
                <li className="hover:underline hover:cursor-pointer">Comparison</li>
              </ul>
            </div>
            <div className="flex flex-col gap-8">
              <p className="text-white font-semibold">Resource</p>
              <ul className="flex flex-col gap-4 text-white text-opacity-60">
                <li className="hover:underline hover:cursor-pointer">Whitepaper</li>
                <li className="hover:underline hover:cursor-pointer">Developer</li>
                <li className="hover:underline hover:cursor-pointer">Brand Kits</li>
                <li className="hover:underline hover:cursor-pointer">Compliance</li>
                <li className="hover:underline hover:cursor-pointer">Privacy Policy</li>
                <li className="hover:underline hover:cursor-pointer">Terms of service</li>
              </ul>
            </div>
            <div className="flex flex-col gap-8">
              <p className="text-white font-semibold">Community</p>
              <ul className="flex flex-col gap-4 text-white text-opacity-60">
                <li className="hover:underline hover:cursor-pointer">Guide</li>
                <li className="hover:underline hover:cursor-pointer">Blog</li>
                <li className="hover:underline hover:cursor-pointer">FAQs</li>
                <li className="hover:underline hover:cursor-pointer">Forum</li>
                <li className="hover:underline hover:cursor-pointer">Help center</li>
                <li className="hover:underline hover:cursor-pointer">Support desk</li>
              </ul>
            </div>
            
          </div>
          <div className="flex justify-between text-white pt-12">
            <div>© 2024FileHive ESI SBA</div>
            <Image src={icons} width={160} height={50} alt="social"/>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
