/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg1: "var(--bg-1)",
        bg2: "var(--bg-2)",
        bg3: "var(--bg-3)",
        border1: "var(--border-1)",
        text1: "var(--text-1)",
        text2: "var(--text-2)",
      },
    },
  },
  plugins: [],
};
