module.exports = {
  content: [
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        h1: ["6rem", "8rem"],
        h2: ["4rem", "4rem"],
        h3: ["2rem", "3rem"],
        btn_32: ["2rem", "2rem"],
        btn_18: ["1.25rem", "1.25rem"],
        btn_14: ["0.875rem", "1rem"],
        p_18: ["1.25rem", "2rem"],
        p_16: ["1rem", "1.15rem"],
      },
      colors: {
        skyblue: "#7EC8E3",
        navyblue: "#050A30",
        blue: "#0000FF",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
