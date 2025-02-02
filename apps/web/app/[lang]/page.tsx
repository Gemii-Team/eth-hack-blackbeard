// File: app/[lang]/page.tsx
"use client";
import { useParams } from "next/navigation"; 
import { getDictionary } from "../../get-dictionary"; 
import { Locale } from "../../i18n-config"; 
import LocaleSwitcher from "./components/locale-switcher"; 
import Sidebar from "./components/sidebar"; 
import React, { useState, useEffect } from "react"; 
import Header from "./components/header"; 
import Hero from "./components/hero";

// Client-side component logic
export default function IndexPage() {
    const params = useParams();
    const lang = params.lang as string;

    // States to hold the fetched dictionary and other client-side states
    const [dictionary, setDictionary] = useState<any>(null); // Adjust type as needed
    const [screenWidth, setScreenWidth] = useState(0);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    // Fetch dictionary on component mount
    useEffect(() => {
        const fetchDictionary = async () => {
            const fetchedDictionary = await getDictionary(lang);
            setDictionary(fetchedDictionary);
        };
        fetchDictionary();
    }, [lang]); // Re-fetch when lang changes

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.body.className = newTheme;
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme as "light" | "dark");
        document.body.className = savedTheme;

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // Initial screen width check
        return () => window.removeEventListener("resize", handleResize); // Cleanup
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    if (!dictionary) return <div>Loading...</div>;

    return (
        <div className="relative h-screen w-screen bg-gray-100">
            {/* <Sidebar screenWidth={screenWidth} /> */}
            <div className="w-full h-full relative justify-between">
                <Header toggleTheme={toggleTheme} theme={theme} />
                <Hero />
            </div>
        </div>
    );
}
