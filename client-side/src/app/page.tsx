"use client";
import NavBar from "./components/landing page/navbar";
import Footer from "./components/landing page/footer";
import HeroSection from "./components/landing page/herosection";
import DescriptionSection from "./components/landing page/description";
import SolutionSection from "./components/landing page/solution";
import PricingSectino from "./components/landing page/pricing";
import HowItWorkSection from "./components/landing page/how_it_work";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <main className="overflow-hidden">
      <div className="fixed w-full z-40">
        <NavBar />
      </div>
      <section id="heroSection" data-aos-duration="1000" data-aos="zoom-out">
        <HeroSection />
      </section>
      <section
        id="descriptionSection"
        data-aos-duration="1000"
        data-aos="fade-up"
      >
        <DescriptionSection />
      </section>
      <section id="solutionSection">
        <SolutionSection />
      </section>
      <section id="pricingSection" data-aos-duration="1000" data-aos="fade-up">
        <PricingSectino />
      </section>
      <section
        id="howItWorkSection"
        data-aos-duration="1000"
        data-aos="fade-up"
      >
        <HowItWorkSection />
      </section>
      <Footer />
    </main>
  );
}
