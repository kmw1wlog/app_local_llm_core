import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        shell: "#f4f7fb",
        brand: {
          50: "#eef6ff",
          100: "#d7e8ff",
          500: "#346dff",
          600: "#2357d8",
          700: "#1d459f",
        },
        slateblue: "#1f3258",
        success: "#0f9f6e",
        warning: "#d48a14",
        danger: "#d44747",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)",
      },
      backgroundImage: {
        "console-grid":
          "radial-gradient(circle at top left, rgba(52,109,255,0.16), transparent 30%), linear-gradient(135deg, rgba(15,23,42,0.04) 25%, transparent 25%), linear-gradient(225deg, rgba(15,23,42,0.04) 25%, transparent 25%)",
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "Pretendard", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
