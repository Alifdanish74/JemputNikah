import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette.js";
import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  darkMode: "class", // Enables dark mode with 'class'
  theme: {
    extend: {
      colors: {
        primary: "#E01760",
        secondary: "#060cc2",
        ...colors, // Include Tailwind default colors
      },
      fontFamily: {
        sans: ["YourCustomFont", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    addVariablesForColors, // Adds Tailwind colors as CSS variables
  ],
};

/**
 * This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
 */
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
