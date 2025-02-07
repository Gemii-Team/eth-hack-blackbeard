"use client";

import React, { useState } from "react";
import { Moon, Settings, Sun, X } from "lucide-react";
import { motion } from "framer-motion";
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface IHeaderProps {
    toggleTheme: () => void;
    theme: "light" | "dark";
}

const Header = ({ toggleTheme, theme }: IHeaderProps) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

    return (
        <div>
            <header className="fixed top-0 w-full z-30 pt-4">
                <motion.div
                    className="max-w-4xl mx-auto w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="relative h-18 backdrop-filter backdrop-blur-lg gap-4 rounded-2xl shadow-lg ring-1 ring-amber-50/5 px-4 py-2 flex justify-between items-center">
                        <div className="text-2xl font-bold text-slate-700 dark:text-slate-200">
                            BLACKBREAD
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleSettings}
                                className="p-2 rounded-lg transition cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                            >
                                <Settings className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                            </button>
                        
                            <ConnectButton />
                        </div>
                    </div>
                </motion.div>
            </header>

            {isSettingsOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={toggleSettings}
                >
                    <motion.div
                        className="relative bg-gray-800 text-white p-6 rounded-3xl w-full max-w-md shadow-lg"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-300"
                            onClick={toggleSettings}
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Dark Mode</span>
                                <button
                                    onClick={toggleTheme}
                                    className={`w-16 h-8 flex items-center rounded-full p-1 transition ${theme === "dark" ? "bg-blue-500" : "bg-gray-300"}`}
                                >
                                    <div
                                        className={`w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transform transition ${theme === "dark" ? "translate-x-8" : "translate-x-0"}`}
                                    >
                                        {theme === "dark" ? (
                                            <Moon className="h-4 w-4 text-blue-800" />
                                        ) : (
                                            <Sun className="h-4 w-4 text-yellow-500" />
                                        )}
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={toggleSettings}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default Header;
