/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
module.exports = {
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "primary-2-color": "var(--secondary-color)",
        "todo-color": "var(--todo-color)",
        "purple-color": "var(--purple-color)"
      },
    },
  },
};