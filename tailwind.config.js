/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-black": "#264653",
        "theme-green": "#2A9D8F",
        "theme-yellow": "#E9C46A",
        "theme-l-orange": "#F4A261",
        "theme-d-orange": "#E76F51",
      },
    },
  },

  plugins: [],
};
