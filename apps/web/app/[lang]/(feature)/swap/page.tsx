"use client";
import '@coinbase/onchainkit/styles.css';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SwapDemo from "../../components/swap";
import Footer from '../../components/footer';
import Header from '../../components/header';

export default function SwapPage() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [screenWidth, setScreenWidth] = useState(0);
    console.log('screenWidth', screenWidth);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("theme") as "light" | "dark";
            if (storedTheme) {
                setTheme(storedTheme);
                document.body.className = storedTheme;
            }
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme);
        }
        document.body.className = newTheme;
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black transition-all duration-300">
            <Header toggleTheme={toggleTheme} theme={theme} />
            <main className="relative h-screen flex flex-col justify-center items-center text-center text-white px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative flex items-center justify-center w-full px-4 sm:px-8 py-12"
                >
                    <SwapDemo />
                </motion.div>
            </main>
            <Footer theme={theme} />
        </div>
    );
}
