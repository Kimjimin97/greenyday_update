/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      zIndex: ["hover", "active"],
      fontFamily: { sans: ["AppleSDGothicNeoL"] },
    },

    plugins: [require("flowbite/plugin"), require("tw-elements/dist/plugin")],
  },
};
