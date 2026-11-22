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
        obsidian: "#07090D",
        charcoal: "#10141D",
        steel: "#1C2331",
        volt: "#CCFF00",
        cyanLED: "#00F0FF",
        crimson: "#FF2A54",
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Impact", "Haettenschweiler", "Arial Narrow Bold", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "radial-glow": "radial-gradient(circle at center, rgba(204, 255, 0, 0.14) 0%, transparent 70%)",
        "cyan-glow": "radial-gradient(circle at center, rgba(0, 240, 255, 0.12) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
export default config;
