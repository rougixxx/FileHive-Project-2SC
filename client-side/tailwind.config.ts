import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#651FFF",
        secondary: "#00E5FF",
        textColor: "#3F3C3C",
        darkBackground:"#1A284E",
        background: "#ECECFE",
        blackText: "#0B0D0E",
        whiteText: "#E2E4E9",
        blueText: "#5C5F6E",  
        gray: "#B1B1B1",
        mainText:"#232323",
        mainInput:"#718EBF",
        lightGray:"#F5F7FA",
        textGray:"#5F6868",
        iconBacground:"#F2F2F2",
        grayBack :"#E7E7E7"
      },
      boxShadow: {
        custom: "0 0 40px 0 rgba(180, 180, 180, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
