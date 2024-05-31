/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,scss}"],
  theme: {
    extend: {
      screens: {
        "-md": { max: "767px" },
      },
    },
  },
  plugins: [],
};
