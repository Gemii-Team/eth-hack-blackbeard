import { keyframes } from "framer-motion";
import type { Config } from "tailwindcss";

export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/[lang]/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",

                // Primary Colors
                primary: "#e24e6b",
                "primary-light": "var(--primary-light)",
                "primary-dark": "var(--primary-dark)",

                // Secondary Colors
                secondary: "var(--secondary)",
                "secondary-light": "var(--secondary-light)",
                "secondary-dark": "var(--secondary-dark)",

                // Info Colors
                info: "var(--info)",
                "info-light": "var(--info-light)",
                "info-dark": "var(--info-dark)",

                // Error Colors
                error: "var(--error)",
                "error-light": "var(--error-light)",
                "error-dark": "var(--error-dark)",

                // Warning Colors
                warning: "var(--warning)",
                "warning-light": "var(--warning-light)",
                "warning-dark": "var(--warning-dark)",

                // Neutral Colors
                neutral: "var(--neutral)",
                "neutral-light": "var(--neutral-light)",
                "neutral-dark": "var(--neutral-dark)",
            },
            animation: {
                "marquee": "marquee 10s linear infinite",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-100%)" },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;