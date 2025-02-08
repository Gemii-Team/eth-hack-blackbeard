"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";
import Header from "./components/header";
import Hero from "./components/hero";
import { TapeSection } from "./components/Tape";
import { motion, useScroll, useTransform } from "framer-motion";
import Partner from "./components/partner";
import ChatInterface from "./components/chatbot";
import Footer from "./components/footer";
import { useAccount } from 'wagmi'

export default function IndexPage() {
    const {  isConnected } = useAccount()
    const params = useParams();
    const lang = params.lang as Locale;
    const [dictionary, setDictionary] = useState<any>(null);
    const [screenWidth, setScreenWidth] = useState(0);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const containerRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ container: containerRef });
    console.log(screenWidth)
    // Scaling effect for the hero section and partners section
    const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
    const partnerScale = useTransform(scrollYProgress, [0.5, 0.7], [1, 1.2]);

    // Fetch dictionary for language
    useEffect(() => {
        const fetchDictionary = async () => {
            const fetchedDictionary = await getDictionary(lang);
            setDictionary(fetchedDictionary);
        };
        fetchDictionary();
    }, [lang]);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.body.className = newTheme;
    };

    // Handle theme persistence in local storage and screen resizing
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme as "light" | "dark");
        document.body.className = savedTheme;

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Persist theme in localStorage when it changes
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    if (!dictionary) return <div className="text-center p-8">Loading...</div>;

    return (
        <div className="bg-gradient-animated transition-all duration-1000">
            <div ref={containerRef} className="flex flex-col space-y-16">
                {/* Header Section */}
                <Header toggleTheme={toggleTheme} theme={theme} />

                {/* Hero Section with Scroll Effect */}
                <motion.div style={{ scale: heroScale }} className="relative">
                    <Hero />
                </motion.div>

                {/* Partners Section with Scroll Effect */}
                <motion.div style={{ scale: partnerScale }} className="relative z-50">
                    <TapeSection direction="ltr" />
                    <Partner />
                    <TapeSection direction="rtl" />
                </motion.div>

                {/* Chat Interface */}
                <motion.div
                    style={{ scale: heroScale }}
                    className="relative flex items-center justify-center w-full px-8"
                >
                    {/* Main content */}
                    <div
                        className={`max-w-[1080px] w-full transition-all duration-300`}
                    >
                        <ChatInterface theme={theme} isConnected={isConnected} />
                    </div>

                    {/* Overlay when disconnected */}
                    {!isConnected && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10">
                            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'} shadow-lg`}>
                                <h3 className={`text-xl font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    Not Connected
                                </h3>
                                <p className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}`}>
                                    Please connect to continue chatting
                                </p>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Footer Section */}
                <Footer theme={theme} />
            </div>
        </div>
    );
}
