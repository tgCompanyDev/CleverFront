import type { Config } from "tailwindcss";
import colors from 'tailwindcss/colors';

const config: Config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
        colors: {
            ...colors,
            'dark-main': '#1E1A1B',
            'light-translucent': 'rgba(255, 255, 255, 0.05)',
            'purple-base': '#7000FF',
            'purple-dark': '#131139',
            'yellow-base': '#FFE70C',
            'pink-light': '#B9B8DD',
            'red-toxic': '#FF195E'
        },
    },
    plugins: [],
};
export default config;