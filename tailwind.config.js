import aspectRatio from "@tailwindcss/aspect-ratio";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,scss}"],
  theme: {
    extend: {
      boxShadow: {
        inset: "inset 1em 1em currentColor",
      },
      screens: {
        "-sm": { max: "500px" },
        "-md": { max: "767px" },
        "-960md": { max: "960px" },
      },
    },
  },
  variants: {
    extend: {
      transform: ["checked"],
    },
  },
  plugins: [aspectRatio],
};
