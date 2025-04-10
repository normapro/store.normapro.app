// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Asegúrate que esta ruta cubra tus componentes
  ],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        slide: "slide 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
