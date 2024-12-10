/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				fontG: ["Inter", "sans-serif"],
			},
			screens: {
				custom: "1024px", // Định nghĩa breakpoint tùy chỉnh
			},
		},
	},
	plugins: [],
};
