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
        border2: "var(--border-2)",

        text1: "var(--text-1)",
        text2: "var(--text-2)",
        text3: "var(--text-3)",

        r1: "var(--red-1)",
        r2: "var(--red-2)",
        r3: "var(--red-3)",
        rt: "var(--red-text)",

        g1: "var(--green-1)",
        g2: "var(--green-2)",
        g3: "var(--green-3)",
        gt: "var(--green-text)",

        y1: "var(--yellow-1)",
        y2: "var(--yellow-2)",
        y3: "var(--yellow-3)",
        yt: "var(--yellow-text)",

        b1: "var(--blue-1)",
        b2: "var(--blue-2)",
        b3: "var(--blue-3)",
      },
    },
  },
  plugins: [],
};
