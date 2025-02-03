"use client";
import { useParams } from "next/navigation"; 
import { getDictionary } from "../../get-dictionary"; 
import { Locale } from "../../i18n-config"; 
import LocaleSwitcher from "./components/locale-switcher"; 
import React, { useState, useEffect } from "react"; 
import Header from "./components/header"; 
import Hero from "./components/hero";

export default function IndexPage() {
    const params = useParams();
    const lang = params.lang as Locale;

    const [dictionary, setDictionary] = useState<any>(null); 
    const [screenWidth, setScreenWidth] = useState(0);
    const [theme, setTheme] = useState<"light" | "dark">("light");

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

    if (!dictionary) return <div>Loading...</div>;

    return (
        <div className="relative h-screen w-screen bg-gray-100">
            <div className="w-full h-full relative justify-between">
                <Header toggleTheme={toggleTheme} theme={theme} />
                <Hero />
            </div>
        </div>
    );
}
