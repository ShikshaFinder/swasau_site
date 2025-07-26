module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0057B8",
        },
        secondary: {
          DEFAULT: "#00B894",
        },
        accent: {
          DEFAULT: "#FFD600",
        },
        background: {
          DEFAULT: "#F8FAFC",
        },
        foreground: {
          DEFAULT: "#1A1A1A",
        },
      },
    },
  },
  plugins: [],
};
