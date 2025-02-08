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
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";



export default function IndexPage() {
    const { isConnected } = useAccount()
    const params = useParams();
    const lang = params.lang as Locale;
    const [dictionary, setDictionary] = useState<any>(null);
    const [screenWidth, setScreenWidth] = useState(0);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const containerRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ container: containerRef });
    console.log(screenWidth)
    const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
    const partnerScale = useTransform(scrollYProgress, [0.5, 0.7], [1, 1.2]);

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



    const floatingAnimation = {
        y: ["0%", "-10%", "0%"], // Moves up and down
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    };

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

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    if (!dictionary) return <div className="text-center p-8">Loading...</div>;

    return (
        <div className="bg-gradient-animated transition-all duration-1000">
            <div ref={containerRef} className="flex flex-col space-y-16">
                <Header toggleTheme={toggleTheme} theme={theme} />

                <Hero />

                <motion.div
                    style={{ scale: heroScale }}
                    className="relative flex items-center justify-center w-full px-8"
                >
                    {!isConnected && (
                        <div className={`flex flex-col items-center ${theme === 'light' ? 'text-gray-600' : ''} text-center w-full px-6`}>
                            <h2 className="text-5xl font-bold pt-16 md:pt-20 tracking-tight">
                                Playground
                            </h2>
                            <p className="text-lg text-gray-400 font-light pt-4 max-w-xl">
                                Experience the power of AI agents in action. Test, explore, and push the limits!
                            </p>

                            <div className="mt-8">
                                <ConnectButton />
                            </div>
                        </div>
                    )}
                    <div
                        className={`max-w-[1200px] w-full transition-all duration-300`}
                    >
                        <ChatInterface theme={theme} isConnected={isConnected} />
                    </div>

                </motion.div>

                {/* <motion.div style={{ scale: partnerScale }} className="relative z-50">
                    <TapeSection direction="ltr" />
                    <Partner />
                    <TapeSection direction="rtl" />
                </motion.div> */}

                <Footer theme={theme} />
            </div>
        </div>
    );
}
