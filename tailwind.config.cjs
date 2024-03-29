/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        bgBlack: "black",
        test1: "#F49D37",
        test2: "rgb(237, 157, 59, 0.3)",
        test3: "#F4B942",
        loader: "#F3F3F3",
      },
      fontFamily: {
        grotesk: "Space Grotesk",
      },

      screens: {
        "-900": { max: "900px" },
      },
    },
  },
  plugins: [],
};
