/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,scss}"],
  theme: {
    extend: {
      boxShadow: {
        inset: "inset 1em 1em currentColor",
      },
      screens: {
        "-md": { max: "767px" },
      },
    },
  },
  variants: {
    extend: {
      transform: ["checked"],
    },
  },
  plugins: [],
};
